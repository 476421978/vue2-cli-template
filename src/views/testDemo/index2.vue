<template>
  <div class="test-demo">
    <div id="container"></div>
  </div>
</template>

<script>
var map
export default {
  data() {
    return {
      num: 1,
      driverList: [],
      driverIndex: null, //
      isHideOther: false, // 隐藏其他label
      labelDefault: `
      <div class="marker-arrows">
        <img class="img" src="/xiangxia.png"  />
      </div>
      <div class="marker-points">
        <img class="img" src="/map_marker.png"/>
      </div>`
    }
  },
  methods: {
    init() {
      // map = new BMap.Map('container')
      // console.log('map-->>>', map)
      map = new BMap.Map('container', {
        coordsType: 5 // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
        // 指定完成后API将以指定的坐标类型处理您传入的坐标
      }) // 创建地图实例
      var point = new BMap.Point(116.404, 39.915) // 创建点坐标
      map.centerAndZoom(point, 15)
      // var point = new BMap.Point(116.404, 39.915)
      // map.centerAndZoom(point, 15)
      // var scaleCtrl = new BMap.ScaleControl() // 添加比例尺控件
      // map.addControl(scaleCtrl)
      // var zoomCtrl = new BMap.ZoomControl() // 添加缩放控件
      // map.addControl(zoomCtrl)
      // var cityCtrl = new BMap.CityListControl() // 添加城市列表控件
      // map.addControl(cityCtrl)
    },
    defaultMarker({ lat, lag, point, img }) {
      var pointMarker
      if (lat && lag) new BMap.Point(lat, lag)
      if (point) pointMarker = point
      if (!pointMarker) return false
      var marker
      if (img) {
        // 自定义图片
        var markerIcon = new BMap.Icon(
          require(`@/assets/${img === 'start' ? 'icon_up.png' : 'icon_down.png'}`),
          new BMap.Size(30, 42)
        )
        marker = new BMap.Marker(pointMarker, {
          icon: markerIcon,
          offset: new BMap.Size(0, -20) // 设置标注的偏移量
        })
      } else {
        // 默认图标
        marker = new BMap.Marker(pointMarker)
      }
      map.addOverlay(marker) // 将标注添加到地图中
      marker.addEventListener('click', function () {
        alert('您点击了标注')
      })
    },
    /**
     * 如何清除地图上的覆盖物？
     * 清除地图上所有的标记，用map.clearOverlays();
     * 清除单个标注iMarker，用map.removeOverlay(iMarker);
     * 显示和隐藏自定义覆盖物，可以继承overlay的hide();或者show()方法。
     *  */
    // 设置司机 label 标记
    setLabelMarker({ lat, lag, num = 3, name = '司机' }) {
      let pointLabel = new BMap.Point(lat, lag)
      let content = `
        <div class="map-marker-box">
          <img class="img" src='/icon_open_eye.png' />
          <span>${name}</span>
          <span>${num}</span>
        </div>
        ${this.labelDefault}
      `
      // 创建文本标注
      let label = new BMap.Label(content, {
        position: pointLabel, // 设置标注的地理位置
        offset: new BMap.Size(10, 10), // 设置标注的偏移量
        zIndex: 101
      })
      
      // 样式
      label.setStyle({
        color: '#333',
        background: 'transparent',
        border: 'none'
      })
      // 监听
      label.addEventListener('click', () => {
        if (!this.isHideOther) {
          label.disableMassClear()
          label.setContent(`
            <div class="map-marker-box">
              <img class="img" src='/icon_close_eye.png' />
              <span>${name}</span>
              <span>${num}</span>
            </div>
            ${this.labelDefault}
          `)
          map.clearOverlays()
          this.setOrderLine()
        } else {
          map.clearOverlays()
          label.enableMassClear()
          this.getOrderList() // 设置订单起点-终点连线
        }
        this.isHideOther = !this.isHideOther
      })
      label.addEventListener('mouseover', () => {
        label.setStyle({ color: 'red' })
      })
      label.addEventListener('mouseout', () => {
        label.setStyle({ color: '#333' })
      })
      map.addOverlay(label)
      return label
    },
    // label标记
    getOrderList() {
      for (let i = 0; i < 5; i++) {
        const num = 0.005 * i
        this.setLabelMarker({ lat: 116.404 + num, lag: 39.915 + num })
      }
    },
    // 设置订单开始-结束
    setOrderLine() {
      const startP = new BMap.Point(116.399, 39.91)
      this.defaultMarker({ point: startP, img: 'start' })

      const endP = new BMap.Point(116.425, 39.9)
      this.defaultMarker({ point: endP, img: 'end' })

      var polyline = new BMap.Polyline([startP, endP], {
        strokeColor: '#6d7278', //线颜色
        strokeOpacity: 0.8, //线透明度
        strokeWeight: 2, //线宽
        strokeStyle: 'dashed' //线样式
      })
      map.addOverlay(polyline)
    }
  },
  mounted() {
    this.init()
    this.getOrderList()
  }
}
</script>

<style lang="scss">
.map-marker-box {
  width: 200px;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #eaf0fe;
  border-radius: 4px;
  border: 1px solid #7dbde9;
  .img {
    width: 42px;
    height: 32px;
  }
}
.marker-arrows,
.marker-points {
  position: relative;
  height: 14px;
  .img {
    position: absolute;
    width: 24px;
    height: 14px;
    bottom: 1px;
    left: 10px;
  }
}
.marker-points {
  .img {
    bottom: 0;
  }
}
</style>

<style lang="scss" scoped>
.test-demo {
  margin: 0px;
  padding: 0px;
}
#container {
  height: 80vh;
  width: 100vw;
}
.fit-picture {
  width: 32px;
  height: 32px;
}
</style>
