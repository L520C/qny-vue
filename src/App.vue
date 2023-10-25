<template>
  <div class="app">
    <div class="sidebar">
      <!-- 左侧导航栏 -->
      <ul>
        <li>
          <router-link to="/" class="nav-link">首页</router-link>
        </li>
        <li>
          <router-link to="/about" class="nav-link">关于</router-link>
        </li>
        <li>
          <router-link to="/contact" class="nav-link">联系</router-link>
        </li>
        <!-- 添加其他导航链接 -->
      </ul>
    </div>
    <div class="content">
      <!-- 主要内容 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  background: linear-gradient(to bottom, #333, #000);
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif; /* 添加自定义字体 */
}

.app {
  display: flex;
  height: 97vh;
}

.sidebar {
  width: 150px;
  color: #fff;
  padding: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 20px;
}

.nav-link {
  text-align: center; /* 居中显示文本 */
  font-size: 18px; /* 字体大小 */
  color: #fff; /* 导航链接文字颜色 */
  text-decoration: none; /* 取消下划线 */
  transition: box-shadow 0.3s; /* 添加过渡效果 */
  display: block; /* 使链接占据整行 */
  padding: 10px 20px; /* 增大链接面积 */
  border-radius: 10px; /* 添加圆角 */
}

.nav-link:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* 添加圆角阴影 */
}

.content {
  flex: 1;
}

.sidebar a {
  color: #fff; /* 导航链接文字颜色 */
  text-decoration: none; /* 取消下划线 */
  font-size: 16px; /* 字体大小 */
}
</style>