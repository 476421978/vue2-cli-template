<template>
  <div>
    <video ref="videoPlayer" controls></video>
  </div>
</template>

<script>
import Hls from 'hls.js'
export default {
  name: 'HlsVideoPlayer',
  data() {
    return {
      videoSrc: 'http://1257120875.vod2.myqcloud.com/0ef121cdvodtransgzp1257120875/3055695e5285890780828799271/v.f230.m3u8'
    }
  },
  methods: {
    payHls() {
      const videoSrc = this.videoSrc;
      const video = this.$refs.videoPlayer
      if (Hls.isSupported()) {
        var hls = new Hls()
        hls.loadSource(videoSrc)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
        video.addEventListener('loadedmetadata', function () {
          video.play();
        })
      }
    }
  },
  mounted() {
    this.payHls()
  },
  beforeDestroy() {
    if (this.hls) {
      this.hls.destroy()
    }
  }
}

</script>

<style scoped></style>