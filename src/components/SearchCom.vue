<template>
  <div class="all" ref="all" v-on:scroll="checkScroll">
    <div class="video-area">
      <h1>视频</h1>
      <div v-for="item in videoDataList" :key="item.videoId">
        <video-item :video-data="toRaw(item)" class="video-item-content"/>
      </div>
    </div>
    <div class="rank-area">
      <h1>相关搜索</h1>
      <div class="ranking-item">
        <div v-for="(item, index) in videoDataList" :key="index" class="ranking-item-content">
          <el-link :underline="false">
            <el-icon size="15"><Search /></el-icon>
            <el-text style="font-size: 15px; margin-left: 10px; color: white">{{ toRaw(item.videoTitle) }}</el-text>
          </el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VideoItem from "@/components/VideoItem.vue";
import RankingItem from "@/components/RankingItem.vue";
import VideoItemPlayer from "@/components/VideoItem-player.vue";
import axios from "axios";
import {reactive, toRaw} from "vue";

export default {
  name: 'SearchCom',
  components: {VideoItem, RankingItem, VideoItemPlayer},
  data() {
    return {
      videoDataList: reactive([]),
      rankDataList: reactive([]),
    }
  },
  mounted() {
    this.getVideoData(); // 获取视频数据
    this.getRankData();
  },
  methods: {
    toRaw,
    // 根据搜索值获取视频信息
    getVideoData() {
      axios.get('/api/video/video/search?search=' + this.$store.state.searchValue).then(res => {
        console.log('搜索到视频数据=>', res.data);
        this.videoDataList.push(...res.data.data);
      }).catch(err => {
        console.log(err);
      })
    },
    checkScroll() {
      const container = this.$refs.all;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 20; // 判断是否滚动到底部，这里设置了一个阈值，可以根据需要调整
      if (isBottom) {
        alert("滑倒底部");
        // this.addComponent();
      }
    },
    addComponent() {
      this.getVideoData();
    },
    getRankData() {
      axios.get('/api/video/videoRank/getVideoRanking').then(res => {
        console.log('获取到排行数据=>', res.data);
        this.rankDataList.push(...res.data.data);
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
<style scoped>
.all {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.video-area {
  width: 80%;
  height: auto;
  justify-content: center;
}

.video-item-content {
  width: 30%;
  height: 200px;
  float: left;
  margin: 10px;
}

.ranking-item-content {
  width: 100%;
  display: flex;
  margin-top: 20px;
  padding: 10px;
  background-color: rgb(51, 52, 63);
  border-radius: 15px; /* 卡片边角的圆滑度 */
  transition: box-shadow 0.3s ease-in-out; /* 阴影变化的过渡效果 */
}

.rank-num {
  font-size: 20px;
  margin-right: 10px;
  color: #6d7070;
}
</style>