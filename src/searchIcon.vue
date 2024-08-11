<template>
  <div class="svg-animation" @click="playAnimation">
    <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none">
      <g :class="{ 'flipping': isAnimating }">
        <path fill="#0A0A30" fill-rule="evenodd" d="M5.71 11.025a5.25 5.25 0 1010.5 0 5.25 5.25 0 00-10.5 0zm5.25-7a7 7 0 100 14 7 7 0 000-14z" clip-rule="evenodd"/>
        <rect width="1.839" height="3.677" x="16.139" y="17.375" fill="#000000" rx=".2" transform="rotate(-45 16.14 17.375)"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAnimating: false
    };
  },
  methods: {
    playAnimation() {
      // 设置 isAnimating 为 true 来触发动画
      this.isAnimating = true;
      // 在动画结束后重置 isAnimating 为 false，以便下次点击可以重新触发动画
      setTimeout(() => {
        this.isAnimating = false;
      }, 800); // 等待动画持续时间后重置
    }
  }
};
</script>

<style scoped>
/* SVG动画的样式 */
@keyframes flipping {
  0% {
    transform: rotate3d(1, 1, 0, 0deg);
  }
  100% {
    transform: rotate3d(1, 1, 0, 180deg);
  }
}
.flipping {
  animation: flipping 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) both;
}
</style>