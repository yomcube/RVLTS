// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_geometry.h
//   https://github.com/kiwi515/ogws/blob/master/src/nw4r/math/math_geometry.cpp

import { tanDeg } from "nw4r/math/triangular";
import { MTX34, VEC3 } from "nw4r/math/types";


export enum IntersectionResult {
    INTERSECTION_NONE,
    INTERSECTION_1,
    INTERSECTION_2,

    INTERSECTION_LINE3_ON_PLANE = INTERSECTION_2,
    INTERSECTION_RAY3_ON_PLANE = INTERSECTION_2,
    INTERSECTION_SEGMENT3_ON_PLANE = INTERSECTION_2,

    INTERSECTION_OUTSIDE = 0,
    INTERSECTION_INSIDE,
    INTERSECTION_INTERSECT
};

export function intersectionAABB(pA: AABB, pB: AABB): boolean {
    if (pA.min.x > pB.max.x || pB.min.x > pA.max.x ||
        pA.min.y > pB.max.y || pB.min.y > pA.max.y ||
        pA.min.z > pB.max.z || pB.min.z > pA.max.z) {
        return false;
    }

    return true;
}

///////////////
//// PLANE ////
///////////////

export class PLANE {
    n: VEC3;
    d: number;

    constructor() {}

    set(p0: VEC3, p1: VEC3, p2: VEC3): void {
        
        let v0: VEC3, v1: VEC3, v2: VEC3;
        
        VEC3.sub(v0, p2, p0);
        VEC3.sub(v1, p1, p0);
        VEC3.normalize(this.n, VEC3.cross(v2, v0, v1));
        this.d = -VEC3.dot(this.n, p0);
    }

    test(point: VEC3): number {
        return this.d + VEC3.dot(this.n, point);
    }
}

//////////////
//// AABB ////
//////////////

export class AABB {
    min: VEC3;
    max: VEC3;

    set(points: VEC3[], num: number): void
    set(box: AABB, mtx: MTX34): void
    set(var1: VEC3[] | AABB, var2: number | MTX34): void {
        if (Array.isArray(var1) && typeof var2 == "number") {
            this.#set_points_num(var1, var2);
            return;
        }
        if (var1 instanceof AABB && var2 instanceof MTX34) {
            this.#set_box_mtx(var1, var2);
            return;
        }
        throw new TypeError("One of the parameters has an invalid type!");
    }
    #set_points_num(points: VEC3[], num: number): void {
        this.min = points[0];
        this.max = points[0];

        for (let i: number = 0; i < num; i++) {
            if (points[i].x < this.min.x) {
                this.min.x = points[i].x;
            } else if (points[i].x > this.max.x) {
                this.max.x = points[i].x;
            }

            if (points[i].y < this.min.y) {
                this.min.y = points[i].y;
            } else if (points[i].y > this.max.y) {
                this.max.y = points[i].y;
            }

            if (points[i].z < this.min.z) {
                this.min.z = points[i].z;
            } else if (points[i].z > this.max.z) {
                this.max.z = points[i].z;
            }
        }
    }
    #set_box_mtx(box: AABB, mtx: MTX34): void {
        let x0: number, y0: number, z0: number;
        let x1: number, y1: number, z1: number;
        let a0: number, a1: number;
        let b0: number, b1: number;

        x0 = mtx._00 * box.min.x + mtx._03;
        x1 = mtx._00 * box.max.x + mtx._03;

        a0 = mtx._01 * box.min.y;
        a1 = mtx._01 * box.max.y;

        b0 = mtx._02 * box.min.z;
        b1 = mtx._02 * box.max.z;

        if (x0 > x1) {
            [x0, x1] = [x1, x0]; // std::swap
        }

        if (a0 < a1) {
            x0 += a0;
            x1 += a1;
        } else {
            x0 += a1;
            x1 += a0;
        }

        if (b0 < b1) {
            x0 += b0;
            x1 += b1;
        } else {
            x0 += b1;
            x1 += b0;
        }

        y0 = mtx._10 * box.min.x + mtx._13;
        y1 = mtx._10 * box.max.x + mtx._13;

        a0 = mtx._11 * box.min.y;
        a1 = mtx._11 * box.max.y;

        b0 = mtx._12 * box.min.z;
        b1 = mtx._12 * box.max.z;

        if (y0 > y1) {
            [y0, y1] = [y1, y0]; // std::swap
        }

        if (a0 < a1) {
            y0 += a0;
            y1 += a1;
        } else {
            y0 += a1;
            y1 += a0;
        }

        if (b0 < b1) {
            y0 += b0;
            y1 += b1;
        } else {
            y0 += b1;
            y1 += b0;
        }

        z0 = mtx._20 * box.min.x + mtx._23;
        z1 = mtx._20 * box.max.x + mtx._23;

        a0 = mtx._21 * box.min.y;
        a1 = mtx._21 * box.max.y;

        b0 = mtx._22 * box.min.z;
        b1 = mtx._22 * box.max.z;

        if (z0 > z1) {
            [z0, z1] = [z1, z0]; // std::swap
        }

        if (a0 < a1) {
            z0 += a0;
            z1 += a1;
        } else {
            z0 += a1;
            z1 += a0;
        }

        if (b0 < b1) {
            z0 += b0;
            z1 += b1;
        } else {
            z0 += b1;
            z1 += b0;
        }

        this.min.x = x0;
        this.min.y = y0;
        this.min.z = z0;

        this.max.x = x1;
        this.max.y = y1;
        this.max.z = z1;
    }
}

