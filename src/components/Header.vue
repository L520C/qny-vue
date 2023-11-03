<template>
  <div class="all">
    <div class="logo">
      <el-image :src="logoUrl" fit="fill"></el-image>
    </div>
    <div class="search">
      <el-input v-model="input" placeholder="请输入搜索内容" clearable style="width: 400px; height: 40px; background-color: black;"/>
      <el-button style="height: 40px;" @click="searchVideo">
        <i class="el-icon-search" style="font-size: 14px; margin-right: 5px;"></i>搜索
      </el-button>
    </div>
    <div class="button">
      <div>
        <div v-if="showLogin">
          <el-button>登录</el-button>
        </div>
        <div v-else>
          <el-avatar :size="100" :src="circleUrl"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      logoUrl: require('@/assets/logo.png'),
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
  width: 60px;
  height: 100%;
}

.search {
}

.button {

}
</style>
