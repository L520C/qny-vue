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
  </el-form>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";
import MD5 from "js-md5";
import {toRaw} from "vue";

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
      // 表单验证
      this.$refs.ruleFormRef.validate(async (valid) => {
        if (valid) { // 表单验证成功
          axios.post('/api/user/login', {
            name: this.formLabelAlign.name,
            password: MD5(this.formLabelAlign.password),
          }).then(res => {
            console.log(res.data);
            if (res.data.code === 200) {
              this.$store.state.user = res.data.data.user; // 用户信息保存
              console.log("user=>", toRaw(this.$store.state.user).icon);
              this.$store.state.isLogin = true; // 显示登录成功
              localStorage.setItem('access_token', res.data.data.token)
              this.$router.push('/');
              this.$store.state.loginActive = false; // 弹窗消失
            } else { // 账号或者密码错误等信息
              ElMessage({
                message: res.data.data,
                type: 'error',
                duration: 3 * 1000
              })
            }
            this.formLabelAlign.name = '';
            this.formLabelAlign.password = '';
          }).catch(err => {
            return false;
          })
        } else {
          return false;
        }
      })
    },
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