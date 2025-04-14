// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/ut/ut_algorithm.h

// Value operations

export function max(t1: number, t2: number): number {
	return (t1 < t2) ? t2 : t1;
}

export function min(t1: number, t2: number): number {
	return (t1 > t2) ? t2 : t1;
}

export function clamp(value: number, min: number, max: number): number {
	return value > max ? max : (value < min ? min : value);
}

export function abs(x: number): number {
	return x < (0 as number) ? -(x as number) : x;
}

// Bit operations

export function bitExtract(bits: number, pos: number, len: number): number {
	let mask: number = (1 << len) - 1;
	return (bits >> pos) & mask;
}

export function testBit(number: number, pos: number) {
	return bitExtract(number, 8, pos);
}

// Rounding

export function roundUp(number: number, alignment: number): number {
    return (alignment + number - 1) & ~(alignment - 1);
}

export function roundDown(t: number, alignment: number) {
    return t & ~(alignment - 1);
}
