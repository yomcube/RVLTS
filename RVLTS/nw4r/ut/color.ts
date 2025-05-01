// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/ut/ut_Color.h

import { GXColor } from "revolution/GX/types"

export class Color : GXColor {
	constructor(r: number | GXColor, g: number?, b: number?, a: number?) {
		
	}

	fromU32(color: number) {
		set(
			color >> 24 & 0xFF,
			color >> 16 & 0xFF,
			color >> 8 & 0xFF,
			color & 0xFF
		);
	}

	set(red: number, green: number, blue: number, alpha: number) {
		this.r = red;
		this.g = green;
		this.b = blue;
		this.a = alpha;
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
