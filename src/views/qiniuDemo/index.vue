<template>
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      :action="domain"
      :http-request="upqiniu"
      :show-file-list="false"
      :before-upload="beforeUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { uploadToken } from './data'
import axios from 'axios'
export default {
  data() {
    return {
      imageUrl: '',
      token: {},
      domain: 'https://upload-z2.qiniup.com', // 华南2
      qiniuAddr: 'rdb357l8d.hn-bkt.clouddn.com' // 外联域名
    }
  },
  mounted() {
    console.log('uploadToken--->>>', uploadToken)
  },
  methods: {
    // 上传文件到七牛云
    upqiniu(req) {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyName = 'lytton' + new Date() + Math.floor(Math.random() * 100) + '.' + filetype

      // 前端直接生成上传凭证token
      const formdata = new FormData()
      formdata.append('file', req.file)
      formdata.append('token', uploadToken)
      formdata.append('key', keyName)

      // 获取到凭证之后再将文件上传到七牛云空间
      axios
        .post(this.domain, formdata, config)
        .then((res) => {
          this.imageUrl = 'http://' + this.qiniuAddr + '/' + res.data.key
          console.log(this.imageUrl)
        })
        .catch((err) => {
          console.log('err--->>>>', err)
        })
    },
    // 验证文件合法性
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #666 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
