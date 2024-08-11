import { ref, onMounted, onUnmounted } from 'vue';

export default function useScrollProgress() {
    const scrollY = ref(window.scrollY);
    const windowHeight = ref(window.innerHeight);
    const progress = ref(0);

    const updateProgress = () => {
        scrollY.value = window.scrollY;
        windowHeight.value = window.innerHeight;
        progress.value = (scrollY.value / (document.body.scrollHeight - windowHeight.value)) * 100;
    };

    onMounted(() => {
        window.addEventListener('scroll', updateProgress);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', updateProgress);
    });

    return {
        progress,
    };
}