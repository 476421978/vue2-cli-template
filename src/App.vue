<template>
  <a-config-provider :locale="locale">
    <div style="min-height: 100vh">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Updater } from '@/utils/upDater'
export default {
  data() {
    return {
      locale: zhCN
    }
  },
  mounted() {
    //实例化该类
    // const up = new Updater({
    //   timer: 3000
    // })
    // //未更新通知
    // up.on('no-update', () => {
    //   console.log('未更新')
    // })
    // //更新通知
    // up.on('update', () => {
    //   console.log('更新了')
    // })
  }
}
</script>
