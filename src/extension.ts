import * as vscode from 'vscode';
import markdownItContainer from 'markdown-it-container';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      // Alert blocks
      md.use(markdownItContainer, 'alert', {
        validate: () => true,
        render: (tokens: any, idx: number) => {
          return tokens[idx].nesting === 1 ? '<div class="alert">' : '</div>';
        }
      });

      // Spoiler blocks
      md.use(markdownItContainer, 'spoiler', {
        marker: '?',
        validate: () => true,
        render: (tokens: any, idx: number) => {
          // Логика для скрытия/раскрытия
          return tokens[idx].nesting === 1 ? 
            '<div class="spoiler"><details><summary>' : 
            '</summary></details></div>';
        }
      });

      return md;
    }
  };
}
export function deactivate() {}
