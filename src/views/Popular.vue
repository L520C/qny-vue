<template>
  <div class="all" ref="all" v-on:scroll="checkScroll">
    <div class="video-area">
      <h1>热门视频</h1>
      <div v-for="item in videoDataList" :key="item.videoId">
        <video-item :video-data="toRaw(item)" class="video-item-content"/>
      </div>
    </div>
    <div class="rank-area">
      <h1>热门排行</h1>
      <div class="ranking-item">
        <div v-for="(item, index) in rankDataList" :key="index" class="ranking-item-content">
          <el-link :underline="false">
            <div style="margin: 5px">
              <el-text class="rank-num">{{ index + 1 }}</el-text>
            </div>
            <ranking-item :title="toRaw(item).videoTitle" :hot-num="toRaw(item).videoHots"/>
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
  name: 'Popular',
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
  created() {
    for (let i = 0; i < 5; i++) {
      this.getVideoData();
    }
  },
  methods: {
    toRaw,
    // 获取1个随机视频
    getVideoData() {
      axios.get('/api/video/video/randomVideo').then(res => {
        console.log('获取到视频数据=>', res.data);
        this.videoDataList.push(res.data.data);
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
  display: flex;
  margin: 20px;
}

.rank-num {
  font-size: 20px;
  margin-right: 10px;
  color: #6d7070;
}
</style>