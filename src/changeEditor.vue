<template>
  <div>
    <div v-if="pageIndex === 'third'">
      <span>标题：</span><input v-model="passageTitle">
      <div style="border: 1px solid #ccc;z-index: 100000"  oncontextmenu="return false;">
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
      <div id="loading" v-show="isLoading">
        <div id="loadingBox">
          <cube-loading></cube-loading>
          <h2>正在提交中...</h2>
        </div>
      </div>
      <button @click="submitContent" style="float: right;margin-right: 5vw">提交</button>
      <button style="float: right;margin-right: 5%" @click.prevent="clearAndReturn">清除存档并返回</button>
      <div style="height: 50vh"></div>
    </div>
    <div id="deleteWarning" v-show="warningFlag">
      <div id="warningBg">
        <div id="warningBox">
          <h1>警告</h1>
          <div id="warningContent">确定删除这篇文章吗？此操作是<span style="color:red">不可逆的！</span></div>
          <div style="clear:both;content: '';
          display: table;width: 100%">
            <button id='no' @click.stop="warningFlag = false">取消</button>
            <button id='yes' @click.stop="deleteArticle('answer')">确定</button>
          </div>

        </div>
      </div>
    </div>
      <div id="userArticleLst" v-show="pageIndex === 'first'">
          <h1 style="margin-bottom: 3vh;margin-left: auto;margin-right: auto;width: fit-content">———文章列表———</h1>
        <div id="prisonTips">
          <h2 class="typeTitle">监狱建筑师————游戏攻略</h2>
          <template v-for="item in articles" :key="item.articleID">
            <div class="articleTitle" v-if="item.articleType === 'prisonTips'">
              <span>{{item.title}}</span>
              <div class="buttonLst">
                <img src="../public/userArticle/pencil.svg" @click="toType(item.article,item.articleID)">
                <img src="../public/userArticle/delete.svg" @click="deleteArticle(item.articleID)">
              </div>
            </div>
            <div style="margin-left: 5%;margin-bottom: 3%;font-style: italic;font-size: 0.8em;clear: both" v-if="item.articleType === 'prisonTips'">{{item.date}}<span style="float: right">AID:{{item.articleID}}</span></div>
          </template>
          <h2 class="typeTitle">监狱建筑师————模组教程</h2>
          <template v-for="item in articles" :key="item.articleID">
            <div class="articleTitle" v-if="item.articleType === 'prisonMods'">
              <span>{{item.title}}</span>
              <div class="buttonLst">
                <img src="../public/userArticle/pencil.svg" @click="toType(item.article,item.articleID)">
                <img src="../public/userArticle/delete.svg" @click="deleteArticle(item.articleID)">
              </div>
            </div>
            <div style="margin-left: 5%;margin-bottom: 3%;font-style: italic;font-size: 0.8em;clear: both" v-if="item.articleType === 'prisonMods'">{{item.date}}<span style="float: right">AID:{{item.articleID}}</span></div>
          </template>
        </div>
        <div id="Operator">
          <h2 class="typeTitle">112接线员————游戏攻略</h2>
          <template v-for="item in articles" :key="item.articleID">
            <div class="articleTitle" v-if="item.articleType === 'OperatorTips'">
              <span>{{item.title}}</span>
              <div class="buttonLst">
                <img src="../public/userArticle/pencil.svg" @click="toType(item.article,item.articleID)">
                <img src="../public/userArticle/delete.svg" @click="deleteArticle(item.articleID)">
              </div>
            </div>
            <div style="margin-left: 5%;margin-bottom: 3%;font-style: italic;font-size: 0.8em;clear: both" v-if="item.articleType === 'OperatorTips'">{{item.date}}<span style="float: right">AID:{{item.articleID}}</span></div>
          </template>
          <h2 class="typeTitle">112接线员————其它攻略</h2>
          <template v-for="item in articles" :key="item.articleID">
            <div class="articleTitle" v-if="item.articleType === 'OperatorOthers'">
              <span>{{item.title}}</span>
              <div class="buttonLst">
                <img src="../public/userArticle/pencil.svg" @click="toType(item.article,item.articleID)">
                <img src="../public/userArticle/delete.svg" @click="deleteArticle(item.articleID)">
              </div>
            </div>
            <div style="margin-left: 5%;margin-bottom: 3%;font-style: italic;font-size: 0.8em;clear: both" v-if="item.articleType === 'OperatorOthers'">{{item.date}}<span style="float: right">AID:{{item.articleID}}</span></div>
          </template>
        </div>
        <div style="margin-bottom: 40vh"></div>
      </div>

      <div id="typePage" v-if="pageIndex === 'second'">
        <h1 id="articleType">文章类型</h1>
        <div style="margin-bottom: 1vh">其将决定您的文章被发布在哪一分区，请根据内容选择</div>
        <div style="margin-bottom: 5vh">
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
import {ref, onMounted, onBeforeUnmount, shallowRef, onBeforeMount} from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import axios from "axios";
import router from "./router/index.js";
import config from "./config.js";
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = config
const token = ref(localStorage.getItem('token'))
const isTypeOpen = ref(true)
const articleType = ref(null)
const test = ref(null)
const pageIndex = ref('first')
const deltaContent = ref(null)
const passageTitle = ref('')
const isLoading = ref(false)
const isEditor = ref(false)
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});


