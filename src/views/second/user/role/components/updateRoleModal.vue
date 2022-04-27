<template>
  <DialogModal ref="DialogModalRef" :title="dialogTitle" :isHideFooter="true">
    <template slot="content">
      <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
        <a-form-item name="name" label="名称">
          <a-input v-model:value="formState.name" placeholder="请输入新角色名称" />
        </a-form-item>

        <a-form-item name="code" label="编码">
          <a-input v-model:value="formState.code" type="number" placeholder="请输入唯一编码" />
        </a-form-item>

        <a-form-item name="describe" label="描述">
          <a-textarea
            v-model:value="formState.describe"
            placeholder="请输入角色的描述"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>

        <a-form-item name="web_auth_arr" label="权限角色">
          <a-checkbox-group v-model:value="formState.web_auth_arr" name="role" :options="getRoleFilter" />
        </a-form-item>

        <a-form-item name="open_flag" label="状态">
          <a-switch v-model:checked="formState.open_flag" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">{{ roleType === 'Add' ? '创建' : '更新' }}</a-button>
          <a-button style="margin-left: 10px" @click="onCancel">取消</a-button>
        </a-form-item>
      </a-form>
    </template>
  </DialogModal>
</template>

<script>
import API from '@/api'
import { getRoleCheckbox } from '@/utils/menu.js'
import DialogModal from '@/components/modal/dialogModal.vue'
import CommonMixin from '@/mixins/common'
export default {
  components: {
    DialogModal
  },
  mixins: [CommonMixin],
  props: {
    roleType: {
      type: String,
      default: 'Add'
    },
    roleInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogTitle: {
        top: '权限详情'
      },
      labelCol: {
        span: 4
      },
      // 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
      wrapperCol: {
        span: 14
      },
      formState: {
        name: '',
        code: 0,
        describe: '',
        web_auth_arr: [],
        open_flag: false
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入正确格式的角色名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 10,
            message: '长度为1-10位',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            type: 'number',
            message: '请输入1-3位数字',
            trigger: 'blur',
            transform: (value) => {
              return Number(value)
            }
          }
        ],
        describe: [
          {
            required: true,
            message: '请输入1-99个字符',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 99,
            message: '长度为1-99位',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    getRoleFilter() {
      // 递归权限
      // 过滤后的权限路由数据
      return getRoleCheckbox()
    }
  },
  methods: {
    // 展示
    onShowModal() {
      if (this.roleInfo) {
        // 已拥有的权限
        this.formState.web_auth_arr = this.roleInfo.web_auth_arr || []
        this.formState.name = this.roleInfo.name
        this.formState.code = this.roleInfo.code
        this.formState.describe = this.roleInfo.describe
        this.formState.open_flag = this.roleInfo.open_flag === 0 ? false : true
      }
      this.$nextTick(() => {
        this.$refs.DialogModalRef.onShowModal()
      })
    },
    // 提交
    onSubmit() {
      this.Toast({ msg: `${this.roleInfo ? '更新' : '创建'}成功` })
      this.$refs.DialogModalRef.onHideModal()
    },
    // 取消
    onCancel() {
      this.$refs.DialogModalRef.onHideModal()
    }
  }
}
</script>
