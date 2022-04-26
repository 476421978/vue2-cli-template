<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  data () {
    return {
      editor: null,
      editorContent: '',
      menuArr: [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'indent', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        // 'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]
    }
  },
  methods: {
    /** 重置内容 */
    resetContent (content) {
      this.editor.txt.clear()
      this.editor.txt.html(content)
    },
    /**
     * 配置初始哈
     */
    init () {
      this.editor = new E(this.$refs.editor)
      this.editor.config.onchange = this.onchange()
      // 菜单去掉video
      this.editor.config.menus = this.menuArr
      // 上传图片到服务器
      this.editor.config.uploadImgServer = 'https://qycgs-vehicle-booking.ibangche.com/master_web/web_up_load_images'
      // 上传图片监听
      this.editor.config.uploadImgHooks = this.upImg()
      // 创建
      this.editor.create()
    },
    /**
     * 获取内容
     */
    onchange () {
      return (html) => {
        this.editorContent = html
        this.$emit('editorChange', this.editorContent)
      }
    },
    /**
     * 上传图片监听
     */
    upImg () {
      const that = this
      return {
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        customInsert: function (insertImg, result, editor) {
          // result 必须是一个 JSON 格式字符串！！！否则报错
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          if (result.code !== 200) {
            that.$message.error('上传失败')
            return
          }
          that.$message.success('上传成功')
          insertImg(result.result.url)
        }
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

</style>
