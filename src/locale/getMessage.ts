import zh from './language/zh'
import en from './language/en'

// async function getLocal() {
//   let modules = {}
//   const modulesFiles = import.meta.glob( './language/**/*.ts' ) as Record<string, () => Promise<any>>;
//   for (const path in modulesFiles) {
//     const moduleName = path.replace( /(.*\/)*([^.]+).*/gi, '$2' )
//     const moduleDefaultExport = await modulesFiles[path]()
//     modules = {
//       ...modules,
//       [moduleName] : moduleDefaultExport.default
//     }
//   }
//   return modules
// }
const modules = { zh, en } // getLocal()

export default modules