import { TModal } from './modal'
import { TInput } from './input'
import { TSearch } from './search'

// 存储组件列表
const components = [TModal, TInput, TSearch]

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return
  install.installed = true
  // 遍历注册全局组件
  components.map((component) => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  ...components, // 按需引入
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install
}
