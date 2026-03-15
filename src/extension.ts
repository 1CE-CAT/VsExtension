import * as vscode from 'vscode';
import markdownItContainer from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji'

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
          if (tokens[idx].nesting === 1) {
            const title = tokens[idx].info.trim().replace(/^spoiler\s+/, '') || 'Спойлер';
            return `<details class="spoiler"><summary>${title}</summary>\n`;
          } else {
            return '</details>\n';
          }
        }
      });
      
      md.use(emoji);
      return md;
    }
  };
}
export function deactivate() {}
