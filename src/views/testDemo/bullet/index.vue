<template>
  <div class="main-box">
    <div v-for="item in barrageArr" class="box">
      <div class="item" :style="[{ transform: `translateX${boxHeight}px` }]" :item-line="item.line">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { barrageFactory } from './data.js'
export default {
  data() {
    return {
      boxHeight: 300,
      list: [
        {
          name: '1',
          line: 1
        },
        {
          name: '2',
          line: 2
        }
      ],
      barrageArr: []
    }
  },
  methods: {
    init() {
      this.barrageArr = []
      for (let i = 0; i < this.list.length; i++) {
        const element = new barrageFactory({ ...this.list[i] })
        this.barrageArr.push(element)
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@keyframes move {
  from {
    transform: translateX(-50px);
  }
  to {
    transform: translateX(300px);
  }
}
.main-box {
  margin: 0 auto;
  width: 300px;
  height: 200px;
  border: 1px solid red;
  .box {
    position: relative;
    .item {
      position: absolute;
      left: -50px;
      line-height: 50px;
      width: 50px;
      animation: move 3s linear;
    }
    .item[item-line='1'] {
      top: 0;
    }
    .item[item-line='2'] {
      top: 100px;
    }
  }
}
</style>
