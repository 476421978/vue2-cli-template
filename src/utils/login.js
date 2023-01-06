import API from '@/api'
import { getStorage } from '@/utils/storage'
import Store from '@/store/index'
import VueConfig from '@/config/config'

/**
 * 登录逻辑
 * @param {object} params
 * @param {string} params.account
 * @param {string} params.password
 * @returns {boolean}
 */
const UtiLogin = async (params) => {
  try {
    const res = await API.Login(params)
    if (!res) return
    Store.dispatch('saveUser', res) // 保存用户信息
    !getStorage('GLOBAL_SETTING') && Store.dispatch('saveGlobalSetting', VueConfig.GlobalSetting) // 初始化全局设置
    return res
  } catch (err) {
    return false
  }
}

// 退出 清除用户信息  跳转登录页
const UtiLoginOut = async () => {
  try {
    // 清除用户信息
    Store.dispatch('saveUser', null)
    return res
  } catch (err) {
    return false
  }
}

export default {
  UtiLogin,
  UtiLoginOut
}
