
<template>
  <div id="rootA">
    <div class="element">
      <img @touchstart="paoOnClick" id="paoImg" :src="bianpao" ref="pao">
      <audio :src="guabian" ref="guabianSound"></audio>
      <audio :src="dianhuo" ref="dianhuoSound"></audio>
    </div>
    <template v-if="huochaiheIsShow">
      <van-floating-bubble
          v-model:offset="offset"
          axis="xy"
          icon="./"
          style="background-color: transparent;
        width:20vw;
        height:10vh;">
        <img ref="huochaihe" id="huochaihe" :src="huochaiheImg" @touchmove="handleMove">
      </van-floating-bubble>
    </template>


    <div id="countDown" v-show="countIsShow">冷却：{{delay/1000}}s</div>

    <div id="navbar">
      <van-button v-if="buttonDisabled" @touchstart="changePao" class="button" icon="plus" type="primary" style="margin-right: 4vw">{{paoType}}</van-button>
    </div>
  </div>
</template>

<script setup>
import bianpao from "/bianpao.png"
import boom from "/boom.png"
import dianhuo from "/dianhuo.mp3"
import guabian from "/guabian.mp3"
import huochaiheImg from "/huochaihe.png"
import xiaobianpao from "/xiaobianpao.png"
import xiaobianpaoSound from "/xiaobianpaoSound.mp3"
import {ref,computed,onMounted} from "vue"
import vDrag from '../src/components/v-drag.js';
import { Button } from 'vant';
const offset = ref({ x: 200, y: 400 });
const pao = ref(null)
const huochaihe = ref(null)
const guabianSound = ref(null)
const dianhuoSound = ref(null)
let timeID
const countIsShow = ref(false)
const paoType = ref("切换为小鞭炮")
const huochaiheIsShow = ref(true)
const buttonDisabled = ref(true)
onMounted(()=>{
  const paoBottom = pao.value.offsetTop+pao.value.offsetHeight

})
const handleTouch = ()=>{
  console.log(2222)

}
const touchX = ref(null)
const touchY = ref(null)
const paoBottomY = ref(null)
const paoTopY = ref(null)
const paoLeft = ref(null)
const paoRight = ref(null)
let isDian = false
const delay = ref(19000)
const handleMove = ()=>{
  touchX.value = Math.round(offset.value.x+huochaihe.value.width/2)
  touchY.value = Math.round(offset.value.y)
  paoBottomY.value = pao.value.offsetTop+ pao.value.height-20
  paoTopY.value = pao.value.offsetTop
  paoLeft.value = pao.value.offsetLeft
  paoRight.value = pao.value.offsetLeft + pao.value.width
  if(touchX.value >= paoLeft.value && touchX.value <= paoRight.value && touchY.value <= paoBottomY.value && touchY.value >= paoTopY.value){
    console.log("chufa")
    if(isDian===false){
      isDian = true
      buttonDisabled.value = false
      countIsShow.value = true
      dianhuoSound.value.play()
      setTimeout(()=>{
        guabianSound.value.play()
        pao.value.src = boom
      },1500)

      setTimeout(()=>{
        isDian = false
        pao.value.src = bianpao
        clearInterval(timeID);
        delay.value = 19000
        countIsShow.value = false
        buttonDisabled.value = true
      },20000)
      timeID=setInterval(()=> {
        delay.value = delay.value - 1000
        console.log(delay.value)
      }, 1000);
    }
  }
  console.log(pao.value.height+pao.value.offsetTop)
  console.log(pao.value.offsetLeft+pao.value.width)
}

const changePao = ()=>{
  if(paoType.value ==="切换为小鞭炮"){
    pao.value.src = xiaobianpao
    paoType.value = "切换到到挂鞭"
    huochaiheIsShow.value = false
    pao.value.style.width = "30vw"
    guabianSound.value.src = xiaobianpaoSound
  }else{
    pao.value.src = bianpao
    paoType.value = "切换为小鞭炮"
    huochaiheIsShow.value = true
    pao.value.style.width = "65vw"
    guabianSound.value.src = guabian
  }
}
const paoOnClick = ()=>{
  if(paoType.value === "切换到到挂鞭"){
    guabianSound.value.play()
  }
}

</script>

<style scoped lang="less">
#rootA{
  background-color: #F6F6F6;
  width: 100vw;
  height: 100vh;

}
.element {
  display: flex; /* 开启弹性布局模式 */
  justify-content: center; /* 在横轴上居中元素 */
  align-items: center; /* 在纵轴上居中元素 */
  width: 100%; /* 宽度自适应 */
  padding-top: 2vh;
}
#paoImg{
  width: 65vw;
}
van-floating-bubble{
  color:red;

}
#huochaihe{
  width:20vw;
  height: 10vh;
}
#navbar{
  position: fixed;
  margin-bottom: 10vh;
  margin-left: 35vw;
  bottom: 0;
  left: 0;
}
#countDown{
  width: 30vw;
  height: 15vh;
  font-size: 2em;
  position: fixed;
  left:0;
  top:60vh;
  background-color: skyblue;
  border-radius: 20%;
  box-shadow: 1px 1px 5px black;
}
</style>