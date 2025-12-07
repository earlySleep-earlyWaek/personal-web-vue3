<template>
  <div class="main">
    <div class="w-full flex justify-center items-center gap-10px">
      <el-button @click="startGame()">开始</el-button>
      <div class="bg-green min-w-50px">{{ Math.floor(point) }}</div>
      <div class="bg-red min-w-50px">速度{{ (3 * ((time + 30) / 60)).toFixed(2) }}</div>
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

let speed = 1000
let radious = 100
let time = 30
const point = ref(0)

let starting = false

const addCircle = () => {
  setTimeout(() => {
    const x = Math.floor(Math.random() * (width.value - 100 * 2) + 100)
    const y = Math.floor(Math.random() * (height.value - 100 * 2) + 100)
    const rad = Math.floor(Math.random() * 20 + radious)
    const point = (2 - speed / 1000) * (200 - rad) * 0.1

    circleList.value.push({
      x: x,
      y: y,
      radious: rad,
      point: point,
      time: time,
    })

    if (time > 0) {
      time -= 1
      radious -= 3
      speed -= 10
      addCircle()
    } else {
      starting = false
      //   time = 30
      //   radious = 100
      //   speed = 1000
    }
  }, speed)
}

const startGame = () => {
  if (!starting) {
    starting = true
    speed = 1000
    radious = 100
    time = 30
    point.value = 0
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
  background-color: #888888;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .gamePlace {
    position: relative;

    height: calc(100% - 150px);
    width: calc(100% - 150px);
    border: black 1px solid;
  }
}
</style>
