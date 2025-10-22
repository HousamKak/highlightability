import * as vscode from 'vscode';
import { HighlightManager } from './highlightManager';
import { HighlightTreeProvider } from './highlightTreeProvider';
import { Logger } from './logger';

let highlightManager: HighlightManager;
let treeDataProvider: HighlightTreeProvider;

export function activate(context: vscode.ExtensionContext) {
    // Initialize logger
    Logger.initialize();
    Logger.log('Code Highlighter extension activating...');

    try {
        highlightManager = new HighlightManager(context);
        Logger.log('HighlightManager initialized successfully');

        // Register tree view
        treeDataProvider = new HighlightTreeProvider(highlightManager);
        Logger.log('HighlightTreeProvider initialized successfully');

        const treeView = vscode.window.createTreeView('codeHighlighterTreeView', {
            treeDataProvider: treeDataProvider,
            showCollapseAll: true
        });
        context.subscriptions.push(treeView);
        Logger.log('Tree view registered successfully');

        // Register command: Toggle Highlight (with default color, no prompts)
        const toggleHighlightCommand = vscode.commands.registerCommand(
            'codeHighlighter.toggleHighlight',
            async () => {
                Logger.log('Toggle highlight command triggered');
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    Logger.error('No active editor');
                    vscode.window.showErrorMessage('No active editor');
                    return;
                }

                const selection = editor.selection;
                if (selection.isEmpty) {
                    Logger.log('Empty selection, skipping toggle');
                    vscode.window.showWarningMessage('Please select some text to highlight');
                    return;
                }

                const config = vscode.workspace.getConfiguration('codeHighlighter');
                const defaultColor = config.get<string>('defaultColor') || '#FFFF0066';
                Logger.log(`Toggling highlight with color: ${defaultColor}`);

                highlightManager.toggleHighlight(editor, selection, defaultColor);
            }
        );

        // Register color-specific highlight commands
        const addHighlightYellowCommand = vscode.commands.registerCommand(
            'codeHighlighter.addHighlightYellow',
            () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor || editor.selection.isEmpty) {
                    return;
                }
                highlightManager.addHighlight(editor, editor.selection, undefined, '#FFFF0066');
            }
        );

        const addHighlightGreenCommand = vscode.commands.registerCommand(
            'codeHighlighter.addHighlightGreen',
            () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor || editor.selection.isEmpty) {
                    return;
                }
                highlightManager.addHighlight(editor, editor.selection, undefined, '#00FF0066');
            }
        );

        const addHighlightPinkCommand = vscode.commands.registerCommand(
            'codeHighlighter.addHighlightPink',
            () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor || editor.selection.isEmpty) {
                    return;
                }
                highlightManager.addHighlight(editor, editor.selection, undefined, '#FF00FF66');
            }
        );

        const addHighlightCyanCommand = vscode.commands.registerCommand(
            'codeHighlighter.addHighlightCyan',
            () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor || editor.selection.isEmpty) {
                    return;
                }
                highlightManager.addHighlight(editor, editor.selection, undefined, '#00FFFF66');
            }
        );

        const addHighlightOrangeCommand = vscode.commands.registerCommand(
            'codeHighlighter.addHighlightOrange',
            () => {
                const editor = vscode.window.activeTextEditor;
                if (!editor || editor.selection.isEmpty) {
                    return;
                }
                highlightManager.addHighlight(editor, editor.selection, undefined, '#FFA50066');
            }
        );

        // Register command: Add Highlight (with comment and color selection)
        const addHighlightCommand = vscode.commands.registerCommand(
            'codeHighlighter.addHighlight',
            async () => {
                Logger.log('Add highlight command triggered');
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    Logger.error('No active editor');
                    vscode.window.showErrorMessage('No active editor');
                    return;
                }

                const selection = editor.selection;
                if (selection.isEmpty) {
                    Logger.log('Empty selection, skipping highlight');
                    vscode.window.showWarningMessage('Please select some text to highlight');
                    return;
                }

                Logger.log(`Selection: Line ${selection.start.line}:${selection.start.character} to Line ${selection.end.line}:${selection.end.character}`);

                // Prompt for optional comment
                const comment = await vscode.window.showInputBox({
                    prompt: 'Add a comment (optional - press Enter to skip)',
                    placeHolder: 'Enter your comment here...'
                });

                // If user cancels (undefined), don't add highlight
                if (comment === undefined) {
                    Logger.log('User cancelled comment input');
                    return;
                }

                Logger.log(`Comment entered: ${comment || '(none)'}`);

                // Get color selection
                const config = vscode.workspace.getConfiguration('codeHighlighter');
                const colors = config.get<string[]>('colors') || ['#FFFF0066'];

                const colorLabels = [
                    { label: '$(symbol-color) Yellow', color: '#FFFF0066' },
                    { label: '$(symbol-color) Green', color: '#00FF0066' },
                    { label: '$(symbol-color) Pink', color: '#FF00FF66' },
                    { label: '$(symbol-color) Cyan', color: '#00FFFF66' },
                    { label: '$(symbol-color) Orange', color: '#FFA50066' }
                ];

                const selectedColor = await vscode.window.showQuickPick(
                    colorLabels.map(c => c.label),
                    {
                        placeHolder: 'Select highlight color',
                        canPickMany: false
                    }
                );

                if (!selectedColor) {
                    Logger.log('User cancelled color selection');
                    return;
                }

                const colorLabel = colorLabels.find(c => c.label === selectedColor);
                const color = colorLabel?.color || colors[0];
                Logger.log(`Color selected: ${color}`);

                try {
                    highlightManager.addHighlight(editor, selection, comment || undefined, color);
                    Logger.log('Highlight added successfully');
                    vscode.window.showInformationMessage('Highlight added!');
                } catch (error) {
                    Logger.error('Failed to add highlight', error);
                    vscode.window.showErrorMessage('Failed to add highlight. Check output for details.');
                }
            }
        );

        // Register command: Remove Highlight
        const removeHighlightCommand = vscode.commands.registerCommand(
            'codeHighlighter.removeHighlight',
            () => {
                Logger.log('Remove highlight command triggered');
                const editor = vscode.window.activeTextEditor;
                if (!editor) {
                    Logger.error('No active editor');
                    vscode.window.showErrorMessage('No active editor');
                    return;
                }

                Logger.log(`Cursor position: Line ${editor.selection.active.line}:${editor.selection.active.character}`);
                highlightManager.removeHighlight(editor, editor.selection.active);
            }
        );

    // Register command: Clear All Highlights
    const clearAllHighlightsCommand = vscode.commands.registerCommand(
        'codeHighlighter.clearAllHighlights',
        async () => {
            const choice = await vscode.window.showQuickPick(
                ['Current File', 'All Files'],
                {
                    placeHolder: 'Clear highlights from...'
                }
            );

            if (!choice) {
                return;
            }

            const editor = vscode.window.activeTextEditor;
            if (choice === 'Current File' && editor) {
                highlightManager.clearAllHighlights(editor);
            } else if (choice === 'All Files') {
                highlightManager.clearAllHighlights();
            }
        }
    );

    // Register command: List All Highlights
    const listHighlightsCommand = vscode.commands.registerCommand(
        'codeHighlighter.listHighlights',
        async () => {
            const highlights = highlightManager.getAllHighlights();

            if (highlights.length === 0) {
                vscode.window.showInformationMessage('No highlights found');
                return;
            }

            const items = highlights.map(h => {
                const fileName = h.filePath.split(/[\\/]/).pop() || h.filePath;
                const preview = h.text.substring(0, 50) + (h.text.length > 50 ? '...' : '');
                const label = `${fileName}:${h.range.start.line + 1}`;
                const description = preview;
                const detail = h.comment || '(no comment)';

                return {
                    label,
                    description,
                    detail,
                    highlight: h
                };
            });

            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: 'Select a highlight to jump to'
            });

            if (selected) {
                const document = await vscode.workspace.openTextDocument(selected.highlight.filePath);
                const editor = await vscode.window.showTextDocument(document);

                const range = new vscode.Range(
                    selected.highlight.range.start.line,
                    selected.highlight.range.start.character,
                    selected.highlight.range.end.line,
                    selected.highlight.range.end.character
                );

                editor.selection = new vscode.Selection(range.start, range.end);
                editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
            }
        }
    );

    // Register command: Add Comment to Highlight
    const addCommentCommand = vscode.commands.registerCommand(
        'codeHighlighter.addComment',
        async () => {
            Logger.log('Add comment command triggered');
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active editor');
                return;
            }

            const highlight = highlightManager.getHighlightAtPosition(editor, editor.selection.active);

            if (!highlight) {
                vscode.window.showWarningMessage('Place cursor on a highlight to add a comment');
                return;
            }

            const comment = await vscode.window.showInputBox({
                prompt: 'Add a comment to this highlight',
                value: highlight.comment || '',
                placeHolder: 'Enter your comment...'
            });

            if (comment === undefined) {
                return; // User cancelled
            }

            highlight.comment = comment || undefined;
            highlightManager.saveHighlightsExternal();
            highlightManager.applyDecorations(editor);
            vscode.window.showInformationMessage('Comment added!');
        }
    );

    // Register command: Edit Highlight Comment
    const editHighlightCommentCommand = vscode.commands.registerCommand(
        'codeHighlighter.editHighlightComment',
        async (item?) => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showErrorMessage('No active editor');
                return;
            }

            // If called from tree view, jump to the highlight first
            if (item?.highlight) {
                const document = await vscode.workspace.openTextDocument(item.highlight.filePath);
                const newEditor = await vscode.window.showTextDocument(document);
                const position = new vscode.Position(
                    item.highlight.range.start.line,
                    item.highlight.range.start.character
                );
                await highlightManager.editHighlightComment(newEditor, position);
            } else {
                // Called from editor context menu
                await highlightManager.editHighlightComment(editor, editor.selection.active);
            }
        }
    );

    // Register command: Export Highlights
    const exportHighlightsCommand = vscode.commands.registerCommand(
        'codeHighlighter.exportHighlights',
        async () => {
            await highlightManager.exportHighlights();
        }
    );

    // Register command: Import Highlights
    const importHighlightsCommand = vscode.commands.registerCommand(
        'codeHighlighter.importHighlights',
        async () => {
            await highlightManager.importHighlights();
        }
    );

    // Register command: Jump to Highlight
    const jumpToHighlightCommand = vscode.commands.registerCommand(
        'codeHighlighter.jumpToHighlight',
        async (highlight) => {
            const document = await vscode.workspace.openTextDocument(highlight.filePath);
            const editor = await vscode.window.showTextDocument(document);

            const range = new vscode.Range(
                highlight.range.start.line,
                highlight.range.start.character,
                highlight.range.end.line,
                highlight.range.end.character
            );

            editor.selection = new vscode.Selection(range.start, range.end);
            editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
        }
    );

    // Register command: Refresh Highlights
    const refreshHighlightsCommand = vscode.commands.registerCommand(
        'codeHighlighter.refreshHighlights',
        () => {
            treeDataProvider.refresh();
            vscode.window.showInformationMessage('Highlights refreshed');
        }
    );

    // Register command: Delete Highlight from Tree
    const deleteHighlightFromTreeCommand = vscode.commands.registerCommand(
        'codeHighlighter.deleteHighlightFromTree',
        async (item) => {
            if (item?.highlight) {
                const document = await vscode.workspace.openTextDocument(item.highlight.filePath);
                const editor = await vscode.window.showTextDocument(document);
                const position = new vscode.Position(
                    item.highlight.range.start.line,
                    item.highlight.range.start.character
                );
                highlightManager.removeHighlight(editor, position);
            }
        }
    );

    // Apply decorations when switching editors
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            highlightManager.applyDecorations(editor);
        }
    }, null, context.subscriptions);

    // Apply decorations when opening a document
    vscode.workspace.onDidOpenTextDocument(() => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            highlightManager.applyDecorations(editor);
        }
    }, null, context.subscriptions);

    // Apply decorations to all visible editors on startup
    vscode.window.visibleTextEditors.forEach(editor => {
        highlightManager.applyDecorations(editor);
    });

        // Register command: Show Logs
        const showLogsCommand = vscode.commands.registerCommand(
            'codeHighlighter.showLogs',
            () => {
                Logger.show();
            }
        );

        // Apply decorations when switching editors
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                Logger.log(`Editor changed to: ${editor.document.fileName}`);
                highlightManager.applyDecorations(editor);
            }
        }, null, context.subscriptions);

        // Apply decorations when opening a document
        vscode.workspace.onDidOpenTextDocument(() => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                Logger.log(`Document opened: ${editor.document.fileName}`);
                highlightManager.applyDecorations(editor);
            }
        }, null, context.subscriptions);

        // Apply decorations to all visible editors on startup
        Logger.log(`Applying decorations to ${vscode.window.visibleTextEditors.length} visible editors`);
        vscode.window.visibleTextEditors.forEach(editor => {
            highlightManager.applyDecorations(editor);
        });

        context.subscriptions.push(
            toggleHighlightCommand,
            addHighlightYellowCommand,
            addHighlightGreenCommand,
            addHighlightPinkCommand,
            addHighlightCyanCommand,
            addHighlightOrangeCommand,
            addHighlightCommand,
            removeHighlightCommand,
            clearAllHighlightsCommand,
            listHighlightsCommand,
            addCommentCommand,
            editHighlightCommentCommand,
            exportHighlightsCommand,
            importHighlightsCommand,
            jumpToHighlightCommand,
            refreshHighlightsCommand,
            deleteHighlightFromTreeCommand,
            showLogsCommand,
            highlightManager
        );

        Logger.log('All commands registered successfully');
        Logger.log('Code Highlighter extension activated successfully!');

    } catch (error) {
        Logger.error('Failed to activate Code Highlighter extension', error);
        vscode.window.showErrorMessage('Code Highlighter failed to activate. Check output for details.');
        Logger.show();
    }
}

export function deactivate() {
    Logger.log('Code Highlighter extension deactivating...');
    if (highlightManager) {
        highlightManager.dispose();
    }
    Logger.dispose();
}
