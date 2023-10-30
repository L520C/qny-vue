<template>
  <div class="all">
    <el-card>
      <div @mouseenter="playVideo" @mouseleave="pauseVideo" class="video-area">
        <video v-show="!showCover" ref="video" controls loop muted class="video-player"
        />
        <img v-show="showCover" class="cover" src="https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg">
      </div>
      <div class="video-message">
        <el-text>视频描述</el-text>
        <el-button>按钮</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import axios from 'axios';  // 确保你已经安装了 axios
import Hls from 'hls.js';

export default {
  name: "VideoItem",
  data() {
    return {
      showCover: true,
      videoInfo: {},
      currentVideoUrl: '',
      hls: null,
    };
  },
  mounted() {
    this.loadContent();
  },
  beforeDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  },
  methods: {
    async loadContent() {
      // 异步获取数据
      await axios.get("http://localhost:10002/video/randomVideo")
          .then(response => {
            this.videoInfo = response.data.data;
            this.currentVideoUrl = this.videoInfo.videoM3U8Url;
            this.loadVideo();
          }).catch(error => {
            console.log("错误信息=>", error)
            // alert("网络异常")
          })
    },
    loadVideo() {
      const video = this.$refs.video;
      const videoUrl = this.currentVideoUrl;

      // video.onloadeddata = () => {
      //   video.play().catch(error => {
      //     console.error('Playback failed:', error);
      //   });
      //   video.pause(); // 暂停播放
      // };

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
    playVideo() { // 播放视频
      this.showCover = false;
      if (this.$refs.video.readyState === 4) {
        this.$refs.video.play();
      }
    },
    pauseVideo() { // 鼠标离开，使用img
      if (this.$refs.video.readyState === 4) {
        this.$refs.video.pause();
      }
      this.showCover = true;
    },
  }
}
</script>

<style scoped>

.all {
  display: flex;
  flex-direction: column;
}

.video-player {
  width: 100%;
  height: auto;
}

img {
  width: 100%;
  height: auto;
}

.video-area {
  width: auto;
  height: 80%;
}

.video-message {
  width: auto;
  height: 20%;
}
</style>