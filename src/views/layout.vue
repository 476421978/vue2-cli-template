<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark" @click="Location">
          <!-- 循环菜单列表 -->
          <template v-for="item in getMenuList">
            <a-menu-item v-if="!hasChild(item)" :key="item.key">
              <!-- <a-icon type="pie-chart" /> -->
              <span>{{ item.name }}</span>
            </a-menu-item>
            <sub-menu v-else :key="item.key" :menu-info="item" />
          </template>
        </a-menu>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script>
import { menuList } from '@/utils/menu.js'
import utilsL from '@/utils/login.js'
import { getMenuAllPath } from '@/utils/menu.js'
import CommonMixin from '@/mixins/common'
import SubMenu from '@/components/menu/SubMenu.vue'
export default {
  components: {
    'sub-menu': SubMenu
  },
  mixins: [CommonMixin],
  data() {
    return {
      collapsed: false,
      menuList,
      selectedKeys: ['0']
    }
  },
  computed: {
    // 获取菜单列表格式化
    getMenuList() {
      const userInfo = this.stoUser
      if (!userInfo) return []
      const userAuth = userInfo.vue_role.web_auth_arr || []
      const res = this.menuList
        .map((item) => {
          if (userAuth.includes(item.auth) || !item.auth) {
            return item
          }
        })
        .filter((obj) => {
          if (obj) return true
        })
      return res
    }
  },
  methods: {
    hasChild(item) {
      return item.childMenu && item.childMenu.length
    },
    // 跳转页面
    Location({ item, key }) {
      this.$nextTick(() => {})
      const menuList = getMenuAllPath()
      this.$nextTick(() => {
        menuList.forEach((element) => {
          if (element.key === this.selectedKeys[0]) {
            console.log('element-->>', element)
            this.$router.push(`/layout/${element.path}`)
            return
          }
        })
      })
    },
    overloading() {
      alert('重载信息')
    },
    onChangePass() {
      alert('修改密码')
    },
    signOut() {
      utilsL.UtiLoginOut()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
#components-layout-demo-custom-trigger {
  min-height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.user-wrapper {
  float: right;
  padding: 0 12px;
}
</style>
