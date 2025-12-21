<template>
  <div class="bottomFrame">
    <TestBottomFrameScrollModule />
    <div class="flex-1 h-full">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import TestBottomFrameScrollModule from './components/TestBottomFrameScrollModule.vue'
</script>

<style lang="scss" scoped>
.bottomFrame {
  width: 100vw;
  height: 100%;

  display: flex;
}

.gridTest {
  width: 100vw;

  overflow: auto;
  display: grid;
  grid-template-columns: repeat(6, 100px);
  grid-auto-rows: 100px;
  gap: 10px;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    // margin: 10px;
  }

  .item:nth-child(2n) {
    background-color: #888;

    color: black;
  }
  .item:nth-child(2n + 1) {
    background-color: black;

    color: #888;
  }
}
</style>
