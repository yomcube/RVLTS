// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/revolution/GX/GXTypes.h

export class GXColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export enum GXAlphaOp {
    AND,
    OR,
    XOR,
    XNOR,
    MAX
};

export enum GXAnisotropy {
    ANISO_1,
    ANISO_2,
    ANISO_3,
    MAX
};

export enum GXAttnFn {
    SPEC,
    SPOT,
    NONE
};

export enum GXAttr {
    PNMTXIDX,
    TEX0MTXIDX,
    TEX1MTXIDX,
    TEX2MTXIDX,
    TEX3MTXIDX,
    TEX4MTXIDX,
    TEX5MTXIDX,
    TEX6MTXIDX,
    TEX7MTXIDX,

    POS,
    NRM,

    CLR0,
    CLR1,
    TEX0,
    TEX1,
    TEX2,
    TEX3,
    TEX4,
    TEX5,
    TEX6,
    TEX7,

    POS_MTX_ARRAY,
    NRM_MTX_ARRAY,
    TEX_MTX_ARRAY,
    LIGHT_ARRAY,
    
    NBT,
    
    MAX,
    NULL = 255
};

export enum GXAttrType {
    NONE,
    DIRECT,
    INDEX8,
    INDEX16
};

export enum GXBlendFactor {
    ZERO,
    ONE,
    SRCCLR,
    INVSRCCLR,
    SRCAPLHA,
    DSTAPLHA,
    INVDSTALPHA,

    DSTCLR = SRCCLR,
    INVDSTCLR = INVSRCCLR
};

export enum GXBlendMode {
    NONE,
    BLEND,
    LOGIC,
    SUBTRACT,

    MAX
};

export enum GXChannelID {
    COLOR0,
    COLOR1,
    ALPHA0,
    ALPHA1,
    COLOR0A0,
    COLOR1A1,
    COLOR_ZERO,
    ALPHA_BUMP,
    ALPHA_BUMPN,

    NULL = 255
};

export enum GXCITexFmt {
    TF_C4 = 8,
    TF_C8,
    TF_C14X2
};

export enum GXClearZ {
    MIN = 0,
    MAX = (1 << 24) - 1,
};

export enum GXClipMode {
    // "ClipDisable" in XF mem, so 0 = enable
    ENABLE,
    DISABLE,
};

export enum GXColorSrc {
    SRC_REG,
    SRC_VTX
};

export enum GXCompare {
    NEVER,
    LESS,
    EQUAL,
    LEQUAL,
    GREATER,
    NEQUAL,
    GEQUAL,
    ALWAYS
};

export enum GXCompCnt {
    POS_XY = 0,
    POS_XYZ,

    NRM_XYZ = 0,
    NRM_NBT,
    NRM_NBT3,

    CLR_RGB = 0,
    CLR_RGBA,

    TEX_S = 0,
    TEX_ST
};

export enum GXCompType {
    U8,
    S8,
    U16,
    S16,
    F32,

    RGB565 = 0,
    RGB8,
    RGBX8,
    RGBA4,
    RGBA6,
    RGBA8
};

export enum GXCopyClamp {
    NONE,
    TOP,
    BOTTOM,
    ALL,
};

export enum GXCullMode {
    NONE,
    FRONT,
    BACK,
    ALL
};

export enum GXDiffuseFn {
    NONE,
    SIGN,
    CLAMP
};

export enum GXDirtyFlag {
    SU_TEX = (1 << 0),
    BP_MASK = (1 << 1),
    GEN_MODE = (1 << 2),
    VCD = (1 << 3),
    VAT = (1 << 4),

    AMB_COLOR0 = (1 << 8),
    AMB_COLOR1 = (1 << 9),
    MAT_COLOR0 = (1 << 10),
    MAT_COLOR1 = (1 << 11),
    CHAN_COLOR0 = (1 << 12),
    CHAN_COLOR1 = (1 << 13),
    CHAN_ALPHA0 = (1 << 14),
    CHAN_ALPHA1 = (1 << 15),
    TEX0 = (1 << 16),
    TEX1 = (1 << 17),
    TEX2 = (1 << 18),
    TEX3 = (1 << 19),
    TEX4 = (1 << 20),
    TEX5 = (1 << 21),
    TEX6 = (1 << 22),
    TEX7 = (1 << 23),
    NUM_COLORS = (1 << 24),
    NUM_TEX = (1 << 25),
    MTX_IDX = (1 << 26),
    PROJECTION = (1 << 27),
    VIEWPORT = (1 << 28),

    AMB_MAT_MASK = AMB_COLOR0 | AMB_COLOR1 |
                      MAT_COLOR0 | MAT_COLOR1,

