// https://github.com/kiwi515/ogws/blob/master/include/nw4r/math/math_arithmetic.h

// TODO: literally everything else

export function FAbs(x: number): number {
    return Math.abs(x);
}

// https://www.ibm.com/docs/en/aix/7.3?topic=set-fsel-floating-point-select-instruction
export function FSelect(value: number, ge_zero: number, le_zero: number): number {
    return value > 0 ? ge_zero : le_zero;
}
