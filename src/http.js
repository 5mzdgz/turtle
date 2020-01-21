import axios from 'axios'
import { Toast } from 'vant'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_DOMAIN
})

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => {
    let { code, msg } = res.data
    // console.log(res)
    switch (code) {
      case 200:
        return res
      case 40006:
        return res
      case 401:
        router.push({
          path: '/login'
        })
        break
      case 403:
        Toast({
          message: msg,
          position: 'top'
        })
        break
      case 500:
        Toast({
          message: msg,
          position: 'top'
        })
        break
      default:
        Toast({
          message: msg,
          position: 'top'
        })
    }
    return Promise.reject(msg)
  }
)

export default http
