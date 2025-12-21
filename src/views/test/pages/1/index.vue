<script setup lang="ts">
import TestCommonFrame from '../../components/TestCommonFrame.vue'
</script>

<!-- 泡泡背景 -->

<template>
  <div class="w-full h-full">
    <TestCommonFrame background="black">
      <div class="booble" v-for="one in 20" :style="`width=${Math.random() * 50 + 30}`"></div>
    </TestCommonFrame>
  </div>
</template>

<style lang="scss" scoped>
.bubble {
}
</style>
