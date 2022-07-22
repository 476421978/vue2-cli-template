<template>
  <div>
    <div id="three-container" />
  </div>
</template>

<script>
import DirectorRain from './scene/director'
export default {
  components: {
    DirectorRain
  },
  data() {
    return {}
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
