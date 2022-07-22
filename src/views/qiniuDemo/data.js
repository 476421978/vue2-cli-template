// 后台Node.js SDK
// const qiniu = require('qiniu')
// import qiniu from 'qiniu'
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
