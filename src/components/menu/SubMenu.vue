<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <ComIcon :icon="props.menuInfo.icon" />
      <span>{{ props.menuInfo.name }}</span>
    </span>
    <template v-for="item in props.menuInfo.childMenu">
      <a-menu-item v-if="!item.childMenu" :key="item.key">
        <span>{{ item.name }}</span>
      </a-menu-item>
      <sub-menu v-else :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
