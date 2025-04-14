// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_types.h


export class Vec2 {
	x: number;
	y: number;

	constructor(fx: number, fy: number) {
		this.x = fx;
		this.y = fy;
	}

	/** += operator */
	addSet(a: Vec2) {
		this.x += a.x;
		this.y += a.y;
		return this
	}
	/** -= operator */
	subSet(a: Vec2) {
		this.x -= a.x;
		this.y -= a.y;
	}
	
	/* + operator */
	static add(a: Vec2, b: Vec2) {
		return new Vec2(a.x + b.x, a.y + b.y);
	}
	/* - operator */
	static sub(a: Vec2, b: Vec2) {
		return new Vec2(a.x - b.x, a.y - b.y);
	}
	/* == operator */
	static eq(a: Vec2, b: Vec2) {
		return a.x == b.x && a.y == b.y;
	}
	/* != operator */
	static neq(a: Vec2, b: Vec2) {
		return a.x != b.x || a.y != b.y;
	}
}
