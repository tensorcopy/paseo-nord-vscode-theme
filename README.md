# paseo-nord-vscode-theme

[Nord](https://www.nordtheme.com) theme for [Paseo](https://paseo.sh), ported from the official VS Code Nord theme ([nordtheme/visual-studio-code](https://github.com/nordtheme/visual-studio-code)).

The palette maps the VS Code Nord theme's workbench colors onto Paseo's 8 theme seed colors:

| Paseo role | Color | VS Code Nord source |
|---|---|---|
| `background` | `#2e3440` nord0 | `editor.background` / `activityBar.background` |
| `raised` | `#3b4252` nord1 | `statusBar.background` / `tab.activeBackground` |
| `control` | `#3b4252` nord1 | `input.background` |
| `border` | `#3b4252` nord1 | `panel.border` / `input.border` |
| `accent` | `#88c0d0` nord8 | `textLink.foreground` / `badge.background` / `list.activeSelectionBackground` |
| `ring` | `#88c0d0` nord8 | the frost selection/focus accent |
| `foreground` | `#eceff4` nord6 | UI text |
| `mutedForeground` | `#d8dee9` nord4 | `editor.foreground` / `terminal.foreground` |

A light variant uses nord10 (`#5e81ac`) as the accent so links stay frost blue and readable on white; VS Code Nord itself is dark-only.

## Install

```bash
paseo plugin install https://github.com/tensorcopy/paseo-nord-vscode-theme.git
```

## Activate

1. Open **Settings → Appearance**.
2. Set **Theme** to **Nord (VS Code)** (dark) or **Nord (VS Code) Light**.

## Develop

```bash
npm install
npm run typecheck
npm test
```

The test suite validates the palette with WCAG 2.1 contrast-ratio math and asserts the values against the VS Code Nord theme source.

## Attribution

- Palette: [Nord](https://www.nordtheme.com) by [arcticicestudio / nordtheme](https://github.com/nordtheme), via the [VS Code Nord theme](https://github.com/nordtheme/visual-studio-code) (`themes/nord-color-theme.json`).
- Built for the [Paseo](https://paseo.sh) plugin API.

## License

[MIT](./LICENSE)
