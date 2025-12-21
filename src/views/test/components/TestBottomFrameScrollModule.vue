<template>
  <el-scrollbar view-class="Test-ScrollViewFrame" wrap-class="Test-ScrollWrapFrame">
    <div class="itemFrame" v-for="one in 50" :key="one + 'a'">{{ one }}</div>
  </el-scrollbar>
</template>

<style lang="css">
.Test-ScrollViewFrame {
  height: 100%;
}

.Test-ScrollWrapFrame {
  background-color: #888;
  width: 250px;
  height: 100%;
}
</style>

<style lang="scss" scoped>
.itemFrame {
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
  background-color: #f0f2f5;
  font-size: 20px;

  position: relative;
  overflow: hidden;
  z-index: 1;

  transition: all 0.2s ease;

  &:hover {
    background-color: #cccccc;
  }
}
</style>
