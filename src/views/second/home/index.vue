<template>
  <div class="setting">
    <div style="padding: 20px; background-color: #ececec">
      <a-row :gutter="16">
        <template v-for="(item, index) in dataList">
          <a-col v-if="index === 0 || index === 1" :key="item.title" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <a-card :headStyle="headStyle" :title="item.title" size="small">
              <template #extra><a-icon type="rise" /></template>
              <div class="chart-card-content">
                <h2>{{ item.data }}</h2>
                <div>
                  较昨日新增：{{ item.extra.data }}
                  <a-icon type="arrow-up" style="color: red" />
                </div>
                <div>
                  较上周新增：{{ item.extra.data1 }}
                  <a-icon type="arrow-up" style="color: red" />
                </div>
              </div>
              <a-divider type="horizontal" class="margin-tb-sm" />
              <div class="flex justify-between">
                <span>{{ item.bottomTitle }}</span>
                <span>{{ item.totalSum }}</span>
              </div>
            </a-card>
          </a-col>
          <a-col v-if="index === 2" :key="item.title" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <a-card :headStyle="headStyle" :title="item.title" size="small">
              <template #extra><a-icon type="area-chart" /></template>
              <div class="chart-card-content">
                <h2>{{ item.data }}</h2>
                <a-progress :percent="item.extra.data" />
              </div>
              <a-divider type="horizontal" class="margin-tb-sm" />
              <div class="flex justify-between">
                <span>{{ item.bottomTitle }}</span>
                <span>{{ item.totalSum }}</span>
              </div>
            </a-card>
          </a-col>
          <a-col v-if="index === 3" :key="item.title" :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
            <a-card :headStyle="headStyle" :title="item.title" size="small">
              <template #extra><a-icon type="area-chart" /></template>
              <div class="chart-card-content">
                <h2>{{ item.data }}</h2>
                <EchartLine />
              </div>
              <a-divider type="horizontal" class="margin-tb-sm" />
              <div class="flex justify-between">
                <span>{{ item.bottomTitle }}</span>
                <span>{{ item.totalSum }}</span>
              </div>
            </a-card>
          </a-col>
        </template>
      </a-row>
    </div>

    <div class="bar">
      <a-card :loading="loading" :bordered="false" :body-style="{ padding: '0' }">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }">
          <template #tabBarExtraContent>
            <div class="flex justify-content align-center">
              <div class="extra-item">
                <a @click="timeIndexChange(0)">今日</a>
                <a @click="timeIndexChange(1)">本周</a>
                <a @click="timeIndexChange(2)">本月</a>
              </div>
              <a-range-picker :style="{ width: '256px' }" format="YYYY-MM-DD" :value="getDate" @change="dateChange" />
            </div>
          </template>

          <a-tab-pane key="1" tab="销售额">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <h4 :style="{ marginBottom: '20px' }">销售额排行榜</h4>
                <EchartBar />
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <RankList title="排行榜" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" tab="访问">
            <a-row>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <h4>访问排行榜</h4>
                <EchartBar />
              </a-col>
              <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
                <RankList title="排行榜" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<script>
import { dataList } from './data.js'
import moment from 'moment'
import RankList from './components/rankList.vue'
import EchartBar from './components/echartBar.vue'
import EchartLine from './components/echartLine.vue'

export default {
  components: {
    RankList,
    EchartBar,
    EchartLine
  },
  data() {
    return {
      dataList,
      headStyle: {
        color: 'red',
        'font-size': '14px',
        'line-height': '16px',
        height: '16px',
        color: 'rgba(0,0,0,.45)'
      },
      loading: false,
      rankList: [],
      startDate: moment().format('YYYY-MM-DD'), // 开始时间
      endDate: moment().format('YYYY-MM-DD'), // 结束时间
      timeIndex: 0
    }
  },
  computed: {
    getDate() {
      if (this.startDate && this.startDate) {
        return [moment(this.startDate, 'YYYY-MM-DD'), moment(this.endDate, 'YYYY-MM-DD')]
      }
      return []
    }
  },

  watch: {
    timeIndex() {
      switch (this.timeIndex) {
        case 0:
          this.startDate = moment().format('YYYY-MM-DD')
          this.endDate = moment().format('YYYY-MM-DD')
          break
        case 1:
          this.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD')
          this.endDate = moment().format('YYYY-MM-DD')
          break
        case 2:
          this.startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
          this.endDate = moment().format('YYYY-MM-DD')
          break
        case 3:
          this.startDate = null
          this.endDate = null
          break
        default:
          break
      }
    }
  },
  created() {
    // 销售/访问
    for (let i = 0; i < 7; i++) {
      this.rankList.push({
        name: '佛山' + (i + 1) + ' 号店',
        total: 1234.56 - i * 100
      })
    }
  },
  methods: {
    timeIndexChange(index) {
      this.timeIndex = index
    },
    // 日期选择
    async dateChange(date, dateString) {
      this.startDate = dateString[0]
      this.endDate = dateString[1]
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-card-content {
  height: 120px;
}

.extra-item {
  a {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
