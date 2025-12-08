<template>
  <div ref="enemyRef" class="enemy">敌人</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { funPlayArea } from '../config'

const width = ref('120px')
const enemyRef = ref()

let coordinates = []
let offsetX = 0
let speed = 5

const enemyMove = () => {
  const X = coordinates[0] + offsetX - funPlayArea.left

  if (X < funPlayArea.right) {
    enemyRef.value.style.transform = `translate(${X}px, ${coordinates[1]}px)`

    offsetX += speed
    setTimeout(() => {
      enemyMove()
    }, 20)
  } else {
    console.log('销毁')
    enemyRef.value.remove()
  }
}

onMounted(() => {
  if (enemyRef.value) {
    const enemy = enemyRef.value.getBoundingClientRect()
    coordinates = [enemy.left, enemy.top]
    enemyMove()
  }
})
</script>

<style lang="scss" scoped>
.enemy {
  --enemy-width: v-bind(width);

  width: var(--enemy-width);
  height: calc(var(--enemy-width) * 0.75);

  background-color: red;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  right: 300;
  top: 100;
}
</style>
