/*
 * @Author: Hey
 * @Date: 2021-02-02 14:59:09
 * @LastEditTime: 2021-02-02 15:40:12
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\utils\get-page-title.js
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '后台管理'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
