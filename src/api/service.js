import axios from 'axios'
import {ElMessage, ElLoading} from 'element-plus'

let loadingInstance = null //这里是loading

//使用create方法创建axios实例
export const Service = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: '',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': localStorage.getItem('access_token'),
    }
})

// 添加请求拦截器
Service.interceptors.request.use(config => {
    // axios封装，get 方式不能放置请求头，因为data为空，这里需要配置一下
    if (config.method === 'get') {
        config.data = true;
        // console.log("GET请求");
    }
    config.headers['Authorization'] = localStorage.getItem('access_token');

    loadingInstance = ElLoading.service({
        lock: true,
        text: 'loading...'
    })
    return config
})

// 添加响应拦截器
Service.interceptors.response.use(response => {
    loadingInstance.close()
    // console.log(response)
    return response.data
}, error => {
    console.log('TCL: error', error)
    const msg = error.Message !== undefined ? error.Message : ''
    ElMessage({
        message: '网络错误' + msg,
        type: 'error',
        duration: 3 * 1000
    })
    loadingInstance.close()
    return Promise.reject(error)
})