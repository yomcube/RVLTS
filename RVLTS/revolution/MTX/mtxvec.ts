// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/revolution/MTX/mtxvec.h
//   https://github.com/kiwi515/ogws/blob/master/src/revolution/MTX/mtxvec.c

import { Mtx, Vec } from "revolution/MTX/types";

export function mtxMultVec(out: Vec, mtx: Mtx, vec: Vec): void {
    out.x = (
        mtx[0][0] * vec.x + mtx[0][1] * vec.y +
        mtx[0][2] * vec.z + mtx[0][3]
    );
    out.y = (
        mtx[1][0] * vec.x + mtx[1][1] * vec.y +
        mtx[1][2] * vec.z + mtx[1][3]
    );
    out.z = (
        mtx[2][0] * vec.x + mtx[2][1] * vec.y +
        mtx[2][2] * vec.z + mtx[2][3]
    );
}
