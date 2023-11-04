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
  data() {
    return {

    }
  },
  methods: {}
}
</script>

<style scoped>
.video-content {
  height: 100%;
  //background-color: cadetblue;
}
</style>
