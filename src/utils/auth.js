/*
 * @Author: Hey
 * @Date: 2021-02-02 14:59:09
 * @LastEditTime: 2021-02-02 15:07:06
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\utils\auth.js
 */

const TokenKey = 'Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
