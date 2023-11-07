<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="作品" name="first">
      <div v-for="(item, index) in videoDataList" :key="index">
        <video-item :video-data="toRaw(item)" class="video-item"/>
      </div>
    </el-tab-pane>
    <el-tab-pane label="喜欢" name="second">
      <user-like/>
    </el-tab-pane>
    <el-tab-pane label="收藏" name="third">
      <div v-for="(item, index) in videoDataList" :key="index">
        <video-item :video-data="toRaw(item)" class="video-item"/>
      </div>
    </el-tab-pane>
    <el-tab-pane label="历史记录" name="fourth">
      <div v-for="(item, index) in videoDataList" :key="index">
        <video-item :video-data="toRaw(item)" class="video-item"/>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import VideoItem from "@/components/VideoItem.vue";
import UserLike from "@/components/user/UserLike.vue";
import axios from "axios";
import {reactive, toRaw} from "vue";

export default {
  name: "UserVideo",
  components: {VideoItem, UserLike},
  data() {
    return {
      activeName: 'first',
      videoDataList: reactive([]),
    }
  },
  mounted() {
    this.getVideoData();
  },
  methods: {
    toRaw,
    handleClick() {

    },
    getVideoData() {
      axios.get('/api/video/video/randomVideo').then(res => {
        console.log('获取到视频数据=>', res.data);
        this.videoDataList.push(res.data.data);
      }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>

<style scoped>
.video-item {
  width: 30%;
  height: 250px;
  float: left;
  margin: 10px;
}

:deep(.el-tabs__nav-wrap::after) {
  height: 0;
}
</style>