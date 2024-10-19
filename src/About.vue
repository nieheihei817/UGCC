<script setup>
import {onBeforeUnmount, onMounted, onUnmounted, ref} from "vue"
import logo from "../public/Vd.png"
import PA from "../public/PA.png"
import ZFZ from "../public/ZFZ.png"
import OP from "../../nodePra/resources/OP.png"
import roblox from "../public/roblox.png"
import nieheihei from "../public/nieheihei.jpg"
import 'swiper/swiper-bundle.css';
import { useSwipeDetection } from './useSwipeDetection';

let scrollDistance = 0
const firstPage = ref(true)
const secondPage = ref(false)
const thirdPage = ref(false)
const fourthPage = ref(false)
const nowPage = ref(1)
const scrollFlag = ref(false)
const { swipeDirection, swipeDistance } = useSwipeDetection();

const handleTouchStart = (e) => {
  // 在这里可以进行一些额外的逻辑处理
  console.log(swipeDirection.value)
};

const handleTouchEnd = (e) => {
  // 在这里可以进行一些额外的逻辑处理
  if(swipeDirection.value==="up"){
    nowPage.value += 1
    if(nowPage.value===1){
      firstPage.value = true
      secondPage.value = true
    }
    if(nowPage.value===2){
      firstPage.value = false
      secondPage.value = true
    }
    if(nowPage.value===3){
      thirdPage.value = true
      fourthPage.value = false
    }
    if(nowPage.value===4){
      thirdPage.value = false
      fourthPage.value = true
    }
    if(nowPage.value>4){
      nowPage.value=4
    }
    console.log(nowPage.value)
  }
  else if(swipeDirection.value==="down"){

    if(pageFlag!==1){
      nowPage.value -= 1
      if(nowPage.value===1){
        firstPage.value = true
        secondPage.value = false
        thirdPage.value=false
      }
      if(nowPage.value===2){
        secondPage.value = true
        thirdPage.value = false
        fourthPage.value = false
      }
      if(nowPage.value===3){
        thirdPage.value = true
        fourthPage.value = false
      }

      if(nowPage.value<1){
        nowPage.value=1
      }
    }
    else {
      console.log(1)
    }

    console.log(nowPage.value)
  }
};

const targetElement = ref(null);
let pageFlag = 0
const handleIntersect = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
    if(pageFlag===1) {
        pageFlag=0
        nowPage.value -= 0
      }else{
      pageFlag +=1
    }

    }
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(handleIntersect);
  observer.observe(targetElement.value);
});
if(nowPage.value===4){

}


// const handleScroll = () => {
//   scrollDistance = window.scrollY;
//
//   if (scrollDistance >= 300) {
//     firstPage.value = false
//     secondPage.value = true
//   } else if (scrollDistance < 300) {
//     firstPage.value = true
//     secondPage.value = false
//   }
//   if (scrollDistance >= 500) {
//     secondPage.value = false
//     thirdPage.value = true
//   } else if (scrollDistance < 500 && scrollDistance > 300) {
//     secondPage.value = true
//     thirdPage.value = false
//   }
//   if (scrollDistance >= 700) {
//     thirdPage.value = false
//     fourthPage.value = true
//   } else if (scrollDistance < 700 && scrollDistance > 500) {
//     thirdPage.value = true
//     fourthPage.value = false
//   }
// };
// onMounted(() => {
//   window.addEventListener('scroll', handleScroll);
// });
// onUnmounted(() => {
//   window.removeEventListener('scroll', handleScroll);
// });
onBeforeUnmount(() => {
  // 重置滚动距离为顶部
  window.scrollTo(0, 0);
});
</script>

