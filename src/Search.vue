<template>
  <SearchIcon id="searchIcon" @click="handleSearchMenu"></SearchIcon>
  <transition name="fade">
    <div id="box" v-if="searchFlag">
      <div @click="handleSearchMenu" id="cancelIcon">x</div>
      <div class="search-container">
        <input class="search-input" type="text" v-model="searchText" placeholder="全站检索...">
      </div>
      <ul class="resultLst" v-if="filteredList.length">
        <li v-for="(item, index) in filteredList" :key="index" @click="toPassage(item.path)">

          <h2 id="PassageType" v-if="index === filteredList.findIndex(el => el.type === item.type)">
            {{ item.type }} <!-- 显示类型作为标题 -->
          </h2>
          <div id="contentBox">
            <h1 id="PassageTitle" v-html="highlightTitle(item.title)"></h1>
            <p id="PassageContent" v-html="processPassage(item.passage)"></p>
          </div>
        </li>
      </ul>
      <div v-else style="display:flex;justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */margin: 30% auto;height: 50vh" ><p style="margin-bottom: 20vh">没有找到匹配的结果。</p></div>
    </div>
  </transition>

</template>

<script>
import { ref, computed } from 'vue';
import data from '../public/PassageData.json';
import { useRouter } from 'vue-router';
import SearchIcon from "./searchIcon.vue"
import cancel from "./cancel.vue";
import router from "./router/index.js";
export default {
  components: {SearchIcon},
  setup() {
    const searchFlag = ref(false)
    const searchText = ref('');
    const lst = ref(data);
    const filteredList = computed(() => {
      const text = searchText.value.toLowerCase().trim();
      if (!text) return [];

      return lst.value.filter(item => {
        return item.title.toLowerCase().includes(text) || item.passage.toLowerCase().includes(text);
      });
    });

    const processPassage = (passage) => {
      const text = searchText.value.toLowerCase().trim();

      if (!text) return passage;

      const index = passage.toLowerCase().indexOf(text);
      if (index === -1) {
        // 如果文章内容中不包含搜索关键词
        const truncatedText = passage.substring(0, 30);
        if (passage.length > 30) {
          return truncatedText + '...';
        } else {
          return truncatedText;
        }
      }

      let start = Math.max(index - 16, 0);
      let end = Math.min(index + text.length + 20, passage.length);

      let processedText = '';
      if (start > 0) {
        processedText += '...';
      }
      processedText += passage.substring(start, end);
      if (end < passage.length) {
        processedText += '...';
      }

      processedText = processedText.replace(new RegExp(text, 'gi'), match => `<mark style="background-color: #71c4ef">${match}</mark>`);

      return processedText;
    };

    const highlightTitle = (title) => {
      const text = searchText.value.toLowerCase().trim();

      if (!text || !title) return title;

      const regex = new RegExp(text, 'gi');
      const highlightedTitle = title.replace(regex, match => `<mark style="background-color: #71c4ef">${match}</mark>`);

      return `<span class="title-highlight">${highlightedTitle}</span>`;
    };
    const handleSearchMenu = ()=>{
      searchFlag.value = !searchFlag.value
      if(searchFlag.value){
        document.body.style.overflow = 'hidden';

      }else{
        document.body.style.overflow = 'scroll';
        clearSearch()
      }

    }
    const toPassage = (path) => {
      searchFlag.value=!searchFlag
      router.push(path);
      clearSearch()
      document.body.style.overflow = 'scroll';
    };

    const clearSearch = () => {
      searchText.value = '';
    };
    return {
      searchText,
      filteredList,
      processPassage,
      highlightTitle,
      toPassage,
      clearSearch,
      handleSearchMenu,
      searchFlag
    };
  }
};
</script>

