<template>
  <div>

    <div v-if="!isTypeOpen">
      <div id="loading" v-show="isLoading">
        <div id="loadingBox">
          <cube-loading></cube-loading>
          <h2>正在提交中...</h2>
        </div>
      </div>
      <span>文章标题：</span><input v-model="articleTitle">
      <div style="border: 1px solid #ccc;z-index: 100000" oncontextmenu="return false;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
        />
      </div>
      <button @click="submitContent" style="float: right;margin-right: 5vw">提交</button>

      <h3 style="margin: auto;width: fit-content;margin-top: 10%">第一次使用吗？<span style="color:skyblue" @click="toTutorial">点此查看教程</span></h3>
      <div style="height: 50vh"></div>
    </div>
      <div id="typePage" v-if="isTypeOpen">
        <h1 style="margin-bottom: 3vh">请选择您的文章类型</h1>
        <div style="margin-bottom: 1vh">其将决定您的文章被发布在哪一分区，请根据内容选择</div>
        <div style="margin-bottom: 5vh">
          <span id="warning">警告:</span>若选择了错误的类型，您的文章可能会被网站管理员视为错误文章而删除！
        </div>
        <form @change="console.log(articleType)">
          <div class="typeRadio">
            <input type="radio" v-model="articleType" value="prisonTips"><span>监狱建筑师————游戏攻略</span>
          </div>
          <div class="typeRadio">
            <input type="radio" v-model="articleType" value="prisonMods"><span>监狱建筑师————模组教程</span>
          </div>
          <div class="typeRadio">
            <input type="radio" v-model="articleType" value="OperatorTips"><span>112接线员————游戏攻略</span>
          </div>
          <div class="typeRadio">
            <input type="radio" v-model="articleType" value="OperatorOthers"><span>112接线员————其他教程</span>
          </div>
          <div class="typeRadio">
            <input type="radio" v-model="articleType" value="developDocs" disabled><del>开发文档</del> <div style="color: red">开发文档暂不支持由普通开发者编写</div>
          </div>
          <div v-if="isSave">
            <div id="notSaveBox" v-show="isSave">
              <div id="saveAskBox">
                <cube-loading></cube-loading>
                <h2>检测到您的上次编辑可能异常退出，是否返回继续编辑？</h2>
                <button style="float: right" @click.prevent="toEditor">确认</button>
                <button style="float: right" @click.prevent="deleteSavedArticle">取消</button>
              </div>
            </div>
          </div>
          <button style="float: right" @click.prevent="toEditor">确认</button>

        </form>
        <div style='height: 55vh'></div>


      </div>

  </div>

</template>

<script setup>
import consoleOutPut from './consoleOutPut.vue'
import hljs from 'highlight.js';
import "highlight.js"
import 'highlight.js/styles/atom-one-dark.css'; // 根据自己的主题选择
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from "axios";
import router from "./router/index.js";
import config from "./config.js";
import tinymce from "tinymce"
import cubeLoading from "./cubeLoading.vue"
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = config
const token = ref(localStorage.getItem('token'))
const isTypeOpen = ref(true)
const articleType = ref(null)
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
const isLoading = ref(false)
const articleTitle = ref('')
const editorRef = shallowRef()
const valueHtml = ref('')
// 定义要存储的对象


// 函数：设置 localStorage
function setLocalStorage() {
  const editor = editorRef.value
  const articleObject = {
    article: valueHtml.value,
    imgLst:imgLst,
    articleType: articleType.value
  };
  localStorage.setItem('createArticle', JSON.stringify(articleObject));
  console.log(articleObject)
}

// 每隔两分钟设置一次 localStorage
const intervalId = setInterval(() => {
  // 你的代码
  setLocalStorage()
}, 10*1000);

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
function handleBeforeUnload(event) {
  // 只在当前路由下触发提示
  if(isEditor.value){
    event.preventDefault();
    // 现代浏览器会显示默认的提示框
  }

}