<template>
  <div style="height: 10000vh"  id="swipe-area" @touchstart="handleTouchStart"
       @touchend="handleTouchEnd">
    <transition name="first" v-show="firstPage">
      <div>
        <div>
          <div class="title">UGCC联盟</div>
        </div>
        <div class="content">
          <span id="flag">#&nbsp;&nbsp;</span><span style="font-style: italic">致力于服务玩家<br>与各游戏一线开发者</span>
        </div>
        <img :src="logo" style="height:50vw;position: fixed;z-index: -1;top: 35vh;left: 23vw">
        <div id="down">下滑以继续</div>
      </div>
    </transition>

    <transition name="second">
      <div v-show="secondPage" style="position: fixed;z-index: -1;
      /* 从金色渐变到橙色 */
        /* 固定背景 */
        background: linear-gradient(to bottom, #FFFDE4, #005AA7) fixed;
        background-size: cover; /* 覆盖整个屏幕 */
        width: 100vw;height: 100vh">
        <div id="secondTitle">我们所涉及的游戏:</div>
        <div id="PA">监狱建筑师<br>Prison Architect</div>
        <img :src="PA" style="position: fixed;z-index: -1;width: 30vw;top: 20vh;left: 60vw">
        <div id="ZFZ">世界征服者<br>World Conqueror</div>
        <img :src="ZFZ" style="position: fixed;z-index: -1;width: 30vw;top: 40vh;left: 60vw">
        <div id="OP">112接线员<br>112 Operator</div>
        <img :src="OP" style="position: fixed;z-index: -1;width: 30vw;top: 60vh;left: 60vw">
        <div id="roblox">ROBLOX</div>
        <img :src="roblox" style="position: fixed;z-index: -1;width: 30vw;top: 80vh;left: 60vw">
      </div>
    </transition>

    <transition name="third">
      <div v-show="thirdPage" style="position: fixed;z-index: -1;
      /* 从金色渐变到橙色 */
        /* 固定背景 */
        background: linear-gradient(to top, #2C3E50, #4CA1AF) fixed;
        background-size: cover; /* 覆盖整个屏幕 */
        width: 100vw;height: 100vh">
        <div id="coder">&lt/&gt</div>
        <div id="kaiyuan">开源&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共建&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共享</div>
        <div id="thirdTitle">UGCC开源计划</div>
        <p id="letCode">我们坚信，开源与共享将是未来各游戏圈子的发展方向，也是促进技术交流与发展的最佳方式。<br>因此，我们将逐步开放由UGCC联盟开发的安装器、工具等项目的源代码，并承诺所有玩家均可<span
            class="important">无偿使用</span>我们提供的服务，亦或是对其进行修改。</p>

      </div>
    </transition>
    <transition name="fourth">
      <div v-show="fourthPage" style="position: fixed;z-index: 0; overflow-y: auto /* 当内容溢出时显示垂直滚动条 */;
        width: 100vw;height: 100vh">
        <div id="codeBackground"></div>
        <div
            style="background: rgba(0, 0, 0, 0.5);width: 100vw;height: 100vh;z-index: -1;position: fixed;backdrop-filter: blur(2px)"></div>
        <div style="height: 100vh;position: fixed;overflow: auto">

          <div id="developer">
            <p id="devContent">开发团队及贡献者</p>
          </div>
          <div ref="targetElement" style="height: 2vh; background-color: transparent;">
          </div>
          <div class="container">
            <img :src="nieheihei">
            <span class="name">捏嘿嘿</span>
            <span class="littlename">@nieheihei817</span>
            <div class="describe">本站开发者<br>全改版主要开发者<br>世征TNO模组开发者<br>联盟负责人<br><del>写CSS写到崩溃</del></div>
          </div>
          <div class="container">
            <img src="https://pic.imgdb.cn/item/662c85190ea9cb14030dfb33.jpg">
            <span class="name">溪辰</span>
            <span class="littlename">@CreekChen</span>
            <div class="describe">监狱建筑师技术支持<br>服务器维护人员<br>优秀开发者&安全人员</div>
          </div>
          <div class="container">
            <img src="https://pic.imgdb.cn/item/662c86010ea9cb14030fc873.jpg">
            <span class="name">狐幽鸣酱</span>
            <span class="littlename">@shitFox8107</span>
            <div class="describe">全改版卓越模组贡献者<br>全改版测试&开发人员<br>联盟B站宣传人员</div>
          </div>
          <div class="container">
            <img src="https://pic.imgdb.cn/item/662c86b90ea9cb14031316c3.jpg">
            <span class="name">ArmedImmediate</span>
            <span class="littlename">@ArmedImmediate</span>
            <div class="describe">全改版安装器维护者<br>监狱建筑师技术人员<br>世征TNO开发者<br></div>
          </div>

          <div id="joinUs">加入我们</div>
          <div id="joinUsDes">百闻不如一见，我们正需要你这样热爱游戏与技术的玩家。无论你是萌新亦或大佬，这里都必然有你的用武之地。又或许你只想要解答自己心中埋藏已久的游戏问题，当然可以！我们随时欢迎您的到来！</div>
          <div>
            <div class="swiper-container">

                <div class="swiper-slide">
                  <div class="overlay">
                    <h1>监狱建筑师交流群<br>总群丨UGCC</h1>
                    <div class="des">联盟总群,众多模组的首发地及全联盟最大的玩家交流群</div>
                    <div class="join">
                      <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=10
                    27&k=_MygBKi8UYYDjH0qqOUioxj6vSMdeldA&authKey=9Xfjgv6W
                    1klhjCuaFFJ9wdeKFrSV%2FXyIX6d0ECtWYV4VyLRMScazM0F0nQqvSnR4&no
                    verify=0&group_code=1150715981">加入我们</a>
                    </div>

                  </div>
                  <img src="https://pic.imgdb.cn/item/664712edd9c307b7e9065fd5.jpg">
                </div>
                <div class="swiper-slide">
                  <div class="overlay">
                    <h1>监狱建筑师交流群<br>二群丨UGCC</h1>
                    <div class="des">联盟二群,拥有热情的玩家以及技术经验丰富的众多大佬</div>
                    <div class="join">
                      <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=bh89l67u9OSLCHV90MYoMW-4ChYIM4qR&authKey=u3mw50sCmXJKonNlxBKm3vtwYMu%2FqJWc5M%2BSpLeq22HVGb5cgPBX3Qi8tdZrZ7jP&noverify=0&group_code=585978722">加入我们</a>
                    </div>

                  </div>
                  <img src="https://pic.imgdb.cn/item/66471fd1d9c307b7e91632fc.jpg" style="width: 150%;height:120%;left: -25%;top: -10%">
                </div>
                <div class="swiper-slide">
                  <div class="overlay">
                    <h1>监狱建筑师交流群<br>三群丨UGCC</h1>
                    <div class="des">联盟三群，萌新玩家聚集地，欢迎前来交流心得</div>
                    <div class="join">
                      <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=xyenUvcDkRVhCMDkExBhZEIhBCsxQIJ7&authKey=YIQ7hko34IkGDPo4fhG3z2X2pRMEk%2FPDIJEYg9ibj6hUL%2BA5%2BYzeuM5DiReZxt%2BA&noverify=0&group_code=755168966">加入我们</a>
                    </div>

                  </div>
                  <img src="https://pic.imgdb.cn/item/6647214cd9c307b7e917c36e.jpg" style="left: -115%">
                </div>
                <div class="swiper-slide">
                  <div class="overlay">
                    <h1>监狱建筑师交流群<br>新特区丨UGCC</h1>
                    <div class="des">联盟近期加入成员群，<br>管理制度独具特色，<br>成员活跃</div>
                    <div class="join">
                      <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=6pvTjy8zDPObs6q_PMu0-GMwzgItAKdm&authKey=XAZCIb1WEiOEOiRyYqm7bHc7aWnqzphWEhiSS6ARxPpmywvCqUPWQOLmJ4576iDy&noverify=0&group_code=953223671">加入我们</a>
                    </div>

                  </div>
                  <img src="https://pic.imgdb.cn/item/664722cdd9c307b7e9197aaa.png" style="left: -100%">
                </div>
                <div class="swiper-slide">
                  <div class="overlay">
                    <h1>监狱建筑师交流群<br>新特区二群丨UGCC</h1>
                    <div class="des">联盟直属管辖群，<br>技术交流频繁，<br>氛围良好</div>
                    <div class="join">
                      <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=k-4HklZRyTZuGESh378YNGg8aLALSwcS&authKey=MF75tAv14nNulXD7jHMV3gDti6pd%2FeImI2NO9PyAnF3hmxxTWX4bW7xmg6pf5%2FUJ&noverify=0&group_code=704303173">加入我们</a>
                    </div>
                  </div>
                  <img src="https://pic.imgdb.cn/item/6647256bd9c307b7e91c75ef.jpg" style="left: -90%">
                </div>
              </div>
              <!-- 如果需要分页器 -->
              <div class="swiper-pagination"></div>
            </div>

            <div style="height: 340vh"></div>
          <footer style="height: 16vh;width: 100vw;background-color: #313d44;">
            <div style="margin-left: 25%;padding-top: 5%;color: white">UGCC联盟 提供技术支持</div>
            <div style="margin-left: 5%;padding-top: 1%;color: white">© 2024-2025 nieheihei817.github.io 版权所有</div>

          </footer>

          </div>

        </div>
    </transition>
  </div>

</template>

<style scoped>
.title {
  margin-top: 5vh;
  margin-left: 18vw;
  font-size: 13vw;
  color: transparent;


  /* 应用线性渐变背景到文字 */
  background: linear-gradient(to right, #2ebf91, #8360c3);

  /* 将背景样式应用到文字上 */
  -webkit-background-clip: text;
  background-clip: text;
  animation: titleIn 1s;
  position: fixed;
  z-index: -1;
}

#down {
  position: fixed;
  top: 90vh;
  left: 40vw;
  animation: flag infinite alternate 1s;
  animation-delay: 1s;
  z-index: -1;
}

.content {
  top: 23vh;
  font-size: 5vw;
  margin-left: 25vw;
  color: #00668c;
  position: fixed;
  z-index: -1;
}

#flag {
  animation: flag infinite alternate 1s;
}

#secondTitle {
  color: #00668c;
  position: fixed;
  font-size: 8vw;
  z-index: -1;
  top: 13vh;
  left: 3vw;
}

