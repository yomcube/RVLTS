// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/nw4r/snd/snd_Types.h

import { NamedTupleMember } from "../../../node_modules/typescript/lib/typescript";

export const CHANNEL_MIN: number = 1;
export const CHANNEL_MAX: number = 2;

export const REMOTE_FILTER_MAX: number = 127;

// 12 notes each with 256 microtones
export const SEMITONE_MAX: number = 12;
export const MICROTONE_MAX: number = 256;

// Volume in range [-90.4db, 6.0db]
export const VOLUME_MIN_DB: number = -90.4;
export const VOLUME_MAX_DB: number = 6.0;
export const VOLUME_RANGE_DB: number = -(VOLUME_MIN_DB - VOLUME_MAX_DB);
export const VOLUME_RANGE_MB: number = Math.trunc(10 * VOLUME_RANGE_DB);

export enum OutputLineFlag {
    MAIN = (1 << 0),
    REMOTE_N = (1 << 1),
};

export enum AuxBus { A, B, C, BUS_NUM };

export enum OutputMode {
    STEREO,
    SURROUND,
    DPL2,
    MONO
};

export type SoundParam = {
    volume: number;
    pitch: number;
    pan: number;
    surroundPan: number;
    fxSend: number;
    lpf: number;
    priority: number;
};

export enum PanMode {
    DUAL,
    BALANCE,
};

export enum PanCurve {
    SQRT,
    SQRT_0DB,
    SQRT_0DB_CLAMP,
    SINCOS,
    SINCOS_0DB,
    SINCOS_0DB_CLAMP,
    LINEAR,
    LINEAR_0DB,
    LINEAR_0DB_CLAMP,
};

export type AdpcmParam = {
    coef: [
        number, number, number, number,
        number, number, number, number,
        number, number, number, number,
        number, number, number, number
    ];
    gain: number;
    pred_scale: number;
    yn1: number;
    yn2: number;
};

export type AdpcmLoopParam = {
    loop_pred_scale: number;
    loop_yn1: number;
    loop_yn2: number;
};

export type AdpcmInfo = {
    param: AdpcmParam;
    loopParam: AdpcmLoopParam;
    PADDING_0x2E: number;
};
