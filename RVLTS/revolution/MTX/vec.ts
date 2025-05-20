// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/revolution/MTX/vec.h
//   https://github.com/kiwi515/ogws/blob/master/src/revolution/MTX/vec.c

import { Vec } from "revolution/MTX/types"


export function vecAdd(out: Vec, a: Vec, b: Vec) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    out.z = a.z + b.z;
}

export function vecScale(out: Vec, v: Vec, scale: number) {
    out.x = v.x * scale;
    out.y = v.y * scale;
    out.z = v.z * scale;
}

export function vecNormalize(out: Vec, v: Vec) {
    let dot: number = v.x*v.x + v.y*v.y + v.z*v.z;
    let mag: number = Math.sqrt(dot);

    out.x = v.x / mag;
    out.y = v.y / mag;
    out.z = v.z / mag;
}

export function vecMag(v: Vec): number {
    let dot: number = v.x*v.x + v.y*v.y + v.z*v.z;
    return Math.sqrt(dot);
}

export function vecDotProduct(a: Vec, b: Vec): number {
    return (
        a.x * b.x +
        a.y * b.y +
        a.z * b.z
    );
}

export function vecCrossProduct(out: Vec, a: Vec, b: Vec) {
    out.x = (a.y * b.z) - (a.z * b.y);
    out.y = (a.z * b.x) - (a.x * b.z);
    out.z = (a.x * b.y) - (a.y * b.x);
}

export function vecHalfAngle(a: Vec, b: Vec, out: Vec) {
    let na: Vec, nb: Vec, ns: Vec;

    na.x = -a.x;
    na.y = -a.y;
    na.z = -a.z;

    nb.x = -b.x;
    nb.y = -b.y;
    nb.z = -b.z;

    vecNormalize(na, na);
    vecNormalize(nb, nb);
    vecAdd(na, nb, ns);

    if (vecDotProduct(ns, ns) > 0) {
        vecNormalize(out, ns);
    } else {
        out.x = ns.x;
        out.y = ns.y;
        out.z = ns.z;
    }
}

export function vecSquareDistance(a: Vec, b: Vec): number {
    let dx: number = a.x - b.x;
    let dy: number = a.y - b.y;
    let dz: number = a.z - b.z;

    return dx*dx + dy*dy + dz*dz;
}
