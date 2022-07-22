<template>
  <div id="page-panolens"></div>
</template>

<script>
import * as PANOLENS from 'panolens'
export default {
  data() {
    return {
      viewer_main: ''
    }
  },
  mounted() {
    this.init()
    this.round()
  },
  methods: {
    cube() {
      const imagesArr = [
        require('@/assets/home/left.png'), // 左面
        require('@/assets/home/right.png'), // 右面
        require('@/assets/home/top.png'), // 上面
        require('@/assets/home/bottom.png'), // 底面
        require('@/assets/home/front.png'), // 正面
        require('@/assets/home/back.png') // 背面  因为相机是在立方体内部望向z轴的负方向，所以实际先看到这个面
      ]
      const imagesArr2 = [
        // '@/assets/home/left.png', // 左面
        // '@/assets/home/right.png', // 右面
        // '@/assets/home/top.png', // 上面
        // '@/assets/home/bottom.png', // 底面
        // '@/assets/home/front.png', // 正面
        // '@/assets/home/back.png' // 背面  因为相机是在立方体内部望向z轴的负方向，所以实际先看到这个面
      ]
      // 传入六个方向的图片，也是来自官方示例
      const cube = new PANOLENS.CubePanorama(imagesArr)
      this.viewer_main.add(cube)
    },
    round() {
      // 传入官方案例的全景图片，初始化一个球形的全景
      const imgPath = new PANOLENS.ImagePanorama(require('./livingRoom.jpg'))
      // 把全景添加到场景中
      this.viewer_main.add(imgPath)
    },
    init() {
      // 初始化场景
      const dom = document.getElementById('page-panolens')
      this.viewer_main = new PANOLENS.Viewer({
        container: dom, // 传入父容器dom
        output: 'console' // 为了后面打印位置信息
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#page-panolens {
  height: 100vh;
  width: 100vw;
}
</style>
