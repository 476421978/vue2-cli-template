module.exports = {
  extends: ['eslint-config-alloy/vue'],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    // 自定义你的规则
    'vue/no-unused-components': 'off', // 未使用组件
    'vue/no-deprecated-slot-attribute': 'off', // vue2旧语法 slot
    'vue/no-deprecated-functional-template': 'off', // vue2 functional
    'vue/no-deprecated-slot-scope-attribute': 'off', // vue2旧语法
    'vue/no-deprecated-destroyed-lifecycle': 'off', // vue2旧生命周期
    'vue/no-deprecated-dollar-listeners-api': 'off', // vue2旧语法
    'vue/no-duplicate-attributes': 'off', // 重复class :class
    'vue/no-duplicate-attr-inheritance': 'off', // 重复继承根元素attribute
    'vue/vue/no-v-model-argument': 'off',
    'vue/attributes-order ': 'off', // template属性排序
    'vue/custom-event-name-casing': 'off', // 自定义事件名必须用 kebab-case 风格
    'vue/require-explicit-emits': 'off', // emits 属性必须包含 $emit() 中的值
    'vue/attributes-order': 'off', // 标签属性必须按规则排序
    // 安装postcss-px-to-viewport后的报错
    'vue/valid-attribute-name': 'off', // 属性名必须合法
    'vue/valid-model-definition': 'off' // model 的属性名必须合法
  }
}
