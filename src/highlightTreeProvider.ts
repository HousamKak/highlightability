import * as vscode from 'vscode';
import * as path from 'path';
import { HighlightManager, Highlight } from './highlightManager';

export class HighlightTreeProvider implements vscode.TreeDataProvider<HighlightTreeItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<HighlightTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    constructor(private highlightManager: HighlightManager) {
        // Listen to highlight changes
        highlightManager.onDidChangeHighlights(() => {
            this.refresh();
        });
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: HighlightTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: HighlightTreeItem): Thenable<HighlightTreeItem[]> {
        if (!element) {
            // Root level - show files with highlights
            return Promise.resolve(this.getFileNodes());
        } else if (element.type === 'file') {
            // File level - show highlights in this file
            return Promise.resolve(this.getHighlightNodes(element.filePath!));
        }
        return Promise.resolve([]);
    }

    private getFileNodes(): HighlightTreeItem[] {
        const allHighlights = this.highlightManager.getAllHighlights();
        const fileMap = new Map<string, number>();

        // Group highlights by file
        allHighlights.forEach(h => {
            fileMap.set(h.filePath, (fileMap.get(h.filePath) || 0) + 1);
        });

        // Create file nodes
        const fileNodes: HighlightTreeItem[] = [];
        fileMap.forEach((count, filePath) => {
            const fileName = path.basename(filePath);
            const node = new HighlightTreeItem(
                `${fileName} (${count})`,
                vscode.TreeItemCollapsibleState.Collapsed,
                'file',
                filePath
            );
            node.tooltip = filePath;
            node.iconPath = vscode.ThemeIcon.File;
            fileNodes.push(node);
        });

        return fileNodes.sort((a, b) => a.label!.toString().localeCompare(b.label!.toString()));
    }

    private getHighlightNodes(filePath: string): HighlightTreeItem[] {
        const highlights = this.highlightManager.getHighlightsByFile(filePath);

        return highlights.map(h => {
            const preview = h.text.substring(0, 50).replace(/\n/g, ' ');
            const displayText = preview + (h.text.length > 50 ? '...' : '');

            const node = new HighlightTreeItem(
                displayText,
                vscode.TreeItemCollapsibleState.None,
                'highlight',
                filePath,
                h
            );

            // Set color indicator
            const colorName = this.getColorName(h.color);
            node.description = colorName;

            // Set tooltip with comment
            if (h.comment) {
                node.tooltip = `Line ${h.range.start.line + 1}\n\nComment: ${h.comment}\n\nText: ${h.text}`;
            } else {
                node.tooltip = `Line ${h.range.start.line + 1}\n\nText: ${h.text}`;
            }

            // Command to jump to highlight
            node.command = {
                command: 'codeHighlighter.jumpToHighlight',
                title: 'Jump to Highlight',
                arguments: [h]
            };

            // Icon based on comment
            node.iconPath = h.comment
                ? new vscode.ThemeIcon('comment', new vscode.ThemeColor('charts.yellow'))
                : new vscode.ThemeIcon('circle-filled', new vscode.ThemeColor('charts.blue'));

            // Context value for context menu
            node.contextValue = 'highlight';

            return node;
        });
    }

    private getColorName(color: string): string {
        const colorMap: { [key: string]: string } = {
            '#FFFF0066': 'Yellow',
            '#00FF0066': 'Green',
            '#FF00FF66': 'Pink',
            '#00FFFF66': 'Cyan',
            '#FFA50066': 'Orange'
        };
        return colorMap[color.toUpperCase()] || color;
    }
}

export class HighlightTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly type: 'file' | 'highlight',
        public readonly filePath?: string,
        public readonly highlight?: Highlight
    ) {
        super(label, collapsibleState);
    }
}
