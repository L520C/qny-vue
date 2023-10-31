<template>
  <div class="left">
    <el-menu :default-active="activeMenu" mode="vertical" @select="handleMenuSelect"
             active-text-color="#ffd04b"
             background-color="#545c64"
             class="el-menu-vertical-demo"
             text-color="#fff">
      <el-menu-item index="uploadFile">
        <el-popover placement="bottom" trigger="hover">
          <template #reference>
            <el-button>
              <el-icon>
                <CirclePlus/>
              </el-icon>
              上传作品
              <el-icon>
                <ArrowDown/>
              </el-icon>
            </el-button>
          </template>
          <div>
            <div style="margin: 5px">
              <el-text>
                <el-icon>
                  <VideoPlay/>
                </el-icon>
              </el-text>
              <el-text> 发布视频</el-text>
            </div>
            <div style="margin: 5px">
              <el-text>
                <el-icon>
                  <Picture/>
                </el-icon>
              </el-text>
              <el-text> 发布图文</el-text>
            </div>
            <div style="margin: 5px">
              <el-text>
                <el-icon>
                  <Money/>
                </el-icon>
              </el-text>
              <el-text> 发布全景视频</el-text>
            </div>
          </div>
        </el-popover>
      </el-menu-item>
      <el-menu-item index="recommend">推荐</el-menu-item>
      <el-menu-item index="follow">关注</el-menu-item>
      <el-menu-item index="mine">我的</el-menu-item>
      <el-divider/>
      <el-menu-item index="popular">热门</el-menu-item>
      <el-menu-item index="physicalCulture">体育</el-menu-item>
      <el-menu-item index="knowledge">知识</el-menu-item>
      <el-menu-item index="follow">直播</el-menu-item>
      <el-menu-item index="follow">放映厅</el-menu-item>
    </el-menu>
  </div>

</template>

<script>
import {ArrowDown, CirclePlus, Money, VideoPlay} from "@element-plus/icons-vue";

export default {
  name: 'Sidebar',
  components: {Money, VideoPlay, ArrowDown, CirclePlus},
  data() {
    return {
      activeMenu: "recommend",
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index;
      if (index === 'recommend') {
        this.$router.push({path: '/'});
      } else {
        this.$router.push({name: index});
      }
    },
  },
};
</script>

<style scoped>
.left {
  height: 100%;
}

.left .el-menu-item {
  color: #fff;
}

.left .el-menu-item:hover {
  /* background-color: #555; */
}

.el-menu-item-content {
  display: flex;
  align-items: center; /* X轴居中 */
//justify-content: center; /* Y轴居中 */
}
</style>