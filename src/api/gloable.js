import axios from 'axios';
// 添加请求拦截器
axios.interceptors.request.use(config => {
    // axios封装，get 方式不能放置请求头，因为data为空，这里需要配置一下
    if (config.method === 'get') {
        config.data = true;
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    config.headers['Authorization'] = localStorage.getItem('access_token');
    return config;
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
    return response.data; // 返回数据
}, error => { // 响应报错
})