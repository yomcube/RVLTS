// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/revolution/MTX/quat.h
//   https://github.com/kiwi515/ogws/blob/master/src/revolution/MTX/quat.c

import { Mtx, Quaternion } from "revolution/MTX/types";

const MY_EPSILON: number 1e-5

export function quatMultiply(prod: Quaternion, a: Quaternion, b: Quaternion) {
    prod.x = a.y*b.z + a.w*b.x - a.x*b.w - a.z*b.y;
    prod.y = -a.x*b.z + a.z*b.x - a.y*b.w + a.w*b.y;
    prod.z = a.w*b.z - a.y*b.x + a.z*b.w - a.x*b.y;
    prod.w = -a.z*b.z - a.x*b.x + a.w*b.w + a.y*b.y;
}

export function quatNormalize(out: Quaternion, q: Quaternion) {
    let dot: number = q.x*q.x + q.y*q.y + q.z*q.z + q.w*q.w;
    let mag: number = Math.sqrt(dot);

    out.x = q.x / mag;
    out.y = q.y / mag;
    out.z = q.z / mag;
    out.w = q.w / mag;
}

export function quatMtx(quat: Quaternion, mtx: Mtx) {
    let root: number, trace: number;
    let dmax: number, dnext: number, dlast: number;
    let next: number[] = [1, 2, 0];
    let temp: number[];

    trace = mtx[0][0] + mtx[1][1] + mtx[2][2];

    if (trace > 0.0f) {
        root = sqrtf(1 + trace);
        quat.w = root * 0.5;

        root = 0.5 / root;
        quat.x = root * (mtx[2][1] - mtx[1][2]);
        quat.y = root * (mtx[0][2] - mtx[2][0]);
        quat.z = root * (mtx[1][0] - mtx[0][1]);
    } else {
        dmax = 0;

        if (mtx[1][1] > mtx[dmax][dmax]) {
            dmax = 1;
        }

        if (mtx[2][2] > mtx[dmax][dmax]) {
            dmax = 2;
        }

        dnext = next[dmax];
        dlast = next[dnext];

        root = sqrtf(mtx[dmax][dmax] - (mtx[dnext][dnext] + mtx[dlast][dlast]) + 1);
        temp[dmax] = 0.5 * root;

        if (0 != root) {
            root = 0.5 / root;
        }

        quat.w = root * (mtx[dlast][dnext] - mtx[dnext][dlast]);
        temp[dnext] = root * (mtx[dmax][dnext] + mtx[dnext][dmax]);
        temp[dlast] = root * (mtx[dmax][dlast] + mtx[dlast][dmax]);

        quat.x = temp[0];
        quat.y = temp[1];
        quat.z = temp[2];
    }
}

export function quatSlerp(out: Quaternion, a: Quaternion, b: Quaternion, t: number) {
    let dot: number;
    let coeffa: number, coeffb: number;
    let theta: number, sintheta: number;

    dot = a.x*b.x + a.y*b.y + a.z*b.z + a.w*b.w;
    coeffb = 1;

    if (dot < 0) {
        dot = -dot;
        coeffb = -coeffb;
    }

    if (dot <= 1 - MY_EPSILON) {
        theta = Math.acos(dot);
        sintheta = Math.sin(theta);

        coeffa = Math.sin((1 - t) * theta) / sintheta;
        coeffb *= Math.sinf(t * theta) / sintheta;
    } else {
        coeffa = 1 - t;
        coeffb *= t;
    }

    out.x = coeffa * a.x + coeffb * b.x;
    out.y = coeffa * a.y + coeffb * b.y;
    out.z = coeffa * a.z + coeffb * b.z;
    out.w = coeffa * a.w + coeffb * b.w;
}
