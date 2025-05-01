// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/ut/ut_Color.h

import { GXColor } from "revolution/GX/types"

export class Color implements GXColor {
	r: number;
    g: number;
    b: number;
    a: number;

	constructor();
	constructor(color: number);
	constructor(color: GXColor);
	constructor(r: number, g: number, b: number, a?: number);
	constructor(r?: number | GXColor, g?: number, b?: number, a?: number) {
		if (r == undefined) {
			this.setU32(this.WHITE);
			return;
		}
		if (g == undefined) {
			if (typeof r == "number") {
				this.setU32(r);
				return;
			}
			// Assume GXColor
			this.set(r.r, r.g, r.b, r.a);
			return;
		}
		if (b == undefined) {
			throw new Error("Parameter 'b' must be provided!");
		}
		
		// Assume R, G, B are specified

		this.r = 'r' in (r as GXColor) ? (r as GXColor).r : (r as number);
		this.g = g;
		this.b = b;
		this.a = a == undefined ? 0xFF : a;
	}

	set(red: number, green: number, blue: number, alpha: number) {
		this.r = red;
		this.g = green;
		this.b = blue;
		this.a = alpha;
	}

	setU32(color: number) {
		this.set(
			color >> 24 & 0xFF,
			color >> 16 & 0xFF,
			color >> 8 & 0xFF,
			color & 0xFF
		);
	}

	static fromU32(color: number): Color {
		return new Color(color);
	}

    RED   = 0xFF0000FF;
    GREEN = 0x00FF00FF;
    BLUE  = 0x0000FFFF;

    CYAN    = 0x00FFFFFF;
    MAGENTA = 0xFF00FFFF;
    YELLOW  = 0xFFFF00FF;

    BLACK = 0x000000FF;
    GRAY  = 0x808080FF;
    WHITE = 0xFFFFFFFF;
}
