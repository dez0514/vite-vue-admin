# Vue 3 + TypeScript + Vite

### ts开发过程类型会让我很烦。。
1. as 断言
2. 框架里面的 type, interface
3. tsconfig.json 配置
4. vite-env.d.ts 配置

### element plus 按需引入
[参考按需引入](https://element-plus.gitee.io/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)

### note
1. `element plus`按需引入时，`tsconfig.json`里的`include`里加上`auto-imports.d.ts`，
使用`Elmessage`这类组件时，不需要`import`，直接使用即可，`import`反而会导致message没有样式！！！
2. `vite-plugin-mock@3.0.0` 包有问题，会导致报错，降到2.9.8，使用@2.x的配置项。
3. `app.config.globalProperties` 使用 `getCurrentInstance` 获取
```js
// main.ts mount before
app.config.globalProperties.$http = xxx
// in vue setup
const { proxy } = getCurrentInstance();
// 使用： proxy.$http
// ts 配置 vite-env.d.ts
declare module '*.vue' {
  interface ComponentCustomProperties {
    $http: any  // app.config.globalProperties 上的自定义属性加在这
  }
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

4. 由于 `App.vue` 使用了 `el-config-provider` 且加了 `namespace="ep"`,命名空间，所有修改 `element`元素样式时，类名`class`都不是 `el`了，而是`ep`了 。

