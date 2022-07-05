// 后台Node.js SDK
// const qiniu = require('qiniu')
// 创建上传凭证
const accessKey = 'y3qcQs8Jxerj-tOud01y_NMjIna01EXIHh6OvkR7'
const secretKey = 'ZbxJILDestcn0LqBelYXY7CKxOBzCOnfwYXiM7Vu'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'hlg-share-file',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
export const uploadToken = putPolicy.uploadToken(mac)

// const CryptoJS = require('crypto-js')
// let timestamp = new Date().getTime() // 当前的时间戳
// timestamp = parseInt(timestamp / 1000) + 36000
// let putPolicy = { scope: 'hlg-share-file', deadline: timestamp }
// let encodedPutPolicy = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(putPolicy)))
// let encodedSign = CryptoJS.enc.Base64.stringify(
//   CryptoJS.HmacSHA1(encodedPutPolicy, 'ZbxJILDestcn0LqBelYXY7CKxOBzCOnfwYXiM7Vu')
// ) // 第一个参数为加密字符串，第二个参数为公共秘钥
// let token = 'y3qcQs8Jxerj-tOud01y_NMjIna01EXIHh6OvkR7' + ':' + encodedSign + ':' + encodedPutPolicy

// module.exports = {
//   uploadToken: token
// }
