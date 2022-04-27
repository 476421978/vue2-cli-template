<template>
  <a-modal v-model:visible="visible" :title="title.top || '标题'" :footer="null">
    <slot name="content">{{ title }}</slot>
  </a-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: Object,
      default: () => {
        return {
          top: '标题',
          cancel: '取消',
          sure: '确定'
        }
      }
    }
  },
  data() {
    return {
      visible: false,
      loading: false
    }
  },
  methods: {
    onShowModal() {
      this.visible = true
    },
    onHideModal() {
      this.visible = false
    }
  }
}
</script>
