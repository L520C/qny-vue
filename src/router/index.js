import { createRouter, createWebHistory } from 'vue-router'
import SingleVideo from "@/views/SingleVideo.vue";
import Mine from "@/views/Mine.vue";
import Popular from "@/views/Popular.vue";
import PhysicalCulture from "@/views/PhysicalCulture.vue";
import Knowledge from "@/views/Knowledge.vue";

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
  {
    path: '/popular', // 热门视频路径
    name: 'popular',
    component: Popular, // 热门视频组件
  },
  {
    path: '/physicalCulture', // 体育视频路径
    name: 'physicalCulture',
    component: PhysicalCulture, // 体育视频组件
  },
  {
    path: '/knowledge', // 知识视频路径
    name: 'knowledge',
    component: Knowledge, // 知识视频组件
  },
  // 其他页面的路由配置
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
