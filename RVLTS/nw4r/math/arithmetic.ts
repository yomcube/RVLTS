// https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_arithmetic.h

// TODO: literally everything else

/** Emulates the `fabs` instruction. Returns the absolute value of `x`. */
export function FAbs(x: number): number {
    return x < 0 ? -x : x;
}

// https://www.ibm.com/docs/en/aix/7.3?topic=set-fsel-floating-point-select-instruction
/** Emulates the `fsel` function, which compares `value` with 0. */
export function FSelect(value: number, ge_zero: number, le_zero: number): number {
    return value > 0 ? ge_zero : le_zero;
}
