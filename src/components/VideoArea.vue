<template>
  <div class="all">
    <div class="container" @wheel="throttledOnWheel">
      <video ref="video" controls loop muted class="video-player"></video>
      <div class="interactions" @mouseleave="shareDialog=false">
        <div class="circle" @click="followUser()">
          <img :src="authorIcon" alt="avatar" class="avatar">
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
        <div class="interaction" @click="shareVideo" @mouseenter="handleShare">
          <img src="@/assets/image/video/分享(白色).png" alt="share" class="icon">
          <span class="count">{{ shareCount }}</span>
        </div>
        <div class="shareDialog" v-show="shareDialog" @mouseleave="shareDialog=false" @mouseenter="shareDialog=true">
          <div class="shareDialogHead">
            <el-input
                v-model="shareDialogInput"
                placeholder="搜索"
                :prefix-icon="Search"
                style="height: 70%;width: 90%"
                @keyup.enter="searchUser"
            />
          </div>
          <div class="shareDialogContent">
            <div style="height: 20px"><span class="footText">分享给朋友</span></div>
            <div class="shareFriends">

              <div class="shareFriendsItem" v-for="user in followUsers" :key="user.userId">
                <div class="friendInfo">
                  <div class="friendInfoAvatar">
                    <img :src="user.icon" alt="avatar" class="avatar">
                  </div>
                  <div class="friendInfoStatus">
                    <span style="font-size: 14px;">{{user.name}}</span>
                    <span style="font-size: 13px;color: #6d7070">{{ user.status }}</span>
                  </div>
                </div>
                <div class="shareControl">
                  <el-button color="#ff2c55" :disabled="user.show" size="large"  @click="shareToFriend(user)">分享</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="shareDialogFoot">
            <div class="footText">其他分享方式</div>
            <div class="footSelect">
            <span class="footItem" @click="copyToClipboard">
              <img src="@/assets/image/video/qq.png" alt="qq" class="icon">
            </span>
              <span class="footItem" @click="copyToClipboard">
              <img src="@/assets/image/video/微信.png" alt="微信" class="icon">
            </span>
              <span class="footItem" @click="copyToClipboard">
              <img src="@/assets/image/video/链接.png" alt="链接" class="icon">
            </span>
            </div>
          </div>
        </div>
      </div>
      <el-drawer v-model="showComment"
                 title="评论区"
                 size="390"
                 :modal="false"
                 style="background-color:  rgba(0,0,0,0.9);margin-bottom: 0;"
                 class="comment">
        <div style="font-size: 14px;margin-bottom: 15px">总评论数{{ this.videoCommentVO.commentTotalCount }}</div>
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
              {{ item.commentContent }}
            </div>
            <div class="commentHandle">
              <div style="margin-top: 5px">{{ item.commentTime }} · {{ item.commentRegion }}</div>
              <div style="margin-top: 10px;  display: flex;align-items: center;">
                <div class="commentIcon" @click="handleCommentReply(item)">
                  <el-icon style="font-size: 20px">
                    <ChatDotRound/>
                  </el-icon>
                  <div style="font-size: 12px;margin-left: 1px">
                    回复<span v-show="replying && replyId===item.id">中</span>
                  </div>
                </div>
                <div class="commentIcon">
                  <el-icon style="font-size: 20px">
                    <Position/>
                  </el-icon>
                  <div style="font-size: 12px;margin-left: 1px">分享</div>
                </div>
                <div class="commentIcon" @click="handleCommentLike(item)">
                  <img
                      :src="item.isLike ? '/api/video/images/点赞(红色).png':'/api/video/images/爱心(评论区未点赞).png'"
                      class="icon"
                      style="height: 20px;width: 20px" alt="like">
                  <div style="font-size: 14px; margin-left: 1px">{{ item.likeCount }}</div>
                </div>
              </div>
              <div style="margin-top: 15px" v-show="!item.showReply && item.replyCount > 0">
                -----
                <span style="font-weight: bold" @click="loadCommentReply(item)" class="moreRecover">
                &nbsp;展开{{ item.replyCount }}条评论
                <el-icon><ArrowDownBold/></el-icon>
              </span>
              </div>
            </div>

            <!-- 回复评论开始 -->
            <div v-show="item.showReply">
              <div class="commentInfo" v-for="replyItem in this.commentReplyInfoList">
                <div class="commentHead">
                  <el-avatar
                      :src="replyItem.userIcon"
                      style="height: 26px;width: 26px;"
                  />
                  <div class="commentUsername">{{ replyItem.username }}</div>
                </div>
                <div class="commentContent">
                  <div style="line-height: 1.6;">
                    {{ replyItem.commentContent }}
                  </div>
                  <div class="commentHandle">
                    <div style="margin-top: 5px">{{ replyItem.commentTime }} · {{ replyItem.commentRegion }}</div>
                    <div style="margin-top: 10px;  display: flex;align-items: center;">
                      <div class="commentIcon" @click="handleCommentReply(replyItem)">
                        <el-icon style="font-size: 20px">
                          <ChatDotRound/>
                        </el-icon>
                        <div style="font-size: 12px;margin-left: 1px">
                          回复<span v-show="replying && replyId===replyItem.id">中</span>
                        </div>
                      </div>
                      <div class="commentIcon">
                        <el-icon style="font-size: 20px">
                          <Position/>
                        </el-icon>
                        <div style="font-size: 12px;margin-left: 1px">分享</div>
                      </div>
                      <div class="commentIcon" @click="handleCommentLike(replyItem)">
                        <img
                            :src="replyItem.isLike ? '/api/video/images/点赞(红色).png':'/api/video/images/爱心(评论区未点赞).png'"
                            class="icon"
                            style="height: 20px;width: 20px" alt="like">
                        <div style="font-size: 14px; margin-left: 1px">{{ replyItem.likeCount }}</div>
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
          <div class="commentSend">
            <div v-show="replying" class="reply-info">正在回复{{ replyHead }}</div>
            <el-input
                v-model="commentInfo"
                ref="replyInput"
                style="height: 50px;width: 350px"
                :prefix-icon="Search"
                @keyup.enter="commentOrReply"
                placeholder="请输入评论内容"/>
          </div>

        </div>
        <div style="height: 100px"></div>
      </el-drawer>
    </div>
    <div class="changeVideo">
      <div class="changeButton">
        <div class="videoPre" @click="videoPre"><el-icon><ArrowUpBold /></el-icon></div>
        <div class="videoNext" @click="videoNext"><el-icon><ArrowDownBold /></el-icon></div>
      </div>
    </div>
  </div>

