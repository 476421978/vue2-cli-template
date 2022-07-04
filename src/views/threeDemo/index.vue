<template>
  <div id="three-container"></div>
</template>

<script>
import DirectorRain from './rain/scene/director'
export default {
  components: {
    DirectorRain
  },
  data() {
    return {
      editorHtml: ''
    }
  },
  mounted() {
    new DirectorRain()
  }
}
</script>

<style lang="scss">
#three-container {
  width: 100vw;
  height: 100vh;
}
</style>
