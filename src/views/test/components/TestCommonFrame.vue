<!-- 测试页右边主要的底层框架 -->

<template>
  <div ref="routerRef" class="mainFrame"><slot></slot></div>
</template>

<script setup>


defineProps({
  background: {
    type: String,
    default: 'transparent',
  },
})
</script>

<style lang="scss" scoped>
.mainFrame {
  // flex justify-center items-center
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: v-bind(background);

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  position: relative;
}
</style>
