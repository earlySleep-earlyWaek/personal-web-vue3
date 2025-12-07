<template>
  <div v-player class="player">有点难,暂弃</div>
</template>

<style lang="scss" scoped>
.player {
  --width-: 120px;
  width: var(--width-);
  height: calc(var(--width-) * (9 / 16));

  background-color: green;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
