// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_types.h


interface _VEC2 {
	x: number;
	y: number;
}
export class VEC2 implements _VEC2 {
	x: number;
	y: number;

	constructor(fx: number, fy: number) {
		this.x = fx;
		this.y = fy;
	}

	len(): number {
		return Math.sqrt(
			this.x*this.x + this.y*this.y
		);
	}
	
	/** + operator */
	__plus(val: VEC2): VEC2 {
		return new VEC2(val.x + this.x, val.y + this.y);
	}
	/** - operator */
	__minus(val: VEC2): VEC2 {
		return new VEC2(val.x - this.x, val.y - this.y);
	}
	/** == operator */
	__doubleEqual(val: VEC2): boolean {
		return val.x == this.x && val.y == this.y;
	}
	/** != operator */
	__notEqual(val: VEC2): boolean {
		return val.x != this.x || val.y != this.y;
	}

	/** += operator */
	__addAssign(val: VEC2): VEC2 {
		this.x += val.x;
		this.y += val.y;
		return this;
	}
	/** -= operator */
	__minusAssign(val: VEC2): VEC2 {
		this.x -= val.x;
		this.y -= val.y;
		return this;
	}
}

interface _VEC3 {
	x: number;
	y: number;
	z: number;
}
export class VEC3 implements _VEC3 {
	x: number;
	y: number;
	z: number;

	constructor(fx: number, fy: number, fz: number) {
		this.x = fx;
		this.y = fy;
		this.z = fz;
	}
	
	lenSq(): number {
		return this.x*this.x + this.y*this.y + this.z*this.z;
	}

	/** Unary - operator */
	__unaryNegation(): VEC3 {
		return new VEC3(-this.x, -this.y, -this.z);
	}

	/** + operator */
	__plus(val: VEC3): VEC3 {
		return new VEC3(
			this.x + val.x,
			this.y + val.y,
			this.z + val.z
		);
	}

	/** - operator */
	__minus(val: VEC3): VEC3 {
		return new VEC3(
			this.x - val.x,
			this.y - val.y,
			this.z - val.z
		);
	}

	/** * operator */
	__multiply(val: VEC3): VEC3 {
		return new VEC3(
			this.x * val.x,
			this.y * val.y,
			this.z * val.z
		);
	}

	/** / operator */
	__divide(val: VEC3): VEC3 {
		return new VEC3(
			this.x / val.x,
			this.y / val.y,
			this.z / val.z
		);
	}

	/** += operator */
	__addAssign(val: VEC3): VEC3 {
		this.x += val.x;
		this.y += val.y;
		this.z += val.z;
		return this;
	}

	/** += operator */
	__minusAssign(val: VEC3): VEC3 {
		this.x -= val.x;
		this.y -= val.y;
		this.z -= val.z;
		return this;
	}

	/** *= operator */
	__multiplyAssign(val: VEC3): VEC3 {
		this.x *= val.x;
		this.y *= val.y;
		this.z *= val.z;
		return this;
	}

	/** /= operator */
	__divideAssign(val: VEC3): VEC3 {
		this.x /= val.x;
		this.y /= val.y;
		this.z /= val.z;
		return this;
	}

	/** == operator */
	__doubleEqual(val: VEC3): boolean {
		return (
			this.x == val.x &&
			this.y == val.y &&
			this.z == val.z
		);
	}

	/** != operator */
	__notEqual(val: VEC3): boolean {
		return (
			this.x != val.x ||
			this.y != val.y ||
			this.z != val.z
		);
	}
}