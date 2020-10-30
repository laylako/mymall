import axios from 'axios'

export function request(config) {
    // 1. 创建 axios 实例
    const instance = axios.create({
        baseURL: "http://106.54.54.237:8000/api/wh" || "http://123.207.32.32:8000/api/wh",
        timeout: 5000
    })

    // 2.axios的拦截器
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        return config
        // 1. 当 config 中的一些信息不符合服务器的要求时（对请求参数进行序列化）
        // 2. 当每次发送网络请求时，都希望显示一个 loading
        // 3. 某些网络请求必须携带一些特殊信息，比如登录时需要携带 token，如果没有 token 跳转到登录界面
    }, err => {
        // console.log(err);
    })

    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    return instance(config)
}