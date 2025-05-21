// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/egg/math/eggMatrix.h
//   https://github.com/kiwi515/ogws/blob/master/src/egg/math/eggMatrix.cpp

import { Quatf } from "egg/math/quat";
import { Vector3f } from "egg/math/vector";
import { und0 } from "utils/utils";

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

    constructor()
    constructor(
        _00: number, _01: number, _02: number, _03: number,
        _10: number, _11: number, _12: number, _13: number,
        _20: number, _21: number, _22: number, _23: number
    )
    constructor(
        _00?: number, _01?: number, _02?: number, _03?: number,
        _10?: number, _11?: number, _12?: number, _13?: number,
        _20?: number, _21?: number, _22?: number, _23?: number
    ) {
        this.tbl = [
            [und0(_00), und0(_01), und0(_02), und0(_03)],
            [und0(_10), und0(_11), und0(_12), und0(_13)],
            [und0(_20), und0(_21), und0(_22), und0(_23)]
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

        this.tbl = [
            [1 - yy - zz, xy - wz, xz + wy, 0],
            [xy + wz, 1 - xx - zz, yz - wx, 0],
            [xz - wy, yz + wx, 1 - xx - yy, 0]
        ];
    }

    makeS(vec: Vector3f) {
        this.tbl = [
            [vec.x, 0, 0, 0],
            [0, vec.y, 0, 0],
            [0, 0, vec.z, 0]
        ];
    }

    setAxisRotation(vec: Vector3f, angle: number) {
        let q: Quatf = new Quatf();
        q.setAxisRotation(vec, angle);
        this.makeQ(q);
    }

    // TODO: loadPosMtx

    // Can't overload operator()

    static readonly ident: Matrix34f = new Matrix34f(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0
    );
}
