import TModal from './src'

/* istanbul ignore next */
TModal.install = function (Vue) {
  Vue.component(TModal.name, TModal)
}

export {
  TModal
}
