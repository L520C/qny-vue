<template>
  <div class="container" @wheel="onWheel">
    <video ref="video" controls loop muted class="video-player"></video>
    <div class="interactions">
      <div class="circle" @click="likeVideo">
        <img src="@/assets/image/video/路飞头像.png" alt="avatar" class="avatar">
      </div>
      <div class="interaction" @click="likeVideo">
        <img :src=likeUrl alt="like" class="icon">
        <span class="count">{{ likeCount }}</span>
      </div>
      <div class="interaction" @click="openComments">
        <img src="@/assets/image/video/评论(白色).png" alt="comment" class="icon">
        <span class="count">{{ commentCount }}</span>
      </div>
      <div class="interaction" @click="collectVideo">
        <img :src=collectUrl alt="collect" class="icon">
        <span class="count">{{ collectCount }}</span>
      </div>
      <div class="interaction" @click="shareVideo">
        <img src="@/assets/image/video/分享(白色).png" alt="share" class="icon">
        <span class="count">{{ shareCount }}</span>
      </div>
    </div>
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
      likeCount: 0,
      isLike: false,
      likeUrl: 'http://localhost:10002/images/点赞(白色).png',
      commentCount: 0,
      shareCount: 0,
      collectCount: 0,
      isCollect:false,
      collectUrl:'http://localhost:10002/images/收藏(白色).png',
      videoInfo: {},
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
    fetchVideoUrl() {
      axios.get('http://localhost:10002/video/randomVideo')
          .then(response => {
            this.videoInfo = response.data.data;
            this.currentVideoUrl = this.videoInfo.videoM3U8Url;
            this.likeCount = this.videoInfo.videLikeCount;
            this.collectCount = this.videoInfo.videoCollectCount;
            this.isVideoLike();
            this.isVideoCollect();
            this.loadVideo();
          }).catch(error => {
        console.log("错误信息=>", error)
        alert("网络异常")
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
    onWheel(event) {
      this.fetchVideoUrl();
    },
    likeVideo() {
      if (this.isLike) {
        axios.put("http://localhost:10002/videoLike/subLikeCount?videoId=" + this.videoInfo.videoId)
            .then(response => {
              if (response.data.code === 200) {
                this.isLike = false;
                this.likeUrl = 'http://localhost:10002/images/点赞(白色).png';
                this.getLikeCount();
              }
            }).catch(error => {
          console.log("错误信息=>", error)
          alert("网络异常")
        })

      } else {
        axios.put("http://localhost:10002/videoLike/addLikeCount?videoId=" + this.videoInfo.videoId)
            .then(response => {
              if (response.data.code === 200) {
                this.isLike = true;
                this.likeUrl = 'http://localhost:10002/images/点赞(红色).png';
                this.getLikeCount();
              }
            }).catch(error => {
          console.log("错误信息=>", error)
        })
      }
    },

    collectVideo() {
      if (this.isCollect) {
        axios.put("http://localhost:10002/videoCollect/subCollectCount?videoId=" + this.videoInfo.videoId)
            .then(response => {
              if (response.data.code === 200) {
                this.isCollect = false;
                this.collectUrl = 'http://localhost:10002/images/收藏(白色).png';
                this.getCollectCount();
              }
            }).catch(error => {
          console.log("错误信息=>", error)
          alert("网络异常")
        })

      } else {
        axios.put("http://localhost:10002/videoCollect/addCollectCount?videoId=" + this.videoInfo.videoId)
            .then(response => {
              if (response.data.code === 200) {
                this.isCollect = true;
                this.collectUrl = 'http://localhost:10002/images/收藏(黄色).png';
                this.getCollectCount();
              }
            }).catch(error => {
          console.log("错误信息=>", error)
        })
      }
    },

    getLikeCount() {
      axios.get('http://localhost:10002/videoLike/getLikeCount?videoId=' + this.videoInfo.videoId)
          .then(response => {
            if (response.data.code === 200) {
              this.likeCount = response.data.data;
            }
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },
    getCollectCount(){
      axios.get('http://localhost:10002/videoCollect/getCollectCount?videoId=' + this.videoInfo.videoId)
          .then(response => {
            if (response.data.code === 200) {
              this.collectCount = response.data.data;
            }
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },

    isVideoLike() {
      axios.get('http://localhost:10002/videoLike/isLike?videoId=' + this.videoInfo.videoId)
          .then(response => {
            this.isLike = response.data.data;
            if (this.isLike){
              this.likeUrl = "http://localhost:10002/images/点赞(红色).png"
            }else {
              this.likeUrl = "http://localhost:10002/images/点赞(白色).png"
            }
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },
    isVideoCollect() {
      axios.get('http://localhost:10002/videoCollect/isCollect?videoId=' + this.videoInfo.videoId)
          .then(response => {
            this.isCollect = response.data.data;
            if (this.isCollect){
              this.collectUrl = "http://localhost:10002/images/收藏(黄色).png"
            }else {
              this.collectUrl = "http://localhost:10002/images/收藏(白色).png"
            }
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },
    openComments() {
      this.commentCount++;
    },
    shareVideo() {
      this.shareCount++;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.interactions {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-left: 20px;
}

.interaction {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 28px;
  height: 28px;
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

.interaction:hover {
  cursor: pointer;
}

.circle:hover {
  cursor: pointer;
}
</style>
