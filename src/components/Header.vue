<template>
  <div class="all">
    <div class="logo">
      <img style="height: 30px;" src="@/assets/image/logo.png" alt="logo"/>
    </div>
    <div class="search">
      <el-input v-model="input" placeholder="请输入搜索内容" clearable class="searchInput"/>
      <el-button class="searchButton" @click="searchVideo" :icon="Search" style="font-size: 20px">
        <span class="el-icon-search" style="font-size: 16px; font-weight: bold">搜索</span>
      </el-button>
    </div>
    <div class="button">
      <div>
        <div v-if="showLogin">
          <el-button class="login">
            <el-icon style="font-size: 22px"><Stamp /></el-icon>
            登录
          </el-button>
        </div>
        <div v-else>
          <el-avatar :size="100" :src="circleUrl"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'

export default {
  computed: {
    Search() {
      return Search
    }
  },
  data() {
    return {
      input: '',
      hovering: false,
      showLogin: true,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    };
  },
  methods: {
    searchVideo() {
      this.$router.push('/search');
    }
  }
};
</script>

<style scoped>
.all {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin-left: 10px;
}

.search {
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
}
.search:hover{
  border: 2px solid rgba(255, 255, 255, 0.9);
  .searchButton{
    color: black;
    background-color: rgba(255, 255, 255, 0.9);
  }
}

.searchInput {
  width: 350px;
  height: 40px;
}

.searchButton {
  color: white;
  height: 40px;
  border: none;
  background: transparent;
}
.searchButton:hover{
  color: black;
  background-color: white;
}

/deep/ .el-input__wrapper {
  background-color: transparent;
  border: none !important;
  box-shadow: none;
}
.el-input{
  --el-input-focus-border:none;
  --el-input-focus-border-color:none;
  --el-input-hover-border:none;
  --el-input-hover-border-color:none;
  --el-input-text-color:white;
}
/deep/ .el-input__inner{
  font-size: 15px;
  caret-color: red;
}
.login{
  width: 100px;
  background-color: #fe2c55;
  border-radius: 12px;
  height: 40px;
  border: none;
  color: white;
}
.login:hover{
  color: white;
  background-color: rgba(254, 44, 85, 0.6);
}

</style>
