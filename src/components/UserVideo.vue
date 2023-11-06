<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="作品" name="first">
      <div v-for="i in 3" class="video-item">
        <video-item/>
      </div>
    </el-tab-pane>
    <el-tab-pane label="喜欢" name="second">
      <user-like/>
    </el-tab-pane>
    <el-tab-pane label="收藏" name="third">
      <div v-for="i in 3" class="video-item">
        <video-item/>
      </div>
    </el-tab-pane>
    <el-tab-pane label="历史记录" name="fourth">
      <div v-for="i in 3" class="video-item">
        <video-item/>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import VideoItem from "@/components/VideoItem.vue";
import UserLike from "@/components/user/UserLike.vue";

export default {
  name: "UserVideo",
  components: {VideoItem, UserLike},
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick() {

    }
  },
}
</script>

<style scoped>
.video-item {
  width: 30%;
  height: 20%;
  float: left;
  margin: 10px;
}

:deep(.el-tabs__nav-wrap::after) {
  height: 0;
}
</style>