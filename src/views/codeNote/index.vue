<template>
  <div>
    <div>测试.? template直接使用 ---  $$(orderInfo, 'a', 'b', 'c', 'd') || '无' => {{ $$(orderInfo, 'a', 'b', 'c', 'd') || '无' }}</div>
    <div>测试.? computed,methods等使用 --- this.orderInfo?.a?.b?.c?.d?.h || '无' => {{ getC }}</div>
    <el-link type="primary" :href="noteUrl">跳转看云笔记</el-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noteUrl: 'https://www.kancloud.cn/hlg_share/js_vue_egg/2646021',
      orderInfo: {
        a: {
          b: {
            c: 123
          }
        }
      }
    }
  },
  computed: {
    getC() {
      return this.orderInfo?.a?.b?.c?.d?.h || '无'
    }
  }
}
</script>
