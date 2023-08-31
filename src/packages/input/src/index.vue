<template>
  <el-input :value="currentVal" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners" @input="(e) => $emit('input', e)" />
</template>

<script>
// :value 保持单项数据流
export default {
  name: 'TInput',
  // inheritAttrs: false, // 不希望组件的根元素继承 attribute
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: '默认输入提示'
    }
  },
  emits: ['input'],
  data() {
    return {
      currentVal: this.value
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentVal = val
      }
    }
  }
}
</script>
