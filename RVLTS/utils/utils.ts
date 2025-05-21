export function assert(b: boolean, msg?: string) {
	if (!b) {
		let m = msg == undefined ? '.' : ': ' + msg
		throw new Error(`Assert failed${m}`);
	}
}

/** Returns 0 if x is undefined, otherwise returns x */
export function und0(x: number | undefined): number {
	return x == undefined ? 0 : x;
}

export function std_swap(a: any, b: any): [any, any] {
	return [b, a];
}
