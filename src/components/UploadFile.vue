<template>
  <div>
    <el-form :model="form" label-width="120px" style="margin-right: 10px">
      <el-form-item label="视频标题">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="视频标签">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox v-for="tag in defaultTags" :label="tag" name="type" key="tag"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="视频描述">
        <el-input v-model="form.description" type="textarea"/>
      </el-form-item>
      <el-form-item>
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
      </el-form-item>

      <el-form-item style="float: right; margin-right: 10px">
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button native-type="reset">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {UploadFilled} from "@element-plus/icons-vue";
import * as QiNiu from 'qiniu-js'
import {getQiNiuToken, saveVideoMetadata} from "@/api/request";
import {ElMessage} from "element-plus";
import moment from "moment";

const config = {
  useCdnDomain: true,
  region: QiNiu.region.z2
};

let uploadState = false;
let videoKey = '';

export default {
  name: "UploadFile",
  components: {UploadFilled},
  data() {
    return {
      form: {
        title: '',
        description: '',
        tags: [],
      },
      videoFile: {},
      defaultTags: ['体育', '知识'],
    }
  },
  methods: {
    fileChange(file) {
      console.log(file);
      this.videoFile = file;
      console.log(file);
      getQiNiuToken(file.name).then(res => {
        console.log("获取到token", res);
        this.uploadVideo(file, res.data);
      }).catch(err => {
        console.log('QiNiu获取token失败');
      })
    },
    async uploadVideo(file, data) {
      const headers = QiNiu.getHeadersForChunkUpload(data.token)
      console.log("headers", headers);
      this.progressFlag = true;
      // 实例化七牛云的上传实例
      const observable = QiNiu.upload(file.raw, data.key, data.token, null, config);

      const observer = { //   设置实例的监听对象
        next(res) { //   接收上传进度信息
          const filePercent = parseInt(res.total.percent); // 上传进度
          this.loadProgress = filePercent;
          console.log(filePercent + '%');
          if (filePercent === 100) {
            console.log("success")
          }
        },
        error(err) { // 接收上传错误信息
          console.log(err)
        },
        complete(res) { // 接收上传完成后的信息
          videoKey = res.key;
          uploadState = true;
          console.log('视频上传成功');
        }
      };
      // 上传开始
      const subscription = observable.subscribe(observer);
    },
    onSubmit() {
      if (uploadState) { // 视频上传到七牛云才开始提交
        // 将视频外链以及一些基本信息保存到数据库
        saveVideoMetadata({
          title: this.form.title,
          description: this.form.description,
          uploadTime: moment.utc(new Date()).local().format('YYYY-MM-DD HH:mm:ss'),
          duration: '1200',
          filePath: 'http://s32r2vddr.hn-bkt.clouddn.com/' + videoKey.replace(/.[^/.]+$/, '.m3u8'),
          format: this.videoFile.raw.type,
          fileSize: this.videoFile.size,
          tags: this.form.tags.join(','),
        }).then(res => {
          ElMessage({
            type: 'success',
            message: '上传成功'
          })
          console.log(res);
          this.$router.push('/mine');
        }).catch(err => {
          console.log(err);
        })
      } else { // 弹出信息，稍微等一会
        ElMessage({
          type: 'warning',
          message: '视频还未上传成功，请稍等片刻',
        })
      }
    },
  }
}
</script>

<style scoped>
.upload-demo {
  width: 50%;
}
</style>