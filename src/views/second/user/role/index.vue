<template>
  <div>
    <a-row :gutter="24">
      <a-col :md="6" :sm="24">
        <a-input-search v-model:value="searchTxt" placeholder="请输入待搜索内容" style="width: 200px" @search="onSearch" />
      </a-col>
      <a-col :md="6" :sm="24">
        <a-button type="primary" @click="onAddRole">增加角色</a-button>
      </a-col>
    </a-row>
    <br /><br />
    <h2>角色列表</h2>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataSource"
      :loading="loading"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <div slot="open_flag" slot-scope="text">
        <span>{{ text === 0 ? '关' : '开' }}</span>
      </div>

      <div slot="btn" slot-scope="text, record">
        <a class="ant-dropdown-link" @click="onDetail(record)">编辑</a>
        <a-divider type="vertical" style="height: 10px; background-color: #7cb305" />
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent> 更多 </a>
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
      </div>
    </a-table>

    <updateRoleModal ref="updateRoleModalRef" :roleInfo="roleInfo" :roleType="roleType" @refresh-data="getRoleList"></updateRoleModal>
  </div>
</template>

<script>
import { roleColumns } from './data'
import API from '@/api/index'
import updateRoleModal from './components/updateRoleModal.vue'
import CommonMixin from '@/mixins/common'
export default {
  components: {
    updateRoleModal
  },
  mixins: [CommonMixin],
  data() {
    return {
      columns: roleColumns,
      loading: false,
      pagination: {},
      dataSource: [],
      searchTxt: '',
      roleInfo: {},
      roleType: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 获取角色列表
    async getRoleList(params = { current: 1, pageSize: 1 }) {
      this.loading = true
      await API.GetRoleList({
        pages_num: params.current,
        pages_size: params.pagesSize
      }).then((data) => {
        this.pagination.pageSize = params.pageSize
        this.pagination.current = params.current
        this.pagination.total = data.count
        this.pagination.showTotal = (total) => `总数 ${total} 条`
        this.loading = false
        this.dataSource = data.rows
      })
    },
    // 翻页
    handleTableChange(pag) {
      getRoleList({
        pageSize: pag.pageSize,
        current: pag.current
      })
    },
    onSearch() {
      this.Toast({ type: 'info', msg: `${this.searchTxt}` })
    },
    onDetail(item) {
      this.roleType = 'Detail'
      this.roleInfo = item
      this.$nextTick(() => {
        this.$refs.updateRoleModalRef.onShowModal()
      })
    },
    async onAddRole() {
      this.roleType = 'Add'
      this.roleInfo = {}
      this.$nextTick(() => {
        this.$refs.updateRoleModalRef.onShowModal()
      })
    },
    init() {
      this.getRoleList()
    }
  }
}
</script>
