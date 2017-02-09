'use strict';

function forceBinding(moduleList) {
  var moduleLocations = {};
  var storeId = false;
  var moduleName = void 0;
  return {
    name: 'force-binding',
    resolveId: function resolveId(importee, importer) {
      // get the module name w/o file extension
      moduleName = importee.split(/[\/\\]/).pop().split('.')[0];
      if (~moduleList.indexOf(moduleName)) {
        // if true, tells load() to store the next path
        storeId = !moduleLocations.hasOwnProperty(moduleName);
        if (!storeId) {
          // return the forced binding if we have it
          return moduleLocations[moduleName];
        }
      }
      return null;
    },
    load: function load(id) {
      if (storeId) {
        moduleLocations[moduleName] = id;
        storeId = false;
      }
      // always return null, we're only modifying paths
      return null;
    }
  };
}

module.exports = forceBinding;
