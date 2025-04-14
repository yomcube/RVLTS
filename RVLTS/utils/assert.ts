
function assert(b: boolean, msg?: string) {
	if (!b) {
		let m = msg == undefined ? '.' : ': ' + msg
		throw new Error(`Assert failed${m}`);
	}
}

export {
	assert
};
