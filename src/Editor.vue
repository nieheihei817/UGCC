<template>
  <div>
    <div v-if="!isTypeOpen">
      <QuillEditor ref="myQuillEditor"
                   theme="snow"
                   v-model:content="content"
                   :options="editorOptions"
      />
      <input type="file" hidden accept=".jpg,.png" ref="fileInput"/>

      <button @click="setAltText" style="margin-left: 5vw;">设置图片描述</button>
      <button @click="submitContent" style="float: right;margin-right: 5vw">提交</button>
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
import {onMounted, ref} from 'vue'
import axios from "axios";
import Cookies from "js-cookie";
import router from "./router/index.js";
import config from "./config.js";
const {FRONTHOST,FRONTPORT,BACKHOST,BACKPORT} = config
const token = ref(Cookies.get("token") || '')
const isTypeOpen = ref(true)
const articleType = ref(null)
const test = ref(null)

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
const toEditor = () => {
  if(articleType.value === null){
    alert("请选择文章类型")
  }else{
    isTypeOpen.value = false
  }
}
const submitContent = async () => {
  try {
    const htmlContent = myQuillEditor.value.getHTML();
    const deltaContent = myQuillEditor.value.getContents();
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
      }//标记1
    }
    let j = 0
    for (let item of deltaContent.ops){
      if(item.insert.image){
        item.insert.image = `http://${BACKHOST}:${BACKPORT}` + response1.data.resSrcLst[j]+'.png';
        j++
      }
    }
    console.log(deltaContent)

    // 发起第二个请求
    let response2 = await axios.post(`http://${BACKHOST}:${FRONTPORT}/api/createArticle`, {
      content: contentLst,
      articleType: articleType.value.toString(),
      deltaContent: deltaContent
    },
        {
          headers: {
            token: token.value
          }
        }
    );

    console.log(response2.data);
    alert("文章创建成功！");
    location.reload()

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
  if(title.includes("&lt")|| title.includes("&gt")|| title.includes("&")){
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

