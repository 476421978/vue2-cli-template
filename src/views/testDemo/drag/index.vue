<template>
  <div class="test-demo">
    <div class="check">
      <!-- 被校验区域 -->
      <div class="check-child" ref="checkChildRef"></div>
    </div>
    <div class="drag" ref="dragRef" @mouseleave="dragMouseLeave" @mousemove="dragMouseMove">
      <!-- 可拖动的盒子 -->
      <div class="drag-child" ref="dragChildRef" @mousedown.left="dragMouseDown" @mouseup="dragMouseUp" ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    getDragChild() {
      return this.$refs.dragChildRef
    },
    getDragRef() {
      return this.$refs.dragRef
    }
  },
  methods: {
    dragMouseLeave() {
      console.log('dragMouseLeave')
      this.getDragChild.removeEventListener('mousemove', this.dragMouseMove)
    },
    // dragMouseDown() {
    //   this.getDragRef.addEventListener('mousemove', this.dragMouseMove)
    // },
    dragMouseUp(e) {
      console.log('dragMouseUp')
      // this.getDragChild.removeEventListener('mousemove', this.dragMouseMove)
      this.getDragChild.style.animation = 'move 0.5s ease-in-out'
      // 动画结束监听回调
      const animationEnd = ()=>{
        console.log('animationEnd')
      }
      // 添加动画结束监听
      this.getDragChild.addEventListener("animationend", animationEnd)
    },
    dragMouseMove (e) {
      const  {clientX, offsetX, pageX} = e
      console.log('clientX, offsetX, pageX-->>>>', clientX, offsetX, pageX)
      if(offsetX < 0 || offsetX   > 200){
        return
      }
      this.getDragChild.style.transform = `translateX(${offsetX + 50}px)`
    },
    moveDragChild(e) {
      console.log('e', e)
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>


@keyframes move {
        to {
          transform: translateX(0);
        }
      }
.test-demo {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
}
.check {
  width: 300PX;
  height: 300PX;
  background-image: url('../../assets/upload_example.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  &::before {
    content: '';
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #fff;
    position: absolute;
    top: 150PX;
    left: 150PX;
  }
  .check-child {
    content: '';
    width: 50px;
    height: 50px;
    border: 1px solid #fff;
    background-image: inherit;
    background-repeat: inherit;
    background-size: 300PX 300PX;
    background-position: -150PX -150PX;
    position: absolute;
    top: 150PX;
    left: 10PX;
  }
}

/* 拖动条 */
.drag {
  width: 300PX;
  height: 50PX;
  background-color: #e3e3e3;
  margin-top: 10px;
  position: relative;
  .drag-child {
    width: 50PX;
    height: 50PX;
    background-color: aquamarine;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(100px);
  }
}
</style>
