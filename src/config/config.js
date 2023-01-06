export default {
  IsOpenSign: true, // 接口数据签名
  IsOpenAesParams: false, // 是否开启Aes加密 request
  IsOpenAesDec: false, // 是否开启Aes解密 response
  SignScript: 'Vue3', // 签名加密密钥
  GlobalSetting: {
    theme: 'light', // 菜单模式
    isShowCrumb: true, // 隐藏面包屑
    bgColorKey: '5', // 默认颜色
    layoutBar: 'left' // 导航栏
  }
}
