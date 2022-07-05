<template>
  <div>
    <el-link type="primary" :href="noteUrl">跳转看云笔记</el-link>
    <br />
    <br />
    <div>测试可选链和vw适配</div>
    <div class="vw-test">
      测试.? template直接使用 --- $$(orderInfo, 'a', 'b', 'c', 'd') || '无' =>
      {{ $$(orderInfo, 'a', 'b', 'c', 'd') || '无' }}
    </div>
    <div class="vw-test-2">测试.? computed,methods等使用 --- this.orderInfo?.a?.b?.c?.d?.h || '无' => {{ getC }}</div>
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
<style lang="scss" scoped>
.vw-test {
  font-size: 28px;
}
.vw-test-2 {
  font-size: 32px;
}
</style>
