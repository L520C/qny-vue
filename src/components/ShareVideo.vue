<template>
  <div class="container">
    <div class="shareDialog">
      <div class="shareDialogHead">
        好友发送视频
      </div>
      <div class="shareDialogContent">
        <div class="shareFriends">
          <div class="shareFriendsItem" @click="showShareVideo(shareInfo.videoId)" v-for="shareInfo in shareInfoList" :key="shareInfo.videoCover">
            <div class="friendInfo">
              <div>
                <img class="friendInfoAvatar" :src="shareInfo.user.icon" alt="avatar">
              </div>
              <div class="friendInfoStatus">
                <span style="font-size: 14px;">{{ shareInfo.user.name }} </span>
                <span style="font-size: 13px;color: #6d7070">在 {{ shareInfo.shareTime }}6 分享了视频</span>
              </div>
            </div>
            <div class="shareControl">
              <img style="height: 40px;width: 40px;margin-right: 20px"
                   :src="shareInfo.videoCover"/>
            </div>
            <el-dialog style="background: rgba(200,200,200,0);" width="70%"
                       align-center v-model="visible"
                       :destroy-on-close="true"
                       :show-close="false">
                <VideoShow :video-id="shareInfo.videoId" :isSecond="true"/>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import axios from "axios";
import {ElMessage} from "element-plus";
import HomeView from "@/views/SingleVideo.vue";
import VideoArea from "@/components/VideoArea.vue";
import VideoShow from "@/components/VideoShow.vue";

export default {
  components: {VideoShow, VideoArea, HomeView},
  data() {
    return{
      videoId:'',
      shareInfoList:[],
      visible:false
    }
  },
  mounted() {
    this.getAllShareInfo()
  },
  methods: {
    getAllShareInfo(){
      this.getVideoIdFromUrl()
      axios.get("/api/video/videoShare/getAllShareVideo")
          .then(response => {
            this.shareInfoList = response.data.data;
          }).catch(error => {
        console.log("错误信息=>", error)
        alert("网络异常")
      })
    },
    getVideoIdFromUrl() {
      // 获取URL中的查询参数videoId
      let vi = new URLSearchParams(window.location.search).get('videoId');
      if (vi) {
        // 如果videoId存在，可以做进一步的处理
        this.videoId = vi;
      }
    },
    showShareVideo(videoId){
      this.visible = true;
    }
  }
}
</script>

<style scoped>
.container {
  height: 500px;
  width: 300px;
  max-height: 660px;
  max-width: 920px;
  background-color: rgb(27, 27, 38);
  position: absolute;
  left: -150px;
  bottom: -500px;
  z-index: 1;
  border-radius: 15px; /* 卡片边角的圆滑度 */
  transition: box-shadow 0.3s ease-in-out; /* 阴影变化的过渡效果 */
  /* 立体阴影效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), /* 较小的硬阴影 */ 0 10px 20px rgba(0, 0, 0, 0.05); /* 较大的模糊阴影 */
}

.shareDialog {
  width: 100%;
  height: 100%;
  display: flex; /* 启用 flex 布局 */
  flex-direction: column; /* 子元素按列排布 */
}

.shareDialogHead {
  flex: 1;
//border: red; display: flex; /* 启用 flex 布局 */ justify-content: center; /* 水平居中 */ align-items: center; /* 垂直居中 */ border-bottom: 1px solid rgb(60, 60, 60); /* 设置下边框 */
}

.shareDialogContent {
  flex: 9;
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

.shareFriendsItem {
  height: 80px;
  width: 100%;
  margin-bottom: 5px;
//background-color: cadetblue; display: flex; /* 启用 flex 布局 */
}

.shareFriendsItem:hover {
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
  justify-content: right; /* 右边 */
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
</style>