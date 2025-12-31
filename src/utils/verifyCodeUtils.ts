/**
 * 验证码工具类
 */

/**
 * 生成随机验证码
 * @param length 验证码长度，默认为4
 * @returns 生成的验证码字符串
 */
export const generateVerifyCode = (length: number = 4): string => {
  // 验证码字符集
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let code = ''

  // 生成指定长度的验证码
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return code
}

/**
 * 生成验证码图片
 * @param code 验证码文本
 * @returns 验证码图片的data URL
 */
export const createVerifyCodeImage = (code: string): string => {
  const canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 40

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('无法获取canvas上下文')
  }

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

/**
 * 验证用户输入的验证码是否正确
 * @param userInput 用户输入的验证码
 * @param actualCode 实际的验证码
 * @returns 是否匹配
 */
export const validateVerifyCode = (userInput: string, actualCode: string): boolean => {
  // 忽略大小写校验
  return userInput.toUpperCase() === actualCode.toUpperCase()
}
