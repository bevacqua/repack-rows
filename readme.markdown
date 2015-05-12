# repack-rows

> Rebundle unpacked Browserify bundles with optional mockups

# Install

Get it from `npm`

```bash
npm install repack-rows --save
```

# Usage

```js
var unpack = require('browser-unpack');
var repack = require('repack-rows');
var rows = unpack(bundle);
var main = repack(rows);
```

# `repack(rows, mockups?)`

Takes the `rows` output from [browser-unpack][1] and leverages [proxyquire][2] to rebundle the fragmented Browserify bundle. No external dependencies are necessary, and you can in fact provide `mockups` for dependencies you need to mock.

This makes `repack-rows` ideal in testing scenarios where you need to assert whether a bundle conforms to certain specifications without necessarily having to look at the actual source code that was used to compile said bundle.

# License

MIT

[1]: https://github.com/substack/browser-unpack
[2]: https://github.com/thlorenz/proxyquire
