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
    </el-menu>
  </div>

</template>

<script>
export default {
  name:'Sidebar',
  data() {
    return {
      activeMenu: "recommend", // 默认选中的菜单项
    };
  },
  methods: {
    handleMenuSelect(index) {
      // 处理菜单项选择事件
      this.activeMenu = index;

      // 根据菜单项的索引触发路由导航
      if (index === 'recommend') {
        this.$router.push({ path: '/' }); // 导航到根路径
      } else {
        this.$router.push({ name: index });
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 200px; /* 侧边栏宽度 */
  background-color: #333; /* 侧边栏背景色 */
  color: #fff; /* 文字颜色 */
}

.sidebar .el-menu-item {
  color: #fff; /* 菜单项文字颜色 */
}

.sidebar .el-menu-item:hover {
  background-color: #555; /* 菜单项鼠标悬停背景色 */
}
.left{
  height: 100%;
  background-color: red;
}
/* 自定义样式可以根据需要进行调整 */
</style>
