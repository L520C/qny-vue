<template>
  <div class="video-page">
    <div class="video-content">
      <VideoArea/>
    </div>
  </div>

</template>

<script>
import VideoArea from "@/components/VideoArea.vue";

export default {
  name: 'HomeView',
  components: {VideoArea},
}
</script>

<style scoped>
.video-page {
}
.video-content {
  margin-right: 100px;
  margin-left: 100px;
  width: 80%;
  height: 100%;
}
video {
  height: 100%;
}
</style>
