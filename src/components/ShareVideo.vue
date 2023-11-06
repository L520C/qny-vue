<template>
  <div class="container">
    <div class="shareDialog">
      <div class="shareDialogHead">
        好友发送视频
      </div>
      <div class="shareDialogContent">
        <div class="shareFriends">
          <div class="shareFriendsItem" v-for="n in 8" :key="n">
            <div class="friendInfo">
              <div >
                <img class="friendInfoAvatar" src="http://localhost:10002/video/images/初音未来.jpg" alt="avatar">
              </div>
              <div class="friendInfoStatus">
                <span style="font-size: 14px;">秃头披风侠 </span>
                <span style="font-size: 13px;color: #6d7070">在 2023-11-08 22:12:06 分享了视频</span>
              </div>
            </div>
            <div class="shareControl">
              <img style="height: 40px;width: 40px;margin-right: 20px" src="http://localhost:10002/video/images/初音未来.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

</script>

<style scoped>
.container{
  height: 500px;
  width: 300px;
  max-height: 660px;
  max-width: 920px;
  background-color: rgb(27, 27, 38);
  position: absolute;
  left: -150px;
  bottom: -500px;
  z-index: 1;
  border-radius: 15px; /* 卡片边角的圆滑度 */
  transition: box-shadow 0.3s ease-in-out; /* 阴影变化的过渡效果 */
  /* 立体阴影效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), /* 较小的硬阴影 */ 0 10px 20px rgba(0, 0, 0, 0.05); /* 较大的模糊阴影 */
}
.shareDialog {
  width: 100%;
  height: 100%;
  display: flex; /* 启用 flex 布局 */
  flex-direction: column; /* 子元素按列排布 */
}

.shareDialogHead {
  flex: 1;
//border: red; display: flex; /* 启用 flex 布局 */ justify-content: center; /* 水平居中 */ align-items: center; /* 垂直居中 */
  border-bottom: 1px solid rgb(60, 60, 60); /* 设置下边框 */
}

.shareDialogContent {
  flex: 9;
  border-bottom: 1px solid rgb(60, 60, 60); /* 设置下边框 */
  overflow-y: auto; /* 当内容超出时显示滚动条 */
}
/* 隐藏webkit浏览器的滚动条 */
.shareDialogContent::-webkit-scrollbar {
  display: none;
}

/* 对于IE和Edge */
.shareDialogContent {
  -ms-overflow-style: none; /* IE和Edge */
  scrollbar-width: none; /* Firefox */
}

.shareFriendsItem {
  height: 80px;
  width: 100%;
  margin-bottom: 5px;
//background-color: cadetblue; display: flex; /* 启用 flex 布局 */
}
.shareFriendsItem:hover{
  background-color: rgba(148, 143, 143, 0.2);
}

.friendInfo {
  flex: 7; /* 占据父容器的3份空间 */
  display: flex; /* 启用 flex 布局 */
  align-items: center; /* 垂直居中 */
//background-color:wheat;
}

.shareControl {
  flex: 3; /* 占据父容器的3份空间 */
  display: flex; /* 启用 flex 布局 */
  justify-content: right; /* 右边 */
  align-items: center; /* 垂直居中 */
//background-color:green;
}

.friendInfoAvatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-left: 10px;
}

.friendInfoStatus {
  display: flex; /* 启用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  justify-content: center; /* 垂直居中 */
  height: 100%; /* 设置父容器的高度，确保有足够的空间进行垂直平分 */
  margin-left: 10px;
}


</style>