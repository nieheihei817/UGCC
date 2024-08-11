<script setup>
import {handleAnchor} from "./script/maodian.js"
import {ref} from "vue";
const GuideBox = ref(null)
const pointer = ref(null)
let GuideBoxFlag = ref(false)
const GuideBoxShow = ()=>{
  if(!GuideBoxFlag.value){
    GuideBox.value.style.height = "auto"
    pointer.value.style.transform = "rotate(90deg)";
  }
  else{
    GuideBox.value.style.height = "4vh"
    pointer.value.style.transform = "rotate(0deg)";
  }
  GuideBoxFlag.value = !GuideBoxFlag.value
}
</script>

<template>
  <div id="GuideBox" ref="GuideBox">
    <div @click="GuideBoxShow">
      <h1 id="GuideTitle">内容索引</h1><div id="pointer" ref="pointer" style="display: inline-block"> > </div>
    </div>

    <div id="GuideContent" v-show="GuideBoxFlag">
      <slot></slot>
    </div>

  </div>
</template>

<style scoped>
#pointer{
  transform: rotate(0deg);
  display: inline-block;
  width: 1em;
  font-size: 0.9em;
  transition: transform 0.5s cubic-bezier(0,1.09,.58,1);


}
#GuideTitle{
  font-size: 1.2em;
  margin: 2% 5%;
  color: #00668c;
  display: inline-block;
}
#GuideBox{
  width: 75vw;
  height: 4vh;
  margin: 0 auto;
  position: sticky;
  padding-bottom: 2%;
  top: 8vh;
  z-index: 2;
  border-radius: 5%;
  background-color: #f5f4f1;
  border: 2px solid #00668c;
}
#GuideContent {
  color: #3D5A80;
  font-size: 1.5em;
  padding-top: 2%;
  padding-left: 5%;
  padding-bottom: 5%;
}


</style>