<template>
  <div class="container">
    <user-info/>
    <user-video/>
  </div>
</template>

<script>

import UserInfo from "@/components/UserInfo.vue";
import UserVideo from "@/components/UserVideo.vue";

export default {
  name: 'Mine',
  components: {UserInfo, UserVideo},
  data() {
    return {}
  }
};
</script>

<style scoped>
.container {
  margin: 10px;
}
</style>
