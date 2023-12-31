import _ from 'lodash'
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'

export default {
  data() {
    return {
      RegArr: {
        accountReg: /^[a-zA-Z0-9_-]{4,16}$/, // 账号正则 4到16位 字母，数字，下划线，减号
        passwordReg: /^[a-zA-Z0-9_-]{4,16}$/, // 密码正则
        phoneReg: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, // 手机号
        idReg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 身份证
        isEmptyInputReg: /^S{1,}/ // 空值
      }
    }
  },
  computed: {
    ...mapState(['stoUser', 'globalSetting'])
  },
  methods: {
    /**
     * 格式化时间
     * @param {*} date
     * @param {*} guide
     * @returns YYYY-MM-DD HH:mm:ss
     */
    getFormatDate(date, guide = 'YYYY-MM-DD HH:mm:ss') {
      if (!date) return ''
      return dayjs(date).format(guide)
    },
    /**
     * 正则表达式验证
     * @param {*} value 数据内容
     * @param {*} reg 正则表达式名称
     * @returns true/false
     */
    verifyReg(value, reg) {
      if (!this.RegArr[reg]) {
        alert('找不到验证')
        return false
      }
      return this.RegArr[reg].test(value)
    },
    Toast({ type = 'success', msg = '提示信息', time = 3 }) {
      message[type](msg, time)
    }
  }
}
