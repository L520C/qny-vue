import {createStore} from 'vuex'
import {reactive, ref} from "vue";

export default createStore({
    state: {
        loginActive: false, // 登录框显示与隐藏
        tabsActiveName: ref('login'), // 登录框是登录还是注册
        searchValue: '',  // 搜索框的值
        isLogin: false, // 是否已经登录
        physicalCultureVideoDataList: reactive([]), // 体育视频数据
        user: {
            icon: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        }, // 用户信息
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
