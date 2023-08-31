<template>
  <div class="echart-bar">
    <v-chart class="chart" style="min-height: 300px; width: 100%" :option="optionBar" autoresize />
  </div>
</template>

<script>
// echat 图标
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components' // 组件
import { BarChart } from 'echarts/charts' // 条形图
import { optionBar } from '../data'
use([CanvasRenderer, GridComponent, BarChart])

export default {
  data() {
    return {
      optionBar
    }
  }
}
</script>

<style lang="scss" scoped>
.echart-bar {
  height: 100%;
  width: 100%;
}
</style>
