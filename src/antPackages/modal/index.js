import TAntModal from './src'

/* istanbul ignore next */
TAntModal.install = function (Vue) {
  Vue.component(TAntModal.name, TAntModal)
}

export {
  TAntModal
}
