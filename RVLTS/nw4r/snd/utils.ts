// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/snd/snd_Util.h
//   https://github.com/kiwi515/ogws/blob/master/src/nw4r/snd/snd_Util.cpp

export enum PanCurve {
    SQRT,
    SINCOS,
    LINEAR
};

export class PanInfo {
    curve: PanCurve = PanCurve.SQRT;
    centerZero: boolean = false;
    zeroClamp: boolean  = false;
};

export enum RefType {
    ADDRESS,
    OFFSET
};

export enum DataType {
    T0,
    T1,
    T2,
    T3,
    INVALID
};

export type DataRef = {
    refType: number;
    dataType: number;
    reserved: number;
    value: number;
};
