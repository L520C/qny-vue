<template>
  <div class="all">
    <el-card>
      <div @mouseenter="playVideo" @mouseleave="pauseVideo" class="video-area">
        <video v-show="!showCover" ref="video" loop muted class="video-player"
        />
        <img v-show="showCover" class="cover" :src="coverSrc" alt="无资源">
      </div>
      <div class="video-message">
        <div>
          <el-text>{{ videoDescription }}</el-text>
        </div>
        <div class="video-auth">
          <div>
            <el-link :underline="false">@{{ auth }}</el-link>
          </div>
          <div style="margin-left: 10px">
            <el-text>{{ publishTime }}</el-text>
          </div>
        </div>

      </div>
    </el-card>

  </div>
</template>

<script>
import Hls from 'hls.js';
import {randomVideo} from "@/api/request"; // 使用封装好的axios

export default {
  name: "VideoItem",
  data() {
    return {
      auth: 'auth', // 作者名字
      publishTime: '10小时前', // 发布时间间隔
      videoDescription: '视频描述', // 视频描述
      showCover: true,
      videoInfo: {},
      currentVideoUrl: '',
      hls: null,
      coverSrc: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg',
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
      await randomVideo().then(res => {
        // console.log(res);
        this.videoInfo = res.data;
        this.currentVideoUrl = this.videoInfo.videoM3U8Url;
        this.loadVideo();
      }).catch(err => {
        console.log(err);
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
  height: 70%;
}

.video-message {
  width: auto;
  height: 30%;
}

.video-auth {
//float: left; display: flex; flex-direction: row;
}
</style>