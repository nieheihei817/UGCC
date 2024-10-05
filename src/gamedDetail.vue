<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import config from "./config.js";
import downloadIcon from '../public/download.svg'
import "../public/download.json"
import SvgIcon from "./cancel.vue";
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = config
const isDownload = ref(false)
// 通用的滚动处理函数
const handleScroll = (elements, transformFunctions) => {
  elements.forEach((elementRef, index) => {
    const element = elementRef.value;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (rect.top <= viewportHeight && rect.bottom >= 0) {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const percentageScrolled = scrollTop / (scrollHeight - viewportHeight);

      // 执行传入的 transform 函数
      const transformFunction = transformFunctions[index];
      transformFunction(percentageScrolled,element);
    }
  });
};

// 示例的 transform 函数
const transformFunction1 = (percentageScrolled,element) => element.style.transform = `translateY(${-percentageScrolled * 300}px)`;
const textBase = [30,50,80,110]
const textAni = (percentageScrolled,element) => {
  element.style.backgroundSize = `${percentageScrolled *460-textBase[0]}% 100%`;
}
const textAni1 = (percentageScrolled,element) => {
  element.style.backgroundSize = `${percentageScrolled * 460-textBase[1]}% 100%`;
}
const textAni2 = (percentageScrolled,element) => {
  element.style.backgroundSize = `${percentageScrolled * 460-textBase[2]}% 100%`;
}
const textAni3 = (percentageScrolled,element) => {
  element.style.backgroundSize = `${percentageScrolled * 460-textBase[3]}% 100%`;
  console.log(element.style.backgroundSize)
}
const secondOuterBoxAni = (percentageScrolled,element) => {
  if (percentageScrolled > 0.5) {

    element.style.backgroundImage = "url(https://pic.imgdb.cn/item/66caf838d9c307b7e9e1578e.png)";
    element.classList.add("lightTheme");
  } else {
    element.style.backgroundImage = "url(https://pic.imgdb.cn/item/66cab8e5d9c307b7e985e275.png)";
    element.classList.remove("lightTheme");
  }
}
const policyAnim = (percentageScrolled,element) => {
  element.style.opacity = `${(percentageScrolled-0.36) * 500}%`;
}
const startTitle = (percentageScrolled,element)=>{
  if(percentageScrolled>0.6){
    element.classList.add("animated")
  }else{
    element.classList.remove("animated")
  }
}
// 需要滚动处理的多个元素
const animateElements = [ref(null),ref(null),ref(null),ref(null),ref(null),ref(null),ref(null),ref(null),ref(null),ref(null),ref(null)];

onMounted(() => {
  const transformFunctions = [transformFunction1,transformFunction1,transformFunction1,textAni,textAni1,textAni2,textAni3,secondOuterBoxAni,policyAnim,startTitle];
  const onScroll = () => handleScroll(animateElements, transformFunctions);
  window.addEventListener('scroll', onScroll);
  onScroll(); // 初始检查
});

function download() {
  window.location.href = `${FRONTHOST}:${FRONTPORT}/app-release_sign.apk`
  isDownload.value = true
}
const toQQ = ()=>{
  window.location.href = `http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=L5YbP5lR9_e0Hgqu-TVZblv5bCVQW_cQ&authKey=4055Aq918nyTZpxqVZvo4p%2BxYcjAU7WgXOMYhVw0%2F8niow4vIwB9htXZ0mvffD2C&noverify=0&group_code=1150715981`
}
const zanzhu = ()=>{
  window.location.href = `https://afdian.com/a/ugcca`
}
</script>

