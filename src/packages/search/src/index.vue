<template>
  <div class="t-search">
    <div class="search-main">
      <div class="search-left">
        <el-input v-model="currentVal" :placeholder="tips" clearable class="input-with-select">
          <el-select
            v-if="options.length > 0"
            slot="prepend"
            v-model="currentType"
            clearable
            v-bind="$attrs"
            v-on="$listeners"
            @change="changeSelect"
          >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search">查询</el-button>
        </el-input>
      </div>
      <div class="search-right">
        <slot name="operate"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TSearch',
  props: {
    tips: {
      type: String,
      default: '请输入查询内容'
    },
    options: {
      type: Array,
      default: () => []
    },
    searchValue: {
      // 查询值
      type: String,
      default: ''
    },
    selectValue: {
      // 下拉选项值
      type: String,
      default: ''
    }
  },
  emits: ['click', 'change'],
  data() {
    return {
      currentType: this.selectValue,
      currentVal: this.searchValue
    }
  },
  methods: {
    search() {
      this.$emit('click', this.currentVal)
    },
    changeSelect() {
      this.$emit('change', this.currentType)
    }
  }
}
</script>

<style lang="scss">
.t-search {
  padding: 20px 0;
  width: 435px;
  &:before {
    content: '' !important;
  }
  .search-main {
    display: flex;
    justify-content: space-between;
    .el-input-group__prepend {
      background-color: #fff;
      width: 130px;
      .el-input__inner {
        text-align: center;
        width: 130px !important;
      }
    }
    .search-left {
      .el-input__inner {
        width: 260px;
      }
    }
    button {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .search-right {
    margin-left: 20px;
    div {
      display: flex;
      align-items: center;
    }
  }
}
</style>
