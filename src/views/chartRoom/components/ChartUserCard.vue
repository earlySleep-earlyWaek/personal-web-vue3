<template>
  <div class="user-card-container p-4 rounded-lg">
    <div class="user-header flex items-center gap-4 pb-4 border-b border-gray-200">
      <div class="relative">
        <el-avatar :size="60" :src="avatarUrl" class="border-2 border-blue-100" />
        <div
          class="status-indicator absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
        ></div>
      </div>
      <div class="user-info flex-1">
        <div class="user-name text-lg font-semibold text-gray-100">
          {{ store.userInfo?.nickname || '未登录用户' }}
        </div>
        <div class="user-id text-sm text-gray-300 mt-1">
          @{{ store.userInfo?.username || 'guest' }}
        </div>
        <div class="status flex items-center mt-1">
          <el-tag size="small" type="success" effect="dark" round> 在线 </el-tag>
        </div>
      </div>
    </div>

    <div class="user-details mt-4">
      <div class="signature flex items-start">
        <span class="label w-16 text-gray-300 font-medium">签名</span>
        <span class="content text-gray-200 flex-1">
          {{ userSignature || '暂无签名' }}
        </span>
      </div>

      <div class="join-date flex items-start mt-2" v-if="joinDate">
        <span class="label w-16 text-gray-300 font-medium">加入时间</span>
        <span class="content text-gray-200 flex-1">
          {{ joinDate }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref, computed } from 'vue'

const store = useUserStore()

// 默认头像URL
const avatarUrl = ref('/images/logo.png')

// 用户签名
const userSignature = ref('快乐聊天，分享美好时光')

// 加入日期
const joinDate = ref('2023年5月')

// 编辑资料处理函数
const handleEditProfile = () => {
  console.log('编辑资料')
  // 这里可以添加编辑资料的逻辑
}

// 设置处理函数
const handleSettings = () => {
  console.log('打开设置')
  // 这里可以添加设置相关的逻辑
}

// 计算属性：用户是否已登录
const isLoggedIn = computed(() => {
  return !!store.token
})
</script>

<style scoped>
.user-card-container {
  cursor: default;
  box-sizing: border-box;
  width: 100%;
  min-width: 280px;
  transition: all 0.3s ease;
  background-color: #303133;
}

.user-name {
  color: #f0f0f0;
}

.user-id {
  color: #c0c0c0;
}

.label {
  flex-shrink: 0;
  color: #d0d0d0;
}

.content {
  word-break: break-word;
  color: #e0e0e0;
}

.user-actions {
  justify-content: space-between;
}

/* 暗色主题下覆盖 Tailwind 边框颜色 */
.border-b {
  border-bottom-color: #4a4a4a !important;
}

.border-t {
  border-top-color: #4a4a4a !important;
}

.border-gray-200 {
  border-color: #4a4a4a !important;
}
</style>
