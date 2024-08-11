import { ref, onMounted, onUnmounted } from 'vue';

export const useSwipeDetection = () => {
    const swipeDirection = ref('');
    const swipeDistance = ref(0);
    let startY = null;
    let isFirstScroll = true;

    const handleTouchStart = (e) => {
        startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (startY !== null) {
            const endY = e.changedTouches[0].clientY;
            const distance = Math.abs(endY - startY);
            swipeDistance.value = distance;
            swipeDirection.value = endY < startY ? 'up' : endY > startY ? 'down' : '';
            if (isFirstScroll) {
                swipeDistance.value = 0;
                isFirstScroll = false;
            }
        }
    };

    const handleTouchEnd = () => {
        startY = null;
    };

    onMounted(() => {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    });

    onUnmounted(() => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    });

    return {
        swipeDirection,
        swipeDistance
    };
};