<template>
  <div>
    <div v-show="isDownload" id="downloadPop">
      <div></div>
      <div id="downloadPopBox">
        <img id="downloadIcon" :src="downloadIcon">
        <div id="downloadDes">
          <h1>感谢您的支持！</h1>
          <p>您的下载已经开始!如果没有，请<span id="downloadAgain" @click.stop="download">点击此处</span>。浏览器下载速度较慢，您也可以<span style="color:gray" @click="toQQ">加入官方群聊</span>获取资源！</p>
        </div>
        <button id="ok" @click="isDownload=!isDownload">确定</button>
       </div>
    </div>
    <div id="first">
      <div id="iconBox" :ref="animateElements[0]">
        <div id="ugcc">UGCC</div>
        <div>X</div>
        <div>&nbsp&nbspPrison<br>Architect</div>
      </div>
      <h1 id="qgb" data-text="监狱建筑师全改版" :ref="animateElements[1]">监狱建筑师全改版</h1>
      <div id="intro" :ref="animateElements[2]">您一定游玩和体验过由<span style="font-style: italic">Introversion Software</span>开发的原版监狱建筑师，它固然经典而耐人寻味，但官方版本的手机版监狱建筑师由于各种原因，早已停止更新。游戏现有内容无法满足玩家的需求，您是否想过体验全新的模组整合版本呢？在此，我们向您隆重介绍我们自主开发的
        <span id="title">监狱建筑师全改版</span>
      </div>
    </div>
    <div id="second" :ref="animateElements[7]">
        <h1 id="why">为什么选择全改版?</h1>
        <div class="scroll-reveal">
          <h1 class="trait">整合</h1>
          <p class="des"><span :ref="animateElements[3]">全改版作为集大成者，整合了众多modder贡献的优质模组，并发扬其创意，添加了诸多紧急呼叫，房间扩展，人物单位，可放置物品等内容，充分提高了游戏可玩性，将监狱建筑师的可扩展性提升到了另一个新的水平。</span></p>
        </div>
        <div class="scroll-reveal">
          <h1 class="trait">便捷</h1>
          <p class="des"><span :ref="animateElements[4]"><mark>开箱即用</mark>的模组整合版本，您无需做任何额外配置亦或是修改，由UGCC联盟自主开发的安装器将为您处理好一切，您只需动动手指，即可享受模组内容，再也不用耗费大量精力与时间学习相对复杂的模组安装，并亲自动手修改它们。</span></p>
        </div>
        <div class="scroll-reveal">
          <h1 class="trait" >长期支持</h1>
          <p class="des" ><span :ref="animateElements[5]">与市面上其他版本不同的是，此版本玩家享受由UGCC联盟承诺的<mark>长期支持服务</mark>。我们将长期维护游戏，使其能够稳定运行，并及时修复用户所反馈的BUG，以保障玩家的游戏体验。对全改版的任何游戏或技术问题，您都可以在我们的官方群聊内得到解答与回复</span></p>
        </div>
        <div class="scroll-reveal">
          <h1 class="trait">开源可扩展</h1>
          <p class="des"><span :ref="animateElements[6]">任何遵守UGCC联盟开源协议的开发者都可以基于我们的安装器与数据包框架，进行<mark>自由创作</mark>，自定义游戏内容和模组，并将其发布至各大平台，供其他玩家游玩。同时，我们将提供技术支持与指导，来帮助您构建自己的游戏版本</span></p>
        </div>
        <div id="policy" :ref="animateElements[8]">
          <h1>开发者支持</h1>
          <p>额外的，如果您是开发者，那么本站基于全改版和原版的数据包框架，为您提供了一系列文档和手册，帮助您快速上手，以及解决开发过程中遇到的问题。详情见本站"开发文档"栏目</p>
        </div>

      <div id="downloadPage">
        <h1 id="begin" :ref="animateElements[9]">我们开始吧！<br><span style="font-size: 0.8em">let's start!</span></h1>
        <div class="vision">
          <img src="https://pic.imgdb.cn/item/66bdcb36d9c307b7e957260a.png">
          <div class="visionDes">
            <h2>监狱建筑师全改版</h2>
            <p>永不过时的整合版本，拥有庞大社区动力提供不竭支持</p>
            <button class="downloadButton" @click="download"><span>下载</span></button>
          </div>
        </div>
        <div class="vision">
          <div class="visionDesLeft">
            <h2>UGCC安装器</h2>
            <p>性能与稳定性并存的开源安装器，造福玩家与开发者</p>
            <button class="downloadButton" @click="download"><span>下载</span></button>
          </div>
          <img src="https://pic.imgdb.cn/item/66472f67d9c307b7e92be487.jpg">
        </div>
        <h1 id="encourageUs">🎉<span>赞助我们</span>🎉</h1>
        <p id="encourageDes">您对我们的游戏或安装器还满意吗？您的认可与支持是我们坚持创作的最大动力!虽然我们秉持着热爱至上，用爱发电的宗旨，不要求您支付任何费用。但如果您愿意支持我们，可以进行赞助，我们诚挚地感谢您！这将对我们起到很大帮助作用，使我们的网站及游戏可以更好地运行并为您服务！</p>
        <button id="zanzhu" @click.stop="zanzhu">赞助一下</button>
        <div id="FAQ">
          <h1 class="bounce-animation"><span>程序FAQ</span></h1>
          <details>
            <summary>安装监狱建筑师时报毒</summary>
            <p>A:由于安卓系统的特性，对某些应用程序进行修改后，只要签名或证书不一致，那么就会被误判为病毒软件，您大可以忽视并继续安装。</p>
          </details>
          <details>
            <summary>安装器释放资源失败</summary>
            <p>A:请检查您是否已经授予了安装器所需的权限（如存储权限），如果没有，请在设置中找到权限管理-应用管理-监狱建筑师全改版-权限，并授予所有权限</p>
          </details>
          <details>
            <summary>进入游戏后闪退</summary>
            <p>A:此问题在其他组织开发的安装器上存在已久，全改版安装器对此做了部分优化，但无法适配所有机型，如果出现此问题，请您断网断流量后再次尝试进入游戏。如果问题依旧存在，请您加入我们的官方群聊进行反馈</p>
          </details>
          <details>
            <summary>进入游戏后贴图/阴影乱码</summary>
            <p>A:这通常是因为您的游戏数据包已经损坏，我们不建议您下载市面上未经我们授权的全改版二次修改版本，此类版本通常代码极其混乱且缺少维护。如果您下载的是我们的官方版本，请加入我们的官方群聊获取最新版数据包并根据技术人员的指导进行修复。</p>
          </details>
          <details>
            <summary>加入全改版制作组的方式&要求</summary>
            <p>A:如果您有意向加入我们，为全改版贡献一份自己的力量，请加入我们的官方群聊，并联系管理人员。您可以根据以下条件判断是否可以进入制作组（满足其一即可）
              【掌握至少一门编程语言；熟练使用一个剪辑软件；熟悉监狱建筑师的模组制作；熟悉网站开发】
            </p>
          </details>
          <details>
            <summary>我在游玩其他版本时遇到了问题，可以解答吗</summary>
            <p>A:原则上讲，我们愿意为任何玩家提供帮助，但如果是由于该版的代码失误或个例问题，我们将无法且不予解答</p>
          </details>
          <div id="note">
            <h3>本页美术设计&编程:捏嘿嘿（nieheihei817）</h3>
            <h3>背景图源&人物:《signalis》——灵鹊</h3>
            <h3>UGCC联盟 版权所有</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#iconBox{
  transform: translateY(0);
  transition: transform 0.5s ease-out;
  font-size: 1.5em;
  width: fit-content;
  margin: 10vh auto;
  display: flex;        /* 使 #iconBox 成为弹性容器 */
  align-items: center;  /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  text-shadow: 0 8px 10px black;  /*设置文字阴影*/
  color: whitesmoke;
  div{
    margin-right: 5vw;
  }
}
#first{
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  z-index: -1;
  background-image: url("https://pic.imgdb.cn/item/66cab488d9c307b7e981f75e.png");
  border: 0.1px transparent solid;
}
#second{
  width: 100vw;
  min-height: 150vh;
  border: 0.1px transparent solid;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: right;
  background-size: 200% 100%;
  z-index: -1;
  background-image: url("https://pic.imgdb.cn/item/66cab8e5d9c307b7e985e275.png");
  transition: background-image 0.5s ease-in-out;
}

