/*
 * @Author: Hey
 * @Date: 2021-02-02 14:59:09
 * @LastEditTime: 2021-02-04 11:45:31
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\utils\auth.js
 */

const TokenKey = 'Token'

export const getToken = () => localStorage.getItem(TokenKey)
export const getStorage = key => localStorage.getItem(key) || ''

export const setToken = token => localStorage.setItem(TokenKey, token)
export const setStorage = (key, val) => localStorage.setItem(key, val)

export const removeToken = () => localStorage.removeItem(TokenKey)
