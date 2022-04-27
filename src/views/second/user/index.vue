<template>
  <div class="home">
    <div class="user-info">
      <a-row :gutter="24">
        <a-col :md="6" :sm="24">
          <a-input-search
            v-model:value="searchTxt"
            placeholder="请输入待搜索内容"
            style="width: 200px"
            @search="onSearch"
          />
        </a-col>
        <a-col :md="6" :sm="24">
          <a-button type="primary" @click="onAddUser">增加用户</a-button>
        </a-col>
      </a-row>
      <br /><br />

      <!-- 用户列表 -->
      <h2>用户列表</h2>
      <a-table
        :columns="userColumns"
        :row-key="(record) => record.id"
        :data-source="orderList"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <div slot="sex" slot-scope="text">
          <span>{{ text === 0 ? '女' : '男' }}</span>
        </div>

        <template slot="last_time" slot-scope="text">
          <span>{{ dayjs(text).format('YYYY-MM-DD HH:mm') }}</span>
        </template>

        <template slot="btn" slot-scope="text, record">
          <a class="ant-dropdown-link" @click="onDetail(record)">详情</a>
          <a-divider type="vertical" style="height: 10px; background-color: #7cb305" />
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              更多
              <a-icon type="down" />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="#:;">详情</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="#:;">禁用</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="#:;">删除</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-table>
      <br /><br />
    </div>
    <UpdateUserModal
      ref="UpdateUserModalRef"
      :userInfo="userInfo"
      :userType="userType"
      @refresh-data="getOrderList"
    ></UpdateUserModal>
  </div>
</template>

<script>
import API from '@/api'
import { userColumns } from './data'
import dayjs from 'dayjs'
import UpdateUserModal from './components/updateUserModal.vue'
export default {
  components: {
    UpdateUserModal
  },
  data() {
    return {
      dayjs,
      userColumns,
      orderList: [],
      loading: false,
      pagination: {},
      searchTxt: '',
      userInfo: {},
      userType: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async getOrderList(params = { current: 1, pageSize: 1 }) {
      this.loading = true
      await API.GetUserList({
        pages_size: params.pagesSize,
        pages_num: params.current,
        search_txt: this.searchTxt
      }).then((data) => {
        this.pagination.pageSize = params.pageSize
        this.pagination.current = params.current
        this.pagination.total = data.count
        this.pagination.showTotal = (total) => `总数 ${total} 条`
        this.loading = false
        this.orderList = data.rows
      })
    },
    // 搜索
    onSearch() {},
    // 翻页
    handleTableChange(pag) {
      this.getOrderList({
        pageSize: pag.pageSize,
        current: pag.current
      })
    },
    async onAddUser() {
      this.userType = 'Add'
      this.userInfo = {}
      this.$nextTick(() => {
        // this.$refs.UpdateUserModalRef.onShowModal()
      })
    },
    onDetail(item) {
      this.userType = 'Detail'
      this.userInfo = item
      this.$nextTick(() => {
        this.$refs.UpdateUserModalRef.onShowModal()
      })
    },
    // 初始化
    init() {
      this.getOrderList()
    }
  }
}

// import { ref, onMounted, reactive, inject, nextTick } from 'vue'
// const UpdateUserModalRef = ref('UpdateUserModalRef')
// const $Toast = inject('$Toast')

// 表单
// let orderList = ref([])
// const loading = ref(false)
// const pagination = reactive({})

// 获取列表
// const getOrderList = async function (params = { current: 1, pageSize: 1 }) {
//   loading.value = true

//   await API.GetUserList({
//     pages_size: params.pagesSize,
//     pages_num: params.current,
//     search_txt: searchTxt.value
//   }).then((data) => {
//     pagination.pageSize = params.pageSize
//     pagination.current = params.current
//     pagination.total = data.count
//     pagination.showTotal = (total) => `总数 ${total} 条`

//     loading.value = false
//     orderList.value = data.rows
//   })
// }

// 搜索
// let searchTxt = ref('')
// const onSearch = () => {
//   $Toast({ type: 'info', msg: `搜索${searchTxt.value}` })
// }

// 翻页
// const handleTableChange = function (pag) {
//   getOrderList({
//     pageSize: pag.pageSize,
//     current: pag.current
//   })
// }

// 弹窗 增加用户 查看详情
// let userInfo = ref({})
// let userType = ref('')
// const onDetail = function (item) {
//   userType.value = 'Detail'
//   userInfo.value = item
//   nextTick(() => {
//     UpdateUserModalRef.value.onShowModal()
//   })
// }
// const onAddUser = async () => {
//   userInfo.value = {}
//   userType.value = 'Add'
//   nextTick(() => {
//     UpdateUserModalRef.value.onShowModal()
//   })
// }

// onMounted(() => {
//   init()
// })

// 初始化
// const init = function () {
//   getOrderList()
// }
</script>
