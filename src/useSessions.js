import { ref } from 'vue';

export function useSession() {
    // 创建一个ref来存储session信息
    const session = ref(null);

    // 从session storage获取当前session信息
    const getSession = () => {
        session.value = sessionStorage.getItem('session');
    };

    // 设置session信息到session storage
    const setSession = (value) => {
        sessionStorage.setItem('session', value);
        session.value = value;
    };

    return {
        session,
        getSession,
        setSession
    };
}