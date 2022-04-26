import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// ant-desgin-vue按需引入
import '../src/components/antDesignVue/index.js'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
