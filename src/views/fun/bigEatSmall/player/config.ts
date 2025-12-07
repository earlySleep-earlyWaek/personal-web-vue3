import { ElMessage } from 'element-plus'

export const player = {
  mounted(el: HTMLElement, binding) {
    el.style.position = 'relative' // 推荐relative，不脱离文档流
    const speed = 10 // 速度

    let currentTransform = el.style.transform || 'translate(0, 0)'

    const handleKeyDown = (e) => {
      currentTransform = el.style.transform
      const key = e.key
      switch (key) {
        case 'w':
        case 'W': {
          el.style.transform = `${currentTransform} translateY(-${speed}px)`
          break
        }
        case 's':
        case 'S': {
          el.style.transform = `${currentTransform} translateY(+${speed}px)`
          break
        }

        case 'a':
        case 'A': {
          el.style.transform = `${currentTransform} translateX(-${speed}px)`
          break
        }
        case 'd':
        case 'D': {
          el.style.transform = `${currentTransform} translateX(+${speed}px)`

          break
        }
      }
    }

    window.addEventListener('keypress', handleKeyDown)
  },
}
