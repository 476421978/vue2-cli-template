import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/permission'
import store from './store'
import {setStorage, getStorage, removeStorage, getAllStorage, clearStorage} from './utils/storage'

// 全局引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// ant-desgin-vue按需引入
import '../src/components/antDesignVue/index.js'
import Tui from './packages' // 二次封装组件

// 全局样式
import '../src/styles/base.css'

// 图表
import ECharts from 'vue-echarts'
import * as echarts from 'echarts' //引入echarts

// template 直接使用 可选链
import { chaining } from '@/utils/common'
Vue.use(chaining)

Vue.use(ElementUI)

// import avueFormDesign from 'avue-plugin-formdesign'
// import AvueUeditor from 'avue-plugin-ueditor'
// Vue.use(AvueUeditor);
// Vue.use(avueFormDesign);

// npm 引入模式
// import Avue from '@smallwei/avue';
// import '@smallwei/avue/lib/index.css';
// Vue.use(Avue);

// /public/cdn外部引入模式自动挂载Window下
Vue.use(window.AVUE, {
  size: 'medium',
  menuType: 'text'
})

// eslint-disable-next-line vue/component-definition-name-casing
Vue.component('v-chart', ECharts) //全局注册
Vue.prototype.$echarts = echarts //引入组件

// ant 二次封装
Vue.use(Tui)

Vue.config.productionTip = false // 阻止启动生产消息

// 全局变量
Vue.prototype.$isMobile = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
)
// store
Vue.prototype.$store = store
// storage
Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage 
Vue.prototype.$removeStorage = removeStorage 
Vue.prototype.$getAllStorage = getAllStorage 
Vue.prototype.$clearStorage = clearStorage 

// 模拟数据mock 会拦截请求
import '../mock/index.js'

// 全局混入[不推荐]
import CommonMixin from '@/mixins/common'
Vue.mixin(CommonMixin)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
