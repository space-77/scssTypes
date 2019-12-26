// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { dirname, join } from 'path';
import { watch, mkdir , writeFileSync, unlink } from 'fs';
import { scssFormat, getScssKey, writeFile, deleteTypeFile } from './common';
// import { pathToFileURL } from 'url';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// var WordCounter = require('./test');

	// var counter = new WordCounter(vscode);
	// context.subscriptions.push(counter);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "scss-types" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	// vscode.window.showInformationMessage('Hello World!');
	// });
	const scssTypes = vscode.commands.registerCommand('extension.scssTypes', () => {
		const document =  vscode.window.activeTextEditor?.document
		if (!document) return
		const { fileName, languageId } = document
		if (languageId !== 'scss') return
		const file = watch(fileName, 'utf-8')
		file.addListener('change', () => {
			let text = document.getText()
			let keys = scssFormat(text)
			if (!keys) {
				deleteTypeFile(fileName)
				return
			}
			const content = getScssKey(keys).join('\n')
			writeFile(content, fileName)
		})
		file.addListener('close', () => {
			console.log('close');
			file.close()
		})
	});
	
	context.subscriptions.push(scssTypes);
}

// this method is called when your extension is deactivated
export function deactivate() {}
