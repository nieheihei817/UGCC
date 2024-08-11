<template>
  <div>
    <div v-if="pageIndex === 'third'">
      <QuillEditor ref="myQuillEditor"
                   theme="snow"
                   v-model:content="content"
                   :options="editorOptions"
                   @change="changed"
      />
      <input type="file" hidden accept=".jpg,.png" ref="fileInput"/>

      <button @click="setAltText" style="margin-left: 5vw;">设置图片描述</button>
      <button @click="submitContent" style="float: right;margin-right: 5vw">提交</button>
      <button @click="testme">test</button>
      <div style="height: 50vh"></div>
    </div>

      <div id="userArticleLst" v-show="pageIndex === 'first'">
          <h1 style="margin-bottom: 3vh">———文章列表———</h1>
        <div id="prisonTips">
          <h2 class="typeTitle">监狱建筑师————游戏攻略</h2>
          <template v-for="item in articles" :key="item.articleID">
            <div class="articleTitle" v-if="item.articleType === 'prisonTips'">
              <span>{{item.title}}</span>
              <div class="buttonLst">
                <img src="../public/userArticle/pencil.svg" @click="toType(item.article)">
                <img src="../public/userArticle/delete.svg">
              </div>
            </div>
            <div style="margin-left: 5%;margin-bottom: 3%;font-style: italic;font-size: 0.8em">{{item.date}}</div>
          </template>
          <div style="margin-bottom: 50vh"></div>
        </div>

      </div>

      <div id="typePage" v-if="pageIndex === 'second'">
        <h1 style="margin-bottom: 3vh">———文章类型———</h1>
        <div style="margin-bottom: 1vh">其将决定您的文章被发布在哪一分区，请根据内容选择</div>
        <div style="margin-bottom: 5vh">
        </div>
        <form @change="console.log(articleType)">
          <div class="typeRadio">
            <input type="radio" v-model="articleType" value="prisonTips"><span>监狱建筑师————游戏攻略</span>
          </div>
          <div class="typeRadio">
            <input type="radio" v-model="articleType" value="developDocs" disabled><del>开发文档</del> <div style="color: red">开发文档暂不支持由普通开发者编写</div>
          </div>
          <button style="float: right" @click.prevent="toEditor">确认</button>
        </form>
        <div style='height: 55vh'></div>
      </div>

  </div>

</template>

<script setup>
import hljs from 'highlight.js';
import "highlight.js"
import 'highlight.js/styles/atom-one-dark.css'; // 根据自己的主题选择
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {onMounted, ref,watch} from 'vue'
import axios from "axios";
import Cookies from "js-cookie";
import router from "./router/index.js";
import config from "./config.js";
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = config
const token = ref(Cookies.get("token") || '')
const isTypeOpen = ref(true)
const articleType = ref(null)
const test = ref(null)
const pageIndex = ref('first')
const deltaContent = ref(null)
const testme = ()=>{
  console.log(myQuillEditor.value)
  myQuillEditor.value.setContents(deltaContent.value)
  console.log(deltaContent.value)
}
const changed = ()=>{
  console.log(myQuillEditor.value.innerHTML)
}

onMounted(()=>{
    if(!token.value){
      alert("请先登录")
      router.push("/About")
    }
})
hljs.configure({
  languages: ['javascript', 'python', 'java', 'lua']
});

const editorOptions = {
  modules: {
    syntax: {
      highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'header': 1 }, { 'header': 2 }],
      ['link', 'image'],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      ['code-block'],
      ['blockquote'],
      ['clean'],
    ]
  },

  placeholder: '请输入内容...'
};

const content = ref('');
const myQuillEditor = ref();
const articles = ref(null)
const articleContent = ref(null)

onMounted(()=>{
  axios.post(`http://${FRONTHOST}:${FRONTPORT}/api/getUserArticles`, {
    },
        {
          headers:{
            token: token.value
          }
        }
    )
    .then(response => {
      if (response.data.code === 200) {
        articles.value = response.data.articles
        deltaContent.value = response.data.articles.deltaContent
        console.log("德尔塔"+deltaContent.value)
      } else {
        console.error("Error");
      }
    });
  })
