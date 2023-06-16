export default [
  {
    path: '/layout/home', // 首页
    name: 'home',
    meta: {
      title: '首页',
      auth: 'home',
      key: '0'
    },
    component: () => import(/* webpackChunkName: "group-home" */ '@/views/second/home/index.vue')
  },
  {
    path: '/layout/setting',
    name: 'setting',
    meta: {
      title: '设置页',
      auth: 'setting',
      key: '1'
    },
    component: () => import(/* webpackChunkName: "group-setting" */ '@/views/second/setting/index.vue')
  },
  /** 人物页 */
  {
    path: '/layout/user',
    name: 'user',
    meta: {
      title: '用户管理',
      auth: 'user-management',
      key: '2-1'
    },
    component: () => import(/* webpackChunkName: "group-user" */ '@/views/second/user/index.vue')
  },
  {
    path: '/layout/user/role',
    name: 'role',
    meta: {
      title: '角色管理',
      auth: 'user-role',
      key: '2-2'
    },
    component: () => import(/* webpackChunkName: "group-user" */ '@/views/second/user/role/index.vue')
  },
  /** 异常页 start */
  {
    path: '/layout/empty/403',
    name: 'empty/403',
    meta: {
      title: '403',
      key: '3-1'
    },
    component: () => import(/* webpackChunkName: "group-empty" */ '@/views/empty/403.vue')
  },
  {
    path: '/layout/empty/404',
    name: 'empty/404',
    meta: {
      title: '404',
      key: '3-2'
    },
    component: () => import(/* webpackChunkName: "group-empty" */ '@/views/empty/404.vue')
  },
  {
    path: '/layout/empty/500',
    name: 'empty/500',
    meta: {
      title: '500',
      key: '3-3'
    },
    component: () => import(/* webpackChunkName: "group-empty" */ '@/views/empty/500.vue')
  },
  /** 异常页 end */

  /** 二次封装 start */
  {
    path: '/layout/again/ant-design-again',
    name: 'ant-design-again',
    meta: {
      title: 'ant-design-again',
      key: '5-1'
    },
    component: () => import(/* webpackChunkName: "group-again-ant" */ '@/views/again/ant-design-again/index.vue')
  },
  {
    path: '/layout/again/element-again',
    name: 'element-again',
    meta: {
      title: 'element-again',
      key: '5-2'
    },
    component: () => import(/* webpackChunkName: "group-again-element" */ '@/views/again/element-again/index.vue')
  },
  /** 二次封装 end */

  /** Three示例 start */
  {
    path: '/layout/threeDemo/rain',
    name: 'rain',
    meta: {
      title: '雨天',
      key: '8-1'
    },
    component: () => import(/* webpackChunkName: "group-threeDemo" */ '@/views/threeDemo/rain/index.vue')
  },
  {
    path: '/layout/threeDemo/360/round',
    name: 'round',
    meta: {
      title: '圆-360°全景',
      key: '8-2'
    },
    component: () => import(/* webpackChunkName: "group-user" */ '@/views/threeDemo/360/round.vue')
  },
  {
    path: '/layout/threeDemo/360/skyBox',
    name: 'skyBox',
    meta: {
      title: '立-360°全景',
      key: '8-3'
    },
    component: () => import(/* webpackChunkName: "group-user" */ '@/views/threeDemo/360/skyBox.vue')
  },
  {
    path: '/layout/threeDemo/360/panolens',
    name: 'panolens',
    meta: {
      title: 'panolens-360°全景',
      key: '8-4'
    },
    component: () => import(/* webpackChunkName: "group-user" */ '@/views/threeDemo/360/panolens.vue')
  },
  /** Three示例 end */

  /** 功能页 start */
  {
    path: '/layout/functional-unit/editor',
    name: 'editor ',
    meta: {
      title: '富文本',
      key: '12-2'
    },
    component: () => import(/* webpackChunkName: "group-editor" */ '@/views/functional-unit/editor/index.vue')
  },
  {
    path: '/layout/functional-unit/codeNote',
    name: 'codeNote',
    meta: {
      title: '测试模块',
      key: '12-1'
    },
    component: () => import(/* webpackChunkName: "group-codeNote" */ '@/views/functional-unit/codeNote/index.vue')
  },
  {
    path: '/layout/functional-unit/xlsxDemo',
    name: 'xlsxDemo',
    meta: {
      title: 'Xlsx示例',
      key: '12-3'
    },
    component: () => import(/* webpackChunkName: "group-xlsxDemo" */ '@/views/functional-unit/xlsxDemo/index.vue')
  },
  {
    path: '/layout/functional-unit/qiniuDemo',
    name: 'qiniuDemo',
    meta: {
      title: '七牛云',
      key: '12-4'
    },
    component: () => import(/* webpackChunkName: "group-xlsxDemo" */ '@/views/functional-unit/qiniuDemo/index.vue')
  },
  {
    path: '/layout/functional-unit/mapDemo',
    name: 'mapDemo',
    meta: {
      title: '地图',
      key: '12-5'
    },
    component: () => import(/* webpackChunkName: "group-xlsxDemo" */ '@/views/functional-unit/mapDemo/index.vue')
  },
  {
    path: '/layout/functional-unit/capaticy',
    name: 'capaticy',
    meta: {
      title: 'echart示例',
      key: '12-6'
    },
    component: () => import(/* webpackChunkName: "group-capaticy" */ '@/views/functional-unit/capaticy/index.vue')
  },
  {
    path: '/layout/functional-unit/scrollList',
    name: 'scrollList',
    meta: {
      title: '虚拟列表',
      key: '12-7'
    },
    component: () => import(/* webpackChunkName: "group-scrollList" */ '@/views/functional-unit/scrollList/index.vue')
  },
  {
    path: '/layout/functional-unit/draggableDemo',
    name: 'draggableDemo',
    meta: {
      title: '拖动列表',
      key: '12-8'
    },
    component: () =>
      import(/* webpackChunkName: "group-scrollList" */ '@/views/functional-unit/draggableDemo/index.vue')
  },
  {
    path: '/layout/functional-unit/AvueDemo',
    name: 'AvueDemo',
    meta: {
      title: 'AvueDemo',
      key: '12-9'
    },
    component: () => import(/* webpackChunkName: "group-scrollList" */ '@/views/functional-unit/AvueDemo/index.vue')
  },
  /** 功能页 end */
  /** 视频播放 start */
  {
    path: '/layout/functional-unit/videoDemo',
    name: 'videoDemo',
    meta: {
      title: 'videoDemo',
      key: '12-10'
    },
    component: () =>
      import(/* webpackChunkName: "group-scrollList" */ '@/views/functional-unit/videoDemo/dplayerDemo.vue')
  }
  /** 视频播放 end */
]
