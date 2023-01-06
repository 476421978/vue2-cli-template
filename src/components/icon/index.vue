<!-- ant-design v1 -->
<template functional>
  <a-icon  :type="props.icon" />
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