const toType = (article)=>{
  articleContent.value = article
  console.log(articleContent.value)
  pageIndex.value = "second"
}
const toEditor = () => {
  if(!articleType.value){
    alert("请重新选择文章类型！")
  }else{
    pageIndex.value = "third"
  }
  console.log(content)

}
const submitContent = async () => {
  try {
    const htmlContent = myQuillEditor.value.getHTML();
    const deltaContent = myQuillEditor.value.getContents();
    test.value.innerHTML = htmlContent;
    console.log(deltaContent)
    let contentLst = articleHandler(htmlContent);
    if(!contentLst){
      return
    }
    let srcLst = [];

    // 处理图片数据
    for (let item of contentLst) {
      if (item.img) {
        srcLst.push(item.src);
      }
    }

    // 发起第一个请求
    let response1 = await axios.post(`http://${BACKHOST}:${BACKPORT}/api/uploadImage`, {
      srcLst: srcLst
    });

    console.log(response1.data);

    let i = 0;
    // 更新 contentLst 中的图片 src
    for (let item of contentLst) {
      if (item.img) {
        item.src = `http://${BACKHOST}:${BACKPORT}` + response1.data.resSrcLst[i]+'.png';
        i++;
      }
    }

    // 发起第二个请求
    let response2 = await axios.post(`http://${BACKHOST}:${FRONTPORT}/api/createArticle`, {
      content: contentLst,
      articleType: articleType.value.toString()
    },
        {
          headers: {
            token: token.value
          }
        }
    );

    console.log(response2.data);
    alert(response2.data.msg);

  } catch (error) {
    // 处理错误
    console.error('Error:', error);
  }
};


const setAltText = () => {
  const altText = prompt("请输入图片描述:", "");
  if (altText !== null) {
    insertAltText(altText);
  }
};

const insertAltText = (altText) => {
  const quill = myQuillEditor.value.getQuill();
  const range = quill.getSelection();

  if (range) {
    const img = quill.getLeaf(range.index)[0].domNode;
    if (img.tagName === 'IMG') {
      img.alt = altText;
    } else {
      console.error('The selected element is not an image.');
    }
  } else {
    console.error('Cannot get valid selection range.');
  }
};
const articleHandler = (htmlText) => {
  // 匹配 <img> 标签的正则表达式
  const imgRegex = /<img[^>]*>/gi;

  // 匹配文章开头的标题的正则表达式，修改为匹配 <h1> 标签
  const titleRegex = /<h1[^>]*>(.*?)<\/h1>/i;

  // 使用正则表达式进行分割
  let splitParts = htmlText.split(imgRegex);

  // 匹配 <img> 标签的结果数组
  let imgTags = htmlText.match(imgRegex);

  // 匹配文章开头的标题
  let titleMatch = htmlText.match(titleRegex);
  let title = titleMatch ? titleMatch[1].trim() : '';

  // 构建最终的结果数组
  let result = [];
  if(title ==="" || !title){
    alert("标题不能为空！")
    return
  }
  if(title.includes("<",">")){
    alert("非法标题,请修改")
    return
  }
  // 如果存在标题，则加入 title 对象
  if (title !== '') {
    result.push({ title: title });
  }

  // 遍历分割后的部分和匹配到的 <img> 标签
  for (let i = 0; i < splitParts.length; i++) {
    // 如果分割后的部分存在内容，则加入 content 对象
    if (splitParts[i].trim() !== "") {
      result.push({ content: splitParts[i] });
    }

    // 如果存在匹配到的 <img> 标签，则加入 img 对象，并提取 src 属性和 alt 属性
    if (imgTags && imgTags[i]) {
      // 提取 src 属性值
      let imgSrc = imgTags[i].match(/src="([^"]*)"/);
      let srcValue = imgSrc ? imgSrc[1] : '';

      // 提取 alt 属性值
      let imgAlt = imgTags[i].match(/alt="([^"]*)"/);
      let altValue = imgAlt ? imgAlt[1] : '';

      // 构建 img 对象，并加入 src 和 alt 属性，并将 img 属性设为 true
      result.push({
        img: true,
        src: srcValue,
        alt: altValue
      });
    }
  }

  return result;
}
</script>

<style scoped lang="scss">
@import 'highlight.js/styles/atom-one-dark.css';
#typePage{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 5%;
}
.typeTitle{
  font-size: 1.15em;
  border-left: skyblue 4px solid;
  padding-left: 2.5%;
}
#userArticleLst{
  width: fit-content;
  max-width: 100vw;
  overflow: auto;
  margin: 0 auto;
  .articleTitle{
    font-size: 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center; /* 可选：使内容垂直居中对齐 */
    margin-left: 5%;
    .buttonLst {
      display: flex;
      margin-left: auto; /* 让图片整体靠近右侧 */
      width: 20%;
      img {
        width: 1em; /* 或者根据需要设置合适的宽度 */
        vertical-align: middle; /* 可选：使图片垂直居中对齐 */
        margin-left: 10%; /* 每个图片之间保持3%的左侧边距 */
      }
    }
  }
}

#warning{
  color: red;
}
.typeRadio{
  margin-bottom: 2vh;
}
:deep(.ql-editor) {
  min-height: 180px;
}

:deep(.ql-editor img) {
  width: 75vw;
  display: block;
  margin: 0 auto;
}

</style>

