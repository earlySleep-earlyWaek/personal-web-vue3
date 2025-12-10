<template>
  <div>
    <div class="topBar">
      <div class="w-33% flex"></div>
      <div class="w-33% flex justify-center">
        <el-tag size="large" type="success">分数:{{ config.point }}</el-tag>
      </div>
      <div class="w-33% flex justify-end">
        <el-button type="default"> 规则 </el-button>
        <el-button :type="config.starting ? 'danger' : 'success'" @click="handleGameStart()">
          {{ config.starting ? '结束' : '开始' }}
        </el-button>
      </div>
    </div>
    <div ref="PlayAreaRef" class="main">
      <FunPlayer :width="100" class="z-100" />
      <FunEnemy
        @gameover="config.handleGameOver()"
        @ated="config.handleAte()"
        class="z-10"
        :width="item.width"
        :direction="item.direction"
        :position="item.position"
        v-for="item in enemyList"
      />
    </div>
  </div>
</template>

<script setup>
import FunPlayer from './player/FunPlayer.vue'
import FunEnemy from './enemy/FunEnemy.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { funPlayArea } from './config'
import { ElMessage } from 'element-plus'

const config = reactive({
  point: 0,
  starting: false,
  handleStatusChange() {
    this.starting = !this.starting
  },
  handleAte() {
    this.point += 5
  },
  handleGameOver() {
    this.starting = !this.starting
    ElMessage.warning('游戏结束')
  },
})

const PlayAreaRef = ref()
const enemyList = ref([])

const addEnemy = () => {
  const flag = Math.random()
  let w = Math.floor(Math.random() * 50 + 75)
  let p = 0
  let d = 0

  const positionY = Math.floor(Math.random() * (funPlayArea.bottom - w * 0.325) + funPlayArea.top)

  if (flag < 0.5) {
    p = [-w, positionY]
    d = '右'
  } else {
    p = [funPlayArea.right + w, positionY]
    d = '左'
  }

  const enemyData = {
    width: w,
    position: p,
    direction: d,
  }

  enemyList.value.push(enemyData)
  if (config.starting) {
    setTimeout(() => addEnemy(), 200)
  }
}

const handleGameStart = () => {
  if (!config.starting) {
    setTimeout(() => addEnemy(), 2000)
  }
  config.handleStatusChange()
}

onMounted(() => {
  if (PlayAreaRef.value) {
    const ClientRect = PlayAreaRef.value.getBoundingClientRect()
    funPlayArea.left = ClientRect.left
    funPlayArea.right = ClientRect.right
    funPlayArea.top = ClientRect.top
    funPlayArea.bottom = window.screen.availHeight - 81

    console.log(funPlayArea.bottom)
  }
})

onUnmounted(() => {})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: calc(100vh - 81px);
  cursor: none;
  box-shadow: inset 5px 5px 5px black;
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
  box-shadow: 0 5px 5px black;
}
</style>
