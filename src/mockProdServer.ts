import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from '../mock/user'
import homeMock from '../mock/home'
// export const mockModules = [...userMock, ...homeMock]
// const modules = import.meta.glob('../mock/*.ts');
// console.log('modules==', modules)
// const mockModules: any[] = [];
// Object.keys(modules).forEach((key) => {
//   console.log('key==', key)
//   mockModules.push(...modules[key].default);
// });
export async function setupProdMockServer(): Promise<void> {
  const mockModules = [...userMock, ...homeMock]
  createProdMockServer(mockModules)
}