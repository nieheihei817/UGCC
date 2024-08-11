<script setup>
import { ref, defineComponent } from 'vue'
// 使用 inject 获取父组件提供的响应式数据
import { getCurrentInstance, onMounted } from 'vue';

// 单独引入组件样式
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'
// or
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'
import VueEasyLightbox from 'vue-easy-lightbox'
const visibleRef = ref(false)
const indexRef = ref(0) // default 0
const imgsRef = ref([])
// Img Url , string or Array of string
// ImgObj { src: '', title: '', alt: '' }
// 'src' 是必须值
// 允许混合

// 通过 props 接收父组件传递的参数
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});
const onShow = () => {
  visibleRef.value = true
}
const showSingle = () => {
  imgsRef.value = props.path
  // or
  // imgsRef.value  = {
  //   title: 'this is a placeholder',
  //   src: 'http://via.placeholder.com/350x150'
  // }
  onShow()
}

const onHide = () => (visibleRef.value = false)
</script>

<template>
  <div>
    <div @click="showSingle">
      <slot name="image"></slot>
    </div>
    <div id="container"><slot name="des"></slot></div>
    <vue-easy-lightbox
        :visible="visibleRef"
        :imgs="imgsRef"
        :index="indexRef"
        @hide="onHide"
    ></vue-easy-lightbox>
  </div>
</template>

<style scoped>
#container{
  color: gray;
  display: flex;
  justify-content: center; /* 水平居中 */
  font-size: 4vw;
  font-style: italic;
  margin-bottom: 1.5vh;
}
</style>