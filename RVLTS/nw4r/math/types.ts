// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_types.h


export class VEC2 {
	x: number;
	y: number;

	constructor(fx: number, fy: number) {
		this.x = fx;
		this.y = fy;
	}
	
	/** + operator */
	__plus(val: VEC2) {
		return new VEC2(val.x + this.x, val.y + this.y);
	}
	/** - operator */
	__minus(val: VEC2) {
		return new VEC2(val.x - this.x, val.y - this.y);
	}
	/** == operator */
	__doubleEqual(val: VEC2) {
		return val.x == this.x && val.y == this.y;
	}
	/** != operator */
	__notEqual(val: VEC2) {
		return val.x != this.x || val.y != this.y;
	}

	/** += operator */
	__addAssign(val: VEC2) {
		this.x += val.x;
		this.y += val.y;
		return this;
	}
	/** -= operator */
	__minusAssign(val: VEC2) {
		this.x -= val.x;
		this.y -= val.y;
		return this;
	}
}