#title{
  font-size: 1.4em;
  color: transparent;
  background: linear-gradient(
          135deg, /* 角度 */
          #2ebf91,
          #8360c3
  );
  background-clip: text;
}
#qgb{
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5vh;
  font-size: 10vw;
  color: gray;
  position: relative;
  transition: transform 0.5s ease-out;
}
#qgb::after{
  content:attr(data-text);
  color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  clip-path: circle(13vw at 0% 50%);
  background: linear-gradient(
          135deg, /* 角度 */
          #f64f59,  /* 蓝色 */
          #c471ed, /* 绿色 */
          #12c2e9 /* 红色 */

  );
  background-clip: text;
  animation: movelight 8s infinite;
}
@keyframes movelight {
  0%{
    clip-path: circle(13vw at 0% 50%);
  }
  50%{
    clip-path: circle(13vw at 100% 50%);
  }
  100%{
    clip-path: circle(13vw at 0% 50%);
  }

}
#intro{
  color: #f3f9f1;
  font-size: 1.1em;
  width: 80vw;
  margin: auto;
  line-height: 1.5;
  transition: transform 0.5s ease-out;
}
.scroll-reveal{
  .des{
    width: 80vw;
    text-align: center;
    margin: auto;
    max-width: 55ch;
    mark{
      color: inherit;
      background: linear-gradient(
              135deg, /* 角度 */
              #12c2e9, /* 红色 */
              #c471ed, /* 绿色 */
              #f64f59  /* 蓝色 */
      );
      background-clip: text;
      font-size: 1.2em;
    }
  }
}
.scroll-reveal span{
  color: hsla(0,0%,100%,0.2);
  background-image: linear-gradient(white,white);
  background-clip: text;
  background-size: 0 100%;
  background-repeat: no-repeat;
  transition: bacskground-size 2s linear;
}
@keyframes animateText {
  to {
    background-size: 100% 100%;
  }
}
#why{
  color: #f3f9f1;
  width: fit-content;
  margin-left: 10%;
  text-shadow: 0 8px 10px black;  /*设置文字阴影*/
}
.trait{
  color: #f0fcff;
  width: fit-content;
  margin-left: 10%;
  margin-top: 5vh;
  font-size: 1.4em;
  background: linear-gradient(to right, #2ebf91, #8360c3) no-repeat left bottom;
  background-size: 100px 2px;
  animation: underline 1s alternate-reverse infinite;
}
#policy{
  color: #f0fcff;
  width: 80vw;
  margin: 10vh auto;
  font-size: 1.2em;
}



