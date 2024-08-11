<template>
  <transition name="fade">
    <div v-if="progress > 0" class="circular-progress" @click="scrollToTop">
      <div class="progress-circle">
        <svg class="svg-circle" viewBox="0 0 100 100">
          <circle class="circle-background" cx="50" cy="50" r="45"></circle>
          <circle class="circle-progress"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="dashOffset"
                  cx="50" cy="50" r="45"></circle>
        </svg>
        <div class="progress-text">
          <span style="font-size: 500%">↑</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from 'vue';
import useScrollProgress from '../passageComp/script/useScrollProgress.js';

export default {
  setup() {
    const { progress } = useScrollProgress();

    const circumference = 2 * Math.PI * 45;
    const dashOffset = computed(() => {
      const progressDecimal = progress.value / 100;
      return circumference * (1 - progressDecimal);
    });

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滚动到顶部
      });
    }

    return {
      progress,
      circumference,
      dashOffset,
      scrollToTop,
    };
  }
};
</script>

<style scoped>
.circular-progress {
  position: fixed;
  bottom: 10vh;
  right: 5vw;
  z-index: 700;
  cursor: pointer; /* 添加光标指示点击效果 */
}

.progress-circle {
  position: relative;
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); /* 外部阴影效果 */
}

.svg-circle {
  width: 100%;
  height: 100%;
}

.circle-background {
  fill: none;
  stroke: #eee;
  stroke-width: 1vw;
}

.circle-progress {
  fill: none;
  stroke: #4285f4;
  stroke-width: 1vw;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5vw;
  color: #4285f4;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>