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
    <el-drawer v-model="showComment"
               title="评论区"
               size="390"
               :modal="false"
               style="background-color:  rgba(0,0,0,0.9);margin-bottom: 0;"
               class="comment">
      <div style="font-size: 14px;margin-bottom: 15px">总评论数{{this.videoCommentVO.commentTotalCount}}</div>
      <div class="commentInfo" v-for="item in this.videoCommentVO.commentShowList">
        <div class="commentHead">
          <el-avatar
              :src="item.userIcon"
              style="height: 36px;width: 36px;"
          />
          <div class="commentUsername">{{ item.username }}</div>
        </div>
        <div class="commentContent">
          <div style="line-height: 1.6;">
            {{item.commentContent}}
          </div>
          <div class="commentHandle">
            <div style="margin-top: 5px">{{item.commentTime}} · {{ item.commentRegion }}</div>
            <div style="margin-top: 10px;  display: flex;align-items: center;">
              <div class="commentIcon">
                <el-icon style="font-size: 20px">
                  <ChatDotRound/>
                </el-icon>
                <div style="font-size: 12px;margin-left: 1px">回复</div>
              </div>
              <div class="commentIcon">
                <el-icon style="font-size: 20px">
                  <Position/>
                </el-icon>
                <div style="font-size: 12px;margin-left: 1px">分享</div>
              </div>
              <div class="commentIcon">
                <img src="http://localhost:10002/images/爱心(评论区未点赞).png" class="icon"
                     style="height: 20px;width: 20px" alt="like">
                <div style="font-size: 14px; margin-left: 1px">{{ item.likeCount }}</div>
              </div>
            </div>
            <div style="margin-top: 15px" v-show="!item.showReply">
              -----
              <span style="font-weight: bold" @click="item.showReply=true" class="moreRecover">
                &nbsp;展开{{item.replyCount}}条评论
                <el-icon><ArrowDownBold/></el-icon>
              </span>
            </div>
          </div>

          <!-- 回复评论开始 -->
          <div v-show="item.showReply">
            <div class="commentInfo">
              <div class="commentHead">
                <el-avatar
                    src="http://localhost:10002/images/路飞头像.png"
                    style="height: 26px;width: 26px;"
                />
                <div class="commentUsername">少年与梦</div>
              </div>
              <div class="commentContent">
                <div style="line-height: 1.6;">
                  我15年的MacBook Pro现在还在用，自己动手换过一次电池[呲牙]
                </div>
                <div class="commentHandle">
                  <div style="margin-top: 5px">2023-10-31 20:14:36 · 重庆</div>
                  <div style="margin-top: 10px;  display: flex;align-items: center;">
                    <div class="commentIcon">
                      <el-icon style="font-size: 20px">
                        <ChatDotRound/>
                      </el-icon>
                      <div style="font-size: 12px;margin-left: 1px">回复</div>
                    </div>
                    <div class="commentIcon">
                      <el-icon style="font-size: 20px">
                        <Position/>
                      </el-icon>
                      <div style="font-size: 12px;margin-left: 1px">分享</div>
                    </div>
                    <div class="commentIcon">
                      <img src="http://localhost:10002/images/爱心(评论区未点赞).png" class="icon"
                           style="height: 20px;width: 20px" alt="like">
                      <div style="font-size: 14px; margin-left: 1px">12</div>
                    </div>
                  </div>
                  <div style="margin-top: 15px">
                    <span style="font-weight: bold" @click="item.showReply=false" class="moreRecover">
                &nbsp;收起
                <el-icon><ArrowUpBold/></el-icon>
              </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 回复评论结束 -->
        </div>
      </div>
      <div class="bottom-bar">
        <el-input class="commentSend"
                  v-model="commentInfo"
                  style="height: 50px;width: 350px"
                  :prefix-icon="Search"
                  @keyup.enter="handleCommentSend"
                  placeholder="请输入评论内容"/>
      </div>
      <div style="height: 100px"></div>
    </el-drawer>
  </div>
</template>

<script>
import Hls from 'hls.js';
import axios from 'axios';
import {ChatDotRound, Position} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

export default {
  components: {Comment},
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
      isCollect: false,
      collectUrl: 'http://localhost:10002/images/收藏(白色).png',
      videoInfo: {},
      showComment: false,
      showReply: false,
      commentInfo: '',
      videoCommentVO:{}
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
    getRootComment(){
      axios.get('http://localhost:10002/comment/getRootComment?videoId='+this.videoInfo.videoId)
          .then(response => {
              if (response.data.code ===200){
                this.videoCommentVO = response.data.data;
                this.commentCount = this.videoCommentVO.commentTotalCount;
              }else {
                ElMessage({
                  showClose: true,
                  message: '获取评论失败',
                  type: 'error',
                })
              }
          }).catch(error => {
          console.log("错误信息=>", error)
        alert("网络异常")
      })
    },
    handleCommentSend() {
      var sendData = {
        'videoId': this.videoInfo.videoId,
        'commentContent': this.commentInfo,
        'rootId': '',
        'id': ''
      }
      axios.post('http://localhost:10002/comment/save',sendData )
          .then(response => {
            if (response.data.code === 200){
              ElMessage({
                showClose: true,
                message: '评论成功',
                type: 'success',
              })
            }else {
              ElMessage({
                showClose: true,
                message: '评论失败',
                type: 'error',
              })
            }
          }).catch(error => {
        console.log("错误信息=>", error)
        alert("网络异常")
      })
      this.getRootComment();
      this.commentInfo = ''
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
      if (!this.showComment) {
        this.fetchVideoUrl();
      }
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
    getCollectCount() {
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
            if (this.isLike) {
              this.likeUrl = "http://localhost:10002/images/点赞(红色).png"
            } else {
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
            if (this.isCollect) {
              this.collectUrl = "http://localhost:10002/images/收藏(黄色).png"
            } else {
              this.collectUrl = "http://localhost:10002/images/收藏(白色).png"
            }
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },
    openComments() {
      // this.commentCount++;
      this.getRootComment();
      this.showComment = true;
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

.comment {
}

.commentInfo {
  padding: 0;
  margin: 0;
}

.commentHead {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.commentUsername {
  margin-left: 20px;
  color: #b3b3b3;
  font-size: 14px;
}

.commentContent {
  margin-left: 37px;
  font-size: 15px;
}

.commentHandle {
  font-size: 13px;
  color: #b3b3b3;
  margin-bottom: 20px;
}

.commentIcon {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  margin-right: 20px;
}

.commentIcon:hover {
  cursor: pointer;
  color: white;
}

.moreRecover:hover {
  cursor: pointer;
  color: white;
}

.bottom-bar {
//width: 100%; position: relative;
  display: flex;
  justify-content: center;
}

.commentSend {
  position: fixed;
  bottom: 0;
  font-size: 15px;
  color: white;
}

/deep/ .el-input__wrapper {
  background-color:#65676c;
  box-shadow: none;
}

/deep/ .el-input {
  --el-input-focus-border-color: none;
}

/deep/ .el-input__inner {
  caret-color: whitesmoke;
  color: whitesmoke;
}
</style>
<script setup>
import {ArrowDownBold, ArrowUpBold, ChatDotRound, Minus, Position, Search} from "@element-plus/icons-vue";
</script>