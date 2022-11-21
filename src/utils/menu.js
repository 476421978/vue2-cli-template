// web菜单权限
/**
 * name 菜单名称
 * path 路由地址
 * icon 图标
 * auth 权限
 * childMenu [] 子菜单
 * visible 显示隐藏
 */
export const menuList = [
  {
    key: '0',
    name: '首页',
    icon: 'HomeOutlined',
    path: 'home',
    auth: '',
    visible: false
  },
  {
    key: '1',
    name: '设置页',
    icon: 'MenuFoldOutlined',
    visible: false,
    path: 'setting',
    auth: 'setting'
  },
  {
    key: '2',
    name: '人物页',
    icon: 'UserOutlined',
    visible: false,
    auth: 'user',
    childMenu: [
      {
        key: '2-1',
        name: '用户管理',
        path: 'user',
        auth: 'user-management',
        visible: false
      },
      {
        key: '2-2',
        name: '角色管理',
        path: 'user/role',
        auth: 'user-role',
        visible: false
      }
    ]
  },
  {
    key: '3',
    name: '异常页',
    icon: 'WarningOutlined',
    visible: false,
    childMenu: [
      {
        key: '3-1',
        name: '403',
        path: 'empty/403',
        visible: false
      },
      {
        key: '3-2',
        name: '404',
        path: 'empty/404',
        visible: false
      },
      {
        key: '3-3',
        name: '500',
        path: 'empty/500',
        visible: false
      }
    ]
  },
  {
    key: '4',
    name: '数据看板',
    icon: 'Echart',
    path: 'capaticy',
    auth: 'capaticy',
    visible: false
  },
  {
    key: '5',
    name: '二次封装',
    icon: '',
    path: 'again',
    auth: '',
    visible: false
  },
  {
    key: '6',
    name: '富文本',
    icon: '',
    path: 'editor',
    auth: '',
    visible: false
  },
  // {
  //   key: '7',
  //   name: '代码笔记',
  //   icon: '',
  //   path: 'codeNote',
  //   auth: '',
  //   visible: false
  // },
  {
    key: '8',
    name: 'Three示例',
    visible: false,
    childMenu: [
      {
        key: '8-1',
        name: '雨天',
        path: 'threeDemo/rain',
        visible: false
      },
      {
        key: '8-2',
        name: '圆-360°全景',
        path: 'threeDemo/360/round',
        visible: false
      },
      {
        key: '8-3',
        name: '立-360°全景',
        path: 'threeDemo/360/skyBox',
        visible: false
      },
      {
        key: '8-4',
        name: '外封装-360°全景',
        path: 'threeDemo/360/panolens',
        visible: false
      }
    ]
  },

  {
    key: '9',
    name: 'Xlsx示例',
    icon: '',
    path: 'XlsxDemo',
    auth: '',
    visible: false
  },
  {
    key: '10',
    name: '七牛云上传图片',
    icon: '',
    path: 'qiniuDemo',
    auth: '',
    visible: false
  }
]

// 递归权限 过滤全局权限
export const getRoleCheckbox = function () {
  let roleCheckboxArr = []

  function recRole(obj) {
    if (obj) {
      if (obj.childMenu) {
        obj.childMenu.forEach((element) => {
          recRole(element)
        })
      }
      if (obj.auth) {
        roleCheckboxArr.push({
          label: obj.name,
          value: obj.auth
        })
      }
    }
  }

  for (let i = 0; i < menuList.length; i++) {
    recRole(menuList[i])
  }

  return roleCheckboxArr
}

// 递归
export const getMenuAllPath = function () {
  let keys = []
  function recRole(obj) {
    if (obj) {
      if (obj.childMenu) {
        obj.childMenu.forEach((element) => {
          recRole(element)
        })
      }
      if (obj.path) {
        keys.push({
          key: obj.key,
          path: obj.path
        })
      }
    }
  }

  for (let i = 0; i < menuList.length; i++) {
    recRole(menuList[i])
  }

  return keys
}
