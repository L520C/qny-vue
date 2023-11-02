<template>
  <el-dialog auto-width not-padding v-model="dialogActive">
    <el-tabs v-model="activeName" class="demo-tabs" stretch>
      <el-tab-pane label="登录" name="first">User</el-tab-pane>
      <el-tab-pane label="注册" name="second">Config</el-tab-pane>
    </el-tabs>
  </el-dialog>

</template>

<script>
import {ref} from "vue";

export default {
  name: "Dialog",
  data() {
    return {
      dialogActive: true,
      activeName: ref('first'),
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