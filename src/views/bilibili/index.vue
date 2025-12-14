<template>
  <TopBar />

  <el-scrollbar noresize class="w-100vw h-full">
    <div class="w-full h-full flex justify-center">
      <div ref="showArea" class="w-1400px h-100% mt-50px">
        <!-- 中间的频道导航区 -->
        <WelRouteArea class="mt-50px" />

        <!-- 轮播图区域 -->
        <MainTop class="mt-20px" />

        <!-- 主要区域 -->
        <!-- 待绑定数据 -->
        <div class="flex flex-wrap mt-50px">
          <div class="w-20% mt-10px" v-for="item in config.number">
            <VideoCard />
          </div>
        </div>
        <div class="w-full h-80px flex justify-center mt-20px c-#888">bilibili山寨版</div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { reactive } from 'vue'
import WelRouteArea from './WelRouteArea.vue'
import MainTop from './MainTop.vue'
import TopBar from './TopBar.vue'
import VideoCard from './index/VideoCard.vue'

const config = reactive({
  number: 20,
})
</script>
