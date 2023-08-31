<template>
  <div class="upload">
    <div>
      为了方便演示都是同一张 jpg | jpeg 图片上传覆盖(compressorjs压缩、vue-cropper裁剪)
      <img style="width: 50px; height: 50px" src="@/assets/upload_example.jpg" />
    </div>

    <el-upload class="avatar-uploader" :show-file-list="false" :action="domain" :http-request="upQiniu" :before-upload="beforeUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <div>外链地址：{{ imageUrl }}</div>

    <!-- 裁剪logo -->
    <el-dialog title="裁剪" :visible.sync="imageCut_pop" width="50%" height="800px" :before-close="onHideCut">
      <VueCropper class="vue-cropper-style" ref="cropper" v-bind="cropper" />
      <span slot="footer">
        <el-button @click="imageCut_pop = false">取 消</el-button>
        <el-button type="primary" :loading="upLoading" @click="onUploadQiniu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Compressor from 'compressorjs'
import { getUploadToken } from './data'
import axios from 'axios'
import dayjs from 'dayjs'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      imageUrl: '',
      token: {},
      domain: 'https://upload-z2.qiniup.com', // 华南2
      qiniuAddr: 'qiniu.hlgshare.top', // 外联域名
      // 裁剪
      imageCut_pop: false,
      upLoading: false,
      cropper: {
        img: '',
        // outputSize: '1', 裁剪生成图片的质量(0.1~1)
        // outputTyp: 'png', // 裁剪生成图片的格式
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        autoCrop: true, // 是否默认生成截图框
        // fixedBox: true, // 固定裁剪框
        canMove: true, // 上传图片是否可以移动
        canMoveBox: true // 截图框能否拖动
      }
    }
  },
  methods: {
    onShowCut() {
      this.imageCut_pop = true
    },
    onHideCut() {
      this.imageCut_pop = false
    },
    // 上传压缩
    beforeUpload(file) {
      return new Promise((resolve) => {
        new Compressor(file, {
          convertSize: 1,
          success: resolve,
          error(err) {
            this.Toast({ type: 'error', message: '图片压缩失败' })
          }
        })
      })
    },
    // 验证文件合法性，显示裁剪弹窗
    upQiniu(req) {
      const { file } = req
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }

      // jpg|jpeg|png|bmp|JPG|PNG
      if (!/(jpg|jpeg)$/.test(file.type.split('/')[1])) {
        this.$message.error('图片类型必须是jpg')
        return false
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.cropper.img = reader.result
        this.onShowCut()
      }
    },
    blobToFile(blob, fileName) {
      blob.lastModifiedDate = new Date()
      blob.name = fileName
      return blob
    },
    // 裁剪完成上传文件
    onUploadQiniu() {
      const that = this
      this.$refs.cropper.getCropBlob(async (blobFile) => {
        let filetype = ''
        if (blobFile.type == 'image/jpeg' || blobFile.type == 'image/jpg') {
          filetype = 'jpg'
        } else if (blobFile.type == 'image/png') {
          filetype = blobFile.type.split('/')[1]
        }
        // const keyName = `${dayjs().format('YYYY-MM-DD')}-${Math.random().toString(36).substr(2, 10)}.${filetype}`
        const keyName = `images/vue2.${filetype}`
        const file = this.blobToFile(blobFile, keyName)
        const token = getUploadToken(keyName)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('token', token)
        formData.append('key', keyName)

        this.upLoading = true
        // 获取到凭证之后再将文件上传到七牛云空间
        axios
          .post('https://upload-z2.qiniup.com', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then((res) => {
            that.imageUrl = `http://${that.qiniuAddr}/${res.data.key}`
            that.$message.success('上传成功')
            that.onHideCut()
          })
          .catch((err) => {
            that.$message.error('上传失败')
          })
          .finally(() => {
            that.upLoading = false
          })
      })
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

::v-deep .el-upload {
  border: 1px dashed #ccc;
}
.vue-cropper-style {
  width: 100%;
  height: 300px;
}
</style>
