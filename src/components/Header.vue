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
    <div class="right-area">
      <div class="optionBox" @mouseenter="showChat = true" @mouseleave="showChat=false">
        <el-text class="options-area">
          <el-icon style="font-size: 20px;margin-bottom: 3px">
            <View/>
          </el-icon>
          通知
        </el-text>
        <ShareVideo v-show="showChat" />
      </div>
      <div class="optionBox" @click="toUpload">
        <el-text class="options-area">
          <el-icon style="font-size: 20px;margin-bottom: 3px">
            <DocumentAdd/>
          </el-icon>
          投稿
        </el-text>
      </div>
      <div class="login-area">
        <div v-if="showLogin">
          <el-button class="login" @click="userLogin">
            <el-icon style="font-size: 22px">
              <Stamp/>
            </el-icon>
            登录
          </el-button>
        </div>
        <div v-else class="avatar-style">
          <el-avatar :size="40" :src="circleUrl"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import ShareVideo from "@/components/ShareVideo.vue";

export default {
  components: {ShareVideo},
  computed: {
    Search() {
      return Search
    },
    showLogin: {
      get() {
        return !this.$store.state.isLogin;
      },
      set(value) {
        this.$store.state.isLogin = !value;
      }
    }
  },
  data() {
    return {
      input: '',
      hovering: false,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      showChat:false
    };
  },
  methods: {
    searchVideo() {
      this.$router.push('/search');
    },
    userLogin() {
      this.$store.state.loginActive = true;
    },
    toUpload() {
      this.$router.push('/uploadFile');
    },
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
  position: relative;
}

.logo {
  margin-left: 10px;
}

.search {
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  position: absolute; /* 绝对定位 */
  top: 50%; /* 父元素高度的50%处 */
  left: 50%; /* 父元素宽度的50%处 */
  transform: translate(-50%, -50%); /* 向上和向左各偏移自身尺寸的50% */
}

.search:hover {
  border: 2px solid rgba(255, 255, 255, 0.9);

  .searchButton {
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

.searchButton:hover {
  color: black;
  background-color: white;
}

:deep(.el-input__wrapper) {
  background-color: transparent;
  border: none !important;
  box-shadow: none;
}

.el-input {
  --el-input-focus-border: none;
  --el-input-focus-border-color: none;
  --el-input-hover-border: none;
  --el-input-hover-border-color: none;
  --el-input-text-color: white;
}

:deep(.el-input__inner) {
  font-size: 15px;
  caret-color: red;
}

.right-area {
  display: flex;
}

.options-area {
  display: flex;
  flex-direction: column;
  align-items: center;
//justify-content: center; font-size: 12px;
}

.optionBox {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  margin: 0 10px;
  position: relative;
}

.optionBox:hover {
  .options-area {
    color: white;

  }

  cursor: pointer;
  position: relative;
}

.login-area {
  width: 100px;
  margin-left: 10px;
  text-align: center;
}

.login {
  width: 100px;
  background-color: #fe2c55;
  border-radius: 12px;
  height: 40px;
  border: none;
  color: white;
}

.login:hover {
  color: white;
  background-color: rgba(254, 44, 85, 0.6);
}
</style>
