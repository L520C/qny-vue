<template>
  <!--用户喜欢视频组件-->
  <div>
    <div v-for="i in 3" class="video-item" :key="i">
      <video-item/>
    </div>
  </div>
</template>

<script>
import VideoItem from "@/components/VideoItem.vue";

export default {
  name: "UserLike",
  components: {VideoItem},
  data() {
    return {}
  }
}
</script>

<style scoped>
.video-item {
  width: 30%;
  height: auto;
  float: left;
  margin: 10px;
}
</style>