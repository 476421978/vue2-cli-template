<template>
  <div>
    <div>内容区：{{ editorHtml }}</div>
    <br />
    <EditorDemo @editor-change="editorChange" />
  </div>
</template>

<script>
import EditorDemo from '@/components/editor/wangEditor'
export default {
  components: {
    EditorDemo
  },
  data() {
    return {
      editorHtml: ''
    }
  },
  methods: {
    editorChange(val) {
      this.editorHtml = val
    }
  }
}
</script>
