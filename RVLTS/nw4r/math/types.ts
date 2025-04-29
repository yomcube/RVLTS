// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_types.h


export class VEC2 {
	x: number;
	y: number;

	constructor(fx: number, fy: number) {
		this.x = fx;
		this.y = fy;
	}

	/** += operator */
	addSet(a: VEC2) {
		this.x += a.x;
		this.y += a.y;
		return this
	}
	/** -= operator */
	subSet(a: VEC2) {
		this.x -= a.x;
		this.y -= a.y;
	}
	
	/* + operator */
	static add(a: VEC2, b: VEC2) {
		return new VEC2(a.x + b.x, a.y + b.y);
	}
	/* - operator */
	static sub(a: VEC2, b: VEC2) {
		return new VEC2(a.x - b.x, a.y - b.y);
	}
	/* == operator */
	static eq(a: VEC2, b: VEC2) {
		return a.x == b.x && a.y == b.y;
	}
	/* != operator */
	static neq(a: VEC2, b: VEC2) {
		return a.x != b.x || a.y != b.y;
	}
}
