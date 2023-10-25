<template>
  <div class="video-container">
      <!-- 视频播放器区域 -->
      <video controls style="width: 100%; height: 100%" >
        <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4">
        <!-- 添加其他视频源 -->
      </video>
  </div>
</template>

<script>
export default {
  name: 'VideoArea'
}
</script>

<style>
.video-container {

}
</style>
