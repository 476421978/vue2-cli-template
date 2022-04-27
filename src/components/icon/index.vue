<template functional>
  <a-icon v-if="props.icon === 'HomeOutlined'" type="home" />
  <a-icon v-else-if="props.icon === 'MenuFoldOutlined'" type="setting" />
  <a-icon v-else-if="props.icon === 'WarningOutlined'" type="alert" />
  <a-icon v-else-if="props.icon === 'UserOutlined'" type="user" />
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
