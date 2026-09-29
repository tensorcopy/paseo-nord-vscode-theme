import { describe, expect, it } from "vitest";

import contribute from "../index.client";

type ThemeCall = {
	id: string;
	name: string;
	appearance: "dark" | "light";
	colors: Record<string, string>;
};

function runPlugin() {
	const calls: ThemeCall[] = [];
	const client = {
		addTheme: (contribution: ThemeCall) => {
			calls.push(contribution);
			return () => {};
		},
	};
	const cleanup = contribute(client as never);
	return { calls, cleanup };
}

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

describe("plugin registration", () => {
	it("registers a dark and a light theme with lowercase-hyphen ids", () => {
		const { calls } = runPlugin();
		expect(calls).toHaveLength(2);
		expect(calls.map((c) => c.id)).toEqual(["nord-vscode", "nord-vscode-light"]);
		for (const call of calls) {
			expect(call.id).toMatch(/^[a-z0-9-]+$/);
			expect(call.name).toBeTruthy();
		}
	});

	it("labels the themes dark and light respectively", () => {
		const { calls } = runPlugin();
		expect(calls[0].appearance).toBe("dark");
		expect(calls[1].appearance).toBe("light");
	});

	it("returns a cleanup function", () => {
		const { cleanup } = runPlugin();
		expect(typeof cleanup).toBe("function");
	});
});

describe.each([
	["dark", 0],
	["light", 1],
])("registered %s palette", (_name, index) => {
	const palette = () => runPlugin().calls[index].colors;

	it("defines all required theme colors as 6-digit hex", () => {
		for (const key of REQUIRED) {
			expect(palette()[key], `missing color: ${key}`).to.match(/^#[0-9a-f]{6}$/i);
		}
	});

	it("keeps text readable (contrast >= 7 against background)", () => {
		const c = palette();
		expect(contrast(c.foreground, c.background)).toBeGreaterThanOrEqual(7);
	});

	it("keeps muted text readable (contrast >= 4.5)", () => {
		const c = palette();
		expect(contrast(c.mutedForeground, c.background)).toBeGreaterThanOrEqual(4.5);
	});

	it("keeps accent text readable (contrast >= 3, VS Code Nord link color)", () => {
		const c = palette();
		expect(contrast(c.accent, c.background)).toBeGreaterThanOrEqual(3);
	});

	it("foreground and mutedForeground remain distinct", () => {
		const c = palette();
		expect(c.mutedForeground).not.toBe(c.foreground);
	});
});

describe("dark palette matches the VS Code Nord theme source", () => {
	// Reference values: nordtheme/visual-studio-code themes/nord-color-theme.json
	const palette = () => runPlugin().calls[0].colors;

	it("uses the VS Code Nord surfaces (nord0 base, nord1 raised/controls)", () => {
		const c = palette();
		expect(c.background).toBe("#2e3440"); // editor.background
		expect(c.raised).toBe("#3b4252"); // statusBar.background
		expect(c.control).toBe("#3b4252"); // input.background
	});

	it("uses nord8 as the accent, the VS Code Nord link color", () => {
		expect(palette().accent).toBe("#88c0d0"); // textLink.foreground
	});

	it("keeps borders subtle at nord1, like VS Code Nord's panel.border", () => {
		const c = palette();
		expect(c.border).toBe("#3b4252"); // panel.border, input.border
		expect(contrast(c.border, c.background)).toBeLessThan(1.35);
	});

	it("keeps terminal bright black gray (nord3), matching ansiBrightBlack", () => {
		// `ring` also maps to terminal bright black and scrollbars in Paseo;
		// VS Code Nord's terminal.ansiBrightBlack is nord3, not a frost color.
		const c = palette();
		expect(c.ring).toBe("#4c566a"); // terminal.ansiBrightBlack
		expect(c.ring).not.toBe(c.accent);
	});

	it("uses nord4 for muted text, VS Code Nord's editor/terminal foreground", () => {
		expect(palette().mutedForeground).toBe("#d8dee9"); // editor.foreground
	});
});

describe("light palette (original; VS Code Nord is dark-only)", () => {
	const palette = () => runPlugin().calls[1].colors;

	it("uses nord10, the darkest frost, for readable links on white", () => {
		expect(palette().accent).toBe("#5e81ac");
	});

	it("keeps dividers subtle (nord5 border on white)", () => {
		const c = palette();
		expect(c.border).toBe("#e5e9f0");
		expect(contrast(c.border, c.background)).toBeLessThan(1.4);
	});

	it("keeps terminal bright black gray like the dark variant", () => {
		const c = palette();
		expect(c.ring).toBe("#4c566a");
		expect(c.ring).not.toBe(c.accent);
	});
});