/////////////////
//// FRUSTUM ////
/////////////////
enum Point {
    NEAR_TL,
    NEAR_TR,
    NEAR_BR,
    NEAR_BL,

    FAR_TL,
    FAR_TR,
    FAR_BR,
    FAR_BL,

    MAX
};
enum Plane {
    L,
    R,
    N,
    F,
    T,
    B,

    MAX
};
export class FRUSTUM {
    mCamMtx: MTX34;
    mPlaneL: PLANE;
    mPlaneR: PLANE;
    mPlaneT: PLANE;
    mPlaneB: PLANE;
    mNearZ: number;
    mFarZ: number;
    mBox: AABB;
    mPlanes: PLANE[];

    constructor() {}

    set(fovy: number, aspect: number, n: number, f: number, camMtx: MTX34): void
    set(t: number, b: number, l: number, r: number, n: number, f: number, camMtx: MTX34): void
    set(
        v1: number, v2: number, v3: number, v4: number,
        v5: number | MTX34, v6?: number, v7?: MTX34
    ): void {
        if (typeof v5 != "number") {
            this.#set_fovy_aspect_n_f_camMtx(v1, v2, v3, v4, v5 as MTX34);
            return;
        }
        this.#set_t_b_l_r_n_f_camMtx(v1, v2, v3, v4, v5 as number, v6, v7);
    }
    #set_fovy_aspect_n_f_camMtx(
        fovy: number, aspect: number, n: number, f: number, camMtx: MTX34
    ): void {
        let tan = tanDeg(fovy * 0.5);
        let ny = tan * n;
        let nx = ny * aspect;
        this.#set_t_b_l_r_n_f_camMtx(ny, -ny, -nx, nx, n, f, camMtx);
    }
    #set_t_b_l_r_n_f_camMtx(
        t: number, b: number, l: number, r: number, n: number, f: number, camMtx: MTX34
    ): void {
        // TODO
        // https://github.com/kiwi515/ogws/blob/master/src/nw4r/math/math_geometry.cpp#L153-L219
    }

    intersectAABB_Ex(box: AABB): IntersectionResult {
        if (!intersectionAABB(box, this.mBox)) {
            return IntersectionResult.INTERSECTION_OUTSIDE;
        }

        let result: IntersectionResult = IntersectionResult.INTERSECTION_INSIDE;
        let p: VEC3, n: VEC3;

        for (let i: number = 0; i < Plane.MAX; i++) {
            if (this.mPlanes[i].n.x >= 0) {
                p.x = box.min.x;
                n.x = box.max.x;
            } else {
                p.x = box.max.x;
                n.x = box.min.x;
            }

            if (this.mPlanes[i].n.y >= 0) {
                p.y = box.min.y;
                n.y = box.max.y;
            } else {
                p.y = box.max.y;
                n.y = box.min.y;
            }

            if (this.mPlanes[i].n.z >= 0) {
                p.z = box.min.z;
                n.z = box.max.z;
            } else {
                p.z = box.max.z;
                n.z = box.min.z;
            }

            if (this.mPlanes[i].test(p) > 0) {
                return IntersectionResult.INTERSECTION_NONE;
            }

            if (this.mPlanes[i].test(n) > 0) {
                result = IntersectionResult.INTERSECTION_INTERSECT;
            }
        }

        return result;
    }
}
