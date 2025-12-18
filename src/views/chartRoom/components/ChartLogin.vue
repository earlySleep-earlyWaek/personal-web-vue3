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
      <el-form-item prop="verifyCode" label="验证码">
        <div class="flex items-center gap-2">
          <el-input
            v-model="params.verifyCode"
            clearable
            placeholder="请输入验证码"
            maxlength="4"
            @keyup.enter="handleSubmit"
          />
          <!-- 验证码图片 -->
          <div
            class="verify-code-img"
            @click="refreshVerifyCode"
            :style="{ backgroundImage: `url(${verifyCodeImg})` }"
            title="点击刷新验证码"
          ></div>
        </div>
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
import { reactive, ref, onMounted } from 'vue'

// Ref
const formRef = ref(null)

// 生成随机验证码（4位数字和字母组合）
const generateVerifyCode = () => {
  // 验证码字符集
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let code = ''
  // 生成4位验证码
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// 生成验证码图片（使用canvas）
const createVerifyCodeImage = (code) => {
  const canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 40

  const ctx = canvas.getContext('2d')
  // 绘制背景
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }

  // 绘制验证码文字
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // 每个字符随机颜色和位置
  for (let i = 0; i < code.length; i++) {
    ctx.fillStyle = `rgb(${Math.random() * 150 + 50},${Math.random() * 150 + 50},${Math.random() * 150 + 50})`
    const x = (canvas.width / code.length) * (i + 0.5)
    const y = canvas.height / 2 + (Math.random() * 10 - 5)
    // 轻微旋转
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(((Math.random() * 20 - 10) * Math.PI) / 180)
    ctx.fillText(code[i], 0, 0)
    ctx.restore()
  }

  // 绘制干扰点
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
    ctx.beginPath()
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI)
    ctx.fill()
  }

  return canvas.toDataURL('image/png')
}

// 当前验证码
const currentVerifyCode = ref('')
// 验证码图片URL
const verifyCodeImg = ref('')

// 刷新验证码
const refreshVerifyCode = () => {
  const code = generateVerifyCode()
  currentVerifyCode.value = code
  verifyCodeImg.value = createVerifyCodeImage(code)
}

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
    // 账号：5-16位，不能为空且长度符合要求
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
        pattern: /^[a-zA-Z0-9_]+$/, // 限制账号只能是字母/数字/下划线
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
    // 重复密码：不能为空 + 与密码一致校验
    passwordAgain: [
      {
        required: true,
        message: '请再次输入密码',
        trigger: 'blur',
        whitespace: true,
      },
      {
        validator: (rule, value, callback) => {
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
    // 验证码校验规则
    verifyCode: [
      {
        required: true,
        message: '请输入验证码',
        trigger: 'blur',
        whitespace: true,
      },
      {
        validator: (rule, value, callback) => {
          if (!value) return callback()

          // 忽略大小写校验
          if (value.toUpperCase() !== currentVerifyCode.value.toUpperCase()) {
            callback(new Error('验证码输入错误'))
          } else {
            callback()
          }
        },
        trigger: ['blur', 'change'],
      },
    ],
  },
})

const params = reactive({
  account: '',
  password: '',
  passwordAgain: '',
  userName: '',
  verifyCode: '', // 验证码字段
})

// 注册提交方法
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 校验通过，执行注册逻辑
      ElMessage.success('表单校验通过，提交数据')
      // 这里可以写接口请求逻辑
      console.log('提交的注册数据：', params)

      // 提交成功后重置表单和验证码
      formRef.value.resetFields()
      refreshVerifyCode()
    } else {
      ElMessage.warning('表单校验失败，请检查输入内容')
      return false
    }
  })
}

const open = () => {
  config.diaVisible = true
  // 打开弹窗时重置表单并刷新验证码
  if (formRef.value) {
    formRef.value.resetFields()
  }
  refreshVerifyCode()
}

// 初始化验证码
onMounted(() => {
  refreshVerifyCode()
})

defineExpose({
  open,
})
</script>

<style scoped>
.verify-code-img {
  width: 150px;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  background-size: cover;
  background-position: center;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-2 {
  gap: 8px;
}

.font-size-25px {
  font-size: 25px;
}

.font-900 {
  font-weight: 900;
}
</style>
