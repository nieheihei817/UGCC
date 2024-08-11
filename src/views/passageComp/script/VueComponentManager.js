import { defineAsyncComponent } from 'vue';

const components = {
    tipBlue: defineAsyncComponent(() => import('../tipBlue.vue'))
    // 可以添加其他需要插入的 Vue 组件
};

export default {
    getComponent(name) {
        const component = components[name];
        if (component) {
            return component;
        }
        return null;
    }
};