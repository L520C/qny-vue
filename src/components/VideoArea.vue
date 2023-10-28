<template>
  <div class="container" @wheel="onWheel">
    <video ref="video" controls loop muted class="video-player"></video>
    <div class="interactions">
      <div class="circle" @click="likeVideo">
        <img src="@/assets/image/video/路飞头像.png" alt="avatar" class="avatar" @mouseover="">
      </div>
      <div class="interaction" @click="likeVideo">
        <img src="@/assets/image/video/点赞(白色).png" alt="like" class="icon">
        <span class="count">{{ likeCount }}</span>
      </div>
      <div class="interaction" @click="openComments">
        <img src="@/assets/image/video/评论(白色).png" alt="comment" class="icon">
        <span class="count">{{ commentCount }}</span>
      </div>
      <div class="interaction" @click="shareVideo">
        <img src="@/assets/image/video/收藏(白色).png" alt="share" class="icon">
        <span class="count">{{ shareCount }}</span>
      </div>
      <div class="interaction" @click="reportVideo">
        <img src="@/assets/image/video/分享(白色).png" alt="report" class="icon">
        <span class="count">{{ reportCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js';
import axios from 'axios';

export default {
  data() {
    return {
      currentVideoUrl: '',
      hls: null,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      reportCount: 0,
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
        const response = await axios.get('http://localhost:10002/video/randomVideo');
        this.currentVideoUrl = response.data.data;
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
      this.fetchVideoUrl();
    },
    likeVideo() {
      this.likeCount++;
    },
    openComments() {
      this.commentCount++;
    },
    shareVideo() {
      this.shareCount++;
    },
    reportVideo() {
      this.reportCount++;
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
  width: 85%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.interactions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-left: 20px;
}

.interaction {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 25px;
  height: 25px;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 100px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.count {
  margin-top: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
</style>
