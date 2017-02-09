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
        storeId = !moduleLocations.hasOwnProperty(moduleName);
        if (!storeId) {
          return moduleLocations[moduleName];
        }
      }
      return null;
    },
    load: function load(id) {
      if (storeId) {
        moduleLocations[moduleName] = id;
        console.log('Stored location for ' + moduleName + ': ' + id);
        storeId = false;
      }
      return null;
    }
  };
}

module.exports = forceBinding;
