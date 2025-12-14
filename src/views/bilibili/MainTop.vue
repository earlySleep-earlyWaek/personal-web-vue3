<!-- 轮播图区域 -->

<template>
  <div class="w-full flex">
    <div class="w-40% carousel">
      <el-carousel height="100%" class="h-85%" trigger="click">
        <el-carousel-item class="h-100%" v-for="item in MainTop.carousel" :key="item">
          <el-image fit="cover" class="w-full h-full" :src="item.img" />
          <p class="carouselText">
            <strong>{{ item.label }}</strong>
          </p>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="w-60% flex flex-wrap">
      <div class="w-1/3" v-for="item in MainTop.right">
        <VideoCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import { MainTop } from './config'
import VideoCard from './index/VideoCard.vue'
</script>

<style lang="scss" scoped>
.carousel {
  box-sizing: border-box;
  padding: 5px;
}

.carouselText {
  position: fixed;
  bottom: 0px;

  box-sizing: border-box;
  padding: 10px;

  height: 80px;
  color: #fff;
  font-size: 32px;
  font: 900;
}
</style>
