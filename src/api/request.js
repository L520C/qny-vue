import {Service} from './service'
import MD5 from 'js-md5'

// 用户注册
export function userRegister(user) {
    return Service({
        url: '/api/user/register',
        method: 'post',
        data: {
            name: user.name,
            password: MD5(user.password),
        },
    })
}

// 用户登录
export function login(user) {
    return Service({
        url: '/api/user/login',
        data: {
            name: user.name,
            password: MD5(user.password),
        },
        method: 'post'
    })
}

// 随机获取一个视频
export function randomVideo() {
    return Service({
        url: '/api/video/randomVideo',
        method: 'get',
    })
}

// POST验证
export function getMessage() {
    return Service({
        url: '/api/user/getMessage',
        method: 'post',
    })
}

export function addNewAndroidPlugin(data) {
    return Service({
        url: '/manager/addAndroidPlguin',
        data: JSON.stringify(data)
    })
}