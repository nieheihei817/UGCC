<script setup>

</script>

<template>
  <div id="tipBox">
    <img src="./tanhao.svg" style="width: 10%;vertical-align: top;margin-right: 3%">
    <slot></slot>
  </div>
</template>
<style scoped>
#tipBox{
  display: inline-block;
  z-index: -1;
  height: 100%;
  background-color: rgba(253, 87, 50, 0.1);
  border-radius: 5%;
  padding: 5%;
  margin-bottom: 3vh;
  box-shadow: 0px 0px 8px rgba(194, 29, 3, 0.7); /* 阴影效果，使用指定的颜色 */
  overflow: hidden;
  margin-left: 5vw;
}
</style>