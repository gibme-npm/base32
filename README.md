# @gibme/base32

A simple, lightweight Base32 encoding/decoding library for Node.js using the standard [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648) alphabet (`ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`).

## Requirements

- Node.js >= 22

## Installation

```bash
npm install @gibme/base32
```

or

```bash
yarn add @gibme/base32
```

## Usage

```typescript
import Base32 from '@gibme/base32';

// Encode a hex string
const encoded = Base32.encode(
    '02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cfeb05f9d2');

console.log(encoded);
// ALAN5UV4D4JQL6YPVLC6NQB64OQZEQRUTBKCPNQWPSSWTUJ56Q2472YF7HJA====

// Decode back to a Buffer
const decoded = Base32.decode(encoded);

console.log(decoded.toString('hex'));
// 02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cfeb05f9d2
```

### Encoding without padding

```typescript
const encoded = Base32.encode(data, false);
// ALAN5UV4D4JQL6YPVLC6NQB64OQZEQRUTBKCPNQWPSSWTUJ56Q2472YF7HJA
```

### Encoding a Buffer or Uint8Array

```typescript
const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
const encoded = Base32.encode(buf);
// JBSWY3DP
```

### Encoding a string with a specific encoding

```typescript
const encoded = Base32.encode('Hello', true, 'utf-8');
```

## API

### `Base32.encode(data, padding?, encoding?)`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `data` | `string \| Uint8Array \| Buffer` | | The data to encode |
| `padding` | `boolean` | `true` | Whether to pad the output with `=` |
| `encoding` | `BufferEncoding` | `'hex'` | How to interpret string input |

Returns a Base32-encoded `string`.

### `Base32.decode(encoded)`

| Parameter | Type | Description |
|---|---|---|
| `encoded` | `string` | A Base32-encoded string (padded or unpadded) |

Returns a `Buffer` containing the decoded data. Throws `TypeError` on invalid characters. Decoding is case-insensitive.

## Documentation

Full API documentation is available at [https://gibme-npm.github.io/base32/](https://gibme-npm.github.io/base32/)

## License

MIT
