<template>
  <div class="video-all">
    <div @mouseenter="playVideo" @mouseleave="pauseVideo" class="video-area" @click="bigVideo">
      <video v-show="!showCover" ref="video" loop muted :id="videoData.id" class="video-player"/>
      <img v-show="showCover" :src="coverSrc" alt="无资源" class="cover">
    </div>
    <div class="video-message">
      <div class="video-title">
        {{ videoData.videoTitle }}
      </div>
      <div>
        <el-link :underline="false">@{{ videoData.videoAuthor }}</el-link>
        <el-text style="margin-left: 10px">三天前</el-text>
      </div>
    </div>
    <el-dialog v-model="showBigVideo" :fullscreen="true" style="background-color: #161823;">
      <div class="video-content">
        <video-show :videoId="videoData.videoId"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Hls from 'hls.js';
import {randomVideo} from "@/api/request";
import VideoShow from "@/components/VideoShow.vue"; // 使用封装好的axios

export default {
  name: "VideoItem",
  components: {VideoShow},
  props: {
    videoData: {
      required: true,
      type: Object,
      default: () => {
        return {
          videoId: 0,
          videoAuthor: 'auth', // 作者名字
          publishTime: '10小时前', // 发布时间间隔
          videoTitle: '视频描述', // 视频描述
          videoM3U8Url: '', // 视频地址
          timeDesc: '', // 时间描述
        }
      }
    }
  },
  data() {
    return {
      showCover: true,
      hls: null,
      coverSrc: 'https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg',
      showBigVideo: false,
    };
  },
  mounted() {
    // this.loadContent();
    this.loadVideo();
  },
  created() {
    this.videoData.timeDesc = '三天前';
    let videoTitle = this.videoData.videoTitle;
    if (videoTitle && videoTitle.length > 10) {
      this.videoData.videoTitle = videoTitle.substring(0, 10) + '...';
    }
  },
  beforeDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  },
  methods: {
    loadVideo() {
      const video = this.$refs.video;
      const videoUrl = this.videoData.videoM3U8Url;

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
    pauseVideo() { // 鼠标离开，暂停视频使用img
      if (this.$refs.video.readyState === 4) { // 如果视频已经加载完成
        this.$refs.video.pause();
      }
      this.showCover = true;
    },
    bigVideo() {
      this.showBigVideo = true;
    }
  }
}
</script>

<style scoped>

.video-all {
  border-radius: 5px; /*圆角*/
  box-shadow: 0 2px 4px rgba(231, 222, 222, 0.1);
  display: flex;
  flex-direction: column;
//align-items: center;
}

.video-area {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player {
  width: 100%;
  height: 100%;
}

.cover {
  width: 100%;
  height: 100%;
}

.video-message {
  height: 30%;
  width: auto;
  margin: 5px;
  display: flex;
  flex-direction: column;
//justify-content: center;
}

img {
  width: 100%;
  height: auto;
}


.video-auth {
}

.video-title {
  font-size: 16px;
  font-weight: 600;
  color: #cbc7c7;
  margin-bottom: 10px;
}

.video-content {
  width: 100%;
  height: 85vh;
}
</style>