    LIGHT_CHAN_MASK = CHAN_COLOR0 | CHAN_COLOR1 |
                         CHAN_ALPHA0 | CHAN_ALPHA1 |
                         NUM_COLORS,

    TEX_GEN_MASK = 0x2FF0000,
};

export enum GXDistAttnFn {
    OFF,
    GENTLE,
    MEDIUM,
    STEEP
};

export enum GXFogType {
    NONE,

    PERSP_LIN = 2,
    PERSP_EXP = 4,
    PERSP_EXP2 = 5,
    PERSP_REVEXP = 6,
    PERSP_REVEXP2 = 7,

    // Fourth bit is set to mark orthographic
    ORTHO_LIN = 1 << 3 | PERSP_LIN,
    ORTHO_EXP = 1 << 3 | PERSP_EXP,
    ORTHO_EXP2 = 1 << 3 | PERSP_EXP2,
    ORTHO_REVEXP = 1 << 3 | PERSP_REVEXP,
    ORTHO_REVEXP2 = 1 << 3 | PERSP_REVEXP2
};

// Access components of the fog type
function fogGetProj(x: number): number {
    return x >> 3 & 1;
};

function fogGetFSel(x: number): number {
    return x & 7;
};

export enum GXIndTexAlphaSel {
    OFF,
    S,
    T,
    U,

    MAX
};

export enum GXIndTexBiasSel {
    NONE,
    S,
    T,
    ST,
    U,
    SU,
    TU,
    STU,

    MAX
};

export enum GXIndTexFormat {
    ITF_8,
    ITF_5,
    ITF_4,
    ITF_3,

    MAX
};

export enum GXIndTexMtxID {
    OFF,
    ITM_0,
    ITM_1,
    ITM_2,

    S0 = 5,
    S1,
    S2,

    T0 = 9,
    T1,
    T2
};

export enum GXIndTexScale {
    ITS_1,
    ITS_2,
    ITS_4,
    ITS_8,
    ITS_16,
    ITS_32,
    ITS_64,
    ITS_128,
    ITS_256,

    MAX
};

export enum GXIndTexStageID {
    STAGE0,
    STAGE1,
    STAGE2,
    STAGE3,

    MAX
};

export enum GXIndTexWrap {
    OFF,
    ITW_256,
    ITW_128,
    ITW_64,
    ITW_32,
    ITW_16,
    ITW_0,

    MAX
};

export enum GXLightID {
    LIGHT0 = (1 << 0),
    LIGHT1 = (1 << 1),
    LIGHT2 = (1 << 2),
    LIGHT3 = (1 << 3),
    LIGHT4 = (1 << 4),
    LIGHT5 = (1 << 5),
    LIGHT6 = (1 << 6),
    LIGHT7 = (1 << 7),

    MAX = (1 << 8),
    NULL = 0
};

export enum GXLogicOp {
    CLEAR,
    AND,
    REVAND,
    COPY,
    INVAND,
    NOOP,
    XOR,
    OR,
    NOR,
    EQUIV,
    INV,
    REVOR,
    INVCOPY,
    INVOR,
    NAND,
    SET
};

export enum GXMtxType {
    MTX_3x4,
    MTX_2x4,
};

export enum GXPixelFmt {
    RGB8_Z24,
    RGBA6_Z24,
    RGBA565_Z16,
    Z24,
    Y8,
    U8,
    V8,
    YUV420,

    MAX
};

/**
 * Matrix column index into XF memory.
 * (Multiply by row dimension to get XF mem offset)
 */
export enum GXPosNrmMtx {
    PNMTX0 = 0,
    PNMTX1 = 3,
    PNMTX2 = 6,
    PNMTX3 = 9,
    PNMTX4 = 12,
    PNMTX5 = 15,
    PNMTX6 = 18,
    PNMTX7 = 21,
    PNMTX8 = 24,
    PNMTX9 = 27
};

export enum GXPrimitive {
    POINTS = 0xB8,
    LINES = 0xA8,
    LINESTRIP = 0xB0,
    TRIANGLES = 0x90,
    TRIANGLESTRIP = 0x98,
    TRIANGLEFAN = 0xA0,
    QUADS = 0x80,
};

export enum GXProjectionType {
    PERSPECTIVE,
    ORTHOGRAPHIC
};

export enum GXSpotFn {
    OFF,
    FLAT,
    COS,
    COS2,
    SHARP,
    RING1,
    RING2
};

export enum GXTevAlphaArg {
    APREV,
    A0,
    A1,
    A2,
    TEXA,
    RASA,
    KONST,
    ZERO,
    ONE
};

export enum GXTevBias {
    ZERO,
    ADDHALF,
    SUBHALF,

