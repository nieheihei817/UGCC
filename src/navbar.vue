<template>
  <div style="position: relative">
    <div class="navbar">
        <menuIcon id="menuButton" @click.stop.prevent="menuButtonOnclick" ref="menuButton" :isdd="isdd"></menuIcon>

        <div id="header">UGCC</div>
      <div style="width: 14%"></div>
      <Search></Search>
      <User></User>
    </div>
    <div id="menu" ref="menu">
      <ul>
        <li style="box-shadow:2px 2px 2px #d4eaf7;border: 2px solid #71c4ef;width: 90%;padding: 5% 1%;border-radius: 6% 6%;">
          <router-link id="lingchen" to="/LingChenJiaYou" class="custom-link" @click="hideMenu" style="font-size: 0.8em;color:#00668c;">向抗癌斗争中的联盟管理致敬</router-link>
        </li>
        <li>
          <router-link to="/About" class="custom-link" @click="hideMenu">关于我们</router-link>
        </li>

        <li>
          <subitem class="subitem" :message="Prison">
            <template #title class="title">监狱建筑师</template>
            <template #item class="item">
              <router-link to="/Prison/intro" class="custom-link" style="margin-bottom: 5%" >游戏介绍</router-link>
              <subitem class="subitem" :message="Tips">
                <template #title class="title" style="font-size: 4.8vw">游戏攻略</template>
                <template #item class="item">
                  <router-link to="/Prison/Tips/1" class="custom-link" @click="hideMenu">无供应问题</router-link>
                  <router-link to="/Prison/Tips/WanHuZhiShou" class="custom-link" @click="hideMenu">玩忽职守</router-link>
                  <router-link to="/Prison/Tips/PowerStation" class="custom-link" @click="hideMenu">发电机</router-link>
                  <router-link to="/About" class="custom-link" @click="hideMenu">未封闭问题</router-link>
                  <template v-for="(item, index) in articles">
                    <router-link v-if="item.articleType === 'prisonTips'" :to="`/Prison/playerTips/${item.articleID}`" @click="hideMenu" class="custom-link">{{item.title}}</router-link>
                  </template>

                </template>
              </subitem>
              <subitem class="subitem" :message="Dev">
                <template #title class="title" style="font-size: 4.8vw">开发文档</template>
                <template #item class="item">
                  <div>111</div>
                  <div>222</div>
                </template>
              </subitem>
            </template>
          </subitem>


          <ul v-show="docflag===true">
          </ul>
        </li>
        <li style="margin-left:0;background: linear-gradient(to top right, #d4eaf7, #b6ccd8);color: #00668c;font-size: 2.1vh;border-radius: 10%;padding: 5%">
          本站已安全运行<br/>{{ hoursDiff }} 小时 {{ minutesDiff }} 分钟 {{ secondsDiff }} 秒
        </li>
        <li @click="console.log(articles)">tap here</li>
      </ul>
    </div>
    <div id="modal" v-show="menuButtonFlag" @click="hideMenu"></div>
  </div>
</template>

<script setup>
import SearchIcon from "./searchIcon.vue";
import User from "./User.vue";
import menuIcon from "./menuIcon.vue"
import Search from "./Search.vue"
const Prison = 'Prison';
const Tips = 'Tips';
const Dev = "Dev"
import subitem from "./subitem.vue"
import "../public/bar/iconfont.css"
import "../public/fonts/iconfont.css"

import {ref, provide, onMounted, computed, watchEffect} from 'vue';
import axios from "axios";
const menuButton = ref(null)
const menu = ref(null)
const menuButtonFlag = ref(false)
let docflag = false
const icon=ref("iconfont icon-bars")
const specificTime = new Date('2024-06-01T00:00:00');
const hoursDiff = ref(0);
const minutesDiff = ref(0);
const secondsDiff = ref(0);
const isdd = ref(false)
const searchFlag = ref(false)
const isSearchOpen = ref(false)
import conf from "./config.js";
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = conf
import router from "./router/index.js";

let articles
const getAllArticles = ()=>{
  axios.post(`http://${BACKHOST}:${BACKPORT}/api/getArticle`, {
    articleType:"all"
  })
      .then(res=>{
        articles = res.data.articles  //文章列表(只含标题，文章类型)

      })
      .catch(err=>{

      })
  return articles
}
onMounted(()=>{
  getAllArticles()
})
// 计算时间差
const calculateTimeDifference = () => {
  const currentTime = new Date();
  const timeDifference = Math.abs(currentTime - specificTime);

  hoursDiff.value = Math.floor(timeDifference / (1000 * 60 * 60));
  minutesDiff.value = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  secondsDiff.value = Math.floor((timeDifference % (1000 * 60)) / 1000);
};

// 使用 watchEffect 实时计算时间差
watchEffect(() => {
  calculateTimeDifference();
  // 每秒钟更新一次时间差
  const interval = setInterval(() => {
    calculateTimeDifference();
  }, 1000);

  // 在组件销毁时清除定时器
  return () => clearInterval(interval);
});
const menuButtonOnclick = (e)=>{
  if(menuButtonFlag.value === false){
    menu.value.style.left = 0
    icon.value = "iconfont icon-shanchu"
    menuButtonFlag.value = true
  }else{
    menu.value.style.left = "-80vw"
    icon.value = "iconfont icon-bars"
    menuButtonFlag.value = false
  }
  isdd.value = !isdd.value
}


const hideMenu = ()=>{
  menuButtonOnclick()
}

const itemOnclick = (name)=>{
  router.push(name)
  console.log("1")
}
</script>

<style scoped>
@keyframes flag {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
#lingchen{
  animation: flag infinite alternate 1s;
  font-style: italic;
  color: #4CA1AF;
}
  #menuButton{
    display: inline-block;
    top: 8%;
  }
  #menuButton span{
    font-size: 9vw;
    color:#f5f4f1;
  }
  #menu{
    height: 100vh;
    color: #313d44;
    top: 7vh;
    width: 70vw;
    border-radius: 2% 2%;
    background-color: rgba(245, 244, 241, 0.95);
    position: fixed;
    z-index: 1;
    left: -80vw;
    transition: left cubic-bezier(.27,1.13,1,1) 0.5s;
  }
#menu ul li{
  font-size: 6vw;
  margin-left: 2vw;
}
.custom-link{
    color: #313d44;
    display: block;
    margin-bottom: 1.3vh;
    width: fit-content; /* 让列表的宽度根据内容来自动调整 */
  }
  #menu ul{
    margin-top: 10%;
  }
.subitem div,.subitem template,router-link{
  margin-bottom: 5%;
  font-size: 4.5vw;
  word-wrap: break-word; /* 在单词内允许换行 */
  white-space: pre-wrap; /* 保留空白符序列，但是合并换行符 */
}
.navbar{
  position: fixed;
  display: flex;
  justify-content: space-between; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  z-index: 2;
  width: 100vw;
  height: 7vh;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 254, 251, 0.9);
  word-wrap: break-word; /* 在单词内允许换行 */
  white-space: pre-wrap; /* 保留空白符序列，但是合并换行符 */
}
.navbar Search{
  opacity: 1;
}
.navbar div{
  display: inline-block;
}
#header{
  font-size: 3em;
  float: right;
  color: #00668c;
}
#modal{
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>