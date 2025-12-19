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

  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    background-color: #1677ff;
    opacity: 0.2;
    transition: width 0.3s ease;
    z-index: -1;
  }

  &:hover {
    background-color: #8dbfff;
  }
}
</style>
