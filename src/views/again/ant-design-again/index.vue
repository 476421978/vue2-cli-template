<template>
  <div>
    ant-design-agin
    <a-button type="primary" @click="onShow">弹窗</a-button>
    <DialogModal ref="DialogModalRef"></DialogModal>
  </div>
</template>

<script>
import DialogModal from '@/components/modal/dialogModal.vue'
export default {
  components: {
    DialogModal
  },
  data() {
    return {}
  },
  methods: {
    onShow() {
      this.$refs.DialogModalRef.onShowModal()
    }
  }
}
</script>

<style></style>
