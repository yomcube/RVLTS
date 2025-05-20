// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_types.h


//////////////
//// VEC2 ////
//////////////

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


//////////////
//// VEC3 ////
//////////////

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


///////////////
//// MTX33 ////
///////////////

type _MTX33_a = [
	number, number, number,
	number, number, number,
	number, number, number
];
type _MTX33_m = [
	[number, number, number],
	[number, number, number],
	[number, number, number]
];
function und0(x: number | undefined): number {
	return x == undefined ? 0 : x;
}
export class MTX33 {
	_00: number; _01: number; _02: number;
	_10: number; _11: number; _12: number;
	_20: number; _21: number; _22: number;

	constructor()
	constructor(
		f00: number, f01: number, f02: number,
		f10: number, f11: number, f12: number,
		f20: number, f21: number, f22: number
	)
	constructor(
		f00?: number, f01?: number, f02?: number,
		f10?: number, f11?: number, f12?: number,
		f20?: number, f21?: number, f22?: number
	) {
		this._00 = und0(f00); this._01 = und0(f01); this._02 = und0(f02);
		this._10 = und0(f10); this._11 = und0(f11); this._12 = und0(f12);
		this._20 = und0(f20); this._21 = und0(f21); this._22 = und0(f22);
	}

	// Unions don't work the same in TypeScript and C, so getters
	// and setters are used to replicate the functionality.

	get a(): _MTX33_a {
		return [
			this._00, this._01, this._02,
			this._10, this._11, this._12,
			this._20, this._21, this._22
		];
	}
	set a(a: _MTX33_a) {
		this._00 = a[0]; this._01 = a[1]; this._02 = a[2];
		this._10 = a[3]; this._11 = a[4]; this._12 = a[5];
		this._20 = a[6]; this._21 = a[7]; this._22 = a[8];
	}

	get m(): _MTX33_m {
		return [
			[this._00, this._01, this._02],
			[this._10, this._11, this._12],
			[this._20, this._21, this._22]
		];
	}
	set m(m: _MTX33_m) {
		this._00 = m[0][0]; this._01 = m[0][1]; this._02 = m[0][2];
		this._10 = m[1][0]; this._11 = m[1][1]; this._12 = m[1][2];
		this._20 = m[2][0]; this._21 = m[2][1]; this._22 = m[2][2];
	}
}
