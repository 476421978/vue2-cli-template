<template>
  <div class="empty">
    <div>
      <img src="@/assets/img_500.png" />
    </div>
    <a-button type="primary" @click="goBack">返回首页</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      router.push('/layout')
    }
  }
}
</script>

<style lang="scss">
.empty {
  text-align: center;
  img {
    width: 500px;
    height: 500px;
  }
}
</style>
