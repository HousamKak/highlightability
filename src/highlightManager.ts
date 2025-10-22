import * as vscode from 'vscode';
import { Logger } from './logger';

export interface Highlight {
    id: string;
    filePath: string;
    range: {
        start: { line: number; character: number };
        end: { line: number; character: number };
    };
    text: string;
    comment?: string;
    color: string;
    timestamp: number;
}

export class HighlightManager {
    private highlights: Map<string, Highlight[]> = new Map();
    private decorationTypes: Map<string, vscode.TextEditorDecorationType> = new Map();
    private context: vscode.ExtensionContext;
    private changeListeners: vscode.Disposable[] = [];
    private _onDidChangeHighlights = new vscode.EventEmitter<void>();
    public readonly onDidChangeHighlights = this._onDidChangeHighlights.event;

    constructor(context: vscode.ExtensionContext) {
        Logger.log('HighlightManager constructor called');
        this.context = context;
        this.loadHighlights();
        this.initializeDecorations();
        this.setupDocumentChangeListener();
        Logger.log('HighlightManager initialized successfully');
    }

    private setupDocumentChangeListener(): void {
        // Listen to document changes to adjust highlight ranges
        const listener = vscode.workspace.onDidChangeTextDocument(event => {
            this.handleDocumentChange(event);
        });
        this.changeListeners.push(listener);
    }

