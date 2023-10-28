<template>
  <div class="all">
    <div class="search">
      <el-input
          v-model="input"
          placeholder="请输入搜索内容"
          clearable
          style="width: 400px; height: 40px; background-color: black;"
      ></el-input>
      <el-button
          style="height: 40px;"
      >
        <i class="el-icon-search" style="font-size: 14px; margin-right: 5px;"></i>
        搜索
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      hovering: false,
    };
  },
};
</script>

<style scoped>
.all {
  width: 100%;
}
.search{
  margin-left: 380px;
  margin-top: 20px;
}
</style>
