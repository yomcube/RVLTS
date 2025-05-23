// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/revolution/MTX/mtx44.h
//   https://github.com/kiwi515/ogws/blob/master/src/revolution/MTX/mtx44.c

import { Mtx44 } from "revolution/MTX/types";
import { M_PI } from "utils/MSL/math";

export function mtxFrustum(
    mtx: Mtx44, t: number, b: number, l: number, r: number, n: number, f: number
): void {
    let invrange: number;

    invrange = 1 / (r - l);
    mtx[0][0] = 2 * n * invrange;
    mtx[0][1] = 0;
    mtx[0][2] = invrange * (r + l);
    mtx[0][3] = 0;

    invrange = 1 / (t - b);
    mtx[1][0] = 0;
    mtx[1][1] = 2 * n * invrange;
    mtx[1][2] = invrange * (t + b);
    mtx[1][3] = 0;

    invrange = 1 / (f - n);
    mtx[2][0] = 0;
    mtx[2][1] = 0;
    mtx[2][2] = -n * invrange;
    mtx[2][3] = invrange * -(f * n);

    mtx[3][0] = 0;
    mtx[3][1] = 0;
    mtx[3][2] = -1;
    mtx[3][3] = 0;
}

export function mtxPerspective(
    mtx: Mtx44, fovy: number, aspect: number, n: number, f: number
): void {
    let rad: number, cot: number;
    let invrange: number;

    rad = M_PI / 180 * (0.5 * fovy);
    cot = 1 / Math.tan(rad);

    mtx[0][0] = cot / aspect;
    mtx[0][1] = 0;
    mtx[0][2] = 0;
    mtx[0][3] = 0;

    mtx[1][0] = 0;
    mtx[1][1] = cot;
    mtx[1][2] = 0;
    mtx[1][3] = 0;

    invrange = 1 / (f - n);
    mtx[2][0] = 0;
    mtx[2][1] = 0;
    mtx[2][2] = -n * invrange;
    mtx[2][3] = invrange * -(f * n);

    mtx[3][0] = 0;
    mtx[3][1] = 0;
    mtx[3][2] = -1;
    mtx[3][3] = 0;
}

export function mtxOrtho(
    mtx: Mtx44, t: number, b: number, l: number, r: number, n: number, f: number
): void {
    let invrange: number;

    invrange = 1 / (r - l);
    mtx[0][0] = 2 * invrange;
    mtx[0][1] = 0;
    mtx[0][2] = 0;
    mtx[0][3] = invrange * -(r + l);

    invrange = 1 / (t - b);
    mtx[1][0] = 0;
    mtx[1][1] = 2 * invrange;
    mtx[1][2] = 0;
    mtx[1][3] = invrange * -(t + b);

    invrange = 1 / (f - n);
    mtx[2][0] = 0;
    mtx[2][1] = 0;
    mtx[2][2] = -1 * invrange;
    mtx[2][3] = -f * invrange;

    mtx[3][0] = 0;
    mtx[3][1] = 0;
    mtx[3][2] = 0;
    mtx[3][3] = 1;
}
