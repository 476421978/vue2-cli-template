<template>
  <div class="virtual-list">
    <VueVirtualScrollList :size="50" :remain="10" :benchmarks="[0, 10000]" :items="items">
      <template slot-scope="{ item }">
        <div class="item">{{ item }}</div>
      </template>
    </VueVirtualScrollList>
  </div>
</template>

<script>
import VueVirtualScrollList from 'vue-virtual-scroll-list'
export default {
  components: { VueVirtualScrollList },
  data() {
    return {
      items: [] // 数据源
    }
  },
  created() {
    // 模拟生成大量数据
    for (let i = 1; i <= 100000; i++) {
      this.items.push(i)
    }
  }
}
</script>

<style scoped>
.virtual-list .item {
  height: 50px;
  line-height: 50px;
}
</style>
