<script setup>
import {onMounted, ref} from "vue";
import config from './config.js'
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = config
import { useSession } from './useSessions.js';
import Cookies from "js-cookie"
import axios from "axios";
import router from "./router/index.js";
const a = ref("")
const userFlag = ref(false)
const islogin = ref(false)
const username = ref("")
const password = ref("")
const tokenUsername = ref('')
const token = ref(Cookies.get("token") || '')
const allCookies = ref(null)
const permission = ref("")
const permissionDes = ref("")

onMounted(()=>{
  reqPer()
})
//请求用户信息函数
const reqPer = () =>{
  allCookies.value = document.cookie
  if(token.value){
    axios.post(`http://${FRONTHOST}:${FRONTPORT}/api/verifyToken`, {
    },
        {
          headers:{
            token: token.value
          }
        })
        .then(response => {
          tokenUsername.value= response.data.userData.username
          permission.value = response.data.userData.permissions
          permissionDes.value = response.data.userData.permissionDes
          console.log(permissionDes.value)
          console.log(tokenUsername.value)
          // 请求成功，处理后端返回的数据
        })
        .catch(error => {
          // 请求失败，处理错误
          console.error('Error:', error);
        });
  }else{
    console.log("当前未登录")
  }

}
//获取当前页面cookies
const getToken = ()=>{
  token.value = Cookies.get("token") || ''
}
//右上角用户图标点击事件
const handleUserClick = ()=>{
  userFlag.value = !userFlag.value
  getToken()

  if(!token.value){
    console.log("没有token")
    islogin.value = false
  }
  if(token.value){
    islogin.value = true
    reqPer()
    console.log(tokenUsername.value)
  }
}
//验证用户信息，登录操作（输入密码和用户名）
const reqData = ()=>{
  // 使用 axios 或者其他 HTTP 请求库发送 POST 请求
  axios.post(`http://${FRONTHOST}:${FRONTPORT}/api/login`, {
    username: username.value,
    password: password.value
  })
      .then(response => {
        // 请求成功，处理后端返回的数据
        console.log(response.data);  // 这里的 response.data 是后端返回的 JSON 数据
        if(response.data.state==="noData"){
          alert("您输入了错误的账号或密码")
        }
        if(response.data.state==="success"){
          console.log("欢迎您,")

          console.log(document.cookie)
          location.reload()
        }
      })
      .catch(error => {
        // 请求失败，处理错误
        console.error('Error:', error);
      });
}
// 创建一个名为 `clearAllCookies` 的 composable 函数
const logout = () => {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [name] = c.split("=");
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
  location.reload()
}
//请求UID函数
const reqID = ()=>{
  // 使用 axios 或者其他 HTTP 请求库发送 POST 请求
  axios.post(`http://${FRONTHOST}:${FRONTPORT}/api/ID`, {
    ID: CookieUserID.value.toString(),
  })
      .then(response => {
        // 请求成功，处理后端返回的数据
        console.log(response.data);  // 这里的 response.data 是后端返回的 JSON 数据
        console.log("找到"+response.data.username);
      })
      .catch(error => {
        // 请求失败，处理错误
        console.error('Error:', error);
      });
}
const toEditor = () =>{
  router.push('/user/editor')
  handleUserClick()
}
const toUserArticles = () =>{
  router.push('/userArticles')
  handleUserClick()
}
</script>

