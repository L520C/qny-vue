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
  computed: {
    videoDataList: {
      get() {
        return this.$store.state.physicalCultureVideoDataList;
      },
      set(value) {
        this.$store.state.physicalCultureVideoDataList = value;
      }
    }
  },
  data() {
    return {
      // videoDataList: reactive([])
    }
  },
  methods: {
    toRaw,
    getVideoData() {
      // if (!this.videoDataList || this.videoDataList.length === 0) return;
      getPhysicalCultureVideo().then(res => {
        console.log('获取到请求数据', res.data);
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
  height: 250px;
  float: left;
  margin: 10px;
}
</style>