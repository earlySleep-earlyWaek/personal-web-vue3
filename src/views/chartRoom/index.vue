<template>
  <div class="main">
    <div class="w-80% h-100%">
      <el-carousel :interval="5000" pause-on-hover class="h-100%" height="99%">
        <el-carousel-item v-for="(item, index) in ChartIndex.carousel" :key="index">
          <div class="h-10% c-#fff">{{ item.text }}</div>
          <el-image class="h-90% !rounded-0px" fit="cover" :src="item.image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="flex-1 rightArea">
      <div class="loginCard">
        <div class="w-full h-100px c-#fff font-600 font-size-30px text-center">聊天室</div>

        <el-form label-width="80px" label-position="left">
          <el-form-item label="账号">
            <el-input class="w-220px" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input class="w-220px" />
          </el-form-item>
        </el-form>

        <div class="w-300px text-end">
          <el-button size="small" type="primary" @click="config.login()">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ChartIndex } from './config'
import { reactive } from 'vue'

const router = useRouter()

const config = reactive({
  async login() {
    router.push('/home/chart-room/message')
  },
})
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100%;

  background-color: #303030;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rightArea {
  height: 100%;

  background-color: rgb(107, 109, 113);
  display: flex;
  justify-content: center;
}

.loginCard {
  width: 500px;
  height: min-content;

  border-radius: 8px;
  //   border: 2px black solid;

  position: relative;
  top: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-wrap: wrap;
}

::v-deep(.el-form-item__label) {
  color: #fff;
}
</style>
