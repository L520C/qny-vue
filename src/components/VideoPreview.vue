<template>
  <div>
    <h1>视频预览组件</h1>
    <video ref="video" class="video">
      <source src="your-video-file.mp4" type="video/mp4">
      你的浏览器不支持 HTML5 video 标签。
    </video>
    <img v-if="showCover" class="cover" src="cover-image.jpg" @mouseenter="playVideo" @mouseleave="showCover = false">
  </div>
</template>

<script>
export default {
  name: "VideoPreview",
  data() {
    return {
      showCover: true,
    }
  },
  methods: {
    playVideo() {
      this.$refs.video.play();
    }
  },
}
</script>

<style scoped>

</style>