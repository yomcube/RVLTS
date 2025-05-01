// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/revolution/MTX/vec.h
//   https://github.com/kiwi515/ogws/blob/master/src/revolution/MTX/vec.c

import { Vec } from "revolution/MTX/types"


export function vecAdd(a: Vec, b: Vec): Vec {
    return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
    };
}

export function vecScale(v: Vec, scale: number): Vec {
    return {
        x: v.x * scale,
        y: v.y * scale,
        z: v.z * scale
    };
}

export function vecNormalize(v: Vec): Vec {
    let dot: number = v.x*v.x + v.y*v.y + v.z*v.z;
    let rsqrt: number = 1/Math.sqrt(dot);
    let normalize: number = (3 - dot * rsqrt*rsqrt) * (rsqrt * 0.5);

    return {
        x: v.x * normalize,
        y: v.y * normalize,
        z: v.z * normalize
    };
}
