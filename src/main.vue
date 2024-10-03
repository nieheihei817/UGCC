<script setup>
// 导航守卫，处理页面滚动到顶部
import Navbar from "./navbar.vue";
import {ref} from "vue";
import Cookies from "js-cookie";
import cookieIcon from "../public/bxs-cookie.svg"
const agreeCookie = ref(false);
if (Cookies.get('agreeCookie') === 'true') {
  agreeCookie.value = true;
} else {
  agreeCookie.value = false;
}
const agree = ()=>{
  Cookies.set('agreeCookie', 'true', {expires: 365});
  agreeCookie.value = true;
}
</script>

<template>
  <div>

      <div v-if="!agreeCookie" id="cookieAgree">
        <transition name="popUp">
          <div id="cookieBox">
            <img id="cookieIcon" :src="cookieIcon">
            <h1>本站的Cookie政策</h1>
            <p>为了优化您的访问体验，我们将使用Cookie来存储您的偏好设置并保持登录/会话状态。您是否接受？</p>
            <div style='clear:both;content: "";
            display: table;width: 100%;margin-bottom: 5%'>
              <button id="agreeButton" @click="agree">接受</button>
              <button id="rejectButton" @click="agree">拒绝</button>
            </div>

          </div>
        </transition>
      </div>


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
.popUp-enter-from, .popUp-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.popUp-enter-to, .popUp-leave-from {
  opacity: 1;
}
.popUp-enter-active {
  transition: all 0.7s ease;
}
.popUp-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
@keyframes cookiePop {
  from{
    transform: translateY(1000px);
  }
  to{
    transform: translateY(0);
  }
}

/* 手机（小屏幕） */
@media (max-width: 769px) {
  /* 样式 */
  #cookieAgree{
    position: fixed; /* 固定位置 */
    z-index: 99999; /* 确保在最上层 */
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0,0,0,0.5); /* 半透明背景 */
  }
  #cookieBox{
    width: 90vw;
    min-height: 30vh;
    margin: 30vh auto auto;
    border-radius: 10%;
    background-color: whitesmoke;
    border: 0.1px transparent solid;
    animation: cookiePop 0.8s ease;
    #cookieIcon{
      width: 15vw;
      display: block;
      margin:auto;
      margin-top: 5%;
      margin-bottom: 3%;
    }
    h1{
      font-size: 1.3em;
      margin: auto;
      width: fit-content;
      margin-bottom: 5%;
    }

    p{
      width: 80%;
      margin: auto;
    }
    #agreeButton{
      border:none;
      outline: none;
      width: 6rem;
      height: 2.5rem;
      border-radius: 5rem;
      background-color: #000000;
      color: ghostwhite;
      font-weight: bold;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .5s;
      float: right;
      margin-right: 3%;
      margin-top: 5%;
    }
    #rejectButton{
      outline: none;
      width: 6rem;
      height: 2.5rem;
      border-radius: 5rem;
      border: 2px solid black;
      background-color: ghostwhite;
      color: black;
      font-weight: bold;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .5s;
      float: right;
      margin-top: 5%;
      margin-right: 5%;
    }
  }
}
/* 电脑（大屏幕） */
@media (min-width: 769px) {
  /* 样式 */
  #cookieAgree{
    position: fixed; /* 固定位置 */
    z-index: 99999; /* 确保在最上层 */
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: rgba(0,0,0,0.5); /* 半透明背景 */
  }
  #cookieBox{
    width: 30vw;
    min-height: 30vh;
    margin: 30vh auto auto;
    border-radius: 10%;
    background-color: whitesmoke;
    border: 0.1px transparent solid;
    animation: cookiePop 0.8s ease;
    #cookieIcon{
      width: 8vw;
      display: block;
      margin:auto;
      margin-top: 5%;
      margin-bottom: 3%;
    }
    h1{
      font-size: 1.3em;
      margin: auto;
      width: fit-content;
      margin-bottom: 5%;
    }

    p{
      width: 80%;
      margin: auto;
    }
    #agreeButton{
      border:none;
      outline: none;
      width: 6rem;
      height: 2.5rem;
      border-radius: 5rem;
      background-color: #000000;
      color: ghostwhite;
      font-weight: bold;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .5s;
      float: right;
      margin-right: 3%;
      margin-top: 5%;
    }
    #rejectButton{
      outline: none;
      width: 6rem;
      height: 2.5rem;
      border-radius: 5rem;
      border: 2px solid black;
      background-color: ghostwhite;
      color: black;
      font-weight: bold;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .5s;
      float: right;
      margin-top: 5%;
      margin-right: 5%;
    }
  }
}
</style>