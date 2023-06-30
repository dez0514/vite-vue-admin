let modules = {}
const modulesFiles = import.meta.glob( './language/**/*.ts' ) as Record<string, () => Promise<any>>;

for (const path in modulesFiles) {
  const moduleName = path.replace( /(.*\/)*([^.]+).*/gi, '$2' )
  const moduleDefaultExport = await modulesFiles[path]()
  modules = {
    ...modules,
    [moduleName] : moduleDefaultExport.default
  }
}

export default modules