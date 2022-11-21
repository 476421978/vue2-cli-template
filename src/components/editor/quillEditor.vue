<template>
  <div>
    <!--富文本编辑器组件 vant和quill-editor 未改造成element-->
    <quill-editor
      style="height: 500px"
      v-model="detailContent"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    >
      <!-- @change="onEditorChange($event)" -->
      <!-- @ready="onEditorReady($event)" -->
    </quill-editor>
    <!-- 上传图片 -->
    <van-uploader
      ref="vanUploaderRef"
      :before-read="file => beforeRead({ file, size: 2 })"
      :after-read="afterRead"
      style="visibility: hidden"
    />
  </div>
</template>

<script>
import { getUploadToken } from '@/components/editor/data'
import axios from 'axios'
import Compressor from 'compressorjs'
// 详情：https://github.com/NextBoy/skill/issues/2
// 引入样式和quillEditor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

// import Quill from 'quill'
// import ImageResize from 'quill-image-resize-module'
// Quill.register('modules/imageResize', ImageResize)
// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
  ['blockquote', 'code-block'], //引用，代码块
  [{ header: 1 }, { header: 2 }], // 几级标题
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表，无序列表
  [{ script: 'sub' }, { script: 'super' }], // 下角标，上角标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{ direction: 'rtl' }], // 文字输入方向
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 颜色选择
  [{ font: ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial'] }], // 字体
  [{ align: [] }], // 居中
  ['clean'], // 清除样式,
  ['link', 'image'] // 上传图片、上传视频
]

export default {
  name: 'LocalQuillEditor',
  // 注册 quillEditor
  components: {
    quillEditor
  },
  data() {
    return {
      detailContent: '', // 富文本内容
      editorOption: {
        placeholder: '请输入内容...',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: value => {
                if (value) {
                  this.$refs.vanUploaderRef.chooseFile()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
          // imageResize: {
          //   displayStyles: {
          //     backgroundColor: 'black',
          //     border: 'none',
          //     color: 'white'
          //   },
          //   modules: ['Resize', 'DisplaySize', 'Toolbar']
          // }
        }
      } // 富文本编辑器配置
    }
  },
  computed: {
    getDetailContent() {
      return this.detailContent
    }
  },
  methods: {
    onEditorBlur(quill) {
      // console.log("editor blur!", quill, this.content);
      //this.$emit("editorBlur", this.content);
      this.contentCode = this.content
    },
    onEditorFocus(quill) {
      this.contentCode = this.content
    },
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
    },
    // 上传图片前 压缩
    beforeRead({ file, size = 5 }) {
      return new Promise(resolve => {
        new Compressor(file, {
          convertSize: size,
          success: resolve,
          error(err) {
            this.$Notify({ type: 'danger', message: '图片压缩失败' })
          }
        })
      })
    },
    // 上传图片 5 * 1000000 = 5M
    afterRead(file) {
      const size = 5
      if (!/(jpg|jpeg|png|bmp|JPG|PNG)$/.test(file.file.type.split('/')[1])) {
        this.$Toast.fail('图片类型必须是jpeg,jpg,png,bmp中的一种')
        return false
      }
      // 此时可以自行将文件上传至服务器
      const that = this
      const str = new Date().getTime() + Math.random().toString(36).substr(2, 10)
      // 重命名要上传的文件
      const keyName = 'upload/business/' + str + '.' + file.file.type.split('/')[1]
      const formData = new FormData()
      formData.append('file', file.file)
      formData.append('token', getUploadToken())
      formData.append('key', keyName)

      if (file.file.size > size * 1000000) {
        this.$Notify({ type: 'danger', message: '图片超出限制大小' })
        return
      }

      this.$Toast.loading({
        duration: 0, // 持续
        message: '上传中...',
        forbidClick: true
      })
      axios
        .post('https://upload-z2.qiniup.com', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(res => {
          // 获取富文本组件实例
          let quill = this.$refs.myQuillEditor.quill
          // 如果上传成功
          if (res.status == 200) {
            // 获取光标所在位置
            let length = quill.getSelection().index
            // 插入图片  res.info为服务器返回的图片地址
            quill.insertEmbed(length, 'image', `https://image.gxptkc.com/${res.data.key}`)
            // 调整光标到最后
            quill.setSelection(length + 1)
          } else {
            this.$Notify({ type: 'danger', message: '图片插入失败，请重新上传' })
          }
        })
        .catch(err => {
          this.$Notify({ type: 'danger', message: '上传失败，请重新上传' })
        })
        .finally(() => {
          this.$Toast.clear()
        })
    }
  }
}
</script>

<style scoped lang="scss">
.editor {
  height: 500px;
}

::v-deep .ql-formats button {
  width: 32px;
  height: 32px;
}
</style>
