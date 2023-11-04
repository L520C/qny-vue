<template>
  <div class="all">
    <!-- logo图片 -->
    <div class="logo">
      <el-image :src="logoUrl" fit="fill"></el-image>
    </div>
    <!-- 搜索框 -->
    <div class="search">
      <el-input v-model="input" placeholder="请输入搜索内容" clearable
                style="width: 400px; height: 40px; background-color: black;"/>
      <el-button style="height: 40px;" @click="searchVideo">
        <i class="el-icon-search" style="font-size: 14px; margin-right: 5px;"></i>搜索
      </el-button>
    </div>
    <!-- 右边个人头像，已经上传视频 -->
    <div class="button">
      <div>
        <el-button @click="videoUpload">
          <el-text>
            <el-icon>
              <CirclePlus/>
            </el-icon>
          </el-text>
          <el-text>投稿</el-text>
        </el-button>
      </div>
      <div class="auth-style">
        <div v-if="!isLogin">
          <el-button @click="userLogin">登录</el-button>
        </div>
        <div v-else>
          <el-popover placement="bottom" :width="300" trigger="hover" effect="dark" :show-arrow="false">
            <template #reference>
              <div>
                <el-avatar :size="50" :src="circleUrl"/>
              </div>
            </template>
            <div>
              <el-button @click="logout">退出登录</el-button>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userLogout} from "@/api/request";
import {CirclePlus} from "@element-plus/icons-vue";

export default {
  components: {CirclePlus},
  computed: {
    isLogin: {
      get() {
        return this.$store.state.isLogin;
      },
      set(value) {
        this.$store.state.isLogin = value;
      },
    }
  },
  data() {
    return {
      input: '',
      logoUrl: require('@/assets/logo.png'),
      hovering: false,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    };
  },
  methods: {
    searchVideo() {
      this.$router.push('/search');
    },
    userLogin() {
      this.$store.state.loginActive = true;
    },
    logout() {
      // 1、向后端发送退出请求
      userLogout().then(res => {
        console.log("退出登录请求成功信息=> ", res);
        this.$router.push('/');
        location.reload(); // 2、刷新页面
      }).catch(err => {
        console.log("退出登录请求失败信息=> ", err);
        this.$router.push('/');
        location.reload(); // 2、刷新页面
      })
      this.$store.state.isLogin = false;
    },
    videoUpload() {
      this.$router.push('/uploadFile');
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
  display: flex;
  align-items: center;
}

.auth-style {
  margin-left: 10px;
}
</style>
