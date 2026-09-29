import type { PluginClientContext } from "@getpaseo/plugin/client";

// Nord theme for Paseo, unofficially ported from the VS Code Nord theme
// by Sven Greb (nordtheme/visual-studio-code, MIT). See README.md for the
// full color-mapping table and caveats.
export default function contribute(client: PluginClientContext) {
	client.addTheme({
		id: "nord-vscode",
		name: "Nord (VS Code)",
		appearance: "dark",
		colors: {
			background: "#2e3440", // nord0 — editor.background, activityBar.background
			foreground: "#eceff4", // nord6 — UI text
			raised: "#3b4252", // nord1 — statusBar.background, tab.activeBackground
			control: "#3b4252", // nord1 — input.background
			border: "#3b4252", // nord1 — panel.border, input.border, focusBorder
			accent: "#88c0d0", // nord8 — textLink.foreground, badge.background, activeSelection
			mutedForeground: "#d8dee9", // nord4 — editor.foreground, terminal.foreground
			ring: "#4c566a", // nord3 — terminal.ansiBrightBlack; also focus rings/scrollbars
		},
	});

	client.addTheme({
		id: "nord-vscode-light",
		name: "Nord (VS Code) Light",
		appearance: "light",
		colors: {
			background: "#ffffff",
			foreground: "#2e3440", // nord0
			raised: "#eceff4", // nord6
			control: "#eceff4", // nord6
			border: "#e5e9f0", // nord5
			accent: "#5e81ac", // nord10 — darker frost so links stay readable on white
			mutedForeground: "#4c566a", // nord3
			ring: "#4c566a", // nord3
		},
	});

	return () => {};
}
