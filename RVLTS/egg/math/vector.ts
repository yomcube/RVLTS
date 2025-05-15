// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/egg/math/eggVector.h
//   https://github.com/kiwi515/ogws/blob/master/src/egg/math/eggVector.cpp

import { VEC2 } from "nw4r/math/types";

export class Vector2f extends VEC2 {
    static readonly zero: Vector2f = new Vector2f(0, 0);
    static readonly ex: Vector2f = new Vector2f(1, 0);
    static readonly ey: Vector2f = new Vector2f(0, 1);
}