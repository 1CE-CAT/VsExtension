import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "helloworld" is now active!');

	const disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		
		vscode.window.showInformationMessage('Hello World from MarkDownSBEx!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