</template>

<script>
import Hls from 'hls.js';
import axios from 'axios';
import {ChatDotRound, Position} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import { throttle } from 'lodash';
export default {
  components: {Comment},
  data() {
    return {
      currentVideoUrl: '',
      hls: null,
      likeCount: 0,
      isLike: false,
      likeUrl: '/api/video/images/点赞(白色).png',
      commentCount: 0,
      shareCount: 0,
      collectCount: 0,
      isCollect: false,
      collectUrl: '/api/video/images/收藏(白色).png',
      authorIcon:'/api/video/images/未知.jpg',
      videoInfo: {},
      videoId:'',
      showComment: false,
      showReply: false,
      commentInfo: '',
      videoCommentVO: {},
      replying: false,
      replyHead: '',
      replyId: '',
      replyRootId: '',
      commentReplyInfoList: [],
      shareDialog: false,
      shareDialogInput: '',
      followUsers:[],
      videoIds:[],
      videoIdsIndex:-1,
      throttledOnWheel: null,
      keysPressed: {}
    };
  },
  mounted() {
    this.fetchVideoUrl();
    // 在组件实例化时绑定this上下文，并保存对节流函数的引用
    this.throttledOnWheel = throttle(this.onWheel, 2000).bind(this);

    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
  },
  beforeDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  },
  methods: {
    fetchVideoUrl() {
      let url = '/api/video/video/randomVideo';
      if (this.videoIdsIndex >= 0 && this.videoIdsIndex < this.videoIds.length) {
        let vi = new URLSearchParams(window.location.search).get('videoId');
        if (vi) {
          url = '/api/video/video/getVideo/' + vi
        }
      }
      axios.get(url)
          .then(response => {
            this.videoInfo = response.data.data;
            // console.log("response.data.data=>", response.data.data)
            // console.log("videoInfo=>", this.videoInfo)
            this.currentVideoUrl = this.videoInfo.videoM3U8Url;
            this.likeCount = this.videoInfo.videLikeCount;
            this.collectCount = this.videoInfo.videoCollectCount;
            this.commentCount = this.videoInfo.videoCommentCount;
            this.videoId = this.videoInfo.videoId;
            if(this.videoInfo.user != null){
              this.authorIcon = this.videoInfo.user.icon
            }
            if (this.videoIdsIndex < 0){
              this.videoIdsIndex = 0;
              this.videoIds = []
              this.videoIds.push(this.videoId)
            }else if (this.videoIdsIndex === this.videoIds.length){
              this.videoIds.push(this.videoId)
            }
            // 更新浏览器地址栏的URL
            let newUrl = window.location.pathname + '?videoId=' + this.videoId;
            window.history.pushState({ path: newUrl }, '', newUrl);

            this.isVideoLike();
            this.isVideoCollect();
            this.loadVideo();
            console.log("ids=>"+this.videoIds,"index=>"+this.videoIdsIndex)
          }).catch(error => {
        console.log("错误信息=>", error)
        ElMessage({
          showClose: true,
          message: '网络波动，请刷新后重试',
          type: 'error',
        })
      })
    },
    followUser(){
      if (this.videoInfo.user != null){
        if (this.videoInfo.user.userId != null){
          axios.post("/api/video/userFollow/follow?followUserId="+this.videoInfo.user.userId)
              .then(response => {
                if (response.data.data){
                  ElMessage({
                    showClose: true,
                    message: '关注成功',
                    type: 'success',
                  })
                }else {
                  ElMessage({
                    showClose: true,
                    message: '已经关注啦',
                    // type: 'normal',
                  })
                }
              }).catch(error => {
            console.log("错误信息=>", error)
            ElMessage({
              showClose: true,
              message: '网络异常',
              type: 'error',
            })
          })
        }
      }
    },
    handleShare(){
      this.shareDialog=true
      axios.get("/api/video/userFollow/allFollowInfo")
          .then(response => {
            this.followUsers = response.data.data;
          }).catch(error => {
        console.log("错误信息=>", error)
        ElMessage({
          showClose: true,
          message: '网络异常',
          type: 'error',
        })
      })
    },
    searchUser(){
      axios.get("/api/video/userFollow/searchFollow?name="+this.shareDialogInput)
          .then(response => {
            this.followUsers = response.data.data;
          }).catch(error => {
        console.log("错误信息=>", error)
        ElMessage({
          showClose: true,
          message: '网络异常',
          type: 'error',
        })
      })
    },
    shareToFriend(user){
      user.show = true;
      console.log("user=>",user)
      let sendData = {
        videoId:this.videoId,
        toUserId:user.userId
      }
      axios.post("/api/video/videoShare/videoShare",sendData)
          .then(response => {
            if (response.data.code === 200 && (response.data.data === true || response.data.data === 'true')) {
              ElMessage({
                showClose: true,
                message: '分享成功',
                type: 'success',
              })
            } else {
              ElMessage({
                showClose: true,
                message: '分享失败',
                type: 'error',
              })
            }
          }).catch(error => {
        console.log("错误信息=>", error)
        ElMessage({
          showClose: true,
          message: '网络波动，请刷新后重试',
          type: 'error',
        })
      })
    },
    handleCommentLike(item) {
      // alert(item.isLike)
      if (!item.isLike) {
        axios.put("/api/video/comment/addCommentLikeCount?commentId=" + item.id)
            .then(response => {
              if (response.data.code === 200 && (response.data.data === true || response.data.data === 'true')) {
                item.isLike = true;
                item.likeCount = item.likeCount + 1;
                ElMessage({
                  showClose: true,
                  message: '点赞成功',
                })
              } else {
                ElMessage({
                  showClose: true,
                  message: '点赞失败',
                  type: 'error',
                })
              }
            }).catch(error => {
          console.log("错误信息=>", error)
          ElMessage({
            showClose: true,
            message: '网络波动，请刷新后重试',
            type: 'error',
          })
        })
      } else {
        axios.put("/api/video/comment/subCommentLikeCount?commentId=" + item.id)
            .then(response => {
              if (response.data.code === 200 && (response.data.data === true || response.data.data === 'true')) {
                item.isLike = false;
                item.likeCount = item.likeCount - 1;
                ElMessage({
                  showClose: true,
                  message: '取消点赞成功',
                })
              } else {
                ElMessage({
                  showClose: true,
                  message: '取消点赞失败',
                  type: 'error',
                })
              }
            }).catch(error => {
          console.log("错误信息=>", error)
          ElMessage({
            showClose: true,
            message: '网络波动，请刷新后重试',
            type: 'error',
          })
        })
      }
    },
    loadCommentReply(item) {
      axios.get('/api/video/comment/getCommentReply?videoId=' + item.videoId + '&commentId=' + item.id)
          .then(response => {
            if (response.data.code === 200) {
              this.commentReplyInfoList = response.data.data
              item.showReply = true;
            } else {
              ElMessage({
                showClose: true,
                message: '加载回复失败',
                type: 'error',
              })
            }
          }).catch(error => {
        console.log("错误信息=>", error)
        ElMessage({
          showClose: true,
          message: '网络波动，请刷新后重试',
          type: 'error',
        })
      })
    },
    handleCommentReply(item) {
      // console.log("item=>",item)
      this.replyRootId = item.parentId;
      if (item.rootId !== '' && item.rootId !== null) {
        this.replyRootId = item.rootId;
      }
      if (this.replyId === item.id) {
        this.replying = !this.replying
      } else {
        this.replyId = item.id
        this.replying = true;
      }
      // alert(item.commentReply)
      this.replyHead = '@' + item.username + '：' + item.commentContent;
      if (this.replying) {
        this.$refs.replyInput.focus();
      } else {
        this.$refs.replyInput.blur();
      }
    },
    commentReplySend() {
      let sendData = {
        'videoId': this.videoInfo.videoId,
        'commentContent': this.commentInfo,
        'rootId': this.replyRootId,
        'parentId': this.replyId
      }
      axios.post('/api/video/comment/save', sendData)
          .then(response => {
            if (response.data.code === 200) {
              ElMessage({
                showClose: true,
                message: '回复成功',
                type: 'success',
              })
            } else {
              ElMessage({
                showClose: true,
                message: '回复失败',
                type: 'error',
              })
            }
            this.getRootComment();
          }).catch(error => {
        console.log("错误信息=>", error)
        ElMessage({
          showClose: true,
          message: '网络波动，请刷新后重试',
          type: 'error',
        })
      })
      this.commentInfo = ''
    },
    commentOrReply() {
      if (this.replying) {
        this.commentReplySend()
      } else {
        this.handleCommentSend()
      }
      this.replying = false;
    },
    getRootComment() {
      axios.get('/api/video/comment/getRootComment?videoId=' + this.videoInfo.videoId)
          .then(response => {
            if (response.data.code === 200) {
              this.videoCommentVO = response.data.data;
              this.commentCount = this.videoCommentVO.commentTotalCount;
            } else {
              ElMessage({
                showClose: true,
                message: '获取评论失败',
                type: 'error',
              })
            }
          }).catch(error => {
        console.log("错误信息=>", error)
        ElMessage({
          showClose: true,
          message: '网络波动，请刷新后重试',
          type: 'error',
        })
      })
    },
    handleCommentSend() {
      let sendData = {
        'videoId': this.videoInfo.videoId,
        'commentContent': this.commentInfo,
        'rootId': '',
        'parentId': ''
      }
      axios.post('/api/video/comment/save', sendData)
          .then(response => {
            if (response.data.code === 200) {
              ElMessage({
                showClose: true,
                message: '评论成功',
                type: 'success',
              })
            } else {
              ElMessage({
                showClose: true,
                message: '评论失败',
                type: 'error',
              })
            }
            this.getRootComment();
          }).catch(error => {
        console.log("错误信息=>", error)
        ElMessage({
          showClose: true,
          message: '网络波动，请刷新后重试',
          type: 'error',
        })
      })
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
      if (!this.showComment && !this.shareDialog) {
        if (event.deltaY < 0) {
          if (this.videoIdsIndex <= 0){
            ElMessage({
              showClose: true,
              message: '上面已经没有内容啦',
            })
          }else {
            this.videoIdsIndex = this.videoIdsIndex -1;
            // 更新浏览器地址栏的URL
            let newUrl = window.location.pathname + '?videoId=' + this.videoIds[this.videoIdsIndex];
            window.history.pushState({ path: newUrl }, '', newUrl);
          }
        } else if (event.deltaY > 0) {
          this.videoIdsIndex = this.videoIdsIndex + 1;
          if (this.videoIdsIndex < this.videoIds.length){
            // 更新浏览器地址栏的URL
            let newUrl = window.location.pathname + '?videoId=' + this.videoIds[this.videoIdsIndex];
            window.history.pushState({ path: newUrl }, '', newUrl);
          }
        }
        this.fetchVideoUrl();
        throttledOnWheel: throttle(function(event) {
          this.onWheel(event);
        }, 2000) // 在200毫秒内最多执行一次
      }
    },
    videoPre(){
      if (this.videoIdsIndex <= 0){
        ElMessage({
          showClose: true,
          message: '上面已经没有内容啦',
        })
      }else {
        this.videoIdsIndex = this.videoIdsIndex -1;
        // 更新浏览器地址栏的URL
        let newUrl = window.location.pathname + '?videoId=' + this.videoIds[this.videoIdsIndex];
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
      this.fetchVideoUrl();

    },
    videoNext(){
      this.videoIdsIndex = this.videoIdsIndex + 1;
      if (this.videoIdsIndex < this.videoIds.length){
        // 更新浏览器地址栏的URL
        let newUrl = window.location.pathname + '?videoId=' + this.videoIds[this.videoIdsIndex];
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
      this.fetchVideoUrl();
    },
    handleKeydown(event) {
      // 如果已经按下该键并正在处理，则不再次触发
      if (this.keysPressed[event.key]) {
        return;
      }

      // 标记该键为已按下
      this.keysPressed[event.key] = true;

      if (event.key === 'ArrowDown') {
        // 当按下键时执行的方法
        this.videoNext();
      }
    },
    handleKeyup(event) {
      // 标记该键为已释放
      this.keysPressed[event.key] = false;

      if (event.key === 'ArrowUp') {
        // 当松开上键时执行的方法
        this.videoPre();
      }
    },
    likeVideo() {
      if (this.isLike) {
        axios.put("/api/video/videoLike/subLikeCount?videoId=" + this.videoInfo.videoId)
            .then(response => {
              if (response.data.code === 200) {
                this.isLike = false;
                this.likeUrl = '/api/video/images/点赞(白色).png';
                this.getLikeCount();
                ElMessage({
                  showClose: true,
                  message: '取消点赞成功',
                })
              }
            }).catch(error => {
          console.log("错误信息=>", error)
          ElMessage({
            showClose: true,
            message: '网络波动，请刷新后重试',
            type: 'error',
          })
        })

      } else {
        axios.put("/api/video/videoLike/addLikeCount?videoId=" + this.videoInfo.videoId)
            .then(response => {
              if (response.data.code === 200) {
                this.isLike = true;
                this.likeUrl = '/api/video/images/点赞(红色).png';
                this.getLikeCount();
                ElMessage({
                  showClose: true,
                  message: '点赞成功',
                })
              }
            }).catch(error => {
          console.log("错误信息=>", error)
        })
      }
    },

    collectVideo() {
      if (this.isCollect) {
        axios.put("/api/video/videoCollect/subCollectCount?videoId=" + this.videoInfo.videoId)
            .then(response => {
              if (response.data.code === 200) {
                this.isCollect = false;
                this.collectUrl = '/api/video/images/收藏(白色).png';
                this.getCollectCount();
                ElMessage({
                  showClose: true,
                  message: '取消收藏成功',
                })
              }
            }).catch(error => {
          console.log("错误信息=>", error)
          ElMessage({
            showClose: true,
            message: '网络波动，请刷新后重试',
            type: 'error',
          })
        })

      } else {
        axios.put("/api/video/videoCollect/addCollectCount?videoId=" + this.videoInfo.videoId)
            .then(response => {
              if (response.data.code === 200) {
                this.isCollect = true;
                this.collectUrl = '/api/video/images/收藏(黄色).png';
                this.getCollectCount();
                ElMessage({
                  showClose: true,
                  message: '收藏成功',
                })
              }
            }).catch(error => {
          console.log("错误信息=>", error)
        })
      }
    },

    getLikeCount() {
      axios.get('/api/video/videoLike/getLikeCount?videoId=' + this.videoInfo.videoId)
          .then(response => {
            if (response.data.code === 200) {
              this.likeCount = response.data.data;
            }
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },
    getCollectCount() {
      axios.get('/api/video/videoCollect/getCollectCount?videoId=' + this.videoInfo.videoId)
          .then(response => {
            if (response.data.code === 200) {
              this.collectCount = response.data.data;
            }
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },

    isVideoLike() {
      axios.get('/api/video/videoLike/isLike?videoId=' + this.videoInfo.videoId)
          .then(response => {
            this.isLike = response.data.data;
            if (this.isLike === true || this.isLike === 'true') {
              this.likeUrl = "/api/video/images/点赞(红色).png"
            } else {
              this.likeUrl = "/api/video/images/点赞(白色).png"
            }
          }).catch(error => {
        console.log("错误信息=>", error)
      })
    },
    isVideoCollect() {
      axios.get('/api/video/videoCollect/isCollect?videoId=' + this.videoInfo.videoId)
          .then(response => {
            this.isCollect = response.data.data;
            if (this.isCollect === true || this.isCollect === 'true') {
              this.collectUrl = "/api/video/images/收藏(黄色).png"
            } else {
              this.collectUrl = "/api/video/images/收藏(白色).png"
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
      this.shareDialog = true;
    },
    copyToClipboard(){
      const textToCopy = '我分享了一条优质视频 '+ window.location.href +' 复制此链接，打开七牛云(QNY)搜索，直接观看视频！';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          ElMessage({
            showClose: true,
            message: '分享链接已经复制到剪切板',
            type: 'success',
          })
        }).catch(err => {
          ElMessage({
            showClose: true,
            message: '分享链接复制失败',
            type: 'error',
          })
        });
      } else {
        ElMessage({
          showClose: true,
          message: '浏览器不支持剪切板API',
          type: 'error',
        })
      }
    }
  },
};

</script>

<style scoped>
.all{
  width: 100%;
  height: 96%;
  overflow: hidden;
  display: flex;
}
.container {
  //width: 100%;
  //height: 100%;
  //overflow: hidden;
  //background-color: #000;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 9.5;
}

.video-player {
  height: 100%;
  width: 100%;
  border-radius: 30px;
  background-color: rgba(85, 82, 82, 0.3);
  /* 在四个方向上添加阴影来创造出3D立体效果 */
  box-shadow:
      2px 2px 2px rgba(85, 82, 82, 0.1), /* 右下阴影 */
      -2px -2px 2px rgba(85, 82, 82, 0.1), /* 左上阴影 */
      -2px 2px 2px rgba(85, 82, 82, 0.1), /* 左下阴影 */
      2px -2px 2px rgba(85, 82, 82, 0.1); /* 右上阴影 */
  margin-left: 2px;
}


.changeVideo{
  flex: 0.5;
  height: 100%;
  width: 100%;
  //background-color: green;
  display: flex;        /* 启用flex布局 */
  justify-content: center; /* 水平居中子元素 */
  align-items: center;    /* 垂直居中子元素 */
}
.changeButton{
  display: flex;        /* 启用flex布局 */
  flex-direction: column; /* 设置子元素垂直堆叠 */
  justify-content: center; /* 水平居中子元素 */
  align-items: center;    /* 垂直居中子元素 */
  height: 100px;
  width: 70%;
  background-color: rgba(43, 43, 54,0.8);
  border-radius: 30px;
}
.videoPre{
  flex: 1;
  display: flex;        /* 启用flex布局 */
  justify-content: center; /* 水平居中子元素 */
  align-items: center;    /* 垂直居中子元素 */
  color: rgba(255, 255, 255, 0.6);
  font-size: 17px;
}
.videoNext{
  flex: 1;
  display: flex;        /* 启用flex布局 */
  justify-content: center; /* 水平居中子元素 */
  align-items: center;    /* 垂直居中子元素 */
  color: rgba(255, 255, 255, 0.6);
  font-size: 17px;
}
.videoPre:hover{
  cursor: pointer;
  color: white;
}
.videoNext:hover{
  cursor: pointer;
  color: white;
}

.interactions {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50px;
  right: 30px;

}

.interaction {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 30px;
  height: 30px;
}

.circle {
  width: 45px;
  height: 45px;
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
//width: 100%; position: relative; display: flex; justify-content: center;
}

.commentSend {
  position: fixed;
  bottom: 0;
  font-size: 15px;
  color: white;
}

/deep/ .el-input__wrapper {
  background-color: rgba(50, 50, 50, 0.9);
  box-shadow: none;
}

/deep/ .el-input {
  --el-input-focus-border-color: none;
}

/deep/ .el-input__inner {
  caret-color: whitesmoke;
  color: whitesmoke;
}

.reply-info {
  width: 350px;
  background-color: #6d7070;
  color: #b0b3b3;
  border-radius: 1px;
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.shareDialog {
  position: absolute;
  width: 300px;
  height: 490px;
  background-color: #161823;
  bottom: 30px;
  right: 40px;
  border: 1px solid #161823; /* 可选，为卡片添加边框 */
  border-radius: 10px; /* 卡片边角的圆滑度 */
  transition: box-shadow 0.3s ease-in-out; /* 阴影变化的过渡效果 */

  /* 立体阴影效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), /* 较小的硬阴影 */ 0 10px 20px rgba(0, 0, 0, 0.05); /* 较大的模糊阴影 */

  display: flex; /* 启用 flex 布局 */
  flex-direction: column; /* 子元素按列排布 */
}

.shareDialogHead {
  flex: 1.2;
//border: red; display: flex; /* 启用 flex 布局 */ justify-content: center; /* 水平居中 */ align-items: center; /* 垂直居中 */
  border-bottom: 1px solid rgb(60, 60, 60); /* 设置下边框 */
}

.shareDialogContent {
  flex: 7.6;
  border-bottom: 1px solid rgb(60, 60, 60); /* 设置下边框 */
  overflow-y: auto; /* 当内容超出时显示滚动条 */
}
/* 隐藏webkit浏览器的滚动条 */
.shareDialogContent::-webkit-scrollbar {
  display: none;
}

/* 对于IE和Edge */
.shareDialogContent {
  -ms-overflow-style: none; /* IE和Edge */
  scrollbar-width: none; /* Firefox */
}

.shareDialogFoot {
  flex: 1.2;
}

.shareDialogFoot {
  display: flex; /* 启用 flex 布局 */
  align-items: center; /* 如果你希望子元素垂直居中，可以添加此属性 */
}

.footText {
  flex: 4; /* 占据父容器的3份空间 */
  display: flex; /* 启用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  color: rgba(179, 179, 179, 0.5);
  font-size: 13px;
}

.footSelect {
  flex: 6; /* 占据父容器的7份空间 */
  display: flex; /* 如果你也希望footSelect中的项水平排列，可以添加此属性 */
  justify-content: space-around; /* 这会在子项之间提供均匀的空间 */
  /* 其他样式 */
}

.footItem {
  height: 36px;
  width: 36px;
  background-color: rgba(130, 130, 130, 0.3);
  border-radius: 5px; /* 卡片边角的圆滑度 */
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out, background-color 0.3s ease-in-out; /* 平滑的过渡效果 */

  display: flex; /* 启用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.footItem > img {
  height: 22px;
  width: 22px;
}

.footItem:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影 */
  transform: scale(1.08); /* 轻微放大 */
  background-color: rgba(173, 181, 189, 0.5); /* 鼠标悬停时的背景颜色 */
}

.shareFriends {

}

.shareFriendsItem {
  height: 60px;
  width: 100%;
  margin-bottom: 5px;
//background-color: cadetblue; display: flex; /* 启用 flex 布局 */
}
.shareFriendsItem:hover{
  background-color: rgba(148, 143, 143, 0.2);
}

.friendInfo {
  flex: 7; /* 占据父容器的3份空间 */
  display: flex; /* 启用 flex 布局 */
  align-items: center; /* 垂直居中 */
//background-color:wheat;
}

.shareControl {
  flex: 3; /* 占据父容器的3份空间 */
  display: flex; /* 启用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
//background-color:green;
}

.friendInfoAvatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 10px;
}

.friendInfoStatus {
  display: flex; /* 启用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  justify-content: center; /* 垂直居中 */
  height: 100%; /* 设置父容器的高度，确保有足够的空间进行垂直平分 */
  margin-left: 10px;
}

.friendInfoStatus > span {
  /* 添加任何需要的额外样式，比如内边距、对齐等 */
  display: flex; /* 启用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  justify-content: center; /* 垂直居中 */
  padding: 1px;
}

</style>
<script setup>
import {ArrowDownBold, ArrowUpBold, ChatDotRound, Minus, Position, Search} from "@element-plus/icons-vue";
</script>