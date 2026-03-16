import * as vscode from 'vscode';
import markdownItContainer from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji';

export function activate(context: vscode.ExtensionContext) {
  return {
    extendMarkdownIt(md: any) {
      // Alert-блоки
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

      md.use(emoji);

      const originalFence = md.renderer.rules.fence;
      md.renderer.rules.fence = (tokens: any, idx: number, options: any, env: any, self: any) => {
        const token = tokens[idx];
        const lang = token.info.trim();

        if (lang === 'mermaid') {
          return `<div class="mermaid">${token.content}</div>`;
        }

        if (originalFence) {
          return originalFence(tokens, idx, options, env, self);
        } else {
          return self.renderToken(tokens, idx, options, env, self);
        }
      };

      return md;
    }
  };
}

export function deactivate() {}