// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_triangular.h
//   https://github.com/kiwi515/ogws/blob/master/src/nw4r/math/math_triangular.cpp

import { FAbs } from "nw4r/math/arithmetic";
import { pi } from "nw4r/math/constants";

function idxToFIdx(x: number): number {
	return x / 256;
}
/** Convert degrees -> lookup-table index */
export function degToFIdx(x: number): number {
	return x * (256 / 360);
}
/** Convert lookup-table index -> degrees */
export function fIdxToDeg(x: number): number {
	return x * (360 / 256);
}

/** Convert radians -> lookup-table index */
export function radToFIdx(x: number): number {
	return x * (pi / 180);
}
/** Convert lookup-table index -> radians */
export function fIdxToRad(x: number): number {
	return x * (180 / pi);
}

/** Convert degrees -> radians */
export function degToRad(x: number): number {
	return x * ( pi / 180 );
}
/** Convert radians -> degrees */
export function radToDeg(x: number): number {
	return x * ( 180 / pi );
}

// Sine functions

export function sinFIdx(fidx: number): number {
	let abs_fidx: number = FAbs(fidx);

	while (abs_fidx >= 65536) {
		abs_fidx -= 65536;
	}

	let whole: number = Math.floor(abs_fidx);
	let frac: number = abs_fidx - whole;

	let sin: number = sSinCosTbl[whole & 0xFF].sin_val +
		frac * sSinCosTbl[whole & 0xFF].sin_delta;

	return (fidx < 0) ? -sin : sin;
}
export function sinIdx(idx: number): number {
	return sinFIdx(idxToFIdx(idx));
}
export function sinDeg(idx: number): number {
	return sinFIdx(degToFIdx(idx));
}
export function sinRad(idx: number): number {
	return sinFIdx(radToFIdx(idx));
}

// Cosine functions

export function cosFIdx(fidx: number): number {
	let abs_fidx: number = FAbs(fidx);

	while (abs_fidx >= 65536) {
		abs_fidx -= 65536;
	}

	let whole: number = Math.floor(abs_fidx);
	let frac: number = abs_fidx - whole;

	let sin: number = sSinCosTbl[whole & 0xFF].cos_val +
		frac * sSinCosTbl[whole & 0xFF].cos_delta;

	return (fidx < 0) ? -sin : sin;
}
export function cosDeg(idx: number): number {
	return cosFIdx(degToFIdx(idx));
}
export function cosRad(idx: number): number {
	return cosFIdx(radToFIdx(idx));
}

// Tangent functions

export function tanFIdx(fidx: number): number {
	return Math.tan(fIdxToRad(fidx));
}
export function tanDeg(deg: number): number {
	return Math.tan(degToRad(deg));
}
export function tanRad(rad: number): number {
	return Math.tan(rad);
}

// Sine and cosine functions

export function sinCosFIdx(fidx: number): [number, number] {
	let abs_fidx: number = FAbs(fidx);

	while (abs_fidx >= 65536) {
		abs_fidx -= 65536;
	}

	let whole: number = Math.floor(abs_fidx);
	let frac: number = abs_fidx - whole;

	let sin: number = sSinCosTbl[whole & 0xFF].sin_val +
		frac * sSinCosTbl[whole & 0xFF].sin_delta;
	let cos: number = sSinCosTbl[whole & 0xFF].cos_val +
		frac * sSinCosTbl[whole & 0xFF].cos_delta;
	
	return [ (fidx < 0) ? -sin : sin, cos ];
}
export function sinCosDeg(deg: number): [number, number] {
	return sinCosFIdx(degToFIdx(deg));
}
export function sinCosRad(rad: number): [number, number] {
	return sinCosFIdx(radToFIdx(rad));
}

// Arc-tangent functions

function atanFIdx_(x: number): number {
    x *= 32;

    let whole: number = Math.trunc(x);
    let frac: number = x - whole;

    let atan: number = sArcTanTbl[whole].atan_val + frac * sArcTanTbl[whole].atan_delta;

    return atan;
}

export function atanFIdx(x: number): number {
    if (x >= 0) {
        if (x > 1) {
            return 64 - atanFIdx_(1 / x);
        } else {
            return atanFIdx_(x);
        }
    } else {
        if (x < -1) {
            return atanFIdx_(-1 / x) + -64;
        } else {
            return -atanFIdx_(-x);
        }
    }
}
export function atanDeg(x: number): number {
	return fIdxToDeg(atanFIdx(x));
}
export function atanRad(x: number): number {
	return fIdxToRad(atanFIdx(x));
}

// Arc-tangent (2-argument) functions

export function atan2FIdx(y: number, x: number): number {
    let a: number, b: number, c: number;
    let minus: boolean;

    if (x == 0 && y == 0) {
        return 0;
    }

    if (x >= 0) {
        if (y >= 0) {
            if (x >= y) {
                a = x;
                b = y;
                c = 0;
                minus = false;
            } else {
                a = y;
                b = x;
                c = 64;
                minus = true;
            }
        } else {
            if (x >= -y) {
                a = x;
                b = -y;
                c = 0;
                minus = true;
            } else {
                a = -y;
                b = x;
                c = -64;
                minus = false;
            }
        }
    } else {
        if (y >= 0) {
            if (-x >= y) {
                a = -x;
                b = y;
                c = 128;
                minus = true;
            } else {
                a = y;
                b = -x;
                c = 64;
                minus = false;
            }
        } else {
            if (-x >= -y) {
                a = -x;
                b = -y;
                c = -128;
                minus = false;
            } else {
                a = -y;
                b = -x;
                c = -64;
                minus = true;
            }
        }
    }

    if (minus) {
        return c - atanFIdx_(b / a);
    } else {
        return c + atanFIdx_(b / a);
    }
}
export function atan2Deg(y: number, x: number): number {
	return fIdxToDeg(atan2FIdx(y, x));
}
export function atan2Rad(y: number, x: number): number {
	return fIdxToRad(atan2FIdx(y, x));
}


