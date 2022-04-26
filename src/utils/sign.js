// 前置需要内容
import qs from 'qs'
import { sha256 } from 'js-sha256'
import VueConfig from '@/utils/config'
// import { randomString } from '@/utils/common'

// 获取随机数
export function randomString(length) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

/** 获取时间戳 精确到秒 */
const getTimesTamp = () => {
  return Math.floor(Date.now() / 1000)
}

/** 获取16位随机字符串 随机数六位 + 时间戳秒十位 */
// const getRandomString = () => {
//   return `${randomString(6)}${getTimesTamp()}`
// }

/**
 * 签名算法
 * 签名结果值 = 签名算法（ 时间戳 + password + 序列化请求体 + 随机值 + 时间戳 ）
 * x-tif-signature = sha256(
 * x-tif-timestamp
 * + password
 * + Query.Stringify(body)
 * + x-tif-nonce
 * + x-tif- timestamp)
 * */
const signatureInterface = (reqData) => {
  const timeTamp = Math.floor(Date.now() / 1000)
  const randomStr = `${randomString(6)}${timeTamp}`
  const qsStringify = qs.stringify(reqData, {
    sort: (a, b) => a.localeCompare(b),
    encode: false
  })

  const signature = sha256(`${timeTamp}${VueConfig.SignScript}${qsStringify}${randomStr}`)

  return {
    vueSignature: signature,
    vueTimestamp: timeTamp,
    vueNonce: randomStr
  }
}

export default {
  signatureInterface
}
