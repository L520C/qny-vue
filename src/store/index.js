import {createStore} from 'vuex'
import {ref} from "vue";

export default createStore({
    state: {
        loginActive: false, // 登录框显示与隐藏
        tabsActiveName: ref('login'), // 登录框是登录还是注册
        searchValue: '',  // 搜索框的值
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
})
