<template>
  <div class="xlsx-page">
    <div class="xlsx-box">
      <a @click="onDownloadExcel" style="margin-right: 20px">下载商品导入模版</a>
      <el-upload
        :disabled="uploadState !== '导入' ? true : false"
        ref="upload"
        accept=".xls, .xlsx"
        :action="domain"
        :http-request="uploadQiNiu"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        :on-change="onChange"
        :on-error="onUploadErr"
        :show-file-list="false"
      >
        <el-button :disabled="uploadState !== '导入' ? true : false" style="width: 150px" size="small" type="primary" v-popover:popover
          >{{ uploadState }}
        </el-button>
      </el-upload>
    </div>
    <div>内容：{{ xlsxContent }}</div>
    <br />
    <button @click="exportXlsx">固定模板-导出xlsx</button>
    <button @click="exportXlsxStyle">固定模板-改变导出xlsx的样式</button>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'
import { upLoadDataLimit, classFiledNames, columnNames, list } from './data'
import { excelExport, excelImport } from 'pikaz-excel-js'
import ExportJsonExcel from 'js-export-excel'
export default {
  data() {
    return {
      domain: 'https://upload-z2.qiniup.com', // 华南2
      uploadState: '导入',
      xlsxContent: '',
      //
      bgStyleArr: []
    }
  },
  methods: {
    exportXlsx() {
      var option = {}
      option.fileName = 'excel'
      option.datas = [
        {
          sheetData: list,
          sheetName: 'sheet',
          sheetFilter: classFiledNames,
          sheetHeader: columnNames
          // columnWidths: [20, 20]
        }
      ]
      var toExcel = new ExportJsonExcel(option) //new
      toExcel.saveExcel() //保存
    },
    exportXlsxStyle() {
      this.bgStyleArr = []
      for (let i = 1; i <= classFiledNames.length; i++) {
        this.bgStyleArr.push({
          cell: `${i}-1`,
          fill: { fgColor: { rgb: 'B0C4DE' } }
        })
      }
      excelExport({
        sheet: [
          {
            // title: ''
            tHeader: columnNames, // 表头
            keys: classFiledNames, // 数据键名
            table: list, // 表格数据
            sheetName: 'sheetName',
            cellStyle: this.bgStyleArr // 单元格样式
          },
          {
            // 表格标题
            title: '水果的味道1',
            // 表头
            tHeader: ['种类', '味道'],
            // 数据键名
            keys: ['name', 'taste'],
            // 表格数据
            table: [
              {
                name: '荔枝',
                taste: '甜'
              },
              {
                name: '菠萝蜜',
                taste: '甜'
              }
            ],
            sheetName: '水果的味道1'
          }
        ]
      })
    },
    // 选择文件限制数量
    onExceed(files, fileList) {
      if (files.length > 1) this.$message.warning('当前限制选择 1 个文件')
    },
    // 上传前的判断
    beforeUpload(file) {
      const reg = /^.*.(?:xls|xlsx|csv)$/i //文件名可以带空格
      if (!reg.test(file.name)) {
        this.errMessageToast('请选择正确的文件')
        return false
      }
      const size = file.size / 1024 / 1024
      if (size > 1) {
        this.errMessageToast('超出文件最大限制1M')
        return false
      }
    },
    // 取消上传
    cancelUpload() {
      this.$refs.upload.abort()
    },
    // 上传失败
    onUploadErr(err, file, fileList) {
      this.$message.error(err)
    },
    // 文件准备上传
    onChange(file, fileList) {
      if (file.status === 'ready') {
        this.uploadState = '正在上传...'
      }
      if (file.status === 'fail') {
        this.errMessageToast('上传文件失败')
      }
    },
    // 匹配字段
    isSameArr(val1, val2) {
      const val2S = val2.slice()
      if (val1.includes('失败原因（导入前请删除该列）')) {
        val2S.push('失败原因（导入前请删除该列）')
      }
      return val1.sort().toString() === val2S.sort().toString()
    },
    // 错误提示
    errMessageToast(val) {
      this.$message.error(val)
      this.uploadState = '导入'
    },
    // 自定义上传地址
    async uploadQiNiu(req) {
      const result = await this.readerData(req.file)
      // 标题 字段名称 核对
      var isSameNum = 0
      for (var j = 0; j < upLoadDataLimit.length; j++) {
        var limitData = upLoadDataLimit[j]
        for (var i = 0; i < result.data.length; i++) {
          var element = result.data[i]
          if (element.header === limitData.header && this.isSameArr(element.title, limitData.title)) {
            isSameNum++
          }
        }
      }

      if (isSameNum !== result.data.length) {
        this.errMessageToast('校验失败，表头（列标题）无法匹配，请重新下载模板再试！')
        return
      }

      this.uploadState = '导入'
      this.$message.success('导入完成')

      this.xlsxContent = result
    },
    // xlsx读取上传文件内容
    readerData(rawFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          let dataLimit = []
          let count = 0
          for (let i = 0; i < workbook.SheetNames.length; i++) {
            const firstSheetName = workbook.SheetNames[i]
            const worksheet = workbook.Sheets[firstSheetName]
            const header = this.getHeaderRow(worksheet)[0]
            const titles = this.getHeaderRow(worksheet, 1)
            const results = XLSX.utils.sheet_to_json(worksheet, { range: 1 })
            const resultFilter = titles.filter((item) => !(item.indexOf('UNKNOWN') > -1))
            // 计算
            count += results.length
            dataLimit.push({
              header: header,
              title: resultFilter
            })
          }
          resolve({
            data: dataLimit,
            total: count
          })
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    // 获取 header标题 title内容标题
    getHeaderRow(sheet, line = 0) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r + line
      for (C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    // 导出本地模板
    onDownloadExcel() {
      var downloadLink = document.createElement('a')
      downloadLink.style.display = 'none' // 使其隐藏
      downloadLink.href = `https://image.gxptkc.com//download/excel/goods/%E5%95%86%E5%93%81%E5%88%97%E8%A1%A8%EF%BC%88%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF%EF%BC%89.xls`
      downloadLink.download = this.errorExcelUrl
      downloadLink.click()
    }
  }
}
</script>

<style lang="less" scoped>
.xlsx-page {
  .xlsx-box {
    display: flex;
    align-items: center;
  }
}
</style>
