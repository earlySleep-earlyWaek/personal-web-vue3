<template>
  <!-- <div class="main" :style="`width:${props.radious}px;height:${props.radious}px;`"></div> -->
  <div ref="CircleInc" @click="handleClick()" class="circleMain"></div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'

const CircleInc = ref(null)

const props = defineProps({
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  radious: {
    type: Number,
    default: 15,
  },
  point: {
    type: Number,
    default: 0,
  },
  time: {
    type: Number,
    default: 0,
  },
  speed: {
    type: Number,
    default: 1000,
  },
})

const emits = defineEmits(['clicked'])
const x = ref()
const y = ref()
const radious = ref()
const actTime = ref()
const speed = ref()

const colorList = [
  'red',
  'yellow',
  'blue',
  'green',
  'black',
  'white',
  'gray',
  'purple',
  'orange',
  'pink',
  'brown',
  'cyan',
  'magenta',
  'lime',
  'navy',
  'teal',
  'maroon',
  'olive',
  'silver',
  'aqua',
]
const color = ref('white')

x.value = props.x + 'px'
y.value = props.y + 'px'
speed.value = props.speed
radious.value = props.radious + 'px'
actTime.value = speed.value - 10 + 'ms'
color.value = colorList[Math.floor(Math.random() * colorList.length)]

const handleClick = () => {
  emits('clicked', props.point)
  ElMessage({
    message: `获取积分:${props.point.toFixed(2)}`,
    type: 'success',
    placement: 'bottom-left',
  })
  CircleInc.value.remove()
  CircleInc.value = null
}

onMounted(() => {
  setTimeout(() => {
    CircleInc.value.remove()
    CircleInc.value = null
  }, speed.value)
})
</script>

<style lang="scss" scoped>
.circleMain {
  position: absolute;
  left: v-bind(x);
  top: v-bind(y);

  border-radius: 50%;
  border: white 2px solid;
  cursor: pointer;

  height: v-bind(radious) !important;
  width: v-bind(radious) !important;

  background-color: black;
  transition: 0.15s;

  // animation: fade v-bind(actTime) linear infinite;

  &:hover {
    filter: invert(1);
  }

  &:active {
    transform: scale(1.2);
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
