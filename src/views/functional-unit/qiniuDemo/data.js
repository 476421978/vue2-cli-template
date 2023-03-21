import qiniu from 'qiniu'
const getUploadToken = (keyToOverwrite) => {
  const accessKey = 'y3qcQs8Jxerj-tOud01y_NMjIna01EXIHh6OvkR7'
  const secretKey = 'ZbxJILDestcn0LqBelYXY7CKxOBzCOnfwYXiM7Vu'
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: 'hlgshare' + ':' + keyToOverwrite, // 开启覆盖上传
    expires: 7200
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}

export { getUploadToken }
