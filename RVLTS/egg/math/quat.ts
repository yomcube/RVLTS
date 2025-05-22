// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/egg/math/eggQuat.h
//   https://github.com/kiwi515/ogws/blob/master/src/egg/math/eggQuat.cpp

import { Vector3f } from "egg/math/vector";

export class Quatf {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor()
    constructor(_w: number, vec: Vector3f)
    constructor(_w?: number, vec?: Vector3f) {
        if (_w == undefined && vec == undefined) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 0;
            return;
        }
        this.x = vec.x;
        this.y = vec.y;
        this.z = vec.z;
        this.w = _w;
    }

    setAxisRotation(axis: Vector3f, angle: number): void {
        let angleHalf: number = angle * 0.5;
        let angleCos: number = Math.cos(angleHalf);
        let angleSin: number = Math.sin(angleHalf);

        this.w = angleCos;
        this.x = angleSin * axis.x;
        this.y = angleSin * axis.y;
        this.z = angleSin * axis.z;
    }
}