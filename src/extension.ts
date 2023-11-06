// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'node:child_process'
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function createFile(name: string, uri: vscode.Uri) {
	const fileName = name
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
}
async function handleFiles(uri: vscode.Uri) {
	//syntax files: a b c ext:h cpp 
	const input = await vscode.window.showInputBox({ prompt: "files: a b c  ext: h cpp", value: "files: ext:" }) || ""
	const filesMatch = input.match(/files:\s*(.*?)\s*ext:/);
	const extMatch = input.match(/ext:\s*(.*)/);

	if (filesMatch && extMatch) {
		const files = filesMatch[1].split(' ').filter(file => file.length > 0);
		const ext = extMatch[1].split(' ').filter(extension => extension.length > 0);
		console.log('files=', files);
		console.log('ext=', ext);
		//create file
		for (const file of files) {
			for (const extension of ext) {
				const filename = `${file}.${extension}`;
				createFile(filename, uri)
			}
		}
	} else {
		vscode.window.showErrorMessage('Invalid input format.');
	}

}
export function activate(context: vscode.ExtensionContext) {
	let readme = vscode.commands.registerCommand('abhi.create.readme.md', (uri: vscode.Uri) => {
		createFile("README.md", uri)
	});
	//gitignore
	let gitignore = vscode.commands.registerCommand('abhi.create.gitignore', (uri: vscode.Uri) => {
		createFile(".gitignore", uri)
	});
	//CMakeLists.txt
	let cmakeLists = vscode.commands.registerCommand('abhi.create.cmakelists.txt', (uri: vscode.Uri) => {
		createFile("CMakeLists.txt", uri)
	});
	let files = vscode.commands.registerCommand('abhi.create.files', (uri: vscode.Uri) => {
		handleFiles(uri)
	});
	//open with 
	let openWithCode = vscode.commands.registerCommand('abhi.open.with.code', (uri: vscode.Uri) => {
		exec("code " + uri.path)
	});
	//adding
	context.subscriptions.push(readme)
	context.subscriptions.push(gitignore)
	context.subscriptions.push(cmakeLists)
	context.subscriptions.push(openWithCode);
	context.subscriptions.push(files);

	context.subscriptions.push(vscode.commands.registerCommand("abhi.test", () => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		vscode.window.showInformationMessage("abhi test")
	}))

}

// This method is called when your extension is deactivated
export function deactivate() { }
