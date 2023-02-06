<template>
  <div class="login-container">
    <!-- 背景图 -->
    <div ref="loginWrapper" class="login-bg-wrapper">
      <img :src="$isMobile ? ImageMobileBg1 : ImageBg1" />
    </div>
    <!-- 登录框 -->
    <div class="flex justify-center form-wrapper">
      <div class="left"></div>
      <div class="right">
        <div class="my-width flex-sub flex justify-center align-center">
          <div class="logo-wrapper">
            <img src="@/assets/work_logo.png" />
          </div>
          <div class="title margin-left">展示系统</div>
        </div>
        <div class="form-container">
          <div class="item-wrapper">
            <a-input v-model:value="account" placeholder="请输入账号" />
          </div>
          <div class="item-wrapper margin-top-lg">
            <a-input-password v-model:value="password" placeholder="请输入密码" />
          </div>
          <div class="flex-sub"></div>
          <div class="margin-top-lg">
            <a-button type="primary" class="login" :loading="loading" @click="onLogin"> 登录 </a-button>
          </div>
        </div>
        <div class="my-width flex-sub margin-top">
          <div class="flex justify-between">
            <a-checkbox v-model:checked="autoLogin">自动登录</a-checkbox>
            <a-tooltip>
              <template slot="title"> admin </template>
              <div>密码提示？</div>
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer">CopyRight@{{getVersion}}</div>
  </div>
</template>

<script>
import ImageBg1 from '@/assets/img_login_bg_01.jpg'
import ImageMobileBg1 from '@/assets/img_login_mobile_bg_01.jpg'
import CommonMixin from '@/mixins/common'
import utilsL from '@/utils/login'
import dayjs from 'dayjs'
export default {
  mixins: [CommonMixin],
  data() {
    return {
      ImageBg1,
      ImageMobileBg1,
      account: 'admin',
      password: '123456',
      loading: false,
      autoLogin: true
    }
  },
  mounted: {
    getVersion() {
      return dayjs().format('YYYYMMDD')
    }
  },
  methods: {
    dataCheck() {
      try {
        if (!this.verifyReg(this.account, 'accountReg')) throw '请输入正确的账号'
        if (!this.verifyReg(this.password, 'passwordReg')) throw '请输入正确的密码'
        return {
          account: this.account,
          password: this.password
        }
      } catch (error) {
        this.Toast({ type: 'error', msg: error })
        return false
      }
    },
    async onLogin() {
      this.loading = true
      try {
        const params = this.dataCheck()
        if (!params) return
        const res = await utilsL.UtiLogin(params)
        if (res) {
          this.Toast({ msg: '登录成功' })
          this.$router.push('/layout')
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  // 背景图
  .login-bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover; // 对图片进行剪切，保留原始比例
    }
  }

  // 登录图标
  .logo-wrapper {
    & img {
      width: 50px;
    }
    & img::after {
      content: '欢迎来到管理系统';
    }
  }
  // 登录框
  .form-wrapper {
    position: absolute;
    top: 18.5%;
    left: 0;
    right: 0;
    bottom: 15.8%;
    // 根据宽度选择样式
    @media screen and (max-width: 768px) {
      .left {
        display: none;
      }
      .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 80%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #34495e;
          text-shadow: 0 0 0.2em #41b883, -0 -0 0.2em #41b883;
        }
        .form-container {
          width: 80%;
          min-height: 60%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 992px) {
      .left {
        display: none;
      }
      .right {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #5497ff;
        }
        .form-container {
          width: 50%;
          height: 60%;
          margin-bottom: 10%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 992px) {
      .left {
        display: block;
        flex: 1;
      }
      .right {
        margin-left: 10%;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          font-size: 24px;
          font-weight: bold;
          color: #5497ff;
        }
        .item-wrapper {
          width: 48%;
        }
        .login {
          width: 48%;
        }
      }
    }
  }

  .footer{
    position: fixed;
    bottom: 1%;
    left: 50%;
    color: #ccc;
  }
}
</style>