interface SinCosSample {
	sin_val: number;
	cos_val: number;
	sin_delta: number;
	cos_delta: number;
}
interface ArcTanSample {
	atan_val: number;
	atan_delta: number;
}

const sSinCosTbl: SinCosSample[] = [
	{ sin_val:  0.000000000, cos_val:  1.000000000, sin_delta:  0.024541000, cos_delta: -0.000301000},
	{ sin_val:  0.024541000, cos_val:  0.999698997, sin_delta:  0.024526000, cos_delta: -0.000903000},
	{ sin_val:  0.049068000, cos_val:  0.998794973, sin_delta:  0.024497001, cos_delta: -0.001505000},
	{ sin_val:  0.073564999, cos_val:  0.997290015, sin_delta:  0.024452999, cos_delta: -0.002106000},
	{ sin_val:  0.098017000, cos_val:  0.995185018, sin_delta:  0.024394000, cos_delta: -0.002705000},
	{ sin_val:  0.122410998, cos_val:  0.992479980, sin_delta:  0.024320001, cos_delta: -0.003303000},
	{ sin_val:  0.146730006, cos_val:  0.989176989, sin_delta:  0.024231000, cos_delta: -0.003899000},
	{ sin_val:  0.170962006, cos_val:  0.985278010, sin_delta:  0.024127999, cos_delta: -0.004492000},
	{ sin_val:  0.195089996, cos_val:  0.980785012, sin_delta:  0.024010999, cos_delta: -0.005083000},
	{ sin_val:  0.219100997, cos_val:  0.975701988, sin_delta:  0.023879001, cos_delta: -0.005671000},
	{ sin_val:  0.242980003, cos_val:  0.970031023, sin_delta:  0.023732999, cos_delta: -0.006255000},
	{ sin_val:  0.266712993, cos_val:  0.963775992, sin_delta:  0.023572000, cos_delta: -0.006836000},
	{ sin_val:  0.290284991, cos_val:  0.956939995, sin_delta:  0.023397001, cos_delta: -0.007412000},
	{ sin_val:  0.313681990, cos_val:  0.949527979, sin_delta:  0.023208000, cos_delta: -0.007984000},
	{ sin_val:  0.336890012, cos_val:  0.941543996, sin_delta:  0.023004999, cos_delta: -0.008551000},
	{ sin_val:  0.359894991, cos_val:  0.932992995, sin_delta:  0.022787999, cos_delta: -0.009113000},
	{ sin_val:  0.382683009, cos_val:  0.923879981, sin_delta:  0.022558000, cos_delta: -0.009670000},
	{ sin_val:  0.405241013, cos_val:  0.914210021, sin_delta:  0.022314001, cos_delta: -0.010220000},
	{ sin_val:  0.427554995, cos_val:  0.903989017, sin_delta:  0.022056000, cos_delta: -0.010765000},
	{ sin_val:  0.449611008, cos_val:  0.893224001, sin_delta:  0.021785000, cos_delta: -0.011303000},
	{ sin_val:  0.471397012, cos_val:  0.881920993, sin_delta:  0.021500999, cos_delta: -0.011834000},
	{ sin_val:  0.492897987, cos_val:  0.870087028, sin_delta:  0.021205001, cos_delta: -0.012358000},
	{ sin_val:  0.514102995, cos_val:  0.857729018, sin_delta:  0.020895001, cos_delta: -0.012875000},
	{ sin_val:  0.534998000, cos_val:  0.844853997, sin_delta:  0.020572999, cos_delta: -0.013384000},
	{ sin_val:  0.555570006, cos_val:  0.831470013, sin_delta:  0.020238001, cos_delta: -0.013885000},
	{ sin_val:  0.575807989, cos_val:  0.817584991, sin_delta:  0.019890999, cos_delta: -0.014377000},
	{ sin_val:  0.595699012, cos_val:  0.803207994, sin_delta:  0.019532001, cos_delta: -0.014861000},
	{ sin_val:  0.615231991, cos_val:  0.788345993, sin_delta:  0.019161999, cos_delta: -0.015336000},
	{ sin_val:  0.634392977, cos_val:  0.773010015, sin_delta:  0.018780001, cos_delta: -0.015802000},
	{ sin_val:  0.653173029, cos_val:  0.757209003, sin_delta:  0.018386001, cos_delta: -0.016257999},
	{ sin_val:  0.671558976, cos_val:  0.740951002, sin_delta:  0.017982000, cos_delta: -0.016704001},
	{ sin_val:  0.689540982, cos_val:  0.724246979, sin_delta:  0.017565999, cos_delta: -0.017139999},
	{ sin_val:  0.707107008, cos_val:  0.707107008, sin_delta:  0.017139999, cos_delta: -0.017565999},
	{ sin_val:  0.724246979, cos_val:  0.689540982, sin_delta:  0.016704001, cos_delta: -0.017982000},
	{ sin_val:  0.740951002, cos_val:  0.671558976, sin_delta:  0.016257999, cos_delta: -0.018386001},
	{ sin_val:  0.757209003, cos_val:  0.653173029, sin_delta:  0.015802000, cos_delta: -0.018780001},
	{ sin_val:  0.773010015, cos_val:  0.634392977, sin_delta:  0.015336000, cos_delta: -0.019161999},
	{ sin_val:  0.788345993, cos_val:  0.615231991, sin_delta:  0.014861000, cos_delta: -0.019532001},
	{ sin_val:  0.803207994, cos_val:  0.595699012, sin_delta:  0.014377000, cos_delta: -0.019890999},
	{ sin_val:  0.817584991, cos_val:  0.575807989, sin_delta:  0.013885000, cos_delta: -0.020238001},
	{ sin_val:  0.831470013, cos_val:  0.555570006, sin_delta:  0.013384000, cos_delta: -0.020572999},
	{ sin_val:  0.844853997, cos_val:  0.534998000, sin_delta:  0.012875000, cos_delta: -0.020895001},
	{ sin_val:  0.857729018, cos_val:  0.514102995, sin_delta:  0.012358000, cos_delta: -0.021205001},
	{ sin_val:  0.870087028, cos_val:  0.492897987, sin_delta:  0.011834000, cos_delta: -0.021500999},
	{ sin_val:  0.881920993, cos_val:  0.471397012, sin_delta:  0.011303000, cos_delta: -0.021785000},
	{ sin_val:  0.893224001, cos_val:  0.449611008, sin_delta:  0.010765000, cos_delta: -0.022056000},
	{ sin_val:  0.903989017, cos_val:  0.427554995, sin_delta:  0.010220000, cos_delta: -0.022314001},
	{ sin_val:  0.914210021, cos_val:  0.405241013, sin_delta:  0.009670000, cos_delta: -0.022558000},
	{ sin_val:  0.923879981, cos_val:  0.382683009, sin_delta:  0.009113000, cos_delta: -0.022787999},
	{ sin_val:  0.932992995, cos_val:  0.359894991, sin_delta:  0.008551000, cos_delta: -0.023004999},
	{ sin_val:  0.941543996, cos_val:  0.336890012, sin_delta:  0.007984000, cos_delta: -0.023208000},
	{ sin_val:  0.949527979, cos_val:  0.313681990, sin_delta:  0.007412000, cos_delta: -0.023397001},
	{ sin_val:  0.956939995, cos_val:  0.290284991, sin_delta:  0.006836000, cos_delta: -0.023572000},
	{ sin_val:  0.963775992, cos_val:  0.266712993, sin_delta:  0.006255000, cos_delta: -0.023732999},
	{ sin_val:  0.970031023, cos_val:  0.242980003, sin_delta:  0.005671000, cos_delta: -0.023879001},
	{ sin_val:  0.975701988, cos_val:  0.219100997, sin_delta:  0.005083000, cos_delta: -0.024010999},
	{ sin_val:  0.980785012, cos_val:  0.195089996, sin_delta:  0.004492000, cos_delta: -0.024127999},
	{ sin_val:  0.985278010, cos_val:  0.170962006, sin_delta:  0.003899000, cos_delta: -0.024231000},
	{ sin_val:  0.989176989, cos_val:  0.146730006, sin_delta:  0.003303000, cos_delta: -0.024320001},
	{ sin_val:  0.992479980, cos_val:  0.122410998, sin_delta:  0.002705000, cos_delta: -0.024394000},
	{ sin_val:  0.995185018, cos_val:  0.098017000, sin_delta:  0.002106000, cos_delta: -0.024452999},
	{ sin_val:  0.997290015, cos_val:  0.073564999, sin_delta:  0.001505000, cos_delta: -0.024497001},
	{ sin_val:  0.998794973, cos_val:  0.049068000, sin_delta:  0.000903000, cos_delta: -0.024526000},
	{ sin_val:  0.999698997, cos_val:  0.024541000, sin_delta:  0.000301000, cos_delta: -0.024541000},
	{ sin_val:  1.000000000, cos_val:  0.000000000, sin_delta: -0.000301000, cos_delta: -0.024541000},
	{ sin_val:  0.999698997, cos_val: -0.024541000, sin_delta: -0.000903000, cos_delta: -0.024526000},
	{ sin_val:  0.998794973, cos_val: -0.049068000, sin_delta: -0.001505000, cos_delta: -0.024497001},
	{ sin_val:  0.997290015, cos_val: -0.073564999, sin_delta: -0.002106000, cos_delta: -0.024452999},
	{ sin_val:  0.995185018, cos_val: -0.098017000, sin_delta: -0.002705000, cos_delta: -0.024394000},
	{ sin_val:  0.992479980, cos_val: -0.122410998, sin_delta: -0.003303000, cos_delta: -0.024320001},
	{ sin_val:  0.989176989, cos_val: -0.146730006, sin_delta: -0.003899000, cos_delta: -0.024231000},
	{ sin_val:  0.985278010, cos_val: -0.170962006, sin_delta: -0.004492000, cos_delta: -0.024127999},
	{ sin_val:  0.980785012, cos_val: -0.195089996, sin_delta: -0.005083000, cos_delta: -0.024010999},
	{ sin_val:  0.975701988, cos_val: -0.219100997, sin_delta: -0.005671000, cos_delta: -0.023879001},
	{ sin_val:  0.970031023, cos_val: -0.242980003, sin_delta: -0.006255000, cos_delta: -0.023732999},
	{ sin_val:  0.963775992, cos_val: -0.266712993, sin_delta: -0.006836000, cos_delta: -0.023572000},
	{ sin_val:  0.956939995, cos_val: -0.290284991, sin_delta: -0.007412000, cos_delta: -0.023397001},
	{ sin_val:  0.949527979, cos_val: -0.313681990, sin_delta: -0.007984000, cos_delta: -0.023208000},
	{ sin_val:  0.941543996, cos_val: -0.336890012, sin_delta: -0.008551000, cos_delta: -0.023004999},
	{ sin_val:  0.932992995, cos_val: -0.359894991, sin_delta: -0.009113000, cos_delta: -0.022787999},
	{ sin_val:  0.923879981, cos_val: -0.382683009, sin_delta: -0.009670000, cos_delta: -0.022558000},
	{ sin_val:  0.914210021, cos_val: -0.405241013, sin_delta: -0.010220000, cos_delta: -0.022314001},
	{ sin_val:  0.903989017, cos_val: -0.427554995, sin_delta: -0.010765000, cos_delta: -0.022056000},
	{ sin_val:  0.893224001, cos_val: -0.449611008, sin_delta: -0.011303000, cos_delta: -0.021785000},
	{ sin_val:  0.881920993, cos_val: -0.471397012, sin_delta: -0.011834000, cos_delta: -0.021500999},
	{ sin_val:  0.870087028, cos_val: -0.492897987, sin_delta: -0.012358000, cos_delta: -0.021205001},
	{ sin_val:  0.857729018, cos_val: -0.514102995, sin_delta: -0.012875000, cos_delta: -0.020895001},
	{ sin_val:  0.844853997, cos_val: -0.534998000, sin_delta: -0.013384000, cos_delta: -0.020572999},
	{ sin_val:  0.831470013, cos_val: -0.555570006, sin_delta: -0.013885000, cos_delta: -0.020238001},
	{ sin_val:  0.817584991, cos_val: -0.575807989, sin_delta: -0.014377000, cos_delta: -0.019890999},
	{ sin_val:  0.803207994, cos_val: -0.595699012, sin_delta: -0.014861000, cos_delta: -0.019532001},
	{ sin_val:  0.788345993, cos_val: -0.615231991, sin_delta: -0.015336000, cos_delta: -0.019161999},
	{ sin_val:  0.773010015, cos_val: -0.634392977, sin_delta: -0.015802000, cos_delta: -0.018780001},
	{ sin_val:  0.757209003, cos_val: -0.653173029, sin_delta: -0.016257999, cos_delta: -0.018386001},
	{ sin_val:  0.740951002, cos_val: -0.671558976, sin_delta: -0.016704001, cos_delta: -0.017982000},
	{ sin_val:  0.724246979, cos_val: -0.689540982, sin_delta: -0.017139999, cos_delta: -0.017565999},
	{ sin_val:  0.707107008, cos_val: -0.707107008, sin_delta: -0.017565999, cos_delta: -0.017139999},
	{ sin_val:  0.689540982, cos_val: -0.724246979, sin_delta: -0.017982000, cos_delta: -0.016704001},
	{ sin_val:  0.671558976, cos_val: -0.740951002, sin_delta: -0.018386001, cos_delta: -0.016257999},
	{ sin_val:  0.653173029, cos_val: -0.757209003, sin_delta: -0.018780001, cos_delta: -0.015802000},
	{ sin_val:  0.634392977, cos_val: -0.773010015, sin_delta: -0.019161999, cos_delta: -0.015336000},
	{ sin_val:  0.615231991, cos_val: -0.788345993, sin_delta: -0.019532001, cos_delta: -0.014861000},
	{ sin_val:  0.595699012, cos_val: -0.803207994, sin_delta: -0.019890999, cos_delta: -0.014377000},
	{ sin_val:  0.575807989, cos_val: -0.817584991, sin_delta: -0.020238001, cos_delta: -0.013885000},
	{ sin_val:  0.555570006, cos_val: -0.831470013, sin_delta: -0.020572999, cos_delta: -0.013384000},
	{ sin_val:  0.534998000, cos_val: -0.844853997, sin_delta: -0.020895001, cos_delta: -0.012875000},
	{ sin_val:  0.514102995, cos_val: -0.857729018, sin_delta: -0.021205001, cos_delta: -0.012358000},
	{ sin_val:  0.492897987, cos_val: -0.870087028, sin_delta: -0.021500999, cos_delta: -0.011834000},
	{ sin_val:  0.471397012, cos_val: -0.881920993, sin_delta: -0.021785000, cos_delta: -0.011303000},
	{ sin_val:  0.449611008, cos_val: -0.893224001, sin_delta: -0.022056000, cos_delta: -0.010765000},
	{ sin_val:  0.427554995, cos_val: -0.903989017, sin_delta: -0.022314001, cos_delta: -0.010220000},
	{ sin_val:  0.405241013, cos_val: -0.914210021, sin_delta: -0.022558000, cos_delta: -0.009670000},
	{ sin_val:  0.382683009, cos_val: -0.923879981, sin_delta: -0.022787999, cos_delta: -0.009113000},
	{ sin_val:  0.359894991, cos_val: -0.932992995, sin_delta: -0.023004999, cos_delta: -0.008551000},
	{ sin_val:  0.336890012, cos_val: -0.941543996, sin_delta: -0.023208000, cos_delta: -0.007984000},
	{ sin_val:  0.313681990, cos_val: -0.949527979, sin_delta: -0.023397001, cos_delta: -0.007412000},
	{ sin_val:  0.290284991, cos_val: -0.956939995, sin_delta: -0.023572000, cos_delta: -0.006836000},
	{ sin_val:  0.266712993, cos_val: -0.963775992, sin_delta: -0.023732999, cos_delta: -0.006255000},
	{ sin_val:  0.242980003, cos_val: -0.970031023, sin_delta: -0.023879001, cos_delta: -0.005671000},
	{ sin_val:  0.219100997, cos_val: -0.975701988, sin_delta: -0.024010999, cos_delta: -0.005083000},
	{ sin_val:  0.195089996, cos_val: -0.980785012, sin_delta: -0.024127999, cos_delta: -0.004492000},
	{ sin_val:  0.170962006, cos_val: -0.985278010, sin_delta: -0.024231000, cos_delta: -0.003899000},
	{ sin_val:  0.146730006, cos_val: -0.989176989, sin_delta: -0.024320001, cos_delta: -0.003303000},
	{ sin_val:  0.122410998, cos_val: -0.992479980, sin_delta: -0.024394000, cos_delta: -0.002705000},
	{ sin_val:  0.098017000, cos_val: -0.995185018, sin_delta: -0.024452999, cos_delta: -0.002106000},
	{ sin_val:  0.073564999, cos_val: -0.997290015, sin_delta: -0.024497001, cos_delta: -0.001505000},
	{ sin_val:  0.049068000, cos_val: -0.998794973, sin_delta: -0.024526000, cos_delta: -0.000903000},
	{ sin_val:  0.024541000, cos_val: -0.999698997, sin_delta: -0.024541000, cos_delta: -0.000301000},
	{ sin_val:  0.000000000, cos_val: -1.000000000, sin_delta: -0.024541000, cos_delta:  0.000301000},
	{ sin_val: -0.024541000, cos_val: -0.999698997, sin_delta: -0.024526000, cos_delta:  0.000903000},
	{ sin_val: -0.049068000, cos_val: -0.998794973, sin_delta: -0.024497001, cos_delta:  0.001505000},
	{ sin_val: -0.073564999, cos_val: -0.997290015, sin_delta: -0.024452999, cos_delta:  0.002106000},
	{ sin_val: -0.098017000, cos_val: -0.995185018, sin_delta: -0.024394000, cos_delta:  0.002705000},
	{ sin_val: -0.122410998, cos_val: -0.992479980, sin_delta: -0.024320001, cos_delta:  0.003303000},
	{ sin_val: -0.146730006, cos_val: -0.989176989, sin_delta: -0.024231000, cos_delta:  0.003899000},
	{ sin_val: -0.170962006, cos_val: -0.985278010, sin_delta: -0.024127999, cos_delta:  0.004492000},
	{ sin_val: -0.195089996, cos_val: -0.980785012, sin_delta: -0.024010999, cos_delta:  0.005083000},
	{ sin_val: -0.219100997, cos_val: -0.975701988, sin_delta: -0.023879001, cos_delta:  0.005671000},
	{ sin_val: -0.242980003, cos_val: -0.970031023, sin_delta: -0.023732999, cos_delta:  0.006255000},
	{ sin_val: -0.266712993, cos_val: -0.963775992, sin_delta: -0.023572000, cos_delta:  0.006836000},
	{ sin_val: -0.290284991, cos_val: -0.956939995, sin_delta: -0.023397001, cos_delta:  0.007412000},
	{ sin_val: -0.313681990, cos_val: -0.949527979, sin_delta: -0.023208000, cos_delta:  0.007984000},
	{ sin_val: -0.336890012, cos_val: -0.941543996, sin_delta: -0.023004999, cos_delta:  0.008551000},
	{ sin_val: -0.359894991, cos_val: -0.932992995, sin_delta: -0.022787999, cos_delta:  0.009113000},
	{ sin_val: -0.382683009, cos_val: -0.923879981, sin_delta: -0.022558000, cos_delta:  0.009670000},
	{ sin_val: -0.405241013, cos_val: -0.914210021, sin_delta: -0.022314001, cos_delta:  0.010220000},
	{ sin_val: -0.427554995, cos_val: -0.903989017, sin_delta: -0.022056000, cos_delta:  0.010765000},
	{ sin_val: -0.449611008, cos_val: -0.893224001, sin_delta: -0.021785000, cos_delta:  0.011303000},
	{ sin_val: -0.471397012, cos_val: -0.881920993, sin_delta: -0.021500999, cos_delta:  0.011834000},
	{ sin_val: -0.492897987, cos_val: -0.870087028, sin_delta: -0.021205001, cos_delta:  0.012358000},
	{ sin_val: -0.514102995, cos_val: -0.857729018, sin_delta: -0.020895001, cos_delta:  0.012875000},
	{ sin_val: -0.534998000, cos_val: -0.844853997, sin_delta: -0.020572999, cos_delta:  0.013384000},
	{ sin_val: -0.555570006, cos_val: -0.831470013, sin_delta: -0.020238001, cos_delta:  0.013885000},
	{ sin_val: -0.575807989, cos_val: -0.817584991, sin_delta: -0.019890999, cos_delta:  0.014377000},
	{ sin_val: -0.595699012, cos_val: -0.803207994, sin_delta: -0.019532001, cos_delta:  0.014861000},
	{ sin_val: -0.615231991, cos_val: -0.788345993, sin_delta: -0.019161999, cos_delta:  0.015336000},
	{ sin_val: -0.634392977, cos_val: -0.773010015, sin_delta: -0.018780001, cos_delta:  0.015802000},
	{ sin_val: -0.653173029, cos_val: -0.757209003, sin_delta: -0.018386001, cos_delta:  0.016257999},
	{ sin_val: -0.671558976, cos_val: -0.740951002, sin_delta: -0.017982000, cos_delta:  0.016704001},
	{ sin_val: -0.689540982, cos_val: -0.724246979, sin_delta: -0.017565999, cos_delta:  0.017139999},
	{ sin_val: -0.707107008, cos_val: -0.707107008, sin_delta: -0.017139999, cos_delta:  0.017565999},
	{ sin_val: -0.724246979, cos_val: -0.689540982, sin_delta: -0.016704001, cos_delta:  0.017982000},
	{ sin_val: -0.740951002, cos_val: -0.671558976, sin_delta: -0.016257999, cos_delta:  0.018386001},
	{ sin_val: -0.757209003, cos_val: -0.653173029, sin_delta: -0.015802000, cos_delta:  0.018780001},
	{ sin_val: -0.773010015, cos_val: -0.634392977, sin_delta: -0.015336000, cos_delta:  0.019161999},
	{ sin_val: -0.788345993, cos_val: -0.615231991, sin_delta: -0.014861000, cos_delta:  0.019532001},
	{ sin_val: -0.803207994, cos_val: -0.595699012, sin_delta: -0.014377000, cos_delta:  0.019890999},
	{ sin_val: -0.817584991, cos_val: -0.575807989, sin_delta: -0.013885000, cos_delta:  0.020238001},
	{ sin_val: -0.831470013, cos_val: -0.555570006, sin_delta: -0.013384000, cos_delta:  0.020572999},
	{ sin_val: -0.844853997, cos_val: -0.534998000, sin_delta: -0.012875000, cos_delta:  0.020895001},
	{ sin_val: -0.857729018, cos_val: -0.514102995, sin_delta: -0.012358000, cos_delta:  0.021205001},
	{ sin_val: -0.870087028, cos_val: -0.492897987, sin_delta: -0.011834000, cos_delta:  0.021500999},
	{ sin_val: -0.881920993, cos_val: -0.471397012, sin_delta: -0.011303000, cos_delta:  0.021785000},
	{ sin_val: -0.893224001, cos_val: -0.449611008, sin_delta: -0.010765000, cos_delta:  0.022056000},
	{ sin_val: -0.903989017, cos_val: -0.427554995, sin_delta: -0.010220000, cos_delta:  0.022314001},
	{ sin_val: -0.914210021, cos_val: -0.405241013, sin_delta: -0.009670000, cos_delta:  0.022558000},
	{ sin_val: -0.923879981, cos_val: -0.382683009, sin_delta: -0.009113000, cos_delta:  0.022787999},
	{ sin_val: -0.932992995, cos_val: -0.359894991, sin_delta: -0.008551000, cos_delta:  0.023004999},
	{ sin_val: -0.941543996, cos_val: -0.336890012, sin_delta: -0.007984000, cos_delta:  0.023208000},
	{ sin_val: -0.949527979, cos_val: -0.313681990, sin_delta: -0.007412000, cos_delta:  0.023397001},
	{ sin_val: -0.956939995, cos_val: -0.290284991, sin_delta: -0.006836000, cos_delta:  0.023572000},
	{ sin_val: -0.963775992, cos_val: -0.266712993, sin_delta: -0.006255000, cos_delta:  0.023732999},
	{ sin_val: -0.970031023, cos_val: -0.242980003, sin_delta: -0.005671000, cos_delta:  0.023879001},
	{ sin_val: -0.975701988, cos_val: -0.219100997, sin_delta: -0.005083000, cos_delta:  0.024010999},
	{ sin_val: -0.980785012, cos_val: -0.195089996, sin_delta: -0.004492000, cos_delta:  0.024127999},
	{ sin_val: -0.985278010, cos_val: -0.170962006, sin_delta: -0.003899000, cos_delta:  0.024231000},
	{ sin_val: -0.989176989, cos_val: -0.146730006, sin_delta: -0.003303000, cos_delta:  0.024320001},
	{ sin_val: -0.992479980, cos_val: -0.122410998, sin_delta: -0.002705000, cos_delta:  0.024394000},
	{ sin_val: -0.995185018, cos_val: -0.098017000, sin_delta: -0.002106000, cos_delta:  0.024452999},
	{ sin_val: -0.997290015, cos_val: -0.073564999, sin_delta: -0.001505000, cos_delta:  0.024497001},
	{ sin_val: -0.998794973, cos_val: -0.049068000, sin_delta: -0.000903000, cos_delta:  0.024526000},
	{ sin_val: -0.999698997, cos_val: -0.024541000, sin_delta: -0.000301000, cos_delta:  0.024541000},
	{ sin_val: -1.000000000, cos_val: -0.000000000, sin_delta:  0.000301000, cos_delta:  0.024541000},
	{ sin_val: -0.999698997, cos_val:  0.024541000, sin_delta:  0.000903000, cos_delta:  0.024526000},
	{ sin_val: -0.998794973, cos_val:  0.049068000, sin_delta:  0.001505000, cos_delta:  0.024497001},
	{ sin_val: -0.997290015, cos_val:  0.073564999, sin_delta:  0.002106000, cos_delta:  0.024452999},
	{ sin_val: -0.995185018, cos_val:  0.098017000, sin_delta:  0.002705000, cos_delta:  0.024394000},
	{ sin_val: -0.992479980, cos_val:  0.122410998, sin_delta:  0.003303000, cos_delta:  0.024320001},
	{ sin_val: -0.989176989, cos_val:  0.146730006, sin_delta:  0.003899000, cos_delta:  0.024231000},
	{ sin_val: -0.985278010, cos_val:  0.170962006, sin_delta:  0.004492000, cos_delta:  0.024127999},
	{ sin_val: -0.980785012, cos_val:  0.195089996, sin_delta:  0.005083000, cos_delta:  0.024010999},
	{ sin_val: -0.975701988, cos_val:  0.219100997, sin_delta:  0.005671000, cos_delta:  0.023879001},
	{ sin_val: -0.970031023, cos_val:  0.242980003, sin_delta:  0.006255000, cos_delta:  0.023732999},
	{ sin_val: -0.963775992, cos_val:  0.266712993, sin_delta:  0.006836000, cos_delta:  0.023572000},
	{ sin_val: -0.956939995, cos_val:  0.290284991, sin_delta:  0.007412000, cos_delta:  0.023397001},
	{ sin_val: -0.949527979, cos_val:  0.313681990, sin_delta:  0.007984000, cos_delta:  0.023208000},
	{ sin_val: -0.941543996, cos_val:  0.336890012, sin_delta:  0.008551000, cos_delta:  0.023004999},
	{ sin_val: -0.932992995, cos_val:  0.359894991, sin_delta:  0.009113000, cos_delta:  0.022787999},
	{ sin_val: -0.923879981, cos_val:  0.382683009, sin_delta:  0.009670000, cos_delta:  0.022558000},
	{ sin_val: -0.914210021, cos_val:  0.405241013, sin_delta:  0.010220000, cos_delta:  0.022314001},
	{ sin_val: -0.903989017, cos_val:  0.427554995, sin_delta:  0.010765000, cos_delta:  0.022056000},
	{ sin_val: -0.893224001, cos_val:  0.449611008, sin_delta:  0.011303000, cos_delta:  0.021785000},
	{ sin_val: -0.881920993, cos_val:  0.471397012, sin_delta:  0.011834000, cos_delta:  0.021500999},
	{ sin_val: -0.870087028, cos_val:  0.492897987, sin_delta:  0.012358000, cos_delta:  0.021205001},
	{ sin_val: -0.857729018, cos_val:  0.514102995, sin_delta:  0.012875000, cos_delta:  0.020895001},
	{ sin_val: -0.844853997, cos_val:  0.534998000, sin_delta:  0.013384000, cos_delta:  0.020572999},
	{ sin_val: -0.831470013, cos_val:  0.555570006, sin_delta:  0.013885000, cos_delta:  0.020238001},
	{ sin_val: -0.817584991, cos_val:  0.575807989, sin_delta:  0.014377000, cos_delta:  0.019890999},
	{ sin_val: -0.803207994, cos_val:  0.595699012, sin_delta:  0.014861000, cos_delta:  0.019532001},
	{ sin_val: -0.788345993, cos_val:  0.615231991, sin_delta:  0.015336000, cos_delta:  0.019161999},
	{ sin_val: -0.773010015, cos_val:  0.634392977, sin_delta:  0.015802000, cos_delta:  0.018780001},
	{ sin_val: -0.757209003, cos_val:  0.653173029, sin_delta:  0.016257999, cos_delta:  0.018386001},
	{ sin_val: -0.740951002, cos_val:  0.671558976, sin_delta:  0.016704001, cos_delta:  0.017982000},
	{ sin_val: -0.724246979, cos_val:  0.689540982, sin_delta:  0.017139999, cos_delta:  0.017565999},
	{ sin_val: -0.707107008, cos_val:  0.707107008, sin_delta:  0.017565999, cos_delta:  0.017139999},
	{ sin_val: -0.689540982, cos_val:  0.724246979, sin_delta:  0.017982000, cos_delta:  0.016704001},
	{ sin_val: -0.671558976, cos_val:  0.740951002, sin_delta:  0.018386001, cos_delta:  0.016257999},
	{ sin_val: -0.653173029, cos_val:  0.757209003, sin_delta:  0.018780001, cos_delta:  0.015802000},
	{ sin_val: -0.634392977, cos_val:  0.773010015, sin_delta:  0.019161999, cos_delta:  0.015336000},
	{ sin_val: -0.615231991, cos_val:  0.788345993, sin_delta:  0.019532001, cos_delta:  0.014861000},
	{ sin_val: -0.595699012, cos_val:  0.803207994, sin_delta:  0.019890999, cos_delta:  0.014377000},
	{ sin_val: -0.575807989, cos_val:  0.817584991, sin_delta:  0.020238001, cos_delta:  0.013885000},
	{ sin_val: -0.555570006, cos_val:  0.831470013, sin_delta:  0.020572999, cos_delta:  0.013384000},
	{ sin_val: -0.534998000, cos_val:  0.844853997, sin_delta:  0.020895001, cos_delta:  0.012875000},
	{ sin_val: -0.514102995, cos_val:  0.857729018, sin_delta:  0.021205001, cos_delta:  0.012358000},
	{ sin_val: -0.492897987, cos_val:  0.870087028, sin_delta:  0.021500999, cos_delta:  0.011834000},
	{ sin_val: -0.471397012, cos_val:  0.881920993, sin_delta:  0.021785000, cos_delta:  0.011303000},
	{ sin_val: -0.449611008, cos_val:  0.893224001, sin_delta:  0.022056000, cos_delta:  0.010765000},
	{ sin_val: -0.427554995, cos_val:  0.903989017, sin_delta:  0.022314001, cos_delta:  0.010220000},
	{ sin_val: -0.405241013, cos_val:  0.914210021, sin_delta:  0.022558000, cos_delta:  0.009670000},
	{ sin_val: -0.382683009, cos_val:  0.923879981, sin_delta:  0.022787999, cos_delta:  0.009113000},
	{ sin_val: -0.359894991, cos_val:  0.932992995, sin_delta:  0.023004999, cos_delta:  0.008551000},
	{ sin_val: -0.336890012, cos_val:  0.941543996, sin_delta:  0.023208000, cos_delta:  0.007984000},
	{ sin_val: -0.313681990, cos_val:  0.949527979, sin_delta:  0.023397001, cos_delta:  0.007412000},
	{ sin_val: -0.290284991, cos_val:  0.956939995, sin_delta:  0.023572000, cos_delta:  0.006836000},
	{ sin_val: -0.266712993, cos_val:  0.963775992, sin_delta:  0.023732999, cos_delta:  0.006255000},
	{ sin_val: -0.242980003, cos_val:  0.970031023, sin_delta:  0.023879001, cos_delta:  0.005671000},
	{ sin_val: -0.219100997, cos_val:  0.975701988, sin_delta:  0.024010999, cos_delta:  0.005083000},
	{ sin_val: -0.195089996, cos_val:  0.980785012, sin_delta:  0.024127999, cos_delta:  0.004492000},
	{ sin_val: -0.170962006, cos_val:  0.985278010, sin_delta:  0.024231000, cos_delta:  0.003899000},
	{ sin_val: -0.146730006, cos_val:  0.989176989, sin_delta:  0.024320001, cos_delta:  0.003303000},
	{ sin_val: -0.122410998, cos_val:  0.992479980, sin_delta:  0.024394000, cos_delta:  0.002705000},
	{ sin_val: -0.098017000, cos_val:  0.995185018, sin_delta:  0.024452999, cos_delta:  0.002106000},
	{ sin_val: -0.073564999, cos_val:  0.997290015, sin_delta:  0.024497001, cos_delta:  0.001505000},
	{ sin_val: -0.049068000, cos_val:  0.998794973, sin_delta:  0.024526000, cos_delta:  0.000903000},
	{ sin_val: -0.024541000, cos_val:  0.999698997, sin_delta:  0.024541000, cos_delta:  0.000301000},
	{ sin_val: -0.000000000, cos_val:  1.000000000, sin_delta:  0.024541000, cos_delta: -0.000301000},
];

