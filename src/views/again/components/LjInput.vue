<template>
  <div class="lj-input">
    <input
      :class="{ 'is-disabled': disabled }"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :value="value"
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  name: 'LjInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['input'],
  methods: {
    handleInput(e) {
      // 这句代码是关键
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>
.is-disabled {
  cursor: not-allowed;
}
</style>
