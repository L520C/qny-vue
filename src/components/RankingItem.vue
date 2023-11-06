<template>
  <div class="ranking-item">
    <el-text class="rank-title">{{ title }}</el-text>
    <el-text class="rank-hot">{{ hotNum }}万 热度</el-text>
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

.rank-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.rank-title:hover {
  color: #fe2c55;
}

.rank-hot {
  font-size: 13px;
  font-weight: 600;
  color: #6b778c;
  margin-top: 5px;
}
</style>