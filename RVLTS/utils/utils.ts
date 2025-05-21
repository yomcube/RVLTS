export function assert(b: boolean, msg?: string) {
	if (!b) {
		let m = msg == undefined ? '.' : ': ' + msg
		throw new Error(`Assert failed${m}`);
	}
}

export function und0(x: number | undefined): number {
	return x == undefined ? 0 : x;
}
