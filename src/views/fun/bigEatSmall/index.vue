<template>
  <div>
    <div class="topBar">
      <el-button :type="config.starting ? 'danger' : 'success'" @click="handleGameStart()">
        {{ config.starting ? '结束' : '开始' }}
      </el-button>
    </div>
    <div ref="PlayAreaRef" class="main">
      <FunPlayer class="z-100" />
      <FunEnemy class="z-10" :width="item.width" v-for="item in enemyList" />
    </div>
  </div>
</template>

<script setup>
import FunPlayer from './player/FunPlayer.vue'
import FunEnemy from './enemy/FunEnemy.vue'
import { onMounted, reactive, ref } from 'vue'
import { funPlayArea } from './config'

const config = reactive({
  starting: false,
  handleStatusChange() {
    this.starting = !this.starting
  },
})

const PlayAreaRef = ref()
const enemyList = ref([])

const addEnemy = () => {
  const enemyData = {
    width: Math.floor(Math.random() * 200 + 50),
  }
  enemyList.value.push(enemyData)
  if (config.starting) {
    setTimeout(() => addEnemy(), 2000)
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
    funPlayArea.bottom = ClientRect.bottom
  }
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  cursor: none;
}
.topBar {
  // h-50px bg-#888 flex items-center
  box-sizing: border-box;
  height: 50px;
  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: end;

  background-color: #00000010;
  border-bottom: 3px #88888850 solid;
}
</style>
