import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

import SingleVideo from "@/views/SingleVideo.vue";
import Mine from "@/views/Mine.vue";
import Popular from "@/views/Popular.vue";
import PhysicalCulture from "@/views/PhysicalCulture.vue";
import Knowledge from "@/views/Knowledge.vue";
import UploadFile from "@/components/UploadFile.vue";
import Search from "@/components/Search.vue";

const routes = [
    {
        path: '/', // 根路径
        name: 'home',
        component: SingleVideo,
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
        meta: {requiresLogin: true} // 需要登录才能进入页面
    },
    {
        path: '/mine', // 我的页面路径
        name: 'mine',
        component: Mine, // 我的页面组件
        meta: {requiresLogin: true} // 需要登录才能进入页面
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
    {
        path: '/search',
        name: 'search',
        component: Search,
    }
    // 其他页面的路由配置
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

// 路由前置守卫
router.beforeEach((to, from) => {
    // 通过路由配置来判断是否需要登录
    if (to.meta.requiresLogin && !store.state.isLogin) {
        store.state.loginActive = true; // 弹出登录页面
        return false;
    }
    return true;
})

export default router
