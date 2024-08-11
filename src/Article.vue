<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import {  onBeforeRouteUpdate} from 'vue-router';
import {onMounted, ref} from "vue";
import config from "./config.js";
import lightBox from "./views/passageComp/lightBox.vue"
import axios from "axios";
import hljs from 'highlight.js';
import "highlight.js"
import 'highlight.js/styles/atom-one-dark.css'; // 根据自己的主题选择
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import "highlight.js"
import Cookies from "js-cookie";
import router from "./router/index.js";
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = config
const route = useRoute();
const author = ref('')
const lastDate = ref('')
const routeChanged = ref(false)
const article = ref(null)

onMounted(()=>{
  axios.post(`http://${FRONTHOST}:${BACKPORT}/api/getArticleContent`, {
    articleID: lastPathSegment.value
  }).then(res => {
    if (res.data.code === 200) {
      console.log(res.data.article.article)
      article.value = res.data.article.article
      author.value = res.data.article.author
      lastDate.value = res.data.article.date
      console.log(res.data.article.article)
    } else {
    }
  }).catch(err => {
    console.log(err);
  });
})

onBeforeRouteUpdate((to, from, next) => {
  routeChanged.value = true;
  lastPathSegment.value = to.path.substring(to.path.lastIndexOf('/') + 1);
  axios.post(`http://${FRONTHOST}:${BACKPORT}/api/getArticleContent`, {
     articleID: lastPathSegment.value.toString()
  }).then(res => {
    if (res.data.code === 200) {
      console.log(res.data)
      article.value = res.data.article.article
      author.value = res.data.article.author
      lastDate.value = res.data.article.date
      console.log("文章"+article.value)
      setTimeout(()=>{
        routeChanged.value = false;
      },500)
      next();
    } else {
      next({ path: '/404' });
    }
  }).catch(err => {
    console.log(err);
    next({ path: '/404' });
  });
});
// 获取当前路由的完整路径
const fullPath = route.fullPath;

// 利用split和pop方法获取最后一个路径
const lastPathSegment = ref(fullPath.split('/').filter(segment => segment !== '').pop().split('?')[0]);
</script>

<template>
  <transition name="fad">
    <div v-show="!routeChanged">
      <div id="article">
        <template v-for="(item,index) in article">

          <template v-if="item.content">
            <div  v-html="item.content"></div>
          </template>

          <light-box :path="item.src" v-if="item.img">
            <template v-slot:image>
              <img :src="item.src">
            </template>
            <template v-slot:des>{{item.alt}}</template>
          </light-box>
        </template>
      </div>

      <div id="articleFooter" style="margin-top: 15%">
        <div>本文作者:{{author}}</div>
      </div>
      <div id="articleFooter">
        <div>最后编辑日期：{{lastDate}}</div>
      </div>
    </div>
  </transition>
  <div style="height: 80vh;" v-show="routeChanged"></div>
</template>

<style lang="scss">
@import 'highlight.js/styles/atom-one-dark.css';
#article img{
  width: 90vw;
  border-radius: 5%;
  margin: 0 auto;
}
#article .ql-syntax{
  background-color: black;
  padding:2% 3%;
  border-radius: 4%;
}

#article ol{
  list-style-type: decimal;
  margin: 0 auto; /* 使用auto来水平居中 */
  width: fit-content; /* 让列表的宽度根据内容来自动调整 */
  text-align: left; /* 如果需要列表项左对齐，请设置text-align:left */
  max-width: 90vw;
}
#article ul{
  list-style-type: disc;
  margin: 0 auto; /* 使用auto来水平居中 */
  width: fit-content; /* 让列表的宽度根据内容来自动调整 */
  text-align: left; /* 如果需要列表项左对齐，请设置text-align:left */
  max-width: 90vw;

}

#article{
  margin: 0 5%;
  word-wrap: break-word; /* 在单词内允许换行 */
  white-space: pre-wrap; /* 保留空白符序列，但是合并换行符 */

}
#article blockquote{
  margin-left: 0;
  padding-left: 5%;
  border-left: 4px solid #ccc;

}
#article h1:first-of-type::before {
  content: '\0023'; /* 使用 Unicode 字符编码，这里是左双引号 */
  font-size: 1.5em; /* 根据需要调整大小 */
  margin-right: 0.5em; /* 可以调整与第一个段落之间的间距 */
  color: skyblue; /* 可以根据设计需求设置颜色 */
}
#articleFooter{
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  margin-right: 5%;
}
/* 渐变设置 */
.fad-enter-from, .fad-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fad-enter-to, .fad-leave-from {
  opacity: 1;
}
.fad-enter-active {
  transition: all 0.7s ease;
}
.fad-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>