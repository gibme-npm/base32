# Base32 Library

## Documentation

[https://gibme-npm.github.io/base32/](https://gibme-npm.github.io/base32/)

## Sample Code

```typescript
import Base32 from '@gibme/base32';

const encoded = Base32.encode(Buffer.from(
    '02c0ded2bc1f1305fb0faac5e6c03ee3a1924234985427b6167ca569d13df435cfeb05f9d2', 'hex').valueOf());

console.log(encoded);

const decoded = Base32.decode(encoded);

console.log(decoded.toString('hex'));
```
