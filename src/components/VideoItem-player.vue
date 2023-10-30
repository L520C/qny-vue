<template>
  <div class="all">
    <el-card>
      <!--            <video src="https://media.w3.org/2010/05/sintel/trailer.mp4"></video>-->
      <vue3video-play ref="video" v-bind="options" poster='https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg'/>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';  // 确保你已经安装了 axios

import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import {reactive} from "vue";

export default {
  name: "VideoItem-player",
  components: {vue3videoPlay},
  data() {
    return {
      videoInfo: {},
      currentVideoUrl: '',
      options: reactive({
        progress: false,
        width: '100%', //播放器高度
        height: 'auto', //播放器高度
        // color: "#409eff", //主题色
        // title: '', //视频名称
        src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", //视频源
        type: 'm3u8', //视频类型
        muted: true, //静音
        webFullScreen: false, // 全屏
        // speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        // loop: false, //循环播放
        mirror: false, //镜像画面
        ligthOff: false,  //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制
        // controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume', 'setting', 'pip', 'pageFullScreen', 'fullScreen'], //显示所有按钮,
        controlBtns: [], //显示所有按钮,
        preload: 'meta',
      })
    };
  },
  mounted() {
    // this.loadContent();
  },
  methods: {
    async loadContent() {
      // 异步获取数据
      await axios.get("http://localhost:10002/video/randomVideo")
          .then(response => {
            this.videoInfo = response.data.data;
            this.currentVideoUrl = this.videoInfo.videoM3U8Url;
          }).catch(error => {
            console.log("错误信息=>", error)
            // alert("网络异常")
          })
    },
    startPlay() {
      this.$refs.video.play();
    },
    pausePlay() {
      this.$refs.video.pause();
    },
  }
}
</script>

<style scoped>
.all {
}

.video-player {
  width: 100%;
  height: auto;
}
</style>