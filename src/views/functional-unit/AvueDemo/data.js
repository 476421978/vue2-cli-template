export const formData = {
  column: [
    {
      label: '输入框',
      prop: 'input',
      type: 'input'
    },
    {
      label: '数字输入框',
      prop: 'num',
      type: 'number'
    }
  ]
}

export const crudList = [
  {
    name: '张三',
    sex: '男'
  },
  {
    name: '李四',
    sex: '女'
  },
  {
    name: '张三',
    sex: '男'
  },
  {
    name: '李四',
    sex: '女'
  },
  {
    name: '张三',
    sex: '男'
  },
  {
    name: '李四',
    sex: '女'
  },
  {
    name: '张三',
    sex: '男'
  },
  {
    name: '李四',
    sex: '女'
  }
]

export const crudOption = {
  // height: 300,
  column: [
    {
      label: '姓名',
      prop: 'name',
      width: 200,
      fixed: true
    },
    {
      label: '性别',
      width: 300,
      prop: 'sex'
    },
    {
      label: '日期',
      width: 300,
      prop: 'datetime'
    },
    {
      label: '地址',
      width: 300,
      prop: 'address'
    }
  ]
}

export const crudPage = {
  total: crudList.length,
  currentPage: 1,
  pageSize: 10
}
