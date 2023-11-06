<template>
  <div class="all">
    <div class="block">
      <el-avatar :size="100" :src="form.circleUrl"/>
    </div>
    <div class="user-info">
      <div class="box">
        <el-text size="large" class="username">{{ form.name }}</el-text>
      </div>
      <div class="box">
        <el-text>关注 30</el-text>
        <el-divider direction="vertical"/>
        <el-text>粉丝：100</el-text>
        <el-divider direction="vertical"/>
        <el-text>获赞：20w</el-text>
      </div>
      <div class="box">
        <el-text>视频号：123456789</el-text>
      </div>
      <div class="box">
        <el-text style="color: white">{{ form.region }}</el-text>
      </div>
    </div>

    <div class="edit-button">
      <el-button color="rgb(65, 66, 76)" :dark="true" @click="dialogFormVisible = true">编辑资料</el-button>
    </div>

    <el-dialog v-model="dialogFormVisible" title="编辑资料" width="40%"
               style="background-color: rgb(37, 38, 50);">
      <el-form :model="form" label-position="top">
        <div class="form-avatar">
          <el-avatar :size="100" :src="form.circleUrl"/>
          <el-text size="small">点击修改头像</el-text>
        </div>
        <el-form-item label="用户名">
          <el-input v-model="form.name" autocomplete="off" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
              v-model="form.region"
              type="textarea"
              :rows="3"
              placeholder="简单介绍一下你自己"
          />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="commitFormData">
          保存
        </el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import {ArrowDown, CirclePlus, Money, VideoPlay} from "@element-plus/icons-vue";
import {getMessage} from "@/api/request";

export default {
  name: "UserInfo",
  components: {Money, VideoPlay, ArrowDown, CirclePlus},
  data() {
    return {
      active: false,
      dialogFormVisible: false,
      form: {
        name: 'Tom',
        region: '平平无奇的描述',
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      },
    }
  },
  methods: {
    commitFormData() {
      this.dialogFormVisible = false;
      getMessage().then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    submitWorks() {
      this.$store.state.loginActive = true;
    }
  }
}
</script>

<style scoped>
.all {
  display: flex;
  margin: 20px;
  position: relative;
}

.block {
//margin: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  justify-content: center; /* Y轴居中 */
//align-items: center; /* X轴居中 */
}

.form-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box {
  margin: 5px;
}

.username {
  color: white;
}

.edit-button {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>