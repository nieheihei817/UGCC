import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Cinemas from "../views/Cinemas.vue";     //导入路由需要的组件
import Films from "../views/Films.vue";
import NowPlaying from "../views/NowPlaying.vue";
import notFound from "../views/notFound.vue"
import About from "../About.vue"
import {defineAsyncComponent} from "vue";
const aaa = defineAsyncComponent(() => import('../aaa.vue'));
const passgae01 = defineAsyncComponent(() => import('../views/GameTips/1.vue'));
const WanHuZhiShou = defineAsyncComponent(() => import('../views/GameTips/WanHuZhiShou.vue'));
const PowerStation = defineAsyncComponent(() => import('../views/GameTips/PowerStation.vue'));
const LingChen = defineAsyncComponent(() => import('../views/LingChen.vue'));
const editor = defineAsyncComponent(() => import('../Editor.vue'));
const Article = defineAsyncComponent(() => import('../Article.vue'));
const changeEditor = defineAsyncComponent(() => import('../changeEditor.vue'));
const routes = [        //创建一个路由数组，其中包含对各路径所指向组件的配置
    {
        path:"/",
        redirect:{
            name:"About"
        }           //如果为"/"，重定向至/films
    },

    {
        path:"/About",
        component:About,
        name:"About",
    },

    {
        path:"/Prison/intro",
        component: aaa
    },
    {
        path:"/Prison/Tips/1",
        component: passgae01
    },
    {
        path:"/LingChenJiaYou",
        component: LingChen
    },
    {
        path:"/Prison/Tips/WanHuZhiShou",
        component: WanHuZhiShou
    },
    {
        path:"/Prison/Tips/PowerStation",
        component: PowerStation
    },
    {
        path:"/user/editor",
        component: editor
    },
    {
        path:"/userArticles",
        component: changeEditor
    },
    {
        path: '/Prison/playerTips',
        component: Article,
        children: [
            {
                path: '', // 确保有一个空路径的配置，用于处理 `/Prison/playerTips` 主路径
                component: Article
            },
            {
                path: ':subPath', // 使用动态路径来捕获所有子路径
                component: Article
            }
        ]
    }
]
//创建路由
const router = createRouter({
    history:createWebHashHistory(),             //路由模式设为哈希模式
    routes,
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 在路由切换前执行的操作，例如权限验证等
    console.log(`Navigating to ${to.fullPath} from ${from.fullPath}`);
    console.log("changed")
    window.scrollTo(0, 0);
    next(); // 确保调用 next() 方法，否则路由不会继续
});

// 全局后置钩子
router.afterEach((to, from) => {
    // 路由切换完成后的操作，例如页面埋点等
    console.log(`Navigated to ${to.fullPath} from ${from.fullPath}`);
});

export default router    //暴露