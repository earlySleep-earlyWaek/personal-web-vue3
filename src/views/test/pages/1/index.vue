<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import TestCommonFrame from '../../components/TestCommonFrame.vue'

const size = ref<string>()

const frameRef = ref<HTMLElement>()
const frameWidth = ref(0)
const frameHeight = ref(0)

const total = ref<number>(50)
const count = ref(0)
onMounted(() => {
  if (frameRef.value) {
    const rect = frameRef.value.getBoundingClientRect()
    frameWidth.value = rect.width
    frameHeight.value = rect.height

    console.log(`宽:${frameWidth.value},高:${frameHeight.value}`)
  }
})
</script>

<!-- 泡泡背景 -->

<template>
  <div class="w-full h-full bg-black">
    <div class="w-full">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception" />
    </div>
    <div ref="frameRef" class="w-full h-full bg-black relative">
      <TestCommonFrame>
        <div
          class="bubble"
          v-for="one in total"
          :key="one + 'a'"
          :style="{
            width: (size = Math.random() * 2 + 1 + 'px'),
            height: size,
            left: Math.random() * (frameWidth - 20) + 10 + 'px',
            top: Math.random() * (frameHeight - 20) + 10 + 'px',
          }"
        ></div>
      </TestCommonFrame>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bubble {
  position: absolute;
  z-index: 1;

  border-radius: 50%;
  border: #00000020 solid 2px;

  background-color: #fff;
  color: #000;
}
</style>
