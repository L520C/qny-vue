<template>
  <div class="video-all">
    <div @mouseenter="playVideo" @mouseleave="pauseVideo" class="video-area">
      <video v-show="!showCover" ref="video" loop muted class="video-player" :id="videoData.id"/>
      <img v-show="showCover" class="cover" :src="coverSrc" alt="无资源">
    </div>

    <div class="video-message">
      <table>
        <tr rowspan="2">
          <td colspan="2">
            <el-text>{{ videoData.title }} xxxxxx</el-text>
          </td>
        </tr>
        <tr>
          <td>
            <el-link :underline="false">@{{ videoData.auth }}</el-link>
          </td>
          <td>
            <el-text>{{ videoData.publishTime }}</el-text>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js';
import {randomVideo} from "@/api/request"; // 使用封装好的axios

export default {
  name: "VideoItem",
  data() {
    return {
      videoData: {
        id: 0,
        auth: 'auth', // 作者名字
        publishTime: '10小时前', // 发布时间间隔
        title: '视频描述', // 视频描述
        currentVideoUrl: '', // 视频地址
      },
      showCover: true,
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
        this.videoData.id = res.data.videoId;
        this.videoData.auth = res.data.videoAuthor;
        this.videoData.publishTime = res.data.publishTime;
        this.videoData.title = res.data.videoTitle;
        this.videoData.currentVideoUrl = res.data.videoM3U8Url;
        this.loadVideo();
      }).catch(err => {
        console.log(err);
      })
    },
    loadVideo() {
      const video = this.$refs.video;
      const videoUrl = this.videoData.currentVideoUrl;

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
    pauseVideo() { // 鼠标离开，暂停视频使用img
      if (this.$refs.video.readyState === 4) { // 如果视频已经加载完成
        this.$refs.video.pause();
      }
      this.showCover = true;
    },
  }
}
</script>

<style scoped>

.video-all {
  border-radius: 5px; /*圆角*/
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
//align-items: center;
}

.video-area {
  width: 100%;
  height: 70%;
  border-radius: 5px; /*圆角*/
}

.video-player {
  width: 100%;
  height: auto;
}

.video-message {
  width: auto;
  height: 50px;
  margin: 10px;
}

img {
  width: 100%;
  height: auto;
}


.video-auth {
//float: left; display: flex; flex-direction: row;
}
</style>