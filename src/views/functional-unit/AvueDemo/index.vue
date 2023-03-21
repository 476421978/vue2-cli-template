<template>
  <div>
    <h2>Avue@2.7.1</h2>
    <div>推荐npm安装最新版本</div>
    <br />
    <avue-form :option="formData"></avue-form>
    <avue-crud :data="crudList" :option="crudOption" :page.sync="crudPage"></avue-crud>
  </div>
</template>

<script>
import { formData, crudList, crudOption, crudPage } from './data.js'
export default {
  data() {
    return {
      formData,
      crudOption,
      crudList,
      crudPage
    }
  }
}
</script>

<style></style>