#thirdTitle {
  position: fixed;
  font-size: 8vw;
  z-index: -1;
  top: 30vh;
  left: 20vw;
  color: transparent;
  /* 应用线性渐变背景到文字 */
  background: linear-gradient(to right bottom, #c0c0aa, #1cefff);
  /* 将背景样式应用到文字上 */
  -webkit-background-clip: text;
  background-clip: text;
}

#kaiyuan {
  position: fixed;
  font-size: 5vw;
  z-index: -1;
  top: 25vh;
  left: 25vw;
  color: #fffefb;
  font-style: italic;
}

#PA {
  color: #313d44;
  position: fixed;
  font-size: 4vw;
  z-index: -1;
  top: 20vh;
  left: 3vw;
}

#ZFZ {
  color: #313d44;
  position: fixed;
  font-size: 4vw;
  z-index: -1;
  top: 40vh;
  left: 3vw;
}

#OP {
  color: #313d44;
  position: fixed;
  font-size: 4vw;
  z-index: -1;
  top: 60vh;
  left: 3vw;
}

#roblox {
  color: #313d44;
  position: fixed;
  font-size: 4vw;
  z-index: -1;
  top: 80vh;
  left: 3vw;
}

#coder {
  font-size: 30vw;
  position: fixed;
  top: 8vh;
  left: 27vw;
  color: #fffefb;
  animation: coder 1s infinite alternate cubic-bezier(.1, .65, .38, .98);
}