#downloadPage{
  img{
    width: 40%;
  }
  background-attachment: fixed;
  min-height: 200vh;
  background-repeat: no-repeat;
  position: relative;
  border: 1px solid transparent;
}
@keyframes download {
  to{
    opacity: 1;
    transform: translateY(0);
  }
}
#begin{
  margin-top: 14vh;
  margin-bottom: 6vh;
  background: linear-gradient(
          135deg, /* 角度 */
          #8360c3,
          #2ebf91
  );
  background-clip: text;
  color: transparent;
  margin-left: 8%;
  opacity: 0;
  transform: translateY(100px);
  transition: transform 0.5s ease-in-out,opacity 0.5s ease-in-out;
}
#begin.animated{
  animation: download 0.5s ease-in-out forwards;
  transition: transform 0.5s ease-in-out,opacity 0.5s ease-in-out;
}
.vision{
  width: 85vw;
  margin: auto;
  clear: both;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20%;
  opacity: 0;
  transform: translateY(100px);
  animation: download 0.5s linear forwards;
  animation-timeline: view();
  animation-range-start:cover 25vh;
  animation-range-end:cover 50vh;
  .visionDes{
    margin-left: 5%;
    max-width: 46vw;
    max-height: 20vh;
    p{
      color: white;
    }
  }
  .visionDesLeft{
    margin-left: 2%;
    max-width: 46vw;
    max-height: 20vh;
    p{
      color: white;
    }
  }
  h2{
    color: #e9f1f6;
    font-size: 1.2em;
    margin-bottom: 0;
  }

}
.downloadButton{
  border:none;
  outline: none;
  width: 6rem;
  height: 2.5rem;
  border-radius: 5rem;
  background-color: #f3f9f1;
  color: #000000;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .5s;
}
.downloadButton:active{
  width: 4rem;
  background-color: gray;
  color: transparent;
}
#encourageUs{
  width: fit-content;
  margin: auto;
  margin-bottom: 6%;
  span{
    background: linear-gradient(
            135deg, /* 角度 */
            #C6FFDD,
            #FBD786,
            #f7797d
    );
    background-clip: text;
    color: transparent;
  }
}
#encourageDes{
  color: #f3f9f1;
  width: 80vw;
  margin: auto;
  font-size: 1.2em;
  line-height: 1.5;
}
#zanzhu{
  margin: auto;
  margin-top: 5%;
  border:none;
  outline: none;
  width: 6rem;
  height: 2.5rem;
  border-radius: 5rem;
  background: linear-gradient(
          135deg, /* 角度 */
          #348F50,
          #56B4D3
  );
  color: white;
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .5s;
}
#zanzhu:active{
  width: 4rem;
  background-color: gray;
  color: transparent;
}
#FAQ {
  margin-top: 15%;
  h1 {
    width: fit-content;
    margin-left: 8%;
    margin-bottom: 6%;
    span {
      background: linear-gradient(
              135deg, /* 角度 */
              #a8ff78,
              #78ffd6
      );
      background-clip: text;
      color: transparent;
    }
  }
  details{
    color: white;
    width: 80vw;
    margin: auto;
    summary{
      color: #e0f0e9;
      margin-bottom: 3%;
    }
    p{
      color: #88ada6;
    }
  }
  details[open]{
    margin-bottom: 5%;
  }
}
.bounce-animation {
  animation: bounce 1s infinite;
  animation-timing-function: ease-in-out;
}

@keyframes bounce {
  0% { transform: translateY(0); }
  25% { transform: translateY(-25px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
#note{
  width: 80vw;
  margin: auto;
  color: gray;
}
#downloadPop{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(0,0,0,0.5);
}
#downloadPopBox{
  width: 90vw;
  min-height: 30vh;
  margin: 30vh auto auto;
  border-radius: 15%;
  background-color: whitesmoke;
  display: flex;
  flex-wrap: wrap;
  h1{
    width: fit-content;
    font-size: 1.6em;
  }
  #downloadIcon{
    width: 35%;
  }
  #downloadDes{
    width: 62%;
  }
  #downloadAgain{
    color: gray;
  }
  #ok{
    margin-left: auto;
    margin-right: 10%;
    margin-bottom: 5%;
    border:none;
    outline: none;
    width: 6rem;
    height: 2.5rem;
    border-radius: 5rem;
    background-color: black;
    color: whitesmoke;
    font-weight: bold;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .5s;
  }
}
</style>