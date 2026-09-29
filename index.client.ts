import type { PluginClientContext } from "@getpaseo/plugin/client";

import { NORD_DARK, NORD_LIGHT } from "./shared/themes";

// Nord for Paseo, ported from the official VS Code Nord theme
// (nordtheme/visual-studio-code, themes/nord-color-theme.json).
//
// Design notes:
//   - accent nord8 #88c0d0 — VS Code Nord's textLink.foreground /
//     badge.background / activeSelection color; links and focus accents
//     read frost blue, like the editor
//   - borders nord1 #3b4252, the subtle panel.border/input.border value;
//     surface separation is done by raised fills, not drawn lines
//   - focus visibility is carried by the nord8 ring, mirroring VS Code
//     Nord's frost selection accents
export default function contribute(client: PluginClientContext) {
	client.addTheme({
		id: "nord-vscode",
		name: "Nord (VS Code)",
		appearance: "dark",
		colors: NORD_DARK,
	});

	client.addTheme({
		id: "nord-vscode-light",
		name: "Nord (VS Code) Light",
		appearance: "light",
		colors: NORD_LIGHT,
	});

	return () => {};
}
