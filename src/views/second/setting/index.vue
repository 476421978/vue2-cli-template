<template>
  <div class="setting">
    <a-tabs v-model:activeKey="activeKey" tabPosition="left">
      <a-tab-pane key="1" tab="基本设置">
        <h2>基本设置</h2>

        <a-form ref="formRef" layout="vertical" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item name="name" label="昵称">
            <a-input v-model:value="formState.name" placeholder="请输入昵称" />
          </a-form-item>

          <a-form-item name="describe" label="自我介绍">
            <a-textarea
              v-model:value="formState.describe"
              placeholder="请输入自我介绍"
              :auto-size="{ minRows: 2, maxRows: 5 }"
            />
          </a-form-item>

          <a-form-item name="email" label="电子邮件">
            <a-input v-model:value="formState.email" placeholder="请输入电子邮件@" />
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">更新</a-button>
            <a-button style="margin-left: 10px" @click="onCancel">重置</a-button>
          </a-form-item>
        </a-form>

        <div class="up-image">
          <a-avatar :size="64">
            <template #icon>
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <a-icon v-else type="user" />
            </template>
          </a-avatar>

          <a-upload
            v-model:file-list="fileList"
            class="margin-top"
            multiple
            action="/upload"
            :headers="headers"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <a-button>
              <a-icon type="user" />
              上传头像
            </a-button>
          </a-upload>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="安全设置" force-render>安全设置</a-tab-pane>
      <a-tab-pane key="3" tab="个性化">个性化</a-tab-pane>
      <a-tab-pane key="4" tab="账号绑定">账号绑定</a-tab-pane>
      <a-tab-pane key="5" tab="新消息通知">新消息通知</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CommonMixin from '@/mixins/common'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  mixins: [CommonMixin],
  data() {
    return {
      formState: {
        name: '',
        email: '',
        describe: ''
      },
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      },
      fileList: [],
      headers: {
        authorization: 'authorization-text'
      },
      activeKey: '1',
      imageUrl: '',
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.Toast({ type: 'success', msg: '更新成功' })
    },
    onCancel() {
      this.formState = {
        name: '',
        email: '',
        describe: ''
      }
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.Toast({ msg: `${info.file.name} 上传成功！.` })
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      } else if (info.file.status === 'error') {
        this.Toast({ type: 'error', msg: `${info.file.name} 上传失败.` })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('只支持jpeg/png格式')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片已超2M！')
      }
      return isJpgOrPng && isLt2M
    }
  }
}
</script>

<style lang="scss" scoped>
.up-image {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
