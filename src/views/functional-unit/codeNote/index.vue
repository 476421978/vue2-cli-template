<template>
  <div>
    <div>测试可选链和vw适配</div>
    <div class="vw-test">
      测试.? template直接使用 --- $$(orderInfo, 'a', 'b', 'c', 'd') || '无' =>
      {{ $$(orderInfo, 'a', 'b', 'c', 'd') || '无' }}
    </div>
    <div class="vw-test-2">测试.? computed,methods等使用 --- this.orderInfo?.a?.b?.c?.d?.h || '无' => {{ getC }}</div>

    <br />
    <div class="theme-bg">
      <div class="theme-txt">文字 {{ globalSetting.theme }}</div>
      <button @click="onChangeTheme">切换</button>
    </div>

    <br />
    <div>
      <drag-verify ref="dragVerifyRef" @drag-event="onDragEvent" />
    </div>

    <br />
    <div>
      <drag-verify-img
        ref="dragVerify"
        :imgsrc="img"
        :isPassing.sync="isPassing"
        :showRefresh="true"
        text="请按住滑块拖动"
        successText="验证通过"
        handlerIcon="el-icon-d-arrow-right"
        successIcon="el-icon-circle-check"
        @refresh="refresh"
        @passcallback="passBack"
      >
      </drag-verify-img>
    </div>
  </div>
</template>

<script>
import { initTheme } from '@/styles/theme.js'
import dragVerify from '@/components/dragVerify'
import DragVerifyImg from '@/components/verifyImg'
export default {
  components: {
    'drag-verify': dragVerify,
    'drag-verify-img': DragVerifyImg
  },
  data() {
    return {
      img: '/images/verifyImg.png',
      isPassing: false,
      orderInfo: {
        a: {
          b: {
            c: 123
          }
        }
      }
    }
  },
  computed: {
    getC() {
      return this.orderInfo?.a?.b?.c?.d?.h || '无'
    }
  },
  methods: {
    passBack() {},
    refresh() {},
    onDragEvent(status) {
      status && this.Toast({ type: 'success', msg: '验证通过' })
    },
    onChangeTheme() {
      this.globalSetting.theme = this.globalSetting.theme === 'light' ? 'dark' : 'light'
      initTheme(this.globalSetting.theme)
    }
  },
  mounted() {
    initTheme(this.globalSetting.theme)
  }
}
</script>
<style lang="scss" scoped>
.vw-test {
  font-size: 28px;
}

.vw-test-2 {
  font-size: 32px;
}

.theme-bg {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  background: var(--bg);

  .theme-txt {
    color: var(--color);
  }
}
</style>
