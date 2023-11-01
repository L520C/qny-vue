<template>
  <div class="left">
    <el-menu :default-active="activeMenu" mode="vertical" @select="handleMenuSelect"
             active-text-color="#ffd04b"
             background-color="#545c64"
             class="el-menu-vertical-demo"
             text-color="#fff">
      <el-menu-item index="recommend">推荐</el-menu-item>
      <el-menu-item index="follow">关注</el-menu-item>
      <el-menu-item index="mine">我的</el-menu-item>
      <el-divider/>
      <el-menu-item index="popular">热门</el-menu-item>
      <el-menu-item index="physicalCulture">体育</el-menu-item>
      <el-menu-item index="knowledge">知识</el-menu-item>
      <el-menu-item index="follow">直播</el-menu-item>
      <el-menu-item index="follow">放映厅</el-menu-item>
    </el-menu>
  </div>

</template>

<script>

export default {
  name: 'Sidebar',
  data() {
    return {
      activeMenu: "recommend",
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index;
      if (index === 'recommend') {
        this.$router.push({path: '/'});
      } else {
        this.$router.push({name: index});
      }
    },
  },
};
</script>

<style scoped>
.left {
  height: 100%;
}

.left .el-menu-item {
  color: #fff;
}

.left .el-menu-item:hover {
  /* background-color: #555; */
}

.el-menu-item-content {
  display: flex;
  align-items: center; /* X轴居中 */
//justify-content: center; /* Y轴居中 */
}
</style>