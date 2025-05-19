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

	/** Length of the vector. */
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

	constructor()
	constructor(fx: number, fy: number, fz: number)
	constructor(fx?: number, fy?: number, fz?: number) {
		this.x = fx == undefined ? 0 : fx;
		this.y = fy == undefined ? 0 : fy;
		this.z = fz == undefined ? 0 : fz;
	}
	
	/** Squared length of the vector. */
	lenSq(): number {
		return this.x*this.x + this.y*this.y + this.z*this.z;
	}

	/** Unary - operator */
	__unaryNegation(): VEC3 {
		return new VEC3(-this.x, -this.y, -this.z);
	}

	/** + operator */
	__plus(val: VEC3): VEC3 {
		let out: VEC3 = new VEC3();
		VEC3.add(out, this, val);
		return out;
	}

	/** - operator */
	__minus(val: VEC3): VEC3 {
		let out: VEC3 = new VEC3();
		VEC3.sub(out, this, val);
		return out;
	}

	/** * operator */
	__multiply(val: number): VEC3 {
		let out: VEC3 = new VEC3();
		VEC3.scale(out, this, val);
		return out;
	}

	/** / operator */
	__divide(val: number): VEC3 {
		let r: number = 1 / val;
		return this.__multiply(r);
	}

	/** += operator */
	__addAssign(val: VEC3): VEC3 {
		VEC3.add(this, this, val);
		return this;
	}

	/** += operator */
	__minusAssign(val: VEC3): VEC3 {
		VEC3.sub(this, this, val);
		return this;
	}

	/** *= operator */
	__multiplyAssign(val: number): VEC3 {
		VEC3.scale(this, this, val);
		return this;
	}

	/** /= operator */
	__divideAssign(val: number): VEC3 {
		return this.__multiplyAssign(1 / val);
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

	/** Dot product of two 3-dimensional vectors. */
	static dot(v1: VEC3, v2: VEC3): number {
		return (
			v1.x * v2.x +
			v1.y * v2.y +
			v1.z * v2.z
		);
	}

	/** Linear interpolation of two 3-dimensional vectors. */
	static lerp(v1: VEC3, v2, VEC3, t: number) {
		return new VEC3(
			(v2.x - v1.x) * t + v1.x,
			(v2.y - v1.y) * t + v1.y,
			(v2.z - v1.z) * t + v1.z,
		);
	}

	/** Addition of two 3-dimensional vectors. */
	static add(out: VEC3, v1: VEC3, v2: VEC3) {
		out.x = v1.x + v2.x;
		out.y = v1.y + v2.y;
		out.z = v1.z + v2.z;
	}

	/** Subtraction of two 3-dimensional vectors. */
	static sub(out: VEC3, v1: VEC3, v2: VEC3) {
		out.x = v1.x - v2.x;
		out.y = v1.y - v2.y;
		out.z = v1.z - v2.z;
	}

	/** Multiplication of a 3-dimensional vector by a scalar. */
	static scale(out: VEC3, v1: VEC3, x: number) {
		out.x = v1.x * x;
		out.y = v1.y * x;
		out.z = v1.z * x;
	}
}
