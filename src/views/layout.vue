<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :theme="globalSetting.theme">
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline" :theme="globalSetting.theme" @click="Location">
          <!-- 循环菜单列表 -->
          <template v-for="item in getMenuList">
            <a-menu-item v-if="!hasChild(item)" :key="item.key">
              <ComIcon :icon="item.icon" />
              <span>{{ item.name }}</span>
            </a-menu-item>
            <sub-menu v-else :menu-info="item" />
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <!-- 头部 -->
        <a-layout-header class="topMenu">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="user-wrapper">
            <a-dropdown :trigger="['hover']" placement="bottomRight">
              <div class="ant-dropdown-link" href="#">
                <img style="width: 42px; height: 42px; border-radius: 50%" src="@/assets/gif/user.gif" />
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="2" disabled>
                    <div>{{ stoUser ? stoUser.account : '' }}</div>
                  </a-menu-item>
                  <a-menu-item key="3">
                    <div @click="overloading">重载用户信息</div>
                  </a-menu-item>
                  <a-menu-item key="4">
                    <div @click="onChangePass">修改密码</div>
                  </a-menu-item>
                  <a-menu-item key="5">
                    <div @click="signOut">退出</div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </a-layout-header>
        <c-rumb :selectKey="selectedKeys[0]" />
        <!-- 主内容 -->
        <a-layout-content :style="{ margin: '12px 16px', padding: '24px', background: '#fff', minHeight: 'auto' }">
          <router-view />
          <a-anchor
            :affix="false"
            :wrapperStyle="{
              transition: '1s',
              '-moz-transition': '1s' /* Firefox */,
              '-webkit-transition': '1s' /* Safari and Chrome */,
              '-ms-transition': '1s' /* Safari */,
              transform: visible ? 'translateX(-256px)' : 'translateX(0)',
              position: 'fixed',
              top: '50%',
              right: '0',
              background: '#1890ff',
              padding: '5px',
              'border-radius': '4px 0 0 4px',
              cursor: 'pointer',
              'z-index': '888'
            }"
          >
            <img src="@/assets/setting/setting_white.png" style="width: 32px; height: 32px" @click="handleClick" />
          </a-anchor>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44122502000031"
            style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px"
            ><img src="../assets/备案图标.png" style="float: left" />
            <p style="float: left; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color: #939393">
              粤公网安备 44122502000031号
            </p></a
          >
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <setting-drawer ref="SettingDrawerRef" :visible.sync="visible" />
  </a-layout>
</template>

<script>
import { menuList } from '@/utils/menu.js'
import utilsL from '@/utils/login.js'
import { getMenuAllPath } from '@/utils/menu.js'
import SubMenu from '@/components/menu/SubMenu.vue'
import Crumb from '@/components/crumb/index.vue'
import ComIcon from '@/components/icon/index.vue'
import SettingDrawer from '@/components/theme/settingDrawer.vue'
export default {
  components: {
    'setting-drawer': SettingDrawer,
    'sub-menu': SubMenu,
    'c-rumb': Crumb,
    ComIcon
  },
  data() {
    return {
      collapsed: false,
      menuList,
      selectedKeys: ['0'],
      visible: false
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
    handleClick(e) {
      // e.preventDefault()
      this.visible = true
    },
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
            this.$router.push(`/layout/${element.path}`)
            return
          }
        })
      })
    },
    overloading() {
      utilsL.UtiLogin({
        account: this.stoUser.account
      })
      this.Toast({ type: 'success', msg: '重载信息成功' })
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
  font-size: 24px;
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

.ant-anchor-ink {
  display: none;
}

.topMenu {
  background: #fff;
  padding: 0;
  padding-right: 20px;
}
</style>
