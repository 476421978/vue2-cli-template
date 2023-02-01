<template>
  <div class="test-demo">
    <button @click="exportXlsx">导出</button>
    <br />
    <button @click="exportXlsxStyle">导出style</button>
  </div>
</template>

<script>
import { excelExport, excelImport } from 'pikaz-excel-js'
import * as XLSX from 'xlsx'
const ExportJsonExcel = require('js-export-excel')
export default {
  data() {
    return {
      classFiledNames: [
        'agent',
        'realName',
        'mobile',
        'cityName',
        'payPrice',
        'incomePrice',
        'taxes',
        'couponPrice',
        'mileageFee',
        'insuranceExpenses',
        'refundPrice',
        'invitationAmount',
        'orderNum'
      ],
      columnNames: [
        '所属公司',
        '司机姓名',
        '司机电话',
        '运营城市',
        '乘客付费',
        '司机收入',
        '司机税费',
        '优惠券抵扣',
        '信息费',
        '保险金额',
        '退款金额',
        '营销收入',
        '完成单量'
      ],
      list: [
        {
          agent: '番禺测试公司',
          realName: '哈哈',
          mobile: '15111111111',
          cityName: '广州市',
          payPrice: 16,
          incomePrice: 11.76,
          taxes: 0.24,
          couponPrice: 0,
          mileageFee: 2,
          insuranceExpenses: 2,
          refundPrice: 0,
          invitationAmount: 0,
          serviceType: null,
          orderNum: 0,
          startTime: null,
          endTime: null
        },
        {
          agent: '代理人',
          realName: '测评',
          mobile: '15111111111',
          cityName: '深圳市',
          payPrice: 25.2,
          incomePrice: 29.7,
          taxes: 0.3,
          couponPrice: 21.6,
          mileageFee: 3,
          insuranceExpenses: 3,
          refundPrice: 0,
          invitationAmount: 4,
          serviceType: null,
          orderNum: 5,
          startTime: null,
          endTime: null
        },
        {
          agent: '代理人',
          realName: 'xxx',
          mobile: '15111111111',
          cityName: '广州',
          payPrice: 18.59,
          incomePrice: 16.42,
          taxes: 0.17,
          couponPrice: 0,
          mileageFee: 1,
          insuranceExpenses: 1,
          refundPrice: 0,
          invitationAmount: 0,
          serviceType: null,
          orderNum: 2,
          startTime: null,
          endTime: null
        }
      ],
      bgStyleArr: []
    }
  },
  methods: {
    exportXlsx() {
      var option = {}
      option.fileName = 'excel'
      option.datas = [
        {
          sheetData: this.list,
          sheetName: 'sheet',
          sheetFilter: this.classFiledNames,
          sheetHeader: this.columnNames
          // columnWidths: [20, 20]
        }
      ]
      var toExcel = new ExportJsonExcel(option) //new
      toExcel.saveExcel() //保存
    },
    exportXlsxStyle() {
      this.bgStyleArr = []
      for (let i = 1; i <= this.classFiledNames.length; i++) {
        this.bgStyleArr.push({
          cell: `${i}-1`,
          fill: {fgColor: {rgb: 'B0C4DE'}}
        })
      }

      excelExport({
        sheet: [
          {
            // title: ''
            tHeader: this.columnNames, // 表头
            keys: this.classFiledNames, // 数据键名
            table: this.list, // 表格数据
            sheetName: 'sheetName',
            cellStyle: this.bgStyleArr // 单元格样式
          },
          {
          // 表格标题
          title: "水果的味道1",
          // 表头
          tHeader: ["种类", "味道"],
          // 数据键名
          keys: ["name", "taste"],
          // 表格数据
          table: [{
                  name: "荔枝",
                  taste: "甜",
              },
              {
                  name: "菠萝蜜",
                  taste: "甜",
              }
          ],
          sheetName: "水果的味道1",
          }
        ]
      })
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped></style>
