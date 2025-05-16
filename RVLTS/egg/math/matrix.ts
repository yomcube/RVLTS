// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/egg/math/eggMatrix.h
//   https://github.com/kiwi515/ogws/blob/master/src/egg/math/eggMatrix.cpp

import { Quatf } from "egg/math/quat";
import { Vector3f } from "egg/math/vector";

export class Matrix33f {
    tbl: [
        [number, number, number],
        [number, number, number],
        [number, number, number]
    ];

    // Can't overload operator()
}

export class Matrix34f {
    tbl: [
        [number, number, number, number],
        [number, number, number, number],
        [number, number, number, number]
    ];

    constructor(
        _00: number, _01: number, _02: number, _03: number,
        _10: number, _11: number, _12: number, _13: number,
        _20: number, _21: number, _22: number, _23: number
    ) {
        this.tbl = [
            [_00, _01, _02, _03],
            [_10, _11, _12, _13],
            [_20, _21, _22, _23]
        ];
    }

    makeZero() {
        this.tbl = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }

    makeIdentity() {
        this.tbl[0][0] = 1;
        this.tbl[1][1] = 1;
        this.tbl[2][2] = 1;
    }

    makeQ(quat: Quatf) {
        let yy = 2 * quat.y * quat.y;
        let zz = 2 * quat.z * quat.z;
        let xx = 2 * quat.x * quat.x;
        let xy = 2 * quat.x * quat.y;
        let xz = 2 * quat.x * quat.z;
        let yz = 2 * quat.y * quat.z;
        let wz = 2 * quat.w * quat.z;
        let wx = 2 * quat.w * quat.x;
        let wy = 2 * quat.w * quat.y;

        tbl[0][0] = 1 - yy - zz;
        tbl[0][1] = xy - wz;
        tbl[0][2] = xz + wy;

        tbl[1][0] = xy + wz;
        tbl[1][1] = 1 - xx - zz;
        tbl[1][2] = yz - wx;

        tbl[2][0] = xz - wy;
        tbl[2][1] = yz + wx;
        tbl[2][2] = 1 - xx - yy;

        tbl[0][3] = 0;
        tbl[1][3] = 0;
        tbl[2][3] = 0;
    }

    makeS(vec: Vector3f) {
        tbl[0][0] = vec.x;
        tbl[0][1] = 0;
        tbl[0][2] = 0;

        tbl[1][0] = 0;
        tbl[1][1] = vec.y;
        tbl[1][2] = 0;

        tbl[2][0] = 0;
        tbl[2][1] = 0;
        tbl[2][2] = vec.z;

        tbl[0][3] = 0;
        tbl[1][3] = 0;
        tbl[2][3] = 0;
    }

    setAxisRotation(vec: Vector3f, angle: number) {
        let q: Quatf = new Quatf();
        q.setAxisRotation(vec, angle);
        makeQ(q);
    }

    // TODO: loadPosMtx

    // Can't overload operator()

    static readonly ident: Matrix34f = new Matrix34f(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0
    );
}
