<template>
  <div class="all">
    <div class="custom-search-container">
      <input
          v-model="searchValue"
          placeholder="搜索..."
          class="custom-search-input"
      />
      <button class="custom-search-button" @click="search">
        <i class="el-icon-search"></i>
        搜索
      </button>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      searchValue: '',
    };
  },
  methods: {
    search() {
      // 处理搜索逻辑
      console.log('搜索关键词：', this.searchValue);
    },
  },
};
</script>

<style scoped>
.custom-search-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  width: 300px; /* 设置搜索框宽度 */
}

.custom-search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 5px;
  font-size: 14px;
}

.custom-search-button {
  background-color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 14px;
  transition: background-color 0.3s, border 0.3s; /* 添加过渡效果 */
}

.custom-search-button:hover {
  background-color: #f0f0f0; /* 鼠标悬停时的背景颜色 */
  border: 1px solid #ccc; /* 鼠标悬停时显示边框 */
}
.all{
  width: 100%;
  background-color: antiquewhite;
}
</style>
