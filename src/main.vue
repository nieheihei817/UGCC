<script setup>
// 导航守卫，处理页面滚动到顶部
import Navbar from "./navbar.vue";
</script>

<template>
  <div>
    <Navbar style="position: fixed; z-index: 999"></Navbar>
    <div style="height: 7vh"></div>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <div>
      <footer style="height: 16vh; width: 100vw; background-color: #313d44;">
        <div style="margin-left: 25%; padding-top: 5%; color: white">UGCC联盟 提供技术支持</div>
        <div style="margin-left: 5%; padding-top: 1%; color: white">© 2024-2025 nieheihei817.github.io 版权所有</div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
/* 渐变设置 */
.fade-enter-from, .fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.7s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>