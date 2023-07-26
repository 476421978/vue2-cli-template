<template>
  <div>
    <div class="map" id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {}
  },
  methods: {
    init() {
      const data_list = [
        {
          name: '江苏',
          value: 0
        },
        {
          name: '安徽',
          value: 1
        },
        {
          name: '湖北',
          value: 1
        },
        {
          name: '湖南',
          value: 0
        },
        {
          name: '广东',
          value: 1
        },
        {
          name: '浙江',
          value: 1
        },
        {
          name: '福建',
          value: 1
        },
        {
          name: '山东',
          value: 1
        },
        {
          name: '河南',
          value: 4
        },
        {
          name: '四川',
          value: 0
        },
        {
          name: '河北',
          value: 0
        },
        {
          name: '江西',
          value: 0
        },
        {
          name: '黑龙江',
          value: 1
        },
        {
          name: '陕西',
          value: 0
        },
        {
          name: '贵州',
          value: 0
        },
        {
          name: '吉林',
          value: 0
        },
        {
          name: '广西',
          value: 1
        },
        {
          name: '山西',
          value: 0
        },
        {
          name: '云南',
          value: 0
        },
        {
          name: '辽宁',
          value: 0
        },
        {
          name: '甘肃',
          value: 0
        },
        {
          name: '重庆',
          value: 0
        },
        {
          name: '内蒙古',
          value: 0
        },
        {
          name: '海南',
          value: 0
        },
        {
          name: '天津',
          value: 0
        },
        {
          name: '新疆',
          value: 0
        },
        {
          name: '上海',
          value: 2
        },
        {
          name: '宁夏',
          value: 0
        },
        {
          name: '青海',
          value: 0
        },
        {
          name: '北京',
          value: 0
        },
        {
          name: '西藏',
          value: 0
        }
      ]
      let new_data_list = data_list.map((item, index) => {
        return item.value
      })
      let data_list_max = Math.max(...new_data_list)
      var map_Chart = window.echarts.init(document.getElementById('map'))
      console.log('map_Chart', map_Chart)


      let option = {
        title: {
          text: '本群闸总鼠窝分布',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let num
            let showHtml = ''
            if (isNaN(params.value)) {
              num = '0'
            } else {
              num = params.value
            }
            showHtml += `
                        <span style="display: flex;">
                            ${'省份'}：${params.name}</br>
                            ${'鼠窝'}：${num}
                        </span>
                    `
            return showHtml
          }
        },

        dataRange: {
          x: 'left',
          y: 'bottom',
          min: 0,
          max: data_list_max,
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          inRange: {
            color: ['#d1e7fe', '#1989fa']
          }
        },
        series: [
          {
            name: '数据',
            type: 'map',
            mapType: 'china',
            roam: false,
            selectedMode: false,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    color: 'black'
                  }
                }
              },
              emphasis: {
                areaColor: '#95ec69',
                label: {
                  show: true
                }
              }
            },
            data: data_list
          }
        ]
      }
      map_Chart.setOption(option)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 100vh;
  width: 100vw;
}
// body {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #fff;
//   background: #323232;
// }
// #app {
// }
// .content {
//   margin: 60px auto 0;
//   width: 1000px;
// }
// .head {
//   margin-bottom: 50px;
// }
// .column {
//   float: left;
//   width: 50%;
// }
// table input {
//   font: inherit;
//   margin-bottom: 10px;
//   margin: 0;
//   outline: none;
//   padding: 8px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   float: left;
// }

// table {
//   display: block;
//   width: 100%;
//   overflow: auto;
//   word-break: normal;
//   word-break: keep-all;
//   -webkit-overflow-scrolling: touch;
// }
// table th {
//   font-weight: bold;
// }
// table th,
// table td {
//   padding: 0.5rem 1rem;
// }
// h1,
// h2 {
//   font-weight: normal;
// }

// ul {
//   list-style-type: none;
//   padding: 0;
// }

// li {
//   display: inline-block;
//   margin: 0 10px;
// }

// a {
//   color: #42b983;
// }
</style>
