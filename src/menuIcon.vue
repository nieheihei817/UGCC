<template>
  <div class="demo" :class="{active: props.isdd}" @click="toggleIsdd">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script setup lang="ts">
import {defineProps, ref} from "vue";
import { defineComponent, PropType } from 'vue';

const props = defineProps({
  isdd: {
    type: Boolean,
    required: true,
  },
});
const toggleIsdd = () => {
  props.isdd = !props.isdd;
};
</script>
<style lang="scss" scoped>
/* 手机（小屏幕） */
@media (max-width: 769px) {
  /* 样式 */
  .demo {
    display: inline-block;
    width: 10vw;
    left: 4vw;
    top: 1.5vh;
    height: 5vh;
    position: relative;
    span {
      display: block;
      width: 100%;
      height: 10%;
      background-color: #313d44;
      border-radius: 4px;
      transition: all .8s;
      position: absolute;
    }
}
  span:nth-child(1) {
    top: 0;
    left: 0;
  }
  span:nth-child(2) {
    top: 40%;
    left: 0;
    transform: translate(0, -50%);
  }
  span:nth-child(3) {
    bottom: 20%;
    left: 0;
  }
}

.active {
  span:nth-child(1) {
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  span:nth-child(2) {
    transform: translateX(60px);
    opacity: 0;
  }
  span:nth-child(3) {
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
/* 电脑（大屏幕） */
@media (min-width: 769px) {
  .demo {
    display: inline-block;
    width: 5vw; /* 调整宽度 */
    height: 4vh; /* 调整高度 */
    left: 2vw; /* 调整位置 */
    top: 2vh; /* 调整位置 */
    position: relative;
    span {
      display: block;
      width: 80%;
      height: 8%;
      background-color: #313d44;
      border-radius: 4px;
      transition: all .8s;
      position: absolute;
    }

    span:nth-child(1) {
      top: 0;
    }
    span:nth-child(2) {
      top: 50%; /* 居中调整 */
      transform: translate(0, -50%);
    }
    span:nth-child(3) {
      bottom: 0; /* 底部对齐 */
    }
  }
  .active {
    span:nth-child(1) {
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    span:nth-child(2) {
      transform: translateX(60px);
      opacity: 0;
    }
    span:nth-child(3) {
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}
</style>

