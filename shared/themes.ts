import type { PluginThemeColors } from "@getpaseo/plugin";

// Nord theme for Paseo, referenced from the official VS Code Nord theme
// (nordtheme/visual-studio-code, themes/nord-color-theme.json).
//
// Mapping of VS Code Nord colors to Paseo's 8 seed colors:
//   background  <- editor/activityBar/sideBar/tabStrip background = nord0
//   raised      <- statusBar/notification/input background        = nord1
//   control     <- input.background / notification.background    = nord1
//   foreground  <- nord6 (UI text; VS Code editor text is nord4 -> muted)
//   mutedForeground <- nord4, the color VS Code Nord uses for essentially
//     all text (editor.foreground, sideBar.foreground, terminal.foreground)
//   accent      <- nord8: textLink.foreground, badge.background,
//     list.activeSelectionBackground, button.background
//   border      <- nord1: panel.border / input.border / focusBorder are all
//     #3b4252 in VS Code Nord — deliberately subtle dividers, with surface
//     separation done by raised fills instead of strong borders
//   ring        <- nord8 (focus/selection accent)
export const NORD_DARK: PluginThemeColors = {
	background: "#2e3440", // nord0
	foreground: "#eceff4", // nord6
	raised: "#3b4252", // nord1
	control: "#3b4252", // nord1
	border: "#3b4252", // nord1 — VS Code Nord panel.border/input.border/focusBorder
	accent: "#88c0d0", // nord8 — VS Code Nord textLink.foreground
	mutedForeground: "#d8dee9", // nord4
	ring: "#88c0d0", // nord8
};

// VS Code Nord has no light variant; this light palette keeps the same
// roles with the darker frost shade (nord10) standing in for nord8 so
// links and accents stay blue and readable on white. Borders use nord5,
// the light-mode counterpart of the subtle nord1 divider.
export const NORD_LIGHT: PluginThemeColors = {
	background: "#ffffff",
	foreground: "#2e3440", // nord0 — badge.foreground's text-on-frost pairing
	raised: "#eceff4", // nord6
	control: "#eceff4", // nord6
	border: "#e5e9f0", // nord5 — subtle light-mode divider
	accent: "#5e81ac", // nord10 — light-mode frost for links/accents
	mutedForeground: "#4c566a", // nord3
	ring: "#5e81ac", // nord10
};