import '@wangeditor/editor/dist/css/style.css'
import CubeLoading from "./cubeLoading.vue";


const editorRef = shallowRef()
const valueHtml = ref('')
let imgLst
let imgLst2 = []
const toolbarConfig = {}
const insertImageConfig = {

  onInsertedImage: function(imageNode) {  // JS 语法
    if (imageNode == null) return;
    const { src, alt, url, href } = imageNode;
    imgLst2.push(imageNode)
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
const clearAndReturn = ()=>{
  let answer = window.prompt("确定吗？(若确定则输入y)")
  if(answer==='y'){
    localStorage.removeItem('changeArticle')
    location.reload();
  }
}
const handleCreated = (editor) => {
  editorRef.value = editor
  valueHtml.value = articleContent.value
    if(localStorage.getItem('changeArticle') !== null){
      imgLst = JSON.parse(localStorage.getItem('changeArticle')).imgLst
      imgLst2 = JSON.parse(localStorage.getItem('changeArticle')).imgLst2
      valueHtml.value = JSON.parse(localStorage.getItem('changeArticle')).article
    }else{
      imgLst = editor.getElemsByType('image')
    }
    console.log("图片列表")
    console.log(imgLst)

  // 明确禁用上传服务器配置
  if (editor.config) {
    editor.config.uploadImgShowBase64 = true

    // 自定义图片插入逻辑
    editor.config.MENU_CONF.uploadImage.customInsert = async (file, insertImgFn) => {
      // 弹出输入框让用户输入 alt
      const alt = prompt('请输入图片的alt文本：') || ''

      // 使用 FileReader 读取文件为 base64
      const reader = new FileReader()
      reader.onload = () => {
        const base64Image = reader.result
        // 插入图片并设置 alt 属性
        insertImgFn(base64Image, { alt })
      }
      reader.readAsDataURL(file)
    }
  } else {
    console.error('Editor config is not initialized yet')
  }

}


const mode = 'default' // 或 'simple'







// 在路由进入前触发
onBeforeMount(() => {
  // 可以在这里进行数据获取，例如从 API 获取数据
  if(!token.value){
    alert("请先登录")
    router.push("/About")
  }
  if(token.value){
    console.log(token.value)
    axios.post(`${FRONTHOST}:${FRONTPORT}/api/verifyToken`, {
      token: token.value
    })
        .then(response => {
          if(response.data.code===403){
            console.log("token过期")
            alert("登录已过期，请重新登录")
            // 清除 localStorage 中的 'token'
            localStorage.removeItem('token');
            router.push('/About')
          }
        })
        .catch(error => {
          // 请求失败，处理错误
          console.error('Error:', error);
        });
  }else{
    console.log("当前未登录")
  }
});
hljs.configure({
  languages: ['javascript', 'python', 'java', 'lua']
});


const articles = ref(null)
const articleContent = ref('')
const articleID = ref("")
const warningFlag = ref(false)
onMounted(()=>{
  axios.post(`${FRONTHOST}:${FRONTPORT}/api/getUserArticles`, {
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
      } else {
        console.error("Error");
      }
    });
  if(localStorage.getItem('changeArticle') !== null){
    isSave.value = true
    pageIndex.value = "third"
    valueHtml.value = JSON.parse(localStorage.getItem('changeArticle')).article
    articleID.value = JSON.parse(localStorage.getItem('changeArticle')).articleID
  }
  })

const toType = (article,aID)=>{
  isEditor.value = false
  articleID.value = aID
  console.log(articleID.value)
  console.log(articleContent.value)
  axios.post(`${FRONTHOST}:${FRONTPORT}/api/getArticleContent`, {
        articleID: articleID.value
      },
      {
        headers:{
          token: token.value
        }
      }
  )
      .then(response => {
        console.log(articleContent.value)
        if (response.data.code === 200){

          for(let i of response.data.article.article){
            if(i.img){
              articleContent.value += `<img src="${i.src}" alt="${i.alt}">`
            }
            else{
              articleContent.value+=i.content
              console.log(i.content)
            }
          }
          console.log(articleContent.value)
        }
      })

  pageIndex.value = "second"
}
const delID = ref(null)
const deleteArticle = (aID)=>{
  if(aID==="answer"){
    warningFlag.value=false
    axios.post(`${FRONTHOST}:${FRONTPORT}/api/deleteArticle`, {
          articleID: delID.value
        },
        {
          headers:{
            token: token.value
          }
        }
    )
        .then(response => {
          if (response.data.code === 200){
            alert("删除成功！")
            location.reload()
          }
        })
  }else{
    warningFlag.value = true
    delID.value = aID
  }
 }
const toEditor = () => {
  isEditor.value = true
  if(!articleType.value){
    alert("请重新选择文章类型！")
  }else{
    pageIndex.value = "third"
  }
}

// 函数：设置 localStorage
function setLocalStorage() {
  const articleObject = {
    article: valueHtml.value,
    imgLst:imgLst,
    imgLst2:imgLst2,
    articleID:articleID.value,
    textContent: '',
    articleType: articleType.value
  };
  if(pageIndex.value==='third'){
    localStorage.setItem('changeArticle', JSON.stringify(articleObject));
    console.log('dangqian')
    console.log(articleObject)
    console.log(imgLst2)
  }
}
const isSave = ref(false)
// 每隔两分钟设置一次 localStorage
const intervalId = setInterval(() => {
  // 你的代码
  setLocalStorage()
}, 10*1000);
onMounted(()=>{
  const storedValue = localStorage.getItem('changeArticle');
  if (storedValue) {
    const parsedObject = JSON.parse(storedValue);
    // 执行一系列语句
    console.log('LocalStorage 存在:', parsedObject);
    // 在这里可以执行其他逻辑
    isSave.value = true
    imgLst = parsedObject.imgLst
    articleType.value= parsedObject.articleType
    if(articleType.value === null){
      alert("请选择文章类型")
    }
  }
})


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
    // 创建一个 Set 存储 array3 中的 key 值
    const array3Keys = new Set(finalImgLst.map(item => item.src));

    // 遍历 array2 并检查每个对象的 key 是否不存在于 array2Keys 中
    const result2 = imgLst2.filter(item => !array3Keys.has(item.src));
    console.log("比对数组1：")
    console.log(result);
    console.log("比对数组2：")
    console.log(result2);
    const finalResultLst = result.concat(result2);
    console.log(finalResultLst)
    const htmlContent = valueHtml.value;
    const textContent = "";
    console.log(htmlContent)
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
    let response1 = await axios.post(`${BACKHOST}:${BACKPORT}/api/deleteImage`, {
      deleteImgLst: finalResultLst
    });

    console.log(response1.data);



    // 发起第二个请求
    let response2 = await axios.post(`${BACKHOST}:${FRONTPORT}/api/overwriteArticle`, {
          content: contentLst,
          articleID: articleID.value,
          articleType: articleType.value.toString(),
          textContent: textContent
    },
        {
          headers: {
            token: token.value
          }
        }
    );

    console.log(response2.data);
    location.reload()

  } catch (error) {
    // 处理错误
    isLoading.value = false
    alert('提交失败！')
    console.error('Error:', error);
  }
};
const toAPISrclst = ref([])
const articleHandler = (htmlText) => {
  // 匹配 <img> 标签的正则表达式
  const imgRegex = /<img[^>]*>/gi;

  // 使用正则表达式进行分割
  let splitParts = htmlText.split(imgRegex);

  // 匹配 <img> 标签的结果数组
  let imgTags = htmlText.match(imgRegex);

  // 构建最终的结果数组
  let result = [];
  if(passageTitle.value ==="" || !passageTitle.value){
    alert("标题不能为空！")
    isLoading.value = false
    return
  }
  if(passageTitle.value.includes("&lt")|| passageTitle.value.includes("&gt")|| passageTitle.value.includes("&")){
    alert("非法标题,请修改")
    isLoading.value = false

    return
  }
  // 如果存在标题，则加入 title 对象
  if (passageTitle.value !== '') {
    result.push({ title: passageTitle.value });
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
      toAPISrclst.value.push(srcValue)
      // 构建 img 对象，并加入 src 和 alt 属性，并将 img 属性设为 true
      result.push({
        img: true,
        src: srcValue,
        alt: altValue
      });
    }
  }
  clearInterval(intervalId)
  localStorage.removeItem('changeArticle');
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
  margin: 0 auto;
  max-width: 30vw;
    min-height: 100vh;
  }
  #articleType{
    margin-bottom: 3vh;
    margin-left: 35%;
    width:80vw
  }
  #deleteWarning{
    position: fixed;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    #warningBg{
      background-color: rgba(0,0,0,0.5);
      width: 100vw;
      height: 100vh;
      border: 0.1px solid transparent;
      #warningBox{
        h1{
          width: fit-content;
          margin: auto;
        }
        #warningContent{
          width: fit-content;
          margin: 10% auto;
        }
        #no{
          float: left;
          margin-left: 10%;
        }
        #yes{
          float: right;
          margin-right: 10%;
          color: red;
        }
        width: 40vw;
        height: 30vh;
        background-color: white;
        margin: 10% auto;
        border-radius: 10px; /* 圆角效果使阴影更柔和 */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* 黑色阴影，0 像素水平偏移，8 像素垂直偏移，16 像素模糊，30% 不透明度 */
      }
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
  #articleType{
    margin-bottom: 3vh;
    margin-left: auto;
    margin-right: auto;
    width:80vw
  }
  #deleteWarning{
    position: fixed;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    #warningBg{
      background-color: rgba(0,0,0,0.5);
      width: 100vw;
      height: 100vh;
      border: 0.1px solid transparent;
      #warningBox{
        h1{
          width: fit-content;
          margin: auto;
        }
        #warningContent{
          width: fit-content;
          margin: 10% auto;
        }
        #no{
          float: left;
          margin-left: 10%;
        }
        #yes{
          float: right;
          margin-right: 10%;
          color: red;
        }
        width: 80vw;
        height: 20vh;
        background-color: white;
        margin: 50% auto;
        border-radius: 10px; /* 圆角效果使阴影更柔和 */
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* 黑色阴影，0 像素水平偏移，8 像素垂直偏移，16 像素模糊，30% 不透明度 */
      }
    }
  }
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

</style>

