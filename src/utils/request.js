/*
 * @Author: Hey
 * @Date: 2021-02-02 14:59:09
 * @LastEditTime: 2021-02-03 16:35:18
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\utils\request.js
 */
import axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui'
import {
  getToken,
  removeToken
} from '@/utils/auth'
import Route from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
let load

// request interceptor
service.interceptors.request.use(
  config => {
    load = Loading.service({
      lock: true,
      text: "请稍等...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    })
    // do something before request is sent

    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken() || ''
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    load.close()

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401 || res.code === 512 || res.code === 500) {
        // to re-login
        Message({
          message: '您已经登出, 请重新登录',
          type: 'warning',
          duration: 3 * 1000
        })

        removeToken()
        let timer = setTimeout(() => {
          Route.replace('/login')
          clearTimeout(timer)
        })
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    load.close()
    console.log('err----' + error) // for debug
    removeToken()
    Route.replace('/login')

    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
