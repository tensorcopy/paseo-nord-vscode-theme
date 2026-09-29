import { describe, expect, it } from "vitest";

import { NORD_DARK, NORD_LIGHT } from "../shared/themes";

type Rgb = { r: number; g: number; b: number };

function hex(hexColor: string): Rgb {
	const value = hexColor.replace("#", "");
	expect(value, `not a 6-digit hex color: ${hexColor}`).to.match(/^[0-9a-f]{6}$/i);
	return {
		r: Number.parseInt(value.slice(0, 2), 16),
		g: Number.parseInt(value.slice(2, 4), 16),
		b: Number.parseInt(value.slice(4, 6), 16),
	};
}

/** WCAG 2.1 relative-luminance contrast ratio, 1..21. */
function contrast(a: string, b: string): number {
	const channel = (c: number) => {
		const s = c / 255;
		return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
	};
	const lum = (x: Rgb) =>
		0.2126 * channel(x.r) + 0.7152 * channel(x.g) + 0.0722 * channel(x.b);
	const [la, lb] = [lum(hex(a)), lum(hex(b))].sort((x, y) => y - x);
	return (la + 0.05) / (lb + 0.05);
}

const REQUIRED = [
	"background",
	"foreground",
	"raised",
	"control",
	"border",
	"accent",
	"mutedForeground",
	"ring",
] as const;

describe.each([
	["dark", NORD_DARK],
	["light", NORD_LIGHT],
])("nord %s palette (VS Code Nord reference)", (_name, palette) => {
	it("defines all required theme colors as hex", () => {
		for (const key of REQUIRED) {
			expect(palette[key], `missing color: ${key}`).to.match(/^#[0-9a-f]{6}$/i);
		}
	});

	it("keeps text readable (contrast >= 7 against background)", () => {
		expect(contrast(palette.foreground, palette.background)).toBeGreaterThanOrEqual(7);
	});

	it("keeps muted text readable (contrast >= 4.5)", () => {
		expect(contrast(palette.mutedForeground, palette.background)).toBeGreaterThanOrEqual(4.5);
	});

	it("keeps accent text readable (contrast >= 3, matching VS Code Nord links)", () => {
		expect(palette.accent, "accent color missing").toBeDefined();
		expect(contrast(palette.accent!, palette.background)).toBeGreaterThanOrEqual(3);
	});

	it("foreground and mutedForeground remain distinct", () => {
		expect(palette.mutedForeground).not.toBe(palette.foreground);
	});
});

describe("dark palette matches the VS Code Nord theme source", () => {
	it("link/accent color is nord8, the VS Code textLink.foreground", () => {
		// nordtheme/visual-studio-code: textLink.foreground = #88c0d0
		expect(NORD_DARK.accent).toBe("#88c0d0");
	});

	it("accent is neither the port's orange nor Obsidian's purple", () => {
		expect(NORD_DARK.accent).not.toBe("#d08770");
		expect(NORD_DARK.accent).not.toBe("#b48ead");
	});

	it("surfaces use the VS Code Nord structure (nord0 base, nord1 raised/controls)", () => {
		expect(NORD_DARK.background).toBe("#2e3440"); // editor.background
		expect(NORD_DARK.raised).toBe("#3b4252"); // statusBar.background
		expect(NORD_DARK.control).toBe("#3b4252"); // input.background
	});

	it("section dividers are subtle, like VS Code Nord's nord1 borders", () => {
		// VS Code Nord: panel.border / input.border / focusBorder = #3b4252
		// (contrast 1.19 on nord0). The port's nord2 (1.32) and our earlier
		// nord3 (1.69) read as heavy dividers, so border stays at nord1 and
		// focus visibility is carried by the nord8 ring instead.
		expect(NORD_DARK.border).toBe("#3b4252");
		expect(contrast(NORD_DARK.border, NORD_DARK.background)).toBeLessThan(1.35);
	});

	it("raised surfaces still separate from background by fill (VS Code's tab model)", () => {
		// VS Code Nord: tab.activeBackground #3b4252 on inactive #2e3440.
		expect(contrast(NORD_DARK.raised, NORD_DARK.background)).toBeGreaterThan(1.15);
	});

	it("focus visibility is carried by the nord8 ring, not the border", () => {
		// badge.background / list.activeSelectionBackground = #88c0d0
		expect(NORD_DARK.ring).toBe("#88c0d0");
		expect(contrast(NORD_DARK.ring, NORD_DARK.background)).toBeGreaterThanOrEqual(3);
	});
});

describe("light palette (no VS Code reference; nord10 stands in for nord8)", () => {
	it("uses the darker frost shade for readable links on white", () => {
		expect(NORD_LIGHT.accent).toBeDefined();
		expect(NORD_LIGHT.accent).toBe("#5e81ac"); // nord10
		expect(contrast(NORD_LIGHT.accent!, NORD_LIGHT.background)).toBeGreaterThanOrEqual(3);
	});

	it("keeps dividers subtle (nord5 border on white)", () => {
		expect(NORD_LIGHT.border).toBe("#e5e9f0"); // nord5
		expect(contrast(NORD_LIGHT.border, NORD_LIGHT.background)).toBeLessThan(1.4);
	});
});
