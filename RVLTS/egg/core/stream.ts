// kiwi515/ogws:
//   https://github.com/kiwi515/ogws/blob/master/include/egg/core/eggStream.h
//   https://github.com/kiwi515/ogws/blob/master/src/egg/core/eggStream.cpp
//
// vabold/Kinoko:
//   https://github.com/vabold/Kinoko/blob/main/source/egg/util/Stream.hh
//   https://github.com/vabold/Kinoko/blob/main/source/egg/util/Stream.cc

// TODO: Implement text mode

import { assert } from "utils/utils";

export enum Endian {
	BIG,
	LITTLE,
};

export class Stream {
	m_endian: Endian;
	m_index: number;

	constructor(endian: Endian = Endian.BIG) {
		this.setEndian(endian);
		this.m_index = 0;
	}

	setEndian(e: Endian) {
		this.m_endian = e;
	}
	get index(): number {
		return this.m_index;
	}

	read(size: number): Uint8Array { return new Uint8Array(); }
	write(input: Uint8Array) {}
	eof(): boolean { return false; }
	safe(size: number): boolean { return false; }
	bad(): boolean { return false; }

	skip(count: number) {
		this.m_index += count;
		assert(!this.bad());
	}
	jump(index: number) {
		this.m_index = index;
		assert(!this.bad());
	}

	/*************************/
	/*  READ/WRITE FUNCTIONS */
	/*************************/

	_read(size: number): DataView {
		assert(this.safe(size));
		let val = this.read(size);
		this.m_index += size;
		return new DataView(val.buffer);
	}

	_write(view: DataView) {
		assert(this.safe(view.byteLength));
		let buf = new Uint8Array(view.buffer);
		this.write(buf);
	}

	read_u8(): number {
		let val = this._read(1);
		return val.getUint8(0);
	}
	read_u16(): number {
		let val = this._read(2);
		return val.getUint16(0, !!this.m_endian);
	}
	read_u32(): number {
		let val = this._read(4);
		return val.getUint32(0, !!this.m_endian);
	}
	read_u64(): bigint {
		let val = this._read(8);
		return val.getBigUint64(0, !!this.m_endian);
	}
	read_s8(): number {
		let val = this._read(1);
		return val.getInt8(0);
	}
	read_s16(): number {
		let val = this._read(2);
		return val.getInt16(0, !!this.m_endian);
	}
	read_s32(): number {
		let val = this._read(4);
		return val.getInt32(0, !!this.m_endian);
	}
	read_s64(): bigint {
		let val = this._read(8);
		return val.getBigInt64(0, !!this.m_endian);
	}
	read_f32(): number {
		let val = this._read(4);
		return val.getFloat32(0, !!this.m_endian);
	}
	read_f64(): number {
		let val = this._read(8);
		return val.getFloat64(0, !!this.m_endian);
	}
}

export class RamStream extends Stream {
	m_buffer: Uint8Array;
	m_size: number;
	
	constructor(e: Endian = Endian.BIG, data: Uint8Array, size: number) {
		super(e);
		this.m_buffer = data == null ? new Uint8Array(size) : data;
		this.m_size = size;
	}

	eof(): boolean {
		return this.m_index == this.m_size;
	}
	safe(size: number): boolean {
		return this.m_index + size <= this.m_size;
	}
	bad(): boolean {
		return this.m_index > this.m_size;
	}

	read(size: number): Uint8Array {
		return new Uint8Array(this.m_buffer, this.m_index, size);
	}

	write(data: Uint8Array) {
		for (let i = 0; i < data.byteLength; i++) {
			this.m_buffer[this.m_index + i] = data[i];
		}
	}

	get data(): Uint8Array {
		return this.m_buffer;
	}
}
