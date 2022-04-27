module.exports = {
    extends: [
      'eslint-config-alloy/vue'
    ],
    // plugin: ['vue'],
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
      'vue/no-unused-components': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
      'vue/no-deprecated-functional-template': 'off',
      'vue/no-deprecated-slot-scope-attribute': 'off'
    },
  };