    MAX
};

export enum GXTevColorArg {
    CPREV,
    APREV,
    C0,
    A0,
    C1,
    A1,
    C2,
    A2,
    TEXC,
    TEXA,
    RASC,
    RASA,
    ONE,
    HALF,
    KONST,
    ZERO,
    TEXRRR,
    TEXGGG,
    TEXBBB,

    QUARTER = KONST
};

export enum GXTevColorChan {
    RED,
    GREEN,
    BLUE,
    ALPHA
};

export enum GXTevOp {
    ADD,
    SUB,

    COMP_R8_GT = 8,
    COMP_R8_EQ,
    COMP_GR16_GT,
    COMP_GR16_EQ,
    COMP_BGR24_GT,
    COMP_BGR24_EQ,
    COMP_RGB8_GT,
    COMP_RGB8_EQ,

    COMP_A8_GT = COMP_RGB8_GT,
    COMP_A8_EQ = COMP_RGB8_EQ
};

export enum GXTevRegID {
    TEVPREV,
    TEVREG0,
    TEVREG1,
    TEVREG2,

    MAX
};

export enum GXTevScale {
    SCALE_1,
    SCALE_2,
    SCALE_4,
    DIVIDE_2,

    MAX
};

export enum GXTevStageID {
    TEVSTAGE0,
    TEVSTAGE1,
    TEVSTAGE2,
    TEVSTAGE3,
    TEVSTAGE4,
    TEVSTAGE5,
    TEVSTAGE6,
    TEVSTAGE7,
    TEVSTAGE8,
    TEVSTAGE9,
    TEVSTAGE10,
    TEVSTAGE11,
    TEVSTAGE12,
    TEVSTAGE13,
    TEVSTAGE14,
    TEVSTAGE15,

    MAX
};

export enum GXTevSwapSel {
    SWAP0,
    SWAP1,
    SWAP2,
    SWAP3,

    MAX
};

export enum GXTevKAlphaSel {
    KASEL_8_8,
    KASEL_7_8,
    KASEL_6_8,
    KASEL_5_8,
    KASEL_4_8,
    KASEL_3_8,
    KASEL_2_8,
    KASEL_1_8,

    KASEL_1 = 0,
    KASEL_3_4 = 2,
    KASEL_1_2 = 4,
    KASEL_1_4 = 6,

    KASEL_K0_R = 16,
    KASEL_K1_R,
    KASEL_K2_R,
    KASEL_K3_R,
    KASEL_K0_G,
    KASEL_K1_G,
    KASEL_K2_G,
    KASEL_K3_G,
    KASEL_K0_B,
    KASEL_K1_B,
    KASEL_K2_B,
    KASEL_K3_B,
    KASEL_K0_A,
    KASEL_K1_A,
    KASEL_K2_A,
    KASEL_K3_A
};

export enum GXTevKColorID {
    KCOLOR0,
    KCOLOR1,
    KCOLOR2,
    KCOLOR3,

    MAX
};

export enum GXTevKColorSel {
    KCSEL_8_8,
    KCSEL_7_8,
    KCSEL_6_8,
    KCSEL_5_8,
    KCSEL_4_8,
    KCSEL_3_8,
    KCSEL_2_8,
    KCSEL_1_8,

    KCSEL_1 = 0,
    KCSEL_3_4 = 2,
    KCSEL_1_2 = 4,
    KCSEL_1_4 = 6,

    KCSEL_K0 = 12,
    KCSEL_K1,
    KCSEL_K2,
    KCSEL_K3,
    KCSEL_K0_R,
    KCSEL_K1_R,
    KCSEL_K2_R,
    KCSEL_K3_R,
    KCSEL_K0_G,
    KCSEL_K1_G,
    KCSEL_K2_G,
    KCSEL_K3_G,
    KCSEL_K0_B,
    KCSEL_K1_B,
    KCSEL_K2_B,
    KCSEL_K3_B,
    KCSEL_K0_A,
    KCSEL_K1_A,
    KCSEL_K2_A,
    KCSEL_K3_A
};

export enum GXTevMode {
    MODULATE,
    DECAL,
    REPLACE,
    PASSCLR,
    BLEND
};

export enum GXTexCoordID {
    TEXCOORD0,
    TEXCOORD1,
    TEXCOORD2,
    TEXCOORD3,
    TEXCOORD4,
    TEXCOORD5,
    TEXCOORD6,
    TEXCOORD7,

    MAX,
    NULL = 255
};

export enum GXTexFilter {
    NEAR,
    LINEAR,
    NEAR_MIP_NEAR,
    LIN_MIP_NEAR,
    NEAR_MIP_LIN,
    LIN_MIP_LIN,
};

