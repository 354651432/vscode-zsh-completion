const vscode = require('vscode');

function detect() {
	if (vscode.window.activeTextEditor.document.languageId != 'plaintext') {
		return
	}
	const line = vscode.window.activeTextEditor.document.lineAt(0).text
	if (line && line.match(/^#compdef|^#autoload/)) {
		vscode.languages
			.setTextDocumentLanguage(vscode.window.activeTextEditor.document, "shellscript")
			.catch(err => {
				console.error(err)
			})
	}
}

function activate() {
	vscode.window.onDidChangeVisibleTextEditors(() => {
		detect()
	})
	detect()
}

exports.activate = activate;

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
