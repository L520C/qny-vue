<template>
  <div class="left">
    <el-menu :default-active="activeMenu" mode="vertical" @select="handleMenuSelect"
             background-color=""
             style="background: transparent;width: 80%;"
             active-color="#fff"
             text-color="#fff">
      <el-menu-item index="recommend" class="menu-item">推荐</el-menu-item>
      <el-menu-item index="follow" class="menu-item">关注</el-menu-item>
      <el-menu-item index="mine" class="menu-item">
        <!--<el-text size="large" style="color: white;">-->
        <!--  <el-icon>-->
        <!--    <UserFilled/>-->
        <!--  </el-icon>-->
        <!--</el-text>-->
       我的
      </el-menu-item>
      <el-divider style="border-color: #1f212c; " />
      <el-menu-item index="popular" class="menu-item">热门</el-menu-item>
      <el-menu-item index="physicalCulture" class="menu-item">体育</el-menu-item>
      <el-menu-item index="knowledge" class="menu-item">知识</el-menu-item>
      <!--<el-menu-item index="follow" class="menu-item">放映厅</el-menu-item>-->
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
  height: 100vh;
  display: flex; /* 启用 flex 布局 */
  justify-content: center; /* 水平居中 */
}

/* 菜单项基本样式 */
.menu-item {
  display: flex; /* 启用 flex 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  border-radius: 18px; /* 圆角 */
  margin: 2px 0;
  transition: all 0.3s; /* 平滑过渡效果 */
  color: #78787e; /* 文本颜色 */
  font-size: 16px;
  height: 46px;
}

/* 鼠标悬浮时的样式变化 */
.el-menu-item:hover {
  box-shadow: 0 2px 4px rgba(60, 60, 60, 0.05); /* 添加亮色阴影 */
  transform: translateY(-2px); /* 轻微上移 */
  color: white;
  background-color: rgba(86, 83, 84, 0.5); /* 激活状态的背景颜色，使用了20%的不透明度 */
}

/* 激活状态的样式变化 */
.el-menu-item.is-active {
  color: white;
  background-color: rgba(86, 83, 84, 0.5); /* 激活状态的背景颜色，使用了20%的不透明度 */
}

.el-menu {
  border-right: none;
}
.el-divider--horizontal{
  margin: 12px 0;
}
</style>