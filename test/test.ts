// Copyright (c) 2019-2022, Brandon Lehmann <brandonlehmann@gmail.com>
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

import * as assert from 'assert';
import { describe, it } from 'mocha';
import Base32 from '../src/base32';

describe('Test Base32', () => {
    const expectedRaw = Buffer.from(
        '02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cfeb05f9d2',
        'hex');

    const expectedEncoded = 'ALAN5UV4D4JQL6YPVLC6NQB64OQZEQRUTBKCPNQWPSSWTUJ56Q2472YF7HJA====';

    const expectedResponseNoPadding = expectedEncoded.replace(/=/g, '');

    it('Encoding', () => {
        const encoded = Base32.encode(expectedRaw);

        assert.deepEqual(encoded, expectedEncoded);
    });

    it('Encoding [No Padding]', () => {
        const encoded = Base32.encode(expectedRaw, false);

        assert.deepEqual(encoded, expectedResponseNoPadding);
    });

    it('Decoding', () => {
        const decoded = Base32.decode(expectedEncoded);

        assert.deepEqual(decoded, expectedRaw);
    });

    it('Decoding [No Padding]', () => {
        const decoded = Base32.decode(expectedResponseNoPadding);

        assert.deepEqual(decoded, expectedRaw);
    });
});
