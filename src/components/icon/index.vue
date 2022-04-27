<template functional>
  <a-icon v-if="props.icon === 'HomeOutlined'" type="home" />
  <a-icon v-else-if="props.icon === 'MenuFoldOutlined'" type="setting" />
  <a-icon v-else-if="props.icon === 'WarningOutlined'" type="alert" />
  <a-icon v-else-if="props.icon === 'UserOutlined'" type="user" />
  <a-icon v-else-if="props.icon === 'Echart'" type="bar-chart" />
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
