<template>
  <div>
    <h1>实时控制台输出</h1>
    <pre>{{ consoleMessages.join('\n') }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 用于存储控制台输出
const consoleMessages = ref([]);

// 捕获并记录控制台输出
const originalConsoleLog = console.log;

const captureConsole = (msg) => {
  consoleMessages.value.push(msg);
};

// 监听控制台输出
const setupConsoleCapture = () => {
  console.log = (...args) => {
    originalConsoleLog(...args); // 保留原有功能
    args.forEach(arg => captureConsole(arg));
  };
};

// 初始化
onMounted(() => {
  setupConsoleCapture();
});
</script>

<style scoped>
/* 样式可以根据需要调整 */
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
  overflow: auto;
}
</style>