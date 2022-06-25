// 获取随机数
export function randomString(length) {
  var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = ''
  for (var i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

export const chaining = {
  install(vue) {
    const optionalChaining = (obj, ...rest) => {
      let tmp = obj
      for (let key in rest) {
        let name = rest[key]
        tmp = tmp?.[name]
      }
      return tmp || ''
    }
    // 添加实例方法
    vue.prototype.$$ = optionalChaining
  }
}