    private handleDocumentChange(event: vscode.TextDocumentChangeEvent): void {
        const filePath = event.document.uri.fsPath;
        const fileHighlights = this.highlights.get(filePath);

        if (!fileHighlights || fileHighlights.length === 0) {
            return;
        }

        let needsUpdate = false;

        // Process each content change
        event.contentChanges.forEach(change => {
            fileHighlights.forEach(highlight => {
                const highlightRange = new vscode.Range(
                    highlight.range.start.line,
                    highlight.range.start.character,
                    highlight.range.end.line,
                    highlight.range.end.character
                );

                // Check if change affects this highlight
                if (change.range.end.isBefore(highlightRange.start)) {
                    // Change is before highlight - adjust position
                    const lineDelta = change.range.start.line - change.range.end.line + change.text.split('\n').length - 1;

                    if (lineDelta !== 0) {
                        highlight.range.start.line += lineDelta;
                        highlight.range.end.line += lineDelta;
                        needsUpdate = true;
                    }
                } else if (change.range.start.isAfterOrEqual(highlightRange.end)) {
                    // Change is after highlight - no adjustment needed
                } else {
                    // Change overlaps or is inside highlight - update text
                    const newText = event.document.getText(highlightRange);
                    if (newText !== highlight.text) {
                        highlight.text = newText;
                        needsUpdate = true;
                    }
                }
            });
        });

        if (needsUpdate) {
            this.saveHighlights();
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.uri.fsPath === filePath) {
                this.applyDecorations(editor);
            }
        }
    }

    private initializeDecorations() {
        const config = vscode.workspace.getConfiguration('codeHighlighter');
        const colors = config.get<string[]>('colors') || ['#FFFF0066'];

        colors.forEach(color => {
            if (!this.decorationTypes.has(color)) {
                this.decorationTypes.set(color, vscode.window.createTextEditorDecorationType({
                    backgroundColor: color,
                    borderRadius: '3px'
                }));
            }
        });
    }

    addHighlight(
        editor: vscode.TextEditor,
        selection: vscode.Selection,
        comment?: string,
        color?: string
    ): void {
        Logger.log('addHighlight called', {
            file: editor.document.fileName,
            selection: `${selection.start.line}:${selection.start.character}-${selection.end.line}:${selection.end.character}`,
            hasComment: !!comment,
            color
        });

        const config = vscode.workspace.getConfiguration('codeHighlighter');
        const defaultColor = config.get<string>('defaultColor') || '#FFFF0066';
        const highlightColor = color || defaultColor;

        // Ensure decoration type exists for this color
        if (!this.decorationTypes.has(highlightColor)) {
            this.decorationTypes.set(highlightColor, vscode.window.createTextEditorDecorationType({
                backgroundColor: highlightColor,
                borderRadius: '3px'
            }));
            Logger.log(`Created new decoration type for color: ${highlightColor}`);
        }

        const highlight: Highlight = {
            id: this.generateId(),
            filePath: editor.document.uri.fsPath,
            range: {
                start: {
                    line: selection.start.line,
                    character: selection.start.character
                },
                end: {
                    line: selection.end.line,
                    character: selection.end.character
                }
            },
            text: editor.document.getText(selection),
            comment,
            color: highlightColor,
            timestamp: Date.now()
        };

        const filePath = editor.document.uri.fsPath;
        const fileHighlights = this.highlights.get(filePath) || [];
        fileHighlights.push(highlight);
        this.highlights.set(filePath, fileHighlights);

        Logger.log(`Highlight added: ID=${highlight.id}, Total highlights for file: ${fileHighlights.length}`);

        this.saveHighlights();
        this.applyDecorations(editor);
        this._onDidChangeHighlights.fire();
    }

    removeHighlight(editor: vscode.TextEditor, position: vscode.Position): void {
        const filePath = editor.document.uri.fsPath;
        const fileHighlights = this.highlights.get(filePath);

        if (!fileHighlights) {
            return;
        }

        const index = fileHighlights.findIndex(h => {
            const range = new vscode.Range(
                h.range.start.line,
                h.range.start.character,
                h.range.end.line,
                h.range.end.character
            );
            return range.contains(position);
        });

        if (index !== -1) {
            fileHighlights.splice(index, 1);
            if (fileHighlights.length === 0) {
                this.highlights.delete(filePath);
            }
            this.saveHighlights();
            this.applyDecorations(editor);
            this._onDidChangeHighlights.fire();
            vscode.window.showInformationMessage('Highlight removed');
        } else {
            vscode.window.showWarningMessage('No highlight at cursor position');
        }
    }

    clearAllHighlights(editor?: vscode.TextEditor): void {
        if (editor) {
            this.highlights.delete(editor.document.uri.fsPath);
            this.applyDecorations(editor);
        } else {
            this.highlights.clear();
            vscode.window.visibleTextEditors.forEach(e => this.applyDecorations(e));
        }
        this.saveHighlights();
        this._onDidChangeHighlights.fire();
        vscode.window.showInformationMessage('All highlights cleared');
    }

    applyDecorations(editor: vscode.TextEditor): void {
        const filePath = editor.document.uri.fsPath;
        const fileHighlights = this.highlights.get(filePath) || [];

        Logger.log(`applyDecorations called for ${editor.document.fileName}. Highlights count: ${fileHighlights.length}`);

        // Clear all decorations first
        this.decorationTypes.forEach(decorationType => {
            editor.setDecorations(decorationType, []);
        });

        if (fileHighlights.length === 0) {
            Logger.log('No highlights to apply');
            return;
        }

        // Group highlights by color
        const highlightsByColor = new Map<string, vscode.DecorationOptions[]>();

        fileHighlights.forEach(highlight => {
            const range = new vscode.Range(
                highlight.range.start.line,
                highlight.range.start.character,
                highlight.range.end.line,
                highlight.range.end.character
            );

            const decoration: vscode.DecorationOptions = {
                range,
                hoverMessage: highlight.comment
                    ? new vscode.MarkdownString(`**Comment:** ${highlight.comment}`)
                    : undefined
            };

            const colorDecorations = highlightsByColor.get(highlight.color) || [];
            colorDecorations.push(decoration);
            highlightsByColor.set(highlight.color, colorDecorations);
        });

        // Apply decorations for each color
        highlightsByColor.forEach((decorations, color) => {
            const decorationType = this.decorationTypes.get(color);
            if (decorationType) {
                editor.setDecorations(decorationType, decorations);
                Logger.log(`Applied ${decorations.length} decorations for color ${color}`);
            } else {
                Logger.error(`Decoration type not found for color: ${color}`);
            }
        });
    }

    getAllHighlights(): Highlight[] {
        const allHighlights: Highlight[] = [];
        this.highlights.forEach(highlights => {
            allHighlights.push(...highlights);
        });
        return allHighlights.sort((a, b) => b.timestamp - a.timestamp);
    }

    getHighlightsByFile(filePath: string): Highlight[] {
        return this.highlights.get(filePath) || [];
    }

    getHighlightAtPosition(editor: vscode.TextEditor, position: vscode.Position): Highlight | undefined {
        const filePath = editor.document.uri.fsPath;
        const fileHighlights = this.highlights.get(filePath);

        if (!fileHighlights) {
            return undefined;
        }

        return fileHighlights.find(h => {
            const range = new vscode.Range(
                h.range.start.line,
                h.range.start.character,
                h.range.end.line,
                h.range.end.character
            );
            return range.contains(position);
        });
    }

    getHighlightsInRange(editor: vscode.TextEditor, selection: vscode.Selection): Highlight[] {
        const filePath = editor.document.uri.fsPath;
        const fileHighlights = this.highlights.get(filePath);

        if (!fileHighlights) {
            return [];
        }

        const selectionRange = new vscode.Range(
            selection.start.line,
            selection.start.character,
            selection.end.line,
            selection.end.character
        );

        return fileHighlights.filter(h => {
            const highlightRange = new vscode.Range(
                h.range.start.line,
                h.range.start.character,
                h.range.end.line,
                h.range.end.character
            );
            // Check if ranges overlap or intersect
            return selectionRange.intersection(highlightRange) !== undefined;
        });
    }

    removeHighlightsInRange(editor: vscode.TextEditor, selection: vscode.Selection): number {
        const filePath = editor.document.uri.fsPath;
        const fileHighlights = this.highlights.get(filePath);

        if (!fileHighlights) {
            return 0;
        }

        const selectionRange = new vscode.Range(
            selection.start.line,
            selection.start.character,
            selection.end.line,
            selection.end.character
        );

        const highlightsToRemove = fileHighlights.filter(h => {
            const highlightRange = new vscode.Range(
                h.range.start.line,
                h.range.start.character,
                h.range.end.line,
                h.range.end.character
            );
            return selectionRange.intersection(highlightRange) !== undefined;
        });

        if (highlightsToRemove.length === 0) {
            return 0;
        }

        // Remove the highlights
        highlightsToRemove.forEach(highlightToRemove => {
            const index = fileHighlights.findIndex(h => h.id === highlightToRemove.id);
            if (index !== -1) {
                fileHighlights.splice(index, 1);
            }
        });

        if (fileHighlights.length === 0) {
            this.highlights.delete(filePath);
        }

        Logger.log(`Removed ${highlightsToRemove.length} highlights in range`);
        this.saveHighlights();
        this.applyDecorations(editor);
        this._onDidChangeHighlights.fire();

        return highlightsToRemove.length;
    }

    toggleHighlight(editor: vscode.TextEditor, selection: vscode.Selection, color?: string): void {
        Logger.log('toggleHighlight called');

        if (selection.isEmpty) {
            Logger.log('Empty selection, skipping toggle');
            vscode.window.showWarningMessage('Please select some text to highlight');
            return;
        }

        // Check if selection overlaps with any existing highlights
        const overlappingHighlights = this.getHighlightsInRange(editor, selection);

        if (overlappingHighlights.length > 0) {
            // Remove highlights
            Logger.log(`Found ${overlappingHighlights.length} overlapping highlights, removing them`);
            const removed = this.removeHighlightsInRange(editor, selection);
            vscode.window.showInformationMessage(`Removed ${removed} highlight(s)`);
        } else {
            // Add new highlight
            Logger.log('No overlapping highlights, adding new highlight');
            this.addHighlight(editor, selection, undefined, color);
            vscode.window.showInformationMessage('Highlight added!');
        }
    }

    async editHighlightComment(editor: vscode.TextEditor, position: vscode.Position): Promise<void> {
        const highlight = this.getHighlightAtPosition(editor, position);

        if (!highlight) {
            vscode.window.showWarningMessage('No highlight at cursor position');
            return;
        }

        const newComment = await vscode.window.showInputBox({
            prompt: 'Edit comment',
            value: highlight.comment || '',
            placeHolder: 'Enter new comment...'
        });

        if (newComment === undefined) {
            return; // User cancelled
        }

        highlight.comment = newComment || undefined;
        this.saveHighlights();
        this.applyDecorations(editor);
        this._onDidChangeHighlights.fire();
        vscode.window.showInformationMessage('Comment updated');
    }

    async exportHighlights(): Promise<void> {
        const highlights = this.getAllHighlights();

        if (highlights.length === 0) {
            vscode.window.showWarningMessage('No highlights to export');
            return;
        }

        const exportData = {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            highlights: highlights
        };

        const jsonString = JSON.stringify(exportData, null, 2);

        const uri = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file('highlights.json'),
            filters: {
                'JSON': ['json']
            }
        });

        if (uri) {
            await vscode.workspace.fs.writeFile(uri, Buffer.from(jsonString, 'utf8'));
            vscode.window.showInformationMessage(`Exported ${highlights.length} highlights`);
        }
    }

    async importHighlights(): Promise<void> {
        const uri = await vscode.window.showOpenDialog({
            canSelectMany: false,
            filters: {
                'JSON': ['json']
            }
        });

        if (!uri || uri.length === 0) {
            return;
        }

        try {
            const fileContent = await vscode.workspace.fs.readFile(uri[0]);
            const jsonString = Buffer.from(fileContent).toString('utf8');
            const importData = JSON.parse(jsonString);

            if (!importData.highlights || !Array.isArray(importData.highlights)) {
                vscode.window.showErrorMessage('Invalid highlights file format');
                return;
            }

            // Merge or replace?
            const choice = await vscode.window.showQuickPick(
                ['Merge with existing', 'Replace all existing'],
                {
                    placeHolder: 'How to import highlights?'
                }
            );

            if (!choice) {
                return;
            }

            if (choice === 'Replace all existing') {
                this.highlights.clear();
            }

            // Import highlights
            importData.highlights.forEach((highlight: Highlight) => {
                const filePath = highlight.filePath;
                const fileHighlights = this.highlights.get(filePath) || [];
                fileHighlights.push(highlight);
                this.highlights.set(filePath, fileHighlights);
            });

            this.saveHighlights();
            this._onDidChangeHighlights.fire();

            // Apply decorations to all visible editors
            vscode.window.visibleTextEditors.forEach(editor => {
                this.applyDecorations(editor);
            });

            vscode.window.showInformationMessage(`Imported ${importData.highlights.length} highlights`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to import highlights: ${error}`);
        }
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    saveHighlightsExternal(): void {
        this.saveHighlights();
        this._onDidChangeHighlights.fire();
    }

    private saveHighlights(): void {
        const data: { [key: string]: Highlight[] } = {};
        this.highlights.forEach((highlights, filePath) => {
            data[filePath] = highlights;
        });
        this.context.workspaceState.update('highlights', data);
    }

    private loadHighlights(): void {
        Logger.log('loadHighlights called');
        const data = this.context.workspaceState.get<{ [key: string]: Highlight[] }>('highlights');
        if (data) {
            let totalHighlights = 0;
            Object.entries(data).forEach(([filePath, highlights]) => {
                this.highlights.set(filePath, highlights);
                totalHighlights += highlights.length;
            });
            Logger.log(`Loaded ${totalHighlights} highlights from ${Object.keys(data).length} files`);
        } else {
            Logger.log('No saved highlights found');
        }
    }

    dispose(): void {
        this.decorationTypes.forEach(decorationType => decorationType.dispose());
        this.decorationTypes.clear();
        this.changeListeners.forEach(listener => listener.dispose());
        this.changeListeners = [];
        this._onDidChangeHighlights.dispose();
    }
}
