import { createRouter, createWebHashHistory } from 'vue-router';
import Cinemas from "../views/Cinemas.vue";
import Films from "../views/Films.vue";
import NowPlaying from "../views/NowPlaying.vue";
import notFound from "../views/notFound.vue";
import About from "../About.vue";
import {defineAsyncComponent, ref} from "vue";
import Prism from "prismjs";

const aaa = defineAsyncComponent(() => import('../aaa.vue'));
const passgae01 = defineAsyncComponent(() => import('../views/GameTips/1.vue'));
const WanHuZhiShou = defineAsyncComponent(() => import('../views/GameTips/WanHuZhiShou.vue'));
const PowerStation = defineAsyncComponent(() => import('../views/GameTips/PowerStation.vue'));
const LingChen = defineAsyncComponent(() => import('../views/LingChen.vue'));
const editor = defineAsyncComponent(() => import('../Editor.vue'));
const Article = defineAsyncComponent(() => import('../Article.vue'));
const changeEditor = defineAsyncComponent(() => import('../changeEditor.vue'));
const gameDetail = defineAsyncComponent(() => import('../gamedDetail.vue'));
const editorTutorial = defineAsyncComponent(() => import('../editorTutorial.vue'));
const Support = defineAsyncComponent(() => import('../Support.vue'));


const routes = [
    {
        path: '/',
        redirect: {
            name: "About"
        }
    },
    {
        path: '/About',
        component: About,
        name: "About",
    },
    {
        path: '/Support',
        component: Support,
        name: "Support",
    },
    {
        path: '/Prison/intro',
        component: gameDetail
    },
    {
        path: '/Prison/Tips/1',
        component: passgae01
    },
    {
        path: '/LingChenJiaYou',
        component: LingChen
    },
    {
        path: '/Prison/Tips/WanHuZhiShou',
        component: WanHuZhiShou
    },
    {
        path: '/Prison/Tips/PowerStation',
        component: PowerStation
    },
    {
        path: '/user/editor',
        component: editor
    },
    {
        path: '/userArticles',
        component: changeEditor
    },
    {
        path: '/Dev/editorTutorial',
        component: editorTutorial,
        meta: { title: '文档编辑器使用教程' }
    },
    {
        path: '/Articles',
        component: Article,
        children: [
            {
                path: '',
                component: Article
            },
            {
                path: 'Prison/playerTips/:id',
                component: Article
            },
            {
                path: 'Prison/prisonMods/:id',
                component: Article
            },
            {
                path: 'Operator/OperatorTips/:id',
                component: Article
            },
            {
                path: 'Operator/OperatorOthers/:id',
                component: Article
            },
            {
                path: ':subPath',
                component: Article
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    console.log(`Navigating to ${to.fullPath} from ${from.fullPath}`);
    console.log("changed");
    window.scrollTo(0, 0);
    next();
});

// 全局后置钩子
router.afterEach((to, from) => {
    setTimeout(() => {
        Prism.highlightAll(); // 全局代码高亮
    }, 500);
    console.log(`Navigated to ${to.fullPath} from ${from.fullPath}`);
});

export default router;