window.addEventListener('beforeunload', handleBeforeUnload);
// 清理钩子
router.beforeEach((to, from, next) => {
  // 在路由变更时移除事件监听器
  // 当你想停止计时器时
  clearInterval(intervalId);
  window.removeEventListener('beforeunload', handleBeforeUnload);
  next();
});
let imgLst = []
const insertImageConfig = {

  onInsertedImage: function(imageNode) {  // JS 语法
    if (imageNode == null) return;
    const { src, alt, url, href } = imageNode;
    imgLst.push(imageNode)
    console.log('插入 image', src, alt, url, href);
  },
};

const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/uploadImage',
      maxFileSize: 20 * 1024 * 1024, // 20MB
      maxNumberOfFiles: 10,
      allowedFileTypes: ['image/*'],
      metaWithUrl: false,
      timeout: 5 * 1000, // 5 秒
    },
  },
};

// 合并 insertImage 配置
Object.assign(editorConfig.MENU_CONF, {
  insertImage: insertImageConfig
});


onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor

}

const mode = 'default' // 或 'simple'








const test = ref(null)
onMounted(()=>{
  tinymce.init({
    selector:'#tinyEditor'
  })
})
onMounted(()=>{
    if(!token.value){
      alert("请先登录")
      router.push("/About")
    }
})
hljs.configure({
  languages: ['javascript', 'python', 'java', 'lua']
});

const content = ref('');

// const handleImageAdded = (file) => {
//   const formData = new FormData();
//   formData.append('image', file);
//
// };

// const uploadImage = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;
//
//   handleImageAdded(file);
// };

// const insertImageUrl = (url) => {
//   const quill = myQuillEditor.value.getQuill();
//   const range = quill.getSelection();
//   quill.clipboard.dangerouslyPasteHTML(range.index, `<img src="${url}" />`);
// };
const isSave = ref(false)
const isEditor = ref(false)
const deleteSavedArticle = () => {
  localStorage.removeItem('createArticle');
  isSave.value = false
  valueHtml.value = ''
}
onMounted(()=>{
  const storedValue = localStorage.getItem('createArticle');
  if (storedValue) {
    const parsedObject = JSON.parse(storedValue);
    // 执行一系列语句
    console.log('LocalStorage 存在:', parsedObject);
    // 在这里可以执行其他逻辑
    isSave.value = true
    valueHtml.value = parsedObject.article
    imgLst = parsedObject.imgLst
    articleType.value= parsedObject.articleType
    if(articleType.value === null){
      alert("请选择文章类型")
    }
  }
})
const toEditor = () => {
  isSave.value = true
  const storedValue = localStorage.getItem('createArticle');
  if (storedValue) {
    const parsedObject = JSON.parse(storedValue);
    // 执行一系列语句
    console.log('LocalStorage 存在:', parsedObject);
    // 在这里可以执行其他逻辑

    valueHtml.value = parsedObject.article
    imgLst = parsedObject.imgLst.splice()
    articleType.value= parsedObject.articleType
    if(articleType.value === null){
      alert("请选择文章类型")
    }else{
      isTypeOpen.value = false
    }
  } else {
    if(articleType.value === null){
      alert("请选择文章类型")
    }else{
      isTypeOpen.value = false
    }
  }
  isEditor.value = true
}
const submitContent = async () => {
  isEditor.value = false
  isLoading.value = true
  try {
    const editor = editorRef.value
    const finalImgLst = editor.getElemsByType('image')
    console.log(finalImgLst)
    console.log(imgLst)
    // 创建一个 Set 存储 array2 中的 key 值
    const array2Keys = new Set(finalImgLst.map(item => item.src));

  // 遍历 array1 并检查每个对象的 key 是否不存在于 array2Keys 中
    const result = imgLst.filter(item => !array2Keys.has(item.src));
    console.log("比对数组：")
    console.log(result);
    const htmlContent = valueHtml.value;
    const textContent = ''
    console.log(valueHtml.value)
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
    let response1 = await axios.post(`${BACKHOST}:${FRONTPORT}/api/deleteImage`, {
      deleteImgLst: result
    });

    console.log(response1.data);


    // 发起第二个请求
    let response2 = await axios.post(`${BACKHOST}:${FRONTPORT}/api/createArticle`, {
      content: contentLst,
      textContent: textContent,
      articleType: articleType.value.toString(),
    },
        {
          headers: {
            token: token.value
          }
        }
    );
    localStorage.removeItem('createArticle');
    console.log(response2.data);
    isLoading.value = false
    location.reload()

  } catch (error) {
    // 处理错误
    isLoading.value = false
    alert("文章提交失败");
    console.error('Error:', error);
  }
};

