<template>
  <div class="all" ref="all" v-on:scroll="checkScroll">
    <div class="video-area">
      <h1>热门视频</h1>
      <div class="video-content">
        <div v-for="o in videoNum" :key="o">
          <video-item class="video-item-content"/>
<!--          <video-item-player class="video-item-content"/>-->
        </div>
      </div>
    </div>
    <div class="rank-area">
      <h1>热门排行</h1>
      <div class="ranking-item">
        <div v-for="i in 10" :key="i" class="ranking-item-content">
          <div>
            <el-text>{{ i }}</el-text>
          </div>
          <ranking-item title="标题" hot-num="热度"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import VideoItem from "@/components/VideoItem.vue";
import RankingItem from "@/components/RankingItem.vue";
import VideoItemPlayer from "@/components/VideoItem-player.vue";

export default {
  name: 'Popular',
  components: {VideoItem, RankingItem, VideoItemPlayer},
  data() {
    return {
      videoNum: 3,
    }
  },
  methods: {
    checkScroll() {

      const container = this.$refs.all;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 10; // 判断是否滚动到底部，这里设置了一个阈值，可以根据需要调整

      if (isBottom) {
        this.addComponent();
      }
    },
    addComponent() {
      // console.log("123");
      // this.videoNum++;
    }
  }
}
</script>
<style scoped>
.all {
  height: 100%;
  width: 100%;
  //background-color: darkgray;
  display: flex;
  flex-direction: row;
}

.video-area {
  width: 80%;
  height: auto;
}

.video-content {
  //display: flex;
  justify-content: center;
}

.video-item-content {
  width: 30%;
  height: 20%;
  float: left;
  margin: 10px;
}

.ranking-item-content {
  display: flex;
}
</style>