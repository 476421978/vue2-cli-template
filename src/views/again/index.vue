<template>
  <div>
    <h2>Modal</h2>
    <a-button type="primary" @click="openDialog">常规弹窗</a-button>
    <t-modal v-model="visible" title="二次封装" @cancel="cancel" @ok="ok">
      <div class="select-ent-box flex-box flex-col">
        <div
          v-for="item in entList"
          :key="item.id"
          class="radio-line-item t-overflow-hidden"
          :class="entSelectType === item.id ? 'radioSelected' : ''"
          @click="selectType(item)"
        >
          <i v-if="entSelectType === item.id" class="el-icon-check icon-check"></i>
          {{ item.entName }}
          <span style="color: #999">(企业编码:{{ item.entCode }})</span>
        </div>
      </div>
    </t-modal>
    <br />
    <br />
    <h2>Input {{ input }}</h2>
    <t-input v-model="input" :placeholder="inputPlaceholder" :clearable="inputClearable" />
    <br />
    <br />
    <h2>Search： 选择：{{selectValue}} 查询：{{searchValue}}</h2>
    <t-search
      tips="请输入用户名"
      :searchValue="searchValue"
      :selectValue="selectValue"
      :options="sOptions"
      @click="onSearch"
      @change="onSearchChange"
    />
  </div>
</template>

<script>
// import LjInput from './components/LjInput'
export default {
  components: {
    // 'lj-input': LjInput
  },
  data() {
    return {
      // 二次封装弹窗组件
      visible: false,
      entSelectType: '',
      entList: [
        {
          id: 107,
          entName: '上海某某电子商务有限公司',
          entCode: '60003627',
          entType: null,
          entIdPcloud: '717380413542105088'
        },
        {
          id: 108,
          entName: '上海某某电子商务22',
          entCode: '60003627',
          entType: null,
          entIdPcloud: '717380413542105088'
        }
      ],
      // input
      inputPlaceholder: 'input自定义提示',
      inputClearable: true,
      input: '',
      // search
      searchValue: '', // 搜索内容
      selectValue: '选项1', // 初始化下拉选项
      sOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  mounted() {
    this.entSelectType = this.entList[0].id
  },
  methods: {
    // 二次封装弹窗事件
    selectType(item) {
      this.entSelectType = item.id
      this.visible = false
    },
    openDialog() {
      this.visible = true
    },
    ok() {
      this.visible = false
    },
    cancel() {
      this.visible = false
    },
    // Search
    onSearch(val) {
      console.log('点击查询按钮-->>>>', val)
      this.searchValue = val
    },
    onSearchChange(val) {
      this.selectValue = val
    }
  }
}
</script>

<style lang="scss">
.radio-line-item {
  margin: 20px 0;
}
.radioSelected {
  border: 1px solid red;
}
</style>