const toTutorial = ()=>{
  window.location.href = `https://www.ugcc.fun/#/Dev/editorTutorial`
}

const articleHandler = (htmlText) => {
  // 匹配 <img> 标签的正则表达式
  const imgRegex = /<img[^>]*>/gi;

  // 使用正则表达式进行分割
  let splitParts = htmlText.split(imgRegex);

  // 匹配 <img> 标签的结果数组
  let imgTags = htmlText.match(imgRegex);

  // 构建最终的结果数组
  let result = [];
  if(articleTitle.value ==="" || !articleTitle.value){
    alert("标题不能为空！")
    isLoading.value = false
    return
  }
  if(articleTitle.value.includes("&lt")|| articleTitle.value.includes("&gt")|| articleTitle.value.includes("&")){
    alert("非法标题,请修改")
    isLoading.value = false
    return
  }
  // 如果存在标题，则加入 title 对象
  if (articleTitle.value !== '') {
    result.push({ title: articleTitle.value });
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


/* 电脑（大屏幕） */
@media (min-width: 769px) {
  /* 样式 */
  #typePage{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 5%;
    max-width:40vw;
    margin:auto
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

  #loading{
    position:fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 999999999;
  }
  #loadingBox{
    animation: loadingBoxIn 0.5s ease-in-out;
    width: 85vw;
    min-height: 30vh;
    margin: auto;
    margin-top: 30vh;
    background-color: whitesmoke;
    border: 0.1px solid transparent;
    border-radius: 10px;
    h2{
      margin: auto;
      width:fit-content;
      margin-top: 10%;
    }
  }

  @keyframes loadingBoxIn {
    from {
      transform: translateY(-20vh);
      opacity: 0;
    }
    to{
      transform: translateY(0);
      opacity: 1;
    }

  }
}

@media (max-width: 769px) {
  /* 样式 */
  #typePage{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 5%;
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

  #loading{
    position:fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 999999999;
  }
  #loadingBox{
    animation: loadingBoxIn 0.5s ease-in-out;
    width: 85vw;
    min-height: 30vh;
    margin: auto;
    margin-top: 30vh;
    background-color: whitesmoke;
    border: 0.1px solid transparent;
    border-radius: 10px;
    cube-loading{

    }
    h2{
      margin: auto;
      width:fit-content;
      margin-top: 10%;
    }
  }
  @keyframes loadingBoxIn {
    from {
      transform: translateY(-20vh);
      opacity: 0;
    }
    to{
      transform: translateY(0);
      opacity: 1;
    }
  }
  #notSaveBox{
    position:fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 999999999;
  }
  #saveAskBox{
    animation: loadingBoxIn 0.5s ease-in-out;
    width: 85vw;
    min-height: 30vh;
    margin: auto;
    margin-top: 30vh;
    background-color: whitesmoke;
    border: 0.1px solid transparent;
    border-radius: 10px;
    button{
      margin-right:5%
    }
    h2{
      margin: auto;
      width:80%;
      margin-top: 10%;
      font-size: 1.2em;
    }
  }
}
</style>

