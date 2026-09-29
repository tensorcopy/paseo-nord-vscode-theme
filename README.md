# paseo-nord-vscode-theme

[Nord](https://www.nordtheme.com) theme for [Paseo](https://paseo.sh), unofficially ported from the VS Code Nord theme ([nordtheme/visual-studio-code](https://github.com/nordtheme/visual-studio-code)). Not affiliated with or endorsed by the Nord project.

For the Nord theme ported from the Obsidian theme of the same palette, see [`paseo-obsidian-nord-theme`](https://paseo.cafe/plugins/paseo-obsidian-nord-theme) — a separate plugin with different accent, border, and link colors.

The palette maps the VS Code Nord theme's workbench colors onto Paseo's 8 theme seed colors:

| Paseo role | Color | VS Code Nord source |
|---|---|---|
| `background` | `#2e3440` nord0 | `editor.background` / `activityBar.background` |
| `raised` | `#3b4252` nord1 | `statusBar.background` / `tab.activeBackground` |
| `control` | `#3b4252` nord1 | `input.background` |
| `border` | `#3b4252` nord1 | `panel.border` / `input.border` / `focusBorder` |
| `accent` | `#88c0d0` nord8 | `textLink.foreground` / `badge.background` / `list.activeSelectionBackground` |
| `ring` | `#4c566a` nord3 | `terminal.ansiBrightBlack` — note: Paseo maps `ring` to focus rings, scrollbars, **and terminal bright black**, so it is kept gray like the editor's dim text rather than a frost color |
| `foreground` | `#eceff4` nord6 | UI text |
| `mutedForeground` | `#d8dee9` nord4 | `editor.foreground` / `terminal.foreground` |

## Install

From npm (Paseo 0.10.1+):

```bash
paseo plugin install npm:paseo-nord-vscode-theme
```

Or from this repository:

```bash
paseo plugin install https://github.com/tensorcopy/paseo-nord-vscode-theme.git
```

## Activate

1. Open **Settings → Appearance**.
2. Set **Theme** to **Nord (VS Code)** (dark) or **Nord (VS Code) Light**.

## Caveats

- The light variant is original: VS Code Nord is dark-only, so the light palette uses nord10 (`#5e81ac`) as the accent to keep links frost blue and readable on white. Its link contrast is 4.03:1, just under WCAG AA 4.5 for normal text — Nord has no darker frost shade.
- Borders are deliberately subtle (nord1/nord5), matching VS Code Nord's approach of separating surfaces by fill rather than by drawn lines. In light mode, input edges against the control fill are intentionally faint.
- `ring` is a compromise: Paseo uses one color for focus rings, scrollbars, and terminal bright black. It follows `terminal.ansiBrightBlack` (nord3) so terminal dim text stays gray.

## Develop

```bash
npm install
npm run typecheck
npm test
```

The tests register the themes through a mock Paseo client and assert the palettes against values from the VS Code Nord theme source, plus WCAG 2.1 contrast-ratio checks.

## Attribution

- Palette: [Nord](https://www.nordtheme.com) by Sven Greb ([arcticicestudio / nordtheme](https://github.com/nordtheme)), via the MIT-licensed [VS Code Nord theme](https://github.com/nordtheme/visual-studio-code) (`themes/nord-color-theme.json`). Only color values are reused.
- Built for the [Paseo](https://paseo.sh) plugin API.

## License

[MIT](./LICENSE)
