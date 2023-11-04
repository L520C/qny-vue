<template>
  <div class="full-screen-layout">
    <el-container style="height: 100vh;">
      <el-header style="height:68px;margin-bottom: 10px;padding-bottom: 0">
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="180px">
          <sidebar/>
        </el-aside>
        <el-container>
          <el-main style="overflow: hidden;margin: 0;padding: 0">
            <router-view style="height: calc(100vh - 64px); overflow: auto;"></router-view>
            <!-- 登录弹窗 -->
            <el-dialog v-model="active">
              <self-dialog/>
            </el-dialog>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
    <!--    <el-container style="height: 100vh;">-->
    <!--      <el-aside width="200px">-->
    <!--        <Sidebar/>-->
    <!--      </el-aside>-->
    <!--      <el-container>-->
    <!--        <el-header style="margin-bottom: 0;padding-bottom: 0">-->
    <!--          <Header/>-->
    <!--        </el-header>-->
    <!--        <el-main style="overflow: hidden;margin-top: 0;padding-top: 0">-->
    <!--          <router-view style="height: calc(100vh - 64px); overflow: auto;"></router-view>-->
    <!--          &lt;!&ndash; 登录弹窗 &ndash;&gt;-->
    <!--          <el-dialog v-model="active">-->
    <!--            <self-dialog/>-->
    <!--          </el-dialog>-->
    <!--        </el-main>-->
    <!--      </el-container>-->
    <!--    </el-container>-->
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
        if (res.code === 500) {
          console.log(res.data);
          this.$store.state.loginActive = true;
        }
      }).catch(err => {
        console.log(err);
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
  background-color: #161823; /* 使用深灰色作为背景颜色 */
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
.el-main{
  padding-left: 0!important;
}
</style>