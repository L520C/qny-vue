<template>
  <div class="full-screen-layout">
    <el-container style="height: 100vh;">
      <el-aside width="200px">
        <Sidebar/>
      </el-aside>
      <el-container>
        <el-header style="margin-bottom: 0;padding-bottom: 0">
          <Header/>
        </el-header>
        <el-main style="overflow: hidden;margin-top: 0;padding-top: 0">
          <router-view style="height: calc(100vh - 64px); overflow: auto;"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.full-screen-layout {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>



<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";

export default {
  name: 'Home',
  components: {Header, Sidebar}
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #1A1A1A; /* 使用深灰色作为背景颜色 */
  font-family: Arial, sans-serif; /* 设置字体 */
  color: #fff; /* 设置文本颜色为白色 */
}
</style>