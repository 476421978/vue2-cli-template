export const roleColumns = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   sorter: true,
  //   slots: {
  //     customRender: 'id'
  //   },
  // scopedSlots: { customRender: 'id' }
  // },
  {
    title: '唯一编码',
    dataIndex: 'code',
    sorter: true,
    slots: {
      customRender: 'code'
    },
    scopedSlots: { customRender: 'code' }
  },
  {
    title: '名称',
    dataIndex: 'name',
    slots: {
      customRender: 'name'
    },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '描述',
    dataIndex: 'describe',
    slots: {
      customRender: 'describe'
    },
    scopedSlots: { customRender: 'describe' }
  },
  {
    title: '状态',
    dataIndex: 'open_flag',
    slots: {
      customRender: 'open_flag'
    },
    scopedSlots: { customRender: 'open_flag' }
  },
  {
    title: '操作',
    dataIndex: 'btn',
    // slots: {
    //   customRender: 'btn'
    // },
    scopedSlots: { customRender: 'btn' }
  }
]
