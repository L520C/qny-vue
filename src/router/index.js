import { createRouter, createWebHistory } from 'vue-router'
import SingleVideo from "@/views/SingleVideo.vue";
import Mine from "@/views/Mine.vue";

const routes = [
  {
    path: '/', // 根路径
    name: 'singleVideo',
    component: SingleVideo, // 主页组件
  },
  {
    path: '/recommend', // 推荐页面路径
    name: 'recommend',
    component: SingleVideo, // 推荐页面组件
  },
  {
    path: '/follow', // 关注页面路径
    name: 'follow',
    component: SingleVideo, // 关注页面组件
  },
  {
    path: '/mine', // 我的页面路径
    name: 'mine',
    component: Mine, // 我的页面组件
  },
  // 其他页面的路由配置
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
