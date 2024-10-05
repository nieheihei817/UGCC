<script setup>
import {ref} from "vue"
const flag = ref(false)
const item = ref(null)
const pointer = ref(null)
const subitem = ref(null)
import { computed } from 'vue';

// 获取当前路由
const route = useRoute();
// 计算当前URL
const currentUrl = computed(() => route.fullPath);
import { defineProps, defineEmits } from 'vue';
const handleclick=()=>{
  if(flag.value===true){
    pointer.value.style.transform="rotate(0deg)"
    subitem.value.style.backgroundColor="transparent"
    subitem.value.style.color = "#313d44"
    subitem.value.style.paddingLeft = "0"
    subitem.value.style.overflow = "visible"

    flag.value= false
  }else{
    pointer.value.style.transform="rotate(45deg)"
    subitem.value.style.backgroundColor="rgba(182, 204, 216, 0.5)"
    subitem.value.style.color = "#00668c"
    subitem.value.style.paddingLeft = "1.5vw"
    subitem.value.style.overflow = "hidden"
    flag.value=true

  }
}
// 使用 inject 获取父组件提供的响应式数据
import { getCurrentInstance, onMounted } from 'vue';
import {useRoute} from "vue-router";
import axios from "axios";
import config from "./config.js";
// 通过 props 接收父组件传递的参数
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
onMounted(()=>{
  setTimeout(()=>{
    if(currentUrl.value.includes(props.message)){
      console.log("y")
      handleclick()
    }else {
      console.log("mei")
    }
  },200)

})
</script>

<template>
  <div>
    <div id="subitem" @click.stop="handleclick" ref="subitem">
      <slot name="title" id="title"></slot>
      <div id="pointer" ref="pointer">＋</div>
    </div>
    <transition name="sub" @click.stop>
      <div v-show="flag" ref="item" id="item">
        <slot name="item"></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>

.sub-enter-active{
  animation: subanim-enter 0.5s;
}
.sub-leave-active{
  animation: subanim-leave 0.2s;
}
@keyframes subanim-enter {
  from{
    opacity: 0;
  }
  to{
    opacity: 100%;
  }
}
@keyframes subanim-leave {
  from{
    opacity: 100%;
  }
  to{
    opacity: 0;
  }
}
/* 手机（小屏幕） */
@media (max-width: 769px) {
  /* 样式 */
  #subitem{
    position: relative;
    color:#313d44;
    transition: top,padding-left 1s cubic-bezier(.11, .18, 0, 1.07),background-color 1s cubic-bezier(.11, .18, 0, 1.07),color,border cubic-bezier(.11,.18,0,1.07) 0.2s;
    padding-left: 0;
    padding-bottom: 0.5vw;
    display: inline-block;
    border-radius: 9999px; /* 使用一个非常大的值，确保左右两侧为半圆 */
  }
  #item{
    margin-left: 8%;
    margin-top: 5%;
    margin-bottom: 10%;
    font-size: 4.8vw;
  }
  #pointer{
    color:grey;font-size:5vw;transition:transform linear 0.2s;display: inline-block;float: right
  }
}
/* 电脑（大屏幕） */
@media (min-width: 769px) {
  /* 样式 */
  #subitem{
    position: relative;
    color:#313d44;
    transition: top,padding-left 1s cubic-bezier(.11, .18, 0, 1.07),background-color 1s cubic-bezier(.11, .18, 0, 1.07),color,border cubic-bezier(.11,.18,0,1.07) 0.2s;
    padding-left: 0;
    padding-bottom: 0.5vw;
    display: inline-block;
    border-radius: 9999px; /* 使用一个非常大的值，确保左右两侧为半圆 */
  }
  #item{
    margin-left: 8%;
    margin-top: 5%;
    margin-bottom: 10%;
    font-size: 1em;
  }
  #pointer{
    color:grey;font-size:1.2em;transition:transform linear 0.2s;display: inline-block;float: right
  }
}
</style>