<style>
/* 设置背景或其他样式 */
/* 电脑（大屏幕） */
@media (min-width: 769px) {
  #cancelIcon{
    margin-left: 90%;font-size: 4em
  }
  /* 样式 */
  body {
    margin: 0;
    padding: 0;
  }
  #searchIcon{
    width: 3vw;
    margin-top: auto
  }
  #box{
    position: absolute;
    top: 0;
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    z-index: 999;
    min-height: 100vh;
    background-color: white;
    opacity: 100%;
  }
  #PassageType{
    font-size: 1em;
    border-left: 5px solid #71c4ef;
    padding-left: 10px;
    margin-left: 20%;
  }
  .resultLst{
    margin: 0 3vw;

  }
  #contentBox{
    border-radius: 10%; /* 四分之一个圆 */
    max-width: 40%;
    box-shadow: 0px 0px 8px rgba(113, 196, 239, 0.7); /* 阴影效果，使用指定的颜色 */
    overflow: hidden;
    margin:auto;
    margin-bottom: 2vh;
    padding: 0 5%;
  }
  #PassageTitle{
    display: inline-block;
    font-size: 1.3em;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  #PassageTitle::before{
    content: '\0023';
    font-size: 1.2em; /* 根据需要调整大小 */
    margin-right: 0.3em; /* 可以调整与第一个段落之间的间距 */
    color: #00668c;
  }
  .search-container {
    display: flex; /* 使用 Flexbox 布局 */
    align-items: center; /* 垂直居中对齐 */
    padding: 0 5vw; /* 左右各预留5vw的空间 */
  }

  .search-input {
    flex: 1; /* 输入框自动扩展填满剩余空间 */
    padding: 10px; /* 设置内边距 */
    font-size: 16px; /* 设置字体大小 */
    border: 1px solid #ccc; /* 设置边框样式 */
    border-radius: 4px; /* 设置圆角 */
  }
  .resultLst{
    padding: 0 3vw;
  }
  .search-button {
    padding: 10px 20px; /* 设置按钮内边距 */
    font-size: 16px; /* 设置字体大小 */
    border: 1px solid #007bff; /* 设置边框样式 */
    border-radius: 4px; /* 设置圆角 */
    cursor: pointer; /* 鼠标指针样式为手型 */
    margin-left: 10px; /* 设置左侧外边距 */
  }

  .search-button:active {
    border-color: #0056b3; /* 鼠标悬停时的边框颜色 */
  }
  .search-input {
    width: 100%; /* 使用100%宽度 */
    padding: 10px; /* 设置内边距 */
    font-size: 18px; /* 设置字体大小 */
    border: 2px solid #3498db; /* 设置边框 */
    border-radius: 5px; /* 圆角边框 */
    outline: none; /* 去除默认轮廓 */
    transition: border-color 0.2s; /* 边框颜色变化的过渡效果 */

    /* 如果需要更多样式调整，可以继续添加 */
  }

  .search-input:focus {
    border-color: #00668c; /* 获得焦点时的边框颜色 */
  }

  /* 占位符样式 */
  .search-input::placeholder {
    color: #999; /* 占位符文字颜色 */
    font-style: italic; /* 占位符文字斜体 */
  }
}
@media (max-width: 769px) {
  /* 样式 */
  body {
    margin: 0;
    padding: 0;
  }
  #cancelIcon{
    margin-left: 85%;font-size: 4em
  }
  #searchIcon{
    margin-top:2%;
  }
  #box{
    position: absolute;
    top: 0;
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    z-index: 999;
    min-height: 100vh;
    background-color: white;
    opacity: 100%;
  }
  #PassageType{
    font-size: 1em;
    border-left: 1vw solid #71c4ef;
    padding-left: 1.8vw;
  }
  .resultLst{
    margin: 0 3vw;
  }
  #contentBox{
    border-radius: 10%; /* 四分之一个圆 */
    box-shadow: 0px 0px 8px rgba(113, 196, 239, 0.7); /* 阴影效果，使用指定的颜色 */
    overflow: hidden;
    margin-bottom: 2vh;
    padding: 0 5%;
  }
  #PassageTitle{
    display: inline-block;
    font-size: 1.3em;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  #PassageTitle::before{
    content: '\0023';
    font-size: 1.2em; /* 根据需要调整大小 */
    margin-right: 0.3em; /* 可以调整与第一个段落之间的间距 */
    color: #00668c;
  }
  .title-highlight {
    /* 如果需要添加标题的背景色或其他样式，可以在这里设置 */
  }
  .search-container {
    display: flex; /* 使用 Flexbox 布局 */
    align-items: center; /* 垂直居中对齐 */
    padding: 0 5vw; /* 左右各预留5vw的空间 */
  }

  .search-input {
    flex: 1; /* 输入框自动扩展填满剩余空间 */
    padding: 10px; /* 设置内边距 */
    font-size: 16px; /* 设置字体大小 */
    border: 1px solid #ccc; /* 设置边框样式 */
    border-radius: 4px; /* 设置圆角 */
  }
  .resultLst{
    padding: 0 3vw;
  }
  .search-button {
    padding: 10px 20px; /* 设置按钮内边距 */
    font-size: 16px; /* 设置字体大小 */
    border: 1px solid #007bff; /* 设置边框样式 */
    border-radius: 4px; /* 设置圆角 */
    cursor: pointer; /* 鼠标指针样式为手型 */
    margin-left: 10px; /* 设置左侧外边距 */
  }

  .search-button:active {
    border-color: #0056b3; /* 鼠标悬停时的边框颜色 */
  }
  .search-input {
    width: 100%; /* 使用100%宽度 */
    padding: 10px; /* 设置内边距 */
    font-size: 18px; /* 设置字体大小 */
    border: 2px solid #3498db; /* 设置边框 */
    border-radius: 5px; /* 圆角边框 */
    outline: none; /* 去除默认轮廓 */
    transition: border-color 0.2s; /* 边框颜色变化的过渡效果 */

    /* 如果需要更多样式调整，可以继续添加 */
  }

  .search-input:focus {
    border-color: #00668c; /* 获得焦点时的边框颜色 */
  }

  /* 占位符样式 */
  .search-input::placeholder {
    color: #999; /* 占位符文字颜色 */
    font-style: italic; /* 占位符文字斜体 */
  }
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
/* 如果需要进一步自定义，可以继续添加样式规则 */
</style>
