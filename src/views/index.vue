<template>
  <div class="index">过渡页 正在加载中......</div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$router.push('/login')
    }, 1000)
  }
}
</script>
