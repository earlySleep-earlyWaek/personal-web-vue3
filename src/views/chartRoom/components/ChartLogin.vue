<template>
  <el-dialog v-model="config.diaVisible" width="400" :show-close="false">
    <template #header>
      <div class="text-center font-size-25px font-900">注册</div>
    </template>

    <el-form
      ref="formRef"
      :rules="config.rules"
      :model="params"
      label-position="left"
      label-width="80px"
    >
      <el-form-item prop="userName" label="昵称">
        <el-input v-model="params.userName" clearable />
      </el-form-item>
      <el-form-item prop="account" label="账号">
        <el-input v-model="params.account" clearable />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="params.password" clearable show-password />
      </el-form-item>
      <el-form-item prop="passwordAgain" label="确认密码">
        <el-input v-model="params.passwordAgain" clearable show-password />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="w-full text-end">
        <el-button type="success" @click="handleSubmit">注册</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

// Ref
const formRef = ref(null)

// 表单校验规则（完整优化版）
const config = reactive({
  diaVisible: false,
  rules: {
    // 用户名：不能为空
    userName: [
      {
        required: true,
        message: '请输入昵称',
        trigger: 'blur',
        whitespace: true, // 禁止纯空格
      },
    ],
    // 账号：5-16位（修正之前min=5的错误），不能为空且长度符合要求
    account: [
      {
        required: true,
        message: '请输入账号',
        trigger: 'blur',
        whitespace: true,
      },
      {
        min: 5,
        max: 16,
        message: '账号长度必须为5-16位',
        trigger: 'blur',
      },
      {
        pattern: /^[a-zA-Z0-9_]+$/, // 可选：限制账号只能是字母/数字/下划线
        message: '账号只能包含字母、数字和下划线',
        trigger: 'blur',
      },
    ],
    // 密码：6-16位，不能为空且长度符合要求
    password: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
        whitespace: true,
      },
      {
        min: 6,
        max: 16,
        message: '密码长度必须为6-16位',
        trigger: 'blur',
      },
    ],
    // 重复密码：不能为空 + 与密码一致校验（适配Vue3语法）
    passwordAgain: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: 'blur',
        whitespace: true,
      },
      {
        validator: (rule, value, callback) => {
          // Vue3中直接访问params对象，比rule.form更稳定
          if (!value) return callback() // 为空时不校验（交给required规则）

          if (value !== params.password) {
            callback(new Error('两次输入的密码不一致'))
          } else {
            callback() // 校验通过
          }
        },
        trigger: ['blur', 'change'], // 失焦和值变化时都校验
      },
    ],
  },
})

const params = reactive({
  account: '', // 初始值改为空字符串更合理（避免null导致的类型问题）
  password: '',
  passwordAgain: '',
  userName: '',
})

// 注册提交方法（补充表单校验逻辑）
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 校验通过，执行注册逻辑
      ElMessage.success('表单校验通过，提交数据')
      // 这里可以写接口请求逻辑
    } else {
      ElMessage.warning('表单校验失败')
      return false
    }
  })
}

const open = () => {
  config.diaVisible = true
  // 打开弹窗时重置表单
  formRef.value?.resetFields()
}

defineExpose({
  open,
})
</script>
