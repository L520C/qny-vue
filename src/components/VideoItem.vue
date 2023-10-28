<template>
  <div class="all">
    <el-card class="el-card">
      <video src="https://media.w3.org/2010/05/sintel/trailer.mp4"></video>
      <el-text>标题</el-text>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "VideoItem",
  data() {
    return {
    };
  },
  methods: {
  }
}
</script>

<style scoped>
.all {
}
video {
  width: 100%;
}
</style>