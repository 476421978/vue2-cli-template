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
          <img
            class="theme-box"
            src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg"
            @click="onChange('theme', 'dark')"
          />
          <img v-if="getGolbalSetting.theme === 'dark'" class="theme-hook" src="@/assets/right_hook.png" />
        </a-tooltip>
      </a-col>
      <a-col :lg="12" :md="12" :sm="12" :xs="12">
        <a-tooltip>
          <template #title>光色菜单风格</template>
          <img
            class="theme-box"
            src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg"
            @click="onChange('theme', 'light')"
          />
          <img v-if="getGolbalSetting.theme === 'light'" class="theme-hook" src="@/assets/right_hook.png" />
        </a-tooltip>
      </a-col>
    </a-row>
    <br />
    </a-drawer>
</template>

<script>
export default {
  name: 'setting-drawer',
  props: {
    visible: Boolean
  },
  computed:{
    getGolbalSetting() {
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
    onChange(type, val) {
      let glbalSetting = this.getGolbalSetting
      glbalSetting[type] = val
      this.$store.dispatch('saveGlobalSetting', glbalSetting)
    },
    afterVisibleChange() {
    },
    onClose() {
      this.Visible = false
    }
  },
  created() {
  }
}
</script>

<style lang="scss">
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
  width: 20px;
  height: 20px;
  border-radius: 2px;
}
.bg-color-hook {
  position: absolute;
  bottom: 5px;
  left: 12px;
}
</style>
