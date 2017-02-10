# rollup-plugin-force-binding

Force all import bindings for a module to come from one absolute source.
Useful for bundles with [multiple entry points](https://github.com/rollup/rollup-plugin-multi-entry) that have shared dependencies at different absolute paths.

```js
// entry A
import SomeClass from 'some-dependency/src/SomeClass';
// resolved path: ~\path\to\A\node_modules\some-dependency\src\SomeClass

// entry B
import SomeClass from 'some-dependency/src/SomeClass';
// resolved path: ~\path\to\B\node_modules\some-dependency\src\SomeClass

// resulting in bundled duplicates
var SomeClass = (function () {})();
var EntryA = (function (_SomeClass) {})(SomeClass);

var SomeClass$2 = (function () {})();
var EntryB = (function (_SomeClass) {})(SomeClass$2);
```

## Install

```
$ npm i rollup-plugin-force-binding [--save-dev]
```

## Usage

If used in junction with [node-resolve](https://github.com/rollup/rollup-plugin-node-resolve), place force-binding BEFORE in the plugin array.

```js
import forceBinding from 'rollup-plugin-force-binding';

rollup.rollup({
  plugins: [
    forceBinding([
      // regular module
      'some-dependency',
      // pathed module (some-dependency/src/Asset.js)
      'Asset' // 'Asset.js' also valid
    ])
  ]
});
```

## Caveat
Rollup's plugin model does not expose the import names, only the paths.
```js
import { SomeClass, AnotherClass } from 'some-dependency';
```
As such, the above code cannot be deduped. This is why you must path to the source file. I have submitted a [feature request](https://github.com/rollup/rollup/issues/1301) to expose import names.

## License

MIT
