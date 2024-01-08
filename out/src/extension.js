'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const vscode_1 = require("vscode");
function getNames(text) {
    let names = {};
    let lines = text.split(/\n/);
    var n = 0;
    lines.forEach(l => {
        n++;
        let ix = l.indexOf(":");
        if (ix >= 1) {
            let sub = l.substr(0, ix);
            names[sub] = (9999999 - n).toString();
        }
    });
    let ret = [];
    for (var k in names)
        ret.push({ name: k, order: names[k] });
    return ret;
}
class CompletionItemProvider {
    provideCompletionItems(doc, pos, token) {
        let text = doc.getText(new vscode_1.Range(new vscode_1.Position(0, 0), pos));
        let line = doc.getText(new vscode_1.Range(new vscode_1.Position(pos.line, 0), new vscode_1.Position(pos.line, pos.character)));
        let char0 = line.charAt(0);
        if (pos.character == 1 && char0 >= 'a' && char0 <= 'z') {
            let names = getNames(text);
            return names.map(x => {
                let ci = new vscode_1.CompletionItem(x.name, vscode_1.CompletionItemKind.Variable);
                ci.sortText = x.order;
                ci.range = new vscode_1.Range(new vscode_1.Position(pos.line, 0), pos);
                ci.commitCharacters = [" "];
                return ci;
            });
        }
        return [];
    }
    resolveCompletionItem(ci, token) {
        ci.insertText = ci.label + ":";
        return ci;
    }
}
const MODE = { language: 'subtl', scheme: 'file' };
function activate(context) {
    console.log('SubTL Active');
    vscode.languages.getLanguages();
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(MODE, new CompletionItemProvider()));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map