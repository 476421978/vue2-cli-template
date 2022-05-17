<template>
  <div>
    <el-link type="primary" :href="noteUrl">跳转看云笔记</el-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noteUrl: 'https://www.kancloud.cn/hlg_share/js_vue_egg/2646021'
    }
  }
}
</script>
