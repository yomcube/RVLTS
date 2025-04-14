// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/ut/ut_Rect.h

import { FSelect } from "nw4r/math/arithmetic";

export class Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;

    constructor(left?: number, top?: number, right?: number, bottom?: number) {
        this.left = left == undefined ? 0 : left;
        this.top = top == undefined ? 0 : top;
        this.right = right == undefined ? 0 : right;
        this.bottom = bottom == undefined ? 0 : bottom;
    }

    setWidth(width: number) {
        this.right = this.left + width;
    }
    getWidth(): number {
        return this.right - this.left;
    }

    setHeight(height: number) {
        this.bottom = this.top + height;
    }
    getHeight(): number {
        return this.bottom - this.top;
    }

    normalize() {
        let l: number = this.left;
        let r: number = this.right;
        let t: number = this.top;
        let b: number = this.bottom;

        this.left = FSelect(r - l, l, r);
        this.right = FSelect(r - l, r, l);
        this.top = FSelect(b - t, t, b);
        this.bottom = FSelect(b - t, b, t);
    }

    moveTo(x: number, y: number) {
        this.right = x + this.getWidth();
        this.left = x;
        this.bottom = y + this.getHeight();
        this.top = y;
    }
}
