<template>
  <el-form
      ref="ruleFormRef"
      label-position="left"
      label-width="80px"
      :model="formLabelAlign"
      :rules="rules"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="formLabelAlign.name"
                type="text"
                placeholder="请输入用户名"
                maxlength="100"
                :validate-event="false"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formLabelAlign.password"
                type="password"
                placeholder="请输入密码"
                show-password
                maxlength="100"
                :validate-event="false"
      />
    </el-form-item>
    <el-button @click="userLogin">登录</el-button>
    <el-button native-type="reset">重置</el-button>
<!--    <el-button @click="registerUser()">注册</el-button>-->
  </el-form>
</template>

<script>
import {login} from "@/api/request";

export default {
  name: "LoginDialog",
  props: {
    vue: Object,
  },
  data() {
    return {
      dialogActive: true,
      formLabelAlign: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, message: '长度为最少为 3 个字符', trigger: 'blur'},
        ],
        password: [{required: true, message: '请输入密码', trigger: 'change'}],
      },
    }
  },
  methods: {
    userLogin() { // 用户登录请求函数
      console.log(this.$store.state.count);
      // 表单验证
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (valid) { // 表单验证成功
          // 发送登录请求
          login({
            name: this.formLabelAlign.name,
            password: this.formLabelAlign.password,
          }).then(res => {
            localStorage.setItem('access_token', res.data)
            console.log(res); // 登录成功
            this.$router.push({name: 'recommend'});
            this.dialogActive = false;
          }).catch(err => {
            console.log(err);
            return false;
          })
        } else {
          return false;
        }
      })
    },
    registerUser() {
      this.$router.push({name: 'register'});
    }
  },
}
</script>

<style scoped>
.all {
  height: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.login-position {
  height: 100%;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Y轴居中 */
  align-items: center; /* X轴居中 */
  margin: 10px;
}
</style>