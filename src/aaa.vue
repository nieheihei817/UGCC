<template>
  <div>
    <button @click="handleClick">点击查看结果</button>
  </div>
</template>

<script setup>
function splitHTMLByImg(htmlText) {
  // 匹配 <img> 标签的正则表达式
  const imgRegex = /<img[^>]*>/gi;

  // 匹配文章开头的标题的正则表达式，修改为匹配 <h1> 标签
  const titleRegex = /<h1>(.*?)<\/h1>/i;

  // 使用正则表达式进行分割
  let splitParts = htmlText.split(imgRegex);

  // 匹配 <img> 标签的结果数组
  let imgTags = htmlText.match(imgRegex);

  // 匹配文章开头的标题
  let titleMatch = htmlText.match(titleRegex);
  let title = titleMatch ? titleMatch[1].trim() : '';

  // 构建最终的结果数组
  let result = [];

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

// 示例 HTML 文本
const htmlContent = `
  <div>
    <h1>Article Title</h1>
    <p>This is a paragraph.<img src="image1.jpg" alt="Image 1" /></p>
    <span>aaaaa</span>
    <p>Another paragraph.</p>
    <img src="image2.jpg" alt="Image 2" />
  </div>
`;

// 调用函数提取图片并生成 JSON 数据
const splitResult = splitHTMLByImg(htmlContent);

const handleClick = () => {
  console.log(splitResult);
}
</script>

<style scoped>

</style>
