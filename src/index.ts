// Copyright (c) 2019-2023, Brandon Lehmann <brandonlehmann@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { Buffer } from 'buffer';

/** @ignore */
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export default abstract class Base32 {
    /**
     * Decodes the Base32 encoded string into a Buffer
     *
     * @param encoded
     */
    public static decode (encoded: string): Buffer {
        let end = encoded.length;

        while (encoded[end - 1] === '=') --end;

        const cstr = (end < encoded.length ? encoded.substring(0, end) : encoded).toUpperCase();

        const buffer = new ArrayBuffer(((cstr.length * 5) / 8) | 0);

        const arr = new Uint8Array(buffer);

        let bits = 0;

        let value = 0;

        let index = 0;

        for (let i = 0; i < cstr.length; i++) {
            const idx = ALPHABET.indexOf(cstr[i]);

            if (idx === -1) {
                throw new TypeError(`Invalid character found: ${cstr[i]}`);
            }

            value = (value << 5) | idx;

            bits += 5;

            if (bits >= 8) {
                bits -= 8;
                arr[index++] = value >>> bits;
            }
        }

        return Buffer.from(buffer);
    }

    /**
     * Encodes the data into Base32
     *
     * @param data
     * @param padding
     * @param encoding
     */
    public static encode (
        data: string | Uint8Array | Buffer,
        padding = true,
        encoding: BufferEncoding = 'hex'
    ): string {
        if (data instanceof Buffer) {
            data = data.valueOf();
        } else if (typeof data === 'string') {
            data = Buffer.from(data, encoding).valueOf();
        }

        let bits = 0;

        let value = 0;

        let result = '';

        for (let i = 0; i < data.length; i++) {
            value = (value << 8) | data[i];
            bits += 8;

            while (bits >= 5) {
                result += ALPHABET[(value >>> (bits - 5)) & 31];
                bits -= 5;
            }
        }

        if (bits > 0) {
            result += ALPHABET[(value << (5 - bits)) & 31];
        }

        const integral = 8 - result.length % 8;

        if (integral !== 8 && padding) {
            result += ''.padEnd(integral, '=');
        }

        return result;
    }
}

export { Base32, Buffer };
