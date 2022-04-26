<template>
  <div>
    <!-- <MenuUnfoldOutlined v-if="title === 'MenuUnfoldOutlined'" />
    <MenuFoldOutlined v-if="title === 'MenuFoldOutlined'" />
    <AppstoreOutlined v-if="title === 'AppstoreOutlined'" />
    <WarningOutlined v-if="title === 'WarningOutlined'" />
    <HomeOutlined v-if="title === 'HomeOutlined'" />
    <UserOutlined v-if="title === 'UserOutlined'" /> -->
    <a-icon type="down-circle" />
  </div>
</template>

<script>
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   AppstoreOutlined,
//   WarningOutlined,
//   HomeOutlined,
//   UserOutlined
// } from '@ant-design/icons-vue' // 图标
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