#letCode {
  color: #d4eaf7;
  font-size: 5.5vw;
  position: fixed;
  top: 40vh;
  left: 4vw;
  animation: typing 0.5s;
}

#letCode::after {
  content: attr(data-last-letter); /* 将最后一个字母作为伪元素的内容 */
  border-right: white 0.6vw solid;
  animation: guangbiao 0.5s infinite alternate;
}

.important {
  color: #c21d03;
  animation: important 1s;
  animation-delay: 1s;
}

#codeBackground {
  position: fixed;
  z-index: -1;
  background-image: url('https://pic.imgdb.cn/item/662b6ce80ea9cb1403eb58f4.png');
  background-size: 400vw 120vh;
  background-position: 30% 15%;
  background-repeat: no-repeat;
  animation: backChange 20s infinite alternate;
  width: 100vw;
  height: 100vh
}

#developer {
  font-size: 10vw;
  position: absolute;
  overflow: hidden; /* 隐藏超出容器的内容 */
  top: 5vh;
  left: 1em;
  color: #d4eaf7;
}
#devContent {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 隐藏超出容器的内容 */
  animation: daziji 1s cubic-bezier(.1,.65,.21,.91); /* 使用 typing 动画，持续 5 秒 */
}
.container{
  position: relative;
  display: inline-block;
  background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4));
  top: 30vh;
  left: 5vw;
  margin-bottom: 3vh;
  width: 90vw;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5) inset;
}
.container img{
  display: inline-block;
  margin-top: 5%;
  margin-left: 3%;
  width: 23vw;
  border-radius: 50%;
  box-shadow:
      3px 3px 10px 0px hsl(300deg, 100%,50%), /* 渐变颜色1，右下角 */
      3px -3px 10px 0px hsl(200deg,100%,50%), /* 渐变颜色2，右上角 */
      -3px -3px 10px 0px hsl(100deg, 100%,50%), /* 渐变颜色3，左上角 */
      -3px 3px 10px 0px hsl(0deg, 100%,50%); /* 渐变颜色4，左下角 */

}
.name{
  position: absolute;
  display: inline-block;
  color:#71c4ef;
  font-size: 8vw;
  margin-left: 5%;
  margin-top: 8%;
}
.littlename{
  display: inline-block;
  position: absolute;
  color: #cccbc8;
  font-size: 4vw;
  margin-left: 5%;
  margin-top: 20%;
}
.describe{
  display: inline-block;
  color: #d4eaf7;
  font-size: 1.6em;
  margin-left: 33%;
  margin-bottom: 5%;
}
.first-enter-active {
  animation: flag 1s;
}

