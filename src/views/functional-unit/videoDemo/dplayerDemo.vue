<template>
  <div>
    <div ref="player"></div>
    <!-- <hls-demo></hls-demo> -->
  </div>
</template>

<script>
import hlsDemo from './components/hlsDemo.vue'
import DPlayer from 'dplayer'
import Hls from 'hls.js'
export default {
  name: 'Player',
  components: {
    'hls-demo': hlsDemo
  },
  data() {
    return {
      player: null,
      urlMp4: 'http://localhost:9090/video/mp4/output.mp4',
      urlM3u8: 'http://localhost:9090/video/m3u8/output.m3u8'
    }
  },
  methods: {
    payMp4() {
      this.player = new DPlayer({
        container: this.$refs.player,
        video: {
          url: this.urlMp4,
        },
      });
    },
    pyM3u8() {
      this.player = new DPlayer({
        container: this.$refs.player,
        video: {
          url: this.urlM3u8,
          type: 'customHls',
          customType: {
            customHls: function (video, player) {
              var videoSrc = this.urlM3u8;
              if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(video.src);
                hls.attachMedia(video);
              }
              else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoSrc;
              }
            },
          },
        },
      })
    }
  },
  mounted() {
    this.payMp4()
  },
  beforeDestroy() {
    this.player.destroy()
  }
}
</script>

<style scoped></style>
