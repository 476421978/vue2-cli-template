<template>
  <div v-if="getBread" class="crumb">
    <a-breadcrumb v-if="getBread.bread">
      <template v-for="(item, index) in getBread.bread">
        <a-breadcrumb-item v-if="item.path" :key="index">
          <a :href="item.path">{{ item.name }}</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-else :key="index">
          <span>{{ item.name }}</span>
        </a-breadcrumb-item>
      </template>
      <a-breadcrumb-item>
        <span>{{ getBread.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div name="title" class="margin-top-sm">
      <h3>{{ getBread.name }}</h3>
    </div>
    <div name="content"></div>
  </div>
</template>

<script>
import { crumbData } from './data.js'
export default {
  props: {
    selectKey: {
      type: String,
      default: ''
    }
  },
  computed: {
    getBread() {
      const res = crumbData
        .map((item) => {
          if (item.key === this.selectKey) return item
        })
        .filter((obj) => {
          if (obj) {
            return true
          }
        })
      return res[0]
    }
  }
}
</script>

<style lang="scss">
.crumb {
  background-color: #fff;
  margin-top: 1px;
  padding: 20px;
}
</style>
