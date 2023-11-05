<template>
  <div class="all">
    <div class="video-area">
      <div v-for="(item, index) in videoDataList">
        <video-item :video-data="toRaw(item)" :index="index" :key="index" class="video-item-content"></video-item>
      </div>
    </div>
  </div>
</template>

<script>
import {getPhysicalCultureVideo} from "@/api/request";
import VideoItem from "@/components/VideoItem.vue";
import {reactive, toRaw} from "vue";

export default {
  name: 'PhysicalCulture',
  components: {VideoItem},
  mounted() {
    this.getVideoData();
  },
  data() {
    return {
      videoDataList: reactive([])
    }
  },
  methods: {
    toRaw,
    getVideoData() {
      getPhysicalCultureVideo().then(res => {
        console.log(res.data);
        this.videoDataList.push(...res.data);
        console.log(toRaw(this.videoDataList));
      }).catch(err => {
        console.log(err);
      })
    }
  },
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
  width: 100%;
  height: auto;
  justify-content: center;
}

.video-item-content {
  width: 30%;
  height: auto;
  float: left;
  margin: 10px;
}
</style>