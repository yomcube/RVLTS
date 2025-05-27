// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/revolution/OS/OSError.h
//   https://github.com/kiwi515/ogws/blob/master/src/revolution/OS/OSError.c

export enum OSErrorType {
    SYSTEM_RESET,
    MACHINE_CHECK,
    DSI,
    ISI,
    EXT_INTERRUPT,
    ALIGNMENT,
    PROGRAM,
    FP_UNAVAIL,
    DECREMENTER,
    SYSTEM_CALL,
    TRACE,
    PERF_MONITOR,
    IABR,
    SMI,
    THERMAL_INT,
    PROTECTION,
    FP_EXCEPTION,

    MAX
};
