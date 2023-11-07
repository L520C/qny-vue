<template>
  <div style="margin: 0;padding: 0;width: 100%;height: 100%">
    <video ref="video" controls loop muted class="videoPlayer"></video>
  </div>
</template>

<script >
import Hls from 'hls.js';
import axios from 'axios';
export default {
  props: {
    videoId: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      videoInfo:{},
      currentVideoUrl:''
    }
  },
  mounted() {
      this.load();
  },
  methods:{
    load(){
      axios.get('/api/video/video/getVideo/' + this.videoId)
          .then(response => {
            this.videoInfo = response.data.data;
            this.currentVideoUrl = this.videoInfo.videoM3U8Url;
            this.loadVideo();
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },
    loadVideo() {
      const video = this.$refs.video;
      const videoUrl = this.currentVideoUrl;

      video.onloadeddata = () => {
        video.play().catch(error => {
          console.error('Playback failed:', error);
        });
      };

      if (Hls.isSupported()) {
        if (this.hls) {
          this.hls.destroy();
        }
        this.hls = new Hls();
        this.hls.loadSource(videoUrl);
        this.hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
      }
    },
  }
}
</script>

<style scoped>
.videoPlayer{
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 30px;
  background-color: rgba(85, 82, 82, 0.3);
  /* 在四个方向上添加阴影来创造出3D立体效果 */
  box-shadow:
      2px 2px 2px rgba(85, 82, 82, 0.1), /* 右下阴影 */
      -2px -2px 2px rgba(85, 82, 82, 0.1), /* 左上阴影 */
      -2px 2px 2px rgba(85, 82, 82, 0.1), /* 左下阴影 */
      2px -2px 2px rgba(85, 82, 82, 0.1); /* 右上阴影 */
}
</style>