<template>
  <img id="userIcon" src="../public/UserOperation.svg" @click="handleUserClick">
  <transition name="fade">
    <div id="box" v-if="userFlag"  style="background-image: url('https://pic.imgdb.cn/item/6691203dd9c307b7e9bf6048.png');background-attachment: fixed">
      <div @click="handleUserClick" style="margin-left: 86vw;font-size: 10vw">x</div>

      <div id="userContentBox">
        <div v-show="!islogin">
          <h1 style="display: block;margin-top: 10%;margin-left: 30% ">用户登录</h1>
          <form @submit.prevent="reqData" method="post">
            <div id="inputArea">
              <span style="font-size:1.5em;color: #3498db">用户名：</span>
              <div class="User-container">
                <input class="User-input" type="text" id="username" v-model="username" required>
              </div>
              <span style="font-size:1.5em;color: #3498db">密码：</span>
              <div class="User-container">
                <input class="User-input" type="password" id="password" v-model="password" required>
              </div>
              <button class="login-button">登录</button>
            </div>
          </form>
        </div>

      </div>
      <div v-show="islogin">
        <div id="userContentBox">
          <img id="headPhoto" src="https://pic.imgdb.cn/item/66910c3dd9c307b7e9a32659.jpg">
          <h1 style="display: inline-block;height: 100%;margin-left: 7%">{{username}}<span style="display:block;font-style: italic;font-weight: normal;font-size: 0.6em;color: #313d44">{{ permissionDes }}</span></h1>
          <ul id="workLst">
            <li @click="toEditor"><img src="../public/login/NotebookPencil.svg">发布文章</li>
            <li @click="toUserArticles"><img src="../public/login/SettingPolygon.svg">管理文章</li>
            <li><img src="../public/login/RelationMany.svg">申请高级权限</li>
            <li><img src="../public/login/CopySelect.svg">提交工作报告</li>
            <li><img src="../public/login/ChatDotSquare%20.svg">联系负责人</li>
            <li @click="logout"><img src="../public/login/logOut.svg">退出登录</li>
          </ul>
          <div style="margin-left:15%;color:#f5f4f1;">欢迎您！{{permissionDes}}  {{tokenUsername}}</div>
        </div>

      </div>


    </div>
  </transition>
</template>

<style scoped>
#userIcon{
  width: 7vw;
  margin-right: 6vw;
}
input{
  display: block;
}
#inputArea{
  margin: 0 18%;
}
#userContentBox{
  margin: auto 5%;
}
.fade-enter-from, .fade-leave-to {
  transform: translateY(120vh);
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.8s ease;
}
.fade-leave-active {
  transition: all 0.2s ease;
}
.User-container {
  margin-top: 5%;
  margin-bottom: 10%;
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
  padding: 0 5vw; /* 左右各预留5vw的空间 */
}
.User-input {
  flex: 1; /* 输入框自动扩展填满剩余空间 */
  padding: 10px; /* 设置内边距 */
  font-size: 16px; /* 设置字体大小 */
  border: 1px solid #ccc; /* 设置边框样式 */
  border-radius: 4px; /* 设置圆角 */
}
.resultLst{
  padding: 0 3vw;
}
.login-button {
  float: right;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #4e8cff; /* 浅蓝色系背景 */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none; /* 去除点击时的默认外边框 */
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.login-button:hover {
  background-color: #388bff; /* 悬停时的浅蓝色 */
}

.login-button:active {
  background-color: #297acc; /* 点击时的浅蓝色 */
}

.User-input {
  width: 100%; /* 使用100%宽度 */
  padding: 10px; /* 设置内边距 */
  font-size: 18px; /* 设置字体大小 */
  border: 2px solid #3498db; /* 设置边框 */
  border-radius: 5px; /* 圆角边框 */
  outline: none; /* 去除默认轮廓 */
  transition: border-color 0.2s; /* 边框颜色变化的过渡效果 */

  /* 如果需要更多样式调整，可以继续添加 */
}

.User-input:focus {
  border-color: #00668c; /* 获得焦点时的边框颜色 */
}

/* 占位符样式 */
.User-input::placeholder {
  color: #999; /* 占位符文字颜色 */
  font-style: italic; /* 占位符文字斜体 */
}

#userContentBox{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 80%;
}
#headPhoto{
  width: 30vw;
  border-radius: 50% 50%;
  display: block;
}
#workLst{
  width: 100%;
  margin-top: 10%;

}
#workLst li{
  font-size: 1.5em;
  color: #313d44;
  margin-bottom: 20%;
  margin-left: 33%;
}
#workLst li img{
  width: 1.3em;
  margin-right: 5%;
  vertical-align: bottom;
}
</style>