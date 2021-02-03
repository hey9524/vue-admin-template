/*
 * @Author: Hey
 * @Date: 2021-02-02 14:59:09
 * @LastEditTime: 2021-02-02 16:17:11
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\api\user.js
 */
import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/api/login/admin',
    method: 'post',
    params
  })
}
