<template>
  <div class="ranking-item">
    <el-text>{{ title }}</el-text>
    <el-text>{{ hotNum }}</el-text>
  </div>
</template>

<script>
export default {
  name: "RankingItem",
  props: {
    title: String,
    hotNum: String,
  },
}
</script>

<style scoped>
.ranking-item {
  display: flex;
  flex-direction: column;
}
</style>