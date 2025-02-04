<script setup>
const name = ref('nieheihei')
const clickEvent = () => {
    let a = window.prompt("请输入你的名字")
    name.value = a
}
</script>

<template>
  <div>你的名字是:{{name}}</div>
  <button @click="clickEvent">点我输入你的名字</button>

</template>

<style scoped>

</style>