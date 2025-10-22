import * as vscode from 'vscode';

export class Logger {
    private static outputChannel: vscode.OutputChannel;

    static initialize() {
        this.outputChannel = vscode.window.createOutputChannel('Code Highlighter');
        this.log('Logger initialized');
    }

    static log(message: string, data?: any) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;

        console.log(logMessage, data || '');

        if (this.outputChannel) {
            this.outputChannel.appendLine(logMessage);
            if (data) {
                this.outputChannel.appendLine(JSON.stringify(data, null, 2));
            }
        }
    }

    static error(message: string, error?: any) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ERROR: ${message}`;

        console.error(logMessage, error || '');

        if (this.outputChannel) {
            this.outputChannel.appendLine(logMessage);
            if (error) {
                this.outputChannel.appendLine(error.stack || JSON.stringify(error, null, 2));
            }
        }
    }

    static show() {
        if (this.outputChannel) {
            this.outputChannel.show();
        }
    }

    static dispose() {
        if (this.outputChannel) {
            this.outputChannel.dispose();
        }
    }
}
