<template>
  <div class="full-screen-layout">
    <el-container style="height: 100vh;">
      <el-header style="margin-bottom: 0;padding-bottom: 0">
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <sidebar/>
        </el-aside>
        <el-container>
          <el-main style="overflow: hidden;margin-top: 0;padding-top: 0">
            <router-view style="height: calc(100vh - 64px); overflow: auto;"></router-view>
            <!-- 登录弹窗 -->
            <el-dialog v-model="active" width="400px">
              <self-dialog/>
            </el-dialog>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
</style>


<script>

import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import SelfDialog from "@/components/dialog/SelfDialog.vue";
import {checkToken} from "@/api/request";

export default {
  name: 'App',
  components: {SelfDialog, Header, Sidebar},
  computed: {
    active: {
      get() {
        return this.$store.state.loginActive;
      },
      set(value) {
        this.$store.state.loginActive = value;
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.isLogin();
  },
  methods: {
    // 判断用户是否已经登录
    isLogin() {
      const token = localStorage.getItem('access_token');
      // 这里需要判断，在localStorage是否有token，如果有，验证token的正确性，
      if (!token || token === '') { // 没有token
        this.$store.state.loginActive = true;
        return;
      }
      // 验证token
      checkToken().then(res => {
        if (res.code === 200) { // 登录成功
          this.$store.state.isLogin = true;
        } else {
          console.log(res.data);
          this.$store.state.loginActive = true;
        }
      }).catch(err => {
        console.log("验证失败=>", err);
        this.$store.state.loginActive = true;
      })
    }
  }
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

.full-screen-layout {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>