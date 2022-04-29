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
      input: ''
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