.first-leave-active {
  animation: flag reverse 0.3s;
}

.second-enter-active {
  animation: flag 1.5s;
}

.second-leave-active {
  animation: flag reverse 0.4s;
}

@keyframes titleIn {
  from {
    opacity: 0;
    transform: translateY(-7vh);
  }
  to {
    opacity: 1;
    transform: translateY(0vh);
  }
}

@keyframes flag {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes coder {
  from {
    top: 8vh;
    color: #00668c;
  }
  to {
    top: 5vh;
    color: #fffefb;
  }
}

@keyframes typing {
  from {
    top: 60vh;
    opacity: 0
  }
  to {
    top: 40vh;
    opacity: 1
  }
}

@keyframes guangbiao {
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
}

@keyframes important {
  from {
    color: #d4eaf7;
  }
  to {
    color: #c21d03;
  }
}

@keyframes backChange {
  30% {
    background-position: 50% 15%;
  }
  60% {
    background-position: 50% 40%;
  }
  100% {
    background-position: 70% 30%;
  }
}
/* 打字机动画 */
@keyframes daziji {
  from {
    width: 0; /* 初始宽度为 0，即隐藏所有文字 */
  }
  to {
    width: 100%; /* 最终宽度为原始文字宽度，即逐字显示完整文字 */
  }
}
.swiper-container {
  position: relative;
  top: 50vh;
  left: 2.5em;
  z-index: 0;
  width: 80vw;
  height: 60vh;

}
.swiper-slide {
  overflow: hidden;
  background-color: transparent;
  border-radius: 10%;
  margin-bottom: 7vh;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.5);
}
.swiper-slide img{
  overflow: hidden;
  position: absolute;
  height: 100%;
  right: -90%;
  z-index: -1;
}
.overlay {
  position: absolute;
  top: 30%;
  left: 0;
  width: 100%;
  height: 70%;
  backdrop-filter: blur(7px);
  background-color: rgba(255, 255, 255, 0.5);
}
.overlay h1{
  margin-left: 1.3em;
  font-size: 1.8em;
}
.overlay .des{
  padding-left: 1.3em;
  font-size: 1.3em;
}
.overlay .join{
  position: relative;
  font-size: 2.5em;
  width: 60%;
  height: 20%;
  top: 10%;
  left: 20%;
  background-color:transparent;
  border-radius: 20% 20%;
  box-shadow:
      3px 3px 10px 0px hsl(300deg, 100%,50%), /* 渐变颜色1，右下角 */
      3px -3px 10px 0px hsl(200deg,100%,50%), /* 渐变颜色2，右上角 */
      -3px -3px 10px 0px hsl(100deg, 100%,50%), /* 渐变颜色3，左上角 */
      -3px 3px 10px 0px hsl(0deg, 100%,50%); /* 渐变颜色4，左下角 */

}
.overlay a{
  position: relative;
  top: 2%;
  left: 5%;

}
.overlay a:link{
  color: #313d44;
}
.overlay a:visited{
  color: #313d44;
}

.overlay a:hover{
  color: #313d44;
}
.overlay a:active{
  color: #313d44;
}
#joinUs{
  position: relative;
  top: 35%;
  left: 17%;
  font-size: 4em;
  color: #d4eaf7;
}
#joinUsDes{
  position: relative;
  top: 35%;
  left: 5%;
  margin-right: 10%;
  margin-top: 10%;
  font-size: 1.4em;
  color: #d4eaf7;
}
</style>