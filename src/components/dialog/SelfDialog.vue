<template>
  <el-tabs v-model="activeName" class="demo-tabs" stretch>
    <el-tab-pane label="登录" name="login">
      <login-form/>
    </el-tab-pane>
    <el-tab-pane label="注册" name="register">
      <register-form/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {ref} from "vue";
import LoginForm from "@/components/dialog/LoginForm.vue";
import RegisterForm from "@/components/dialog/RegisterForm.vue";

export default {
  name: "SelfDialog",
  components: {LoginForm, RegisterForm},
  data() {
    return {
      dialogActive: true,
      activeName:this.$store.state.tabsActiveName,
    }
  },
}
</script>

<style>

:deep(.el-tabs__nav-scroll) {
  width: 50%;
  margin: 0 auto
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>