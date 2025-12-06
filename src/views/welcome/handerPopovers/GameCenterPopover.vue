<!-- 游戏中心 -->

<template>
  <div class="main">
    <div class="left">
      <el-image class="w-full !h-120px" fit="cover" src="/images/a.png" />
      <div class="w-full flex gap-10px">
        <div ref="leftBottomItem" v-for="item in 3" class="w-33%">
          <el-image src="/images/a.png" />
          <div>
            {{ '游戏一号游戏一号'.slice(0, 5) }}
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="right">
      <div class="font-size-18px">新游预告</div>
      <div class="flex flex-wrap items-center h-full">
        <a>
          <div v-for="item in 7" class="w-full">游戏</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'

const leftBottomItem = ref(null)
const height = ref()

onMounted(async () => {
  await nextTick()
  if (leftBottomItem.value) {
    height.value = leftBottomItem.value.clientWidth + 'px'
  }
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  gap: 10px;

  box-sizing: border-box;
  padding: 10px;
}
.left {
  width: 200px;

  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .el-image {
    width: 100%;
    height: v-bind(height);
  }
}
.line {
  border-right: 1px solid #88888850;
}
.right {
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
}
</style>
