<template>
  <div class="main">
    <div class="topBar">
      <div class="w-33%"></div>
      <div class="w-33% flex justify-center gap-10px">
        <el-tag size="large" type="success">得分:{{ Math.floor(point) }}</el-tag>
        <el-tag size="large" type="warning">速度{{ (speed / 1000).toFixed(2) }}s/个</el-tag>
        <el-tag size="large" type="danger"> 剩余时间:{{ time }} </el-tag>
      </div>
      <div class="w-33% flex justify-end">
        <el-button @click="startGame()">开始</el-button>
      </div>
    </div>

    <div ref="gameRef" class="gamePlace">
      <FunCircle
        v-for="(item, index) in circleList"
        :key="index"
        :x="item.x"
        :y="item.y"
        :radious="item.radious"
        :point="item.point"
        :time="item.time"
        @clicked="handleClick"
      />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import FunCircle from './components/FunCircle.vue'

const gameRef = ref(null)
const height = ref()
const width = ref()
const circleList = ref([])

const speed = ref(1000)
let radious = 100
const time = ref(60)
const point = ref(0)

let starting = false

const timer = () => {
  time.value--
  console.log(time.value)

  if (time.value > 0) {
    setTimeout(() => timer(), 1000)
  }
}

const addCircle = () => {
  setTimeout(() => {
    const x = Math.floor(Math.random() * (width.value - 100 * 2) + 100)
    const y = Math.floor(Math.random() * (height.value - 100 * 2) + 100)
    const rad = Math.floor(Math.random() * 20 + radious + 50)
    const point = (2 - speed.value / 1000) * (200 - rad) * 0.1

    circleList.value.push({
      x: x,
      y: y,
      radious: rad,
      point: point,
      time: time.value,
    })

    if (time.value > 0) {
      if (radious > 30) {
        radious -= 3
      }
      if (speed.value > 500) {
        speed.value -= 10
      }
      addCircle()
    } else {
      starting = false
    }
  }, speed.value)
}

const startGame = () => {
  if (!starting) {
    starting = true
    speed.value = 1000
    radious = 100
    time.value = 60
    point.value = 0
    timer()
    addCircle()
  }
}

const handleClick = (p) => {
  point.value += p
}

onMounted(() => {
  width.value = gameRef.value.clientWidth
  height.value = gameRef.value.clientHeight

  console.log({
    场地: [width.value, height.value],
  })
})
</script>

<style lang="scss" scoped>
.main {
  height: calc(100% - 40px);
  width: 100%;

  box-sizing: border-box;
  // background-color: #888888;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .gamePlace {
    position: relative;

    height: calc(100%);
    width: calc(100%);
  }
}

.topBar {
  box-sizing: border-box;
  padding: 5px;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  background-color: #00000010;
  border-bottom: 2px #888888 solid;
}
</style>
