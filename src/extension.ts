// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let createREADME = vscode.commands.registerCommand('vscode.extension.example.createREADME', (uri: vscode.Uri) => {
		const fileName = "README.md"
		const fileUri = vscode.Uri.joinPath(uri, fileName);
		// Check if the file already exists
		vscode.workspace.fs.stat(fileUri).then(
			() => {
				vscode.window.showErrorMessage(fileName + ' already exists');
			},
			(error) => {
				// Create the file since it doesn't exist
				vscode.workspace.fs.writeFile(fileUri, new Uint8Array(0)).then(() => {
					vscode.window.showInformationMessage(`'${fileName}' created`);
				}, (error) => {
					vscode.window.showErrorMessage(`Failed to create the file: ${error}`);
				});
			}
		);
	});
	context.subscriptions.push(createREADME);

	//gitignore
	let create_gitignore = vscode.commands.registerCommand('vscode.extension.example.create.gitignore', (uri: vscode.Uri) => {
		const fileName = ".gitignore";
		const fileUri = vscode.Uri.joinPath(uri, fileName);
		// Check if the file already exists
		vscode.workspace.fs.stat(fileUri).then(() => {
			vscode.window.showErrorMessage(fileName + ' already exists');
		}, (error) => {
			// Create the file since it doesn't exist
			vscode.workspace.fs.writeFile(fileUri, new Uint8Array(0)).then(() => {
				vscode.window.showInformationMessage(`'${fileName}' created`);
			}, (error) => {
				vscode.window.showErrorMessage(`Failed to create the file: ${error}`);
			});
		});
	});
	context.subscriptions.push(create_gitignore);
	//CMakeLists.txt
	let create_cmakeLists_txt = vscode.commands.registerCommand('vscode.extension.example.create.CMakeLists.txt', (uri: vscode.Uri) => {
		const fileName = "CMakeLists.txt";
		const fileUri = vscode.Uri.joinPath(uri, fileName);
		// Check if the file already exists
		vscode.workspace.fs.stat(fileUri).then(() => {
			vscode.window.showErrorMessage(fileName + ' already exists');
		}, (error) => {
			// Create the file since it doesn't exist
			vscode.workspace.fs.writeFile(fileUri, new Uint8Array(0)).then(() => {
				vscode.window.showInformationMessage(`'${fileName}' created`);
			}, (error) => {
				vscode.window.showErrorMessage(`Failed to create the file: ${error}`);
			});
		});
	});
	context.subscriptions.push(create_cmakeLists_txt);

}

// This method is called when your extension is deactivated
export function deactivate() { }
