<!-- 视频播放卡片 -->

<!-- 关键数据暂时写死,待完成 -->
<template>
  <!-- <div ref="mainDiv" class="main" :style="`height:${width * 0.85}px`">
    <a>
      <div class="videoCover" @mouseenter="config.videoStart()" @mouseleave="config.videoEnd()">
        <div class="w-full" :style="`height:${imgHeight}px`">
          <el-image
            class="h-full w-full rounded-8px"
            v-show="!config.videoShow"
            src="/images/test.png"
            fit="cover"
          />

          <video
            class="h-full w-full rounded-8px"
            v-show="config.videoShow"
            src="/videos/test.mp4"
            ref="videoRef"
            preload="auto"
            muted
            loop
            :controls="false"
          >
            您的浏览器不支持 video 标签
          </video>
        </div>
      </div>
    </a>
    <div :style="`height:${textHeight}px`">
      <a>
        <div class="text p-5px w-fit">雾子solo雾子</div>
      </a>
      <a>
        <div class="text font-size-13px c-#888 flex p-5px">
          <div>作者</div>
          <div>2025年12月5日</div>
        </div>
      </a>
    </div>
  </div> -->

  <div ref="mainDiv" class="videoCard">
    <div class="w-full h-full">
      <a @mouseenter="config.videoStart()" @mouseleave="config.videoEnd()">
        <el-image
          class="h-70% w-100% rounded-8px"
          v-show="!config.videoShow"
          src="/images/test.png"
          fit="cover"
        />

        <video
          class="h-70% w-100% rounded-8px object-fill"
          v-show="config.videoShow"
          src="/videos/test.mp4"
          ref="videoRef"
          preload="auto"
          muted
          loop
          :controls="false"
        >
          您的浏览器不支持 video 标签
        </video>
      </a>

      <a>
        <div class="text">雾子solo雾子</div>
        <div class="font-size-13px c-#888 flex text">
          <div>作者</div>
          <div>2025年12月5日</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'

const videoRef = ref(null)

const config = reactive({
  videoShow: false,
  async videoStart() {
    config.videoShow = true

    await nextTick()
    if (!videoRef.value) return

    try {
      await videoRef.value.play()
    } catch (err) {
      config.videoShow = false
    }
  },
  async videoEnd() {
    if (videoRef.value) {
      videoRef.value.pause()
      videoRef.value.currentTime = 0
      config.videoShow = false
    }
  },
})
</script>

<style lang="scss" scoped>
.videoCard {
  height: 100%;
  width: 100%;

  box-sizing: border-box;
  padding: 5px;
}
</style>
