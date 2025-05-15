// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/egg/math/eggVector.h
//   https://github.com/kiwi515/ogws/blob/master/src/egg/math/eggVector.cpp

import { VEC2, VEC3 } from "nw4r/math/types";

export class Vector2f extends VEC2 {
    static readonly zero: Vector2f = new Vector2f(0, 0);
    static readonly ex: Vector2f = new Vector2f(1, 0);
    static readonly ey: Vector2f = new Vector2f(0, 1);
}

export class Vector3f extends VEC3 {
    /** Returns the squared magnitude of the vector. */
    squaredLength(): number {
        return (
            this.x * this.x +
            this.y * this.y +
            this.z * this.z
        );
    }

    /** Returns the magnitude of the vector. */
    length(): number {
        return Math.sqrt(this.squaredLength());
    }
    
    /** Normalizes the vector. Returns the magnitude. */
    normalize(): number {
        let mag = this.length();
        
        if (mag > 0)
        {
            let inv_mag = 1 / mag;
            this.x *= inv_mag;
            this.y *= inv_mag;
            this.z *= inv_mag;
        }

        return mag;
    }

    static readonly zero: Vector3f = new Vector3f(0, 0, 0);
    static readonly ex: Vector3f = new Vector3f(1, 0, 0);
    static readonly ey: Vector3f = new Vector3f(0, 1, 0);
    static readonly ez: Vector3f = new Vector3f(0, 0, 1);
}