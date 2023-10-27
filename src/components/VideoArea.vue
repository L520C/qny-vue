<template>
  <div class="container" @wheel="onWheel">
    <video ref="video" controls loop muted class="video-player"></video>
  </div>
</template>

<script>
import Hls from 'hls.js';
import axios from 'axios';  // 确保你已经安装了 axios

export default {
  data() {
    return {
      currentVideoUrl: '',
      hls: null,
    };
  },
  mounted() {
    this.fetchVideoUrl();
  },
  beforeDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  },
  methods: {
    async fetchVideoUrl() {
      try {
        // 替换为你的后端接口地址
        const response = await axios.get('http://localhost:10002/video/randomVideo');
        this.currentVideoUrl = response.data;  // 假设响应体中的视频 URL 在 'url' 字段中
        this.loadVideo();
      } catch (error) {
        console.error('Failed to fetch video URL:', error);
      }
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
    onWheel(event) {
      this.fetchVideoUrl();  // 每次滚动时，获取并加载新的视频 URL
    },
  },
};

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player {
  width: 80%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}
</style>