const sArcTanTbl: ArcTanSample[] = [
	{ atan_val: 0.000000000, atan_delta: 1.272825360},
	{ atan_val: 1.272825360, atan_delta: 1.270345807},
	{ atan_val: 2.543171167, atan_delta: 1.265415549},
	{ atan_val: 3.808586597, atan_delta: 1.258091569},
	{ atan_val: 5.066678524, atan_delta: 1.248457074},
	{ atan_val: 6.315135479, atan_delta: 1.236619473},
	{ atan_val: 7.551754951, atan_delta: 1.222707152},
	{ atan_val: 8.774461746, atan_delta: 1.206866622},
	{ atan_val: 9.981328964, atan_delta: 1.189258218},
	{ atan_val: 11.170586586, atan_delta: 1.170052886},
	{ atan_val: 12.340640068, atan_delta: 1.149428010},
	{ atan_val: 13.490067482, atan_delta: 1.127564430},
	{ atan_val: 14.617631912, atan_delta: 1.104642272},
	{ atan_val: 15.722274780, atan_delta: 1.080838680},
	{ atan_val: 16.803113937, atan_delta: 1.056325078},
	{ atan_val: 17.859437943, atan_delta: 1.031264901},
	{ atan_val: 18.890703201, atan_delta: 1.005812049},
	{ atan_val: 19.896514893, atan_delta: 0.980109632},
	{ atan_val: 20.876625061, atan_delta: 0.954289079},
	{ atan_val: 21.830913544, atan_delta: 0.928469777},
	{ atan_val: 22.759384155, atan_delta: 0.902758956},
	{ atan_val: 23.662141800, atan_delta: 0.877251565},
	{ atan_val: 24.539394379, atan_delta: 0.852030873},
	{ atan_val: 25.391424179, atan_delta: 0.827168882},
	{ atan_val: 26.218593597, atan_delta: 0.802726984},
	{ atan_val: 27.021320343, atan_delta: 0.778756559},
	{ atan_val: 27.800077438, atan_delta: 0.755300105},
	{ atan_val: 28.555377960, atan_delta: 0.732391477},
	{ atan_val: 29.287769318, atan_delta: 0.710057378},
	{ atan_val: 29.997825623, atan_delta: 0.688317478},
	{ atan_val: 30.686143875, atan_delta: 0.667185664},
	{ atan_val: 31.353328705, atan_delta: 0.646670520},
	{ atan_val: 32.000000000, atan_delta: 0.626776159},
];
