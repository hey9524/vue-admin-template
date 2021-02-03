/*
 * @Author: Hey
 * @Date: 2021-02-02 14:59:09
 * @LastEditTime: 2021-02-02 16:54:31
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\api\bullet.js
 */
import request from '@/utils/request'

// 获取评论列表
export function getCommentList(params = {
  pageIndex: 1,
  pageSize: 10
}) {
  return request({
    url: '/api/fr-video-comment/list',
    method: 'GET',
    params
  })
}

// 修改为弹幕
export function changeBulletChat(commentId) {
  return request({
    url: `/api/fr-video-comment/change/bulletChat/${commentId}`,
    method: 'GET',
  })
}

// 获取中奖列表
export function getWinningList(params) {
  return request({
    url: `/api/fr-user-prize/list`,
    method: 'GET',
    params
  })
}
