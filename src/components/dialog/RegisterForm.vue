<template>
  <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="80px"
      class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="uname">
      <el-input v-model="ruleForm.uname"/>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="确认密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"/>
    </el-form-item>
  </el-form>
  <div class="btnGroup">
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {userRegister} from "@/api/request";
import {ref} from "vue";

export default {
  name: 'RegisterForm',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uname: "", // 用户名
        pass: "",
        password: "", // 密码
      },
      rules: {
        uname: [{required: true, message: "用户名不能为空！", trigger: "blur"}],
        pass: [{required: true, validator: validatePass, trigger: "blur"}],
        password: [{required: true, validator: validatePass2, trigger: "blur"}],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 发送注册请求
          userRegister({
            name: this.ruleForm.uname,
            password: this.ruleForm.password,
          }).then(res => {
            if (res.code === 200) {
              ElMessage({
                message: "注册成功，请登录",
                duration: 1000,
                type: "success",
              })
            } else {
              ElMessage({
                message: "注册失败",
                duration: 1000,
                type: "error",
              })
              return false;
            }
          }).catch(err => {
            console.log(err);
            ElMessage({
              message: "注册失败",
              duration: 1000,
              type: "error",
            })
            return false;
          })
        } else { // 表单验证失败
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.all {
  height: 600px;
  width: auto;
}

.box-card {
  margin: auto auto;
  width: 400px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Y轴居中 */
//align-items: center; /* X轴居中 */
}

.login-from {
  margin: auto auto;
}
</style>