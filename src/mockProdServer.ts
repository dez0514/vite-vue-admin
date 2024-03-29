import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from '../mock/user'
import homeMock from '../mock/home'
// async function creatMock() {
//   let mockModules: any = []
//   const modulesMockFiles = import.meta.glob('../mock/*.ts') as Record<string, () => Promise<any>>;
//   for (const path in modulesMockFiles) {
//     const moduleDefaultExport = await modulesMockFiles[path]()
//     mockModules.push(moduleDefaultExport.default)
//   }
//   return mockModules
// }

export function setupProdMockServer() {
  // const mockModules = await creatMock()
  const mockModulesData = [userMock, homeMock]
  createProdMockServer(mockModulesData)
}