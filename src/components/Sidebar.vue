<template>
  <div class="left">
    <el-menu :default-active="activeMenu" mode="vertical" @select="handleMenuSelect"
             active-text-color="#ffd04b"
             background-color="#545c64"
             class="el-menu-vertical-demo"
             text-color="#fff">
      <el-menu-item index="recommend" class="menu-item">推荐</el-menu-item>
      <el-menu-item index="follow" class="menu-item">关注</el-menu-item>
      <el-menu-item index="mine" class="menu-item">
        <el-text size="large" style="color: white;">
          <el-icon>
            <UserFilled/>
          </el-icon>
        </el-text>
        <el-text size="large" style="color:white;">我的</el-text>
      </el-menu-item>
      <el-divider/>
      <el-menu-item index="popular" class="menu-item">热门</el-menu-item>
      <el-menu-item index="physicalCulture" class="menu-item">体育</el-menu-item>
      <el-menu-item index="knowledge" class="menu-item">知识</el-menu-item>
      <el-menu-item index="follow" class="menu-item">直播</el-menu-item>
      <el-menu-item index="follow" class="menu-item">放映厅</el-menu-item>
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
      if (index === 'home') {
        this.$router.push({path: '/recommend'});
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
  align-items: center; /* 垂直居中 */
//justify-content: center; /* 水平居中 */
}

.menu-item {
  color: white;
  align-items: center; /* 垂直居中 */
  //justify-content: center; /* 水平居中 */
}
</style>