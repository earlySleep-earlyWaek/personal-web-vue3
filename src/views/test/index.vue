<template>
  <canvas
    ref="canvasRef"
    width="800"
    height="600"
    style="border: 1px solid #ccc; cursor: crosshair"
    @mousedown="startDraw"
    @mousemove="drawing"
    @mouseup="endDraw"
    @mouseleave="endDraw"
  ></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)
const ctx = ref(null)
const isDrawing = ref(false) // 是否正在绘制

onMounted(() => {
  const canvas = canvasRef.value
  ctx.value = canvas.getContext('2d')
  // 设置绘制样式
  ctx.value.lineWidth = 5
  ctx.value.lineCap = 'round' // 线条端点圆角
  ctx.value.strokeStyle = 'red'
})

// 开始绘制（鼠标按下）
const startDraw = (e) => {
  isDrawing.value = true
  // 获取鼠标在 Canvas 内的坐标（修正偏移）
  const { offsetX, offsetY } = e
  // 移动画笔到起点（不绘制）
  ctx.value.beginPath()
  ctx.value.moveTo(offsetX, offsetY)
}

// 绘制中（鼠标移动）
const drawing = (e) => {
  if (!isDrawing.value) return
  const { offsetX, offsetY } = e
  // 绘制线条
  ctx.value.lineTo(offsetX, offsetY)
  ctx.value.stroke()
}

// 结束绘制（鼠标松开/离开）
const endDraw = () => {
  isDrawing.value = false
}
</script>
