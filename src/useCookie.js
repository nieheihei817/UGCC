import { ref } from 'vue';
import Cookies from 'js-cookie';

export default function useCookie(cookieName) {
    const cookieValue = ref(Cookies.get(cookieName));

    // 设置永久的 cookie，有效期设置为10年
    const setPermanentCookie = (value) => {
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 10); // 设置10年的有效期
        Cookies.set(cookieName, value, { expires: expiryDate });
        cookieValue.value = value; // 更新响应式变量的值
    };

    const removeCookie = () => {
        Cookies.remove(cookieName);
        cookieValue.value = null; // 移除后清空响应式变量的值
    };

    return {
        cookieValue,
        setPermanentCookie,
        removeCookie
    };
}