export enum GXTexFmt {
    TF_I4,
    TF_I8,
    TF_IA4,
    TF_IA8,
    TF_RGB565,
    TF_RGB5A3,
    TF_RGBA8,
    TF_CMPR = 14,

    CTF_R4 = 32,
    CTF_RA4 = 34,
    CTF_RA8 = 35,
    CTF_YUVA8 = 38,
    CTF_A8 = 39,
    CTF_R8 = 40,
    CTF_G8 = 41,
    CTF_B8 = 42,
    CTF_RG8 = 43,
    CTF_GB8 = 44,

    TF_Z8 = 17,
    TF_Z16 = 19,
    TF_Z24X8 = 22,

    CTF_Z4 = 48,
    CTF_Z8M = 57,
    CTF_Z8L = 58,
    CTF_Z16L = 60,

    TF_A8 = CTF_YUVA8
};

export enum GXTexGenSrc {
    POS,
    NRM,
    BINRM,
    TANGENT,
    TEX0,
    TEX1,
    TEX2,
    TEX3,
    TEX4,
    TEX5,
    TEX6,
    TEX7,
    TEXCOORD0,
    TEXCOORD1,
    TEXCOORD2,
    TEXCOORD3,
    TEXCOORD4,
    TEXCOORD5,
    TEXCOORD6,
    COLOR0,
    COLOR1,
};

export enum GXTexGenType {
    MTX3x4,
    MTX2x4,
    BUMP0,
    BUMP1,
    BUMP2,
    BUMP3,
    BUMP4,
    BUMP5,
    BUMP6,
    BUMP7,
    SRTG
};

export enum GXTexMapID {
    TEXMAP0,
    TEXMAP1,
    TEXMAP2,
    TEXMAP3,
    TEXMAP4,
    TEXMAP5,
    TEXMAP6,
    TEXMAP7,
    MAX,

    NULL = 255,
    DISABLE
};

export enum GXTexMtx {
    // Any dimension (in standard XF matrix memory)
    // Enum represents base row of matrix
    TEXMTX0 = 30,
    TEXMTX1 = 33,
    TEXMTX2 = 36,
    TEXMTX3 = 39,
    TEXMTX4 = 42,
    TEXMTX5 = 45,
    TEXMTX6 = 48,
    TEXMTX7 = 51,
    TEXMTX8 = 54,
    TEXMTX9 = 57,
    IDENTITY = 60,
};

export enum GXPTTexMtx {
    // 3x4 matrices (in dual-tex / "post-matrix" XF matrix memory)
    // Enum represents base row of matrix
    PTTEXMTX0 = 64,
    PTTEXMTX1 = 67,
    PTTEXMTX2 = 70,
    PTTEXMTX3 = 73,
    PTTEXMTX4 = 76,
    PTTEXMTX5 = 79,
    PTTEXMTX6 = 82,
    PTTEXMTX7 = 85,
    PTTEXMTX8 = 88,
    PTTEXMTX9 = 91,
    PTTEXMTX10 = 94,
    PTTEXMTX11 = 97,
    PTTEXMTX12 = 100,
    PTTEXMTX13 = 103,
    PTTEXMTX14 = 106,
    PTTEXMTX15 = 109,
    PTTEXMTX16 = 112,
    PTTEXMTX17 = 115,
    PTTEXMTX18 = 118,
    PTTEXMTX19 = 121,
    PTIDENTITY = 125
};

export enum GXTexWrapMode {
    CLAMP,
    REPEAT,
    MIRROR,

    MAX
};

export enum GXTlut {
    TLUT0,
    TLUT1,
    TLUT2,
    TLUT3,
    TLUT4,
    TLUT5,
    TLUT6,
    TLUT7,
    TLUT8,
    TLUT9,
    TLUT10,
    TLUT11,
    TLUT12,
    TLUT13,
    TLUT14,
    TLUT15,

    BIGTLUT0,
    BIGTLUT1,
    BIGTLUT2,
    BIGTLUT3,
};

export enum GXTlutFmt {
    TL_IA8,
    TL_RGB565,
    TL_RGB5A3,

    MAX
};

export enum GXVtxFmt {
    VTXFMT0,
    VTXFMT1,
    VTXFMT2,
    VTXFMT3,
    VTXFMT4,
    VTXFMT5,
    VTXFMT6,
    VTXFMT7,

    MAX
};

export enum GXZFmt16 {
    ZC_LINEAR,
    ZC_NEAR,
    ZC_MID,
    ZC_FAR,
};

// From patent
export enum GXZTexOp {
    ZT_DISABLE,
    ZT_ADD,
    GZ_ZT_REPLACE,

    MAX
};
