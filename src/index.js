export default function forceBinding (moduleList) {
  let moduleLocations = {};
  let storeId = false;
  let moduleName;
  return {
    name: 'force-binding',
    resolveId (importee, importer) {
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
    load (id) {
      if (storeId) {
        moduleLocations[moduleName] = id;
        storeId = false;
      }
      // always return null, we're only modifying paths
      return null;
    }
  };
}
