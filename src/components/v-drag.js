// v-drag.js
const vDrag = {
    mounted(el) {
        let minTop = el.getAttribute('drag-min-top');
        minTop = minTop ? parseInt(minTop) : 0;
        let ifMoveSizeArea = 20;

        let initX, initY, disX, disY;

        el.addEventListener('mousedown', e => {
            initX = e.clientX - el.getBoundingClientRect().left;
            initY = e.clientY - el.getBoundingClientRect().top;
            disX = e.clientX - el.offsetLeft;
            disY = e.clientY - el.offsetTop;

            document.onselectstart = () => false;

            const onMouseMove = e => {
                const l = e.clientX - disX;
                const t = e.clientY - disY;

                el.style.left = `${l}px`;
                el.style.top = `${t < minTop ? minTop : t}px`;

                if (Math.abs(l - initX) > ifMoveSizeArea || Math.abs(t - initY) > ifMoveSizeArea) {
                    el.setAttribute('dragged', '');
                } else {
                    el.removeAttribute('dragged');
                }
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                document.onselectstart = null;
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            return false;
        });
    }
};

export default vDrag;