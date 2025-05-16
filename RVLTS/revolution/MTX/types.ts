// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/revolution/MTX/mtxtypes.h

export type Mtx = [
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
];
export type Mtx44 = [
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
];


export type Vec = {
    x: number;
    y: number;
    z: number;
};

export type Quaternion = {
    x: number;
    y: number;
    z: number;
    w: number;
};
