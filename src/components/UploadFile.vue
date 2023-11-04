<template>
  <div>
    <!--    <input type="file" @change="handleFileChange"/>-->
    <el-form>
      <el-form-item>标题:<el-input v-model="videoForm.title"/></el-form-item>
      <el-form-item>描述:<el-input v-model="videoForm.description"/></el-form-item>
      <el-form-item>视频类型:<el-input v-model="videoForm.tags"/></el-form-item>
    </el-form>
    <el-upload
        class="upload-demo"
        drag
        :on-change="fileChange"
        multiple
        :auto-upload="false"
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        将文件放到这里或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          mp4 files with a size less than 500kb
        </div>
      </template>
    </el-upload>

  </div>
</template>

<script>
import {UploadFilled} from "@element-plus/icons-vue";
import * as QiNiu from 'qiniu-js'
import {getQiNiuToken, saveVideoMetadata} from "@/api/request";

const config = {
  useCdnDomain: true,
  region: QiNiu.region.z2
};

export default {
  name: "UploadFile",
  components: {UploadFilled},
  data() {
    return {
      videoForm: {
        title: '',
        description: '',
        tags: [],
      },
    }
  },
  methods: {
    fileChange(file) {
      console.log(file.name);
      getQiNiuToken(file.name).then(res => {
        console.log("获取到token", res);
        this.uploadVideo(file, res.data);
      }).catch(err => {
        console.log('QiNiu获取token失败');
      })
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      console.log(file.name);
      if (!file) return;
      // 验证文件格式，后面再处理
      try {
        getQiNiuToken(file.name).then(res => {
          console.log("获取到token", res);
          this.uploadVideo(file, res.data);
        }).catch(err => {
          console.log('QiNiu获取token失败');
        })
      } catch (error) {
        console.error('上传失败：', error);
      }
    },
    async uploadVideo(file, data) {
      //   实例化七牛云的上传实例
      const observable = QiNiu.upload(file, data.key, data.token, null, config);

      //   设置实例的监听对象
      const observer = {
        //   接收上传进度信息
        next(res) {
          // 上传进度
          const filePercent = parseInt(res.total.percent);
          console.log(filePercent + '%');
          if (filePercent === 100) {
            console.log("success")
          }
        },
        // 接收上传错误信息
        error(err) {
          console.log(err)
        },

        // 接收上传完成后的信息
        complete(res) {
          // 将数据报错到后端数据库
          const url = 'http://s32r2vddr.hn-bkt.clouddn.com' + res.key;

          saveVideoMetadata({
            title: data.videoForm.title,
            description: data.videoForm.description,
            uploadTime: new Date(),
            duration: '视频时长',
            filePath: 'http://s32r2vddr.hn-bkt.clouddn.com' + res.key,
            format: file.raw.type,
            fileSize: file.size,
            tags: data.videoForm.tags,
          }).then(res => {
            console.log(res);
          }).catch(err => {
            console.log(err);
          })
        }
      };
      // 上传开始
      const subscription = observable.subscribe(observer);
    }
  }
}
</script>

<style scoped>

</style>