import { createApp } from 'vue';
import App from './main.vue';
import VueEasyLightbox from 'vue-easy-lightbox'
import 'vant/lib/index.css'; // 引入样式
import { Button, FloatingBubble } from 'vant'; // 引入需要的组件
import VueReadProgress from 'vue-read-progress';
import Vue3TouchEvents from "vue3-touch-events";
import VueTouch from "vue-touch"
import vDrag from './components/v-drag.js';
import router from "./router/index.js"    //导入路由
const app = createApp(App);
// 创建手势识别器对象
// 创建手势识别器对象
app.use(Vue3TouchEvents)
app.use(Button);
app.directive('drag', vDrag);
app.use(router)             //注册路由
app.use(VueEasyLightbox)
app.use(VueReadProgress)
app.use(Button).use(FloatingBubble).mount('#app');


