import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
// import userMock from '../mock/user'
// import homeMock from '../mock/home'
let mockModules: any = []
async function creatMock() {
  const modulesMockFiles = import.meta.glob('../mock/*.ts') as Record<string, () => Promise<any>>;
  for (const path in modulesMockFiles) {
    const moduleDefaultExport = await modulesMockFiles[path]()
    mockModules.push(moduleDefaultExport.default)
  } 
}
creatMock()

export async function setupProdMockServer(): Promise<void> {
  const mockModulesData = [...mockModules]
  createProdMockServer(mockModulesData)
}