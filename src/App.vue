<template>
  <a-config-provider :locale="locale">
    <div style="min-height: 100vh">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
