/*
 * @Author: Hey
 * @Date: 2021-02-03 11:54:16
 * @LastEditTime: 2021-02-03 20:35:16
 * @LastEditors: Hey
 * @Description: 
 * @FilePath: \vue-admin-template\src\utils\header.js
 */

export const tableHeader = [{
    label: '用户UUID',
    props: 'userUuid'
  },
  {
    label: '是否显示为弹幕',
    props: 'bulletChat'
  },
  {
    label: '第几楼',
    props: 'floor'
  },
  {
    label: '显示状态',
    props: 'state'
  },
  {
    label: '评论内容',
    props: 'comment'
  },
]

export const winTableHeader = [{
    label: '用户名',
    props: 'nickname'
  },
  {
    label: '电话',
    props: 'phone'
  },
  {
    label: '奖励',
    props: 'prizeGood'
  }
]

