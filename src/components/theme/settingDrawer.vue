<template>
  <a-drawer
    title="全局设置"
    placement="right"
    :closable="false"
    :visible="Visible"
    :after-visible-change="afterVisibleChange"
    @close="onClose"
  >
    <h3>整体风格设置</h3>
    <a-row>
      <a-col :lg="12" :md="12" :sm="12" :xs="12">
        <a-tooltip>
          <template #title>暗色菜单风格</template>
          <img class="theme-box" src="@/assets/setting/1.svg" @click="onChange('theme', 'dark')" />
          <img v-if="getGlobalSetting.theme === 'dark'" class="theme-hook" src="@/assets/setting/right_hook.png" />
        </a-tooltip>
      </a-col>
      <a-col :lg="12" :md="12" :sm="12" :xs="12">
        <a-tooltip>
          <template #title>光色菜单风格</template>
          <img class="theme-box" src="@/assets/setting/2.svg" @click="onChange('theme', 'light')" />
          <img v-if="getGlobalSetting.theme === 'light'" class="theme-hook" src="@/assets/setting/right_hook.png" />
        </a-tooltip>
      </a-col>
    </a-row>
    <br />

    <h3>全屏</h3>
    <a-row>
      <a-col :lg="24" :md="24" :sm="24" :xs="24">
        <a-icon v-if="isFullscreen" type="fullscreen"  @click="onScreen"  />
        <a-icon v-else type="fullscreen-exit"  @click="onScreen" />
      </a-col>
    </a-row>
  </a-drawer>
</template>

<script>
import { bgColor } from './data'
import screenfull from 'screenfull'
export default {
  name: 'setting-drawer',
  props: {
    visible: Boolean
  },
  components: {
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  computed: {
    getBgColor() {
      return bgColor
    },
    getGlobalSetting() {
      return this.$store.getters.getGlobalSetting
    },
    Visible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    onScreen() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
      this.isFullscreen = screenfull.isFullscreen
    },
    onChange(type, val) {
      let globalSetting = this.getGlobalSetting
      globalSetting[type] = val
      this.$store.dispatch('saveGlobalSetting', globalSetting)
    },
    afterVisibleChange() {},
    onClose() {
      this.Visible = false
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.theme-box {
  position: relative;
  display: block;
}
.theme-hook {
  position: absolute;
  bottom: 10px;
  left: 30px;
}
.bg-color-box {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 2px;
}
.bg-color-hook {
  position: absolute;
  bottom: 3px;
  left: 6px;
}
</style>
