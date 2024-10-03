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
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // 引入 Prism 的样式
import 'prismjs/components/prism-python.min.js'; // 引入所需的语言组件
import 'prismjs/components/prism-javascript.min.js'; // 其他语言组件示例
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-lua.js';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import 'prismjs/components/prism-sql.js';
import 'prismjs/components/prism-http.min.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-csharp.js';
import CircularProgressIndicator from "./views/passageComp/CircularProgressIndicator.vue";
import JoinUs from "./views/passageComp/joinUs.vue";
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = config
const route = useRoute();
const author = ref('')
const lastDate = ref('')
const routeChanged = ref(false)
const article = ref(null)
const isLogin = ref(localStorage.getItem('token'))
const title = ref('')

onMounted(()=>{
  console.log("挂载")
  setTimeout(() => {
    Prism.highlightAll()// 全局代码高亮
  }, 500)
  axios.post(`${FRONTHOST}:${BACKPORT}/api/getArticleContent`, {
    articleID: lastPathSegment.value
  }).then(res => {
    if (res.data.code === 200) {
      console.log(res.data.article.article)
      title.value = res.data.article.title
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
  axios.post(`${FRONTHOST}:${BACKPORT}/api/getArticleContent`, {
     articleID: lastPathSegment.value.toString()
  }).then(res => {
    if (res.data.code === 200) {
      console.log(res.data)
      title.value = res.data.article.title
      article.value = res.data.article.article
      author.value = res.data.article.author
      lastDate.value = res.data.article.date
      console.log("文章"+article.value)
      setTimeout(()=>{
        routeChanged.value = false;
      },1000)
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
    <div v-show="!routeChanged" id="passageCon">
      <div id="article">
        <h1 id="passageTitle">{{ title }}</h1>
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
      <join-us v-if="!isLogin"></join-us>
      <div id="articleFooter" style="margin-top: 15%">
        <div>本文作者:{{author}}</div>
      </div>
      <div id="articleFooter">
        <div>最后编辑日期：{{lastDate}}</div>
      </div>
      <circular-progress-indicator></circular-progress-indicator>
    </div>
  </transition>
  <div style="height: 80vh;" v-show="routeChanged"></div>
</template>

<style lang="scss">
/* Prism.js 1.29.0 */
pre {
  padding: 1em;
  margin: .5em 0;
  overflow: auto;
  background: #f5f2f0;
}

code {
  padding: .2em .4em;
  font-size: 85%;
  background: #f5f2f0;
  border-radius: .3em;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6a737d;
}

.token.punctuation {
  color: #5c6370;
}

.token.namespace {
  opacity: .7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #e45649;
}

.token.attr-name,
.token.attr-value,
.token.function-name,
.token.class-name,
.token.builtin,
.token.inserted {
  color: #50a14f;
}

.token.selector,
.token.keyword,
.token.operator,
.token.control,
.token.defined,
.token.variable {
  color: #c678dd;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.url {
  background: #dfe2e5;
}

.token.regex,
.token.important,
.token.variable {
  color: #e06c75;
}

.token.string,
.token.attr-value {
  color: #98c379;
}

.token.function {
  color: #e5c07b;
}

.token.class-name,
.token.method {
  color: #61afef;
}

.token.parameter {
  color: #e06c75;
}

.token.keyword {
  color: #c678dd;
}

.token.selector {
  color: #e06c75;
}

.token.comment {
  color: #5c6370;
}

@keyframes uniflag {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
/* 电脑（大屏幕） */
@media (min-width: 769px) {
  /* 样式 */
  #passageTitle::before{
    content: '\0023';
    font-size: 1.2em; /* 根据需要调整大小 */
    margin-right: 0.3em; /* 可以调整与第一个段落之间的间距 */
    color: skyblue; /* 可以根据设计需求设置颜色 */
    animation: uniflag 0.8s infinite alternate;
  }
  #article img{
    width: 20vw;
    border-radius: 5%;
    margin-left: 30%;
  }
  #article{
    overflow-x: scroll;
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
}
/* 电脑（大屏幕） */
@media (max-width: 769px) {
  /* 样式 */
  #passageTitle::before{
    content: '\0023';
    font-size: 1.2em; /* 根据需要调整大小 */
    margin-right: 0.3em; /* 可以调整与第一个段落之间的间距 */
    color: skyblue; /* 可以根据设计需求设置颜色 */
    animation: uniflag 0.8s infinite alternate;
  }
  #article img{
    width: 90vw;
    border-radius: 5%;
    margin: 0 auto;
  }
  #article{
    overflow-x: scroll;
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
table {
  border-collapse: collapse;
  width: 100%;
}

th {
  background-color: #f0f0f0; /* 浅灰色背景 */
  color: #333; /* 字体颜色，确保可读性 */
  border: 1px solid #ccc; /* 灰色边框 */
  padding: 8px;
  text-align: left;
}

td {
  border: 1px solid #ddd; /* 边框颜色略淡于表头 */
  padding: 8px;
}

</style>