# rollup-plugin-force-binding

Force all import bindings for a module to come from one absolute source.
Useful for bundles with [multiple entry points](https://github.com/rollup/rollup-plugin-multi-entry) that have shared dependencies at different absolute paths.


```js
// entry A
import SomeDependency from 'some-dependency';
// resolved path: ~\path\to\A\node_modules\some-dependency\...

// entry B
import SomeDependency from 'some-dependency';
// resolved path: ~\path\to\B\node_modules\some-dependency\...

// resulting in bundled duplicates
var SomeDependency = (function () {})();
var EntryA = (function (_SomeDependency) {})(SomeDependency);

var SomeDependency$2 = (function () {})();
var EntryB = (function (_SomeDependency) {})(SomeDependency$2);
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

## License

MIT
