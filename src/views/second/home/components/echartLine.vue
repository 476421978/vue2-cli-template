<template>
  <div class="echart-bar">
    <v-chart class="chart" :option="optionLine" autoresize />
  </div>
</template>

<script>
// echat 图标
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { optionLine } from '../data'
use([
  CanvasRenderer,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  UniversalTransition
])
export default {
  data() {
    return {
      optionLine
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
