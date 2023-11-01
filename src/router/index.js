import {createRouter, createWebHistory} from 'vue-router'

import Login from "@/views/Login.vue";
import SingleVideo from "@/views/home/SingleVideo.vue";
import Mine from "@/views/home/Mine.vue";
import Popular from "@/views/home/Popular.vue";
import PhysicalCulture from "@/views/home/PhysicalCulture.vue";
import Knowledge from "@/views/home/Knowledge.vue";
import UploadFile from "@/components/UploadFile.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/home/Home.vue";

const routes = [
    {
        path: '/', // 根路径
        redirect: '/login', // 重定向
    },
    {
        path: '/login', // 登录路径
        name: 'login',
        component: Login, // 登录组件
    },
    {
        path: '/register', // 注册路径
        name: 'register',
        component: Register // 注册组件
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
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
            {
                path: '/uploadFile', // 上传视频路径
                name: 'uploadFile',
                component: UploadFile, // 上传视频组件
            },
        ],
    },
    // 其他页面的路由配置
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
