// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/egg/core/eggBitFlag.h

export class TBitFlag {
    value: number;

    constructor() {
        this.makeAllZero();
    }
    makeAllZero() {
        this.value = 0;
    }
    makeMask(bit: number): number {
        return 1 << bit;
    }
    
    on(mask: number): number {
        return this.value & mask;
    }
    set(mask: number) {
        this.value |= mask;
    }
    reset(mask: number) {
        this.value &= ~mask;
    }

    onBit(bit: number): number {
        return this.on(this.makeMask(bit));
    }
    setBit(bit: number) {
        this.set(this.makeMask(bit));
    }
    resetBit(bit: number) {
        this.reset(this.makeMask(bit));
    }

    toggleBit(bit: number) {
        if (!this.onBit(bit)) this.setBit(bit);
        else this.resetBit(bit);
    }
}
