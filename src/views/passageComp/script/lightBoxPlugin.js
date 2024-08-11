import { ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'

const LightBoxPlugin = {
    install: (app) => {
        app.component('LightBox', {
            props: ['editor'],
            setup(props) {
                const visibleRef = ref(false)
                const imgsRef = ref([])
                const indexRef = ref(0)

                const showLightbox = (url) => {
                    imgsRef.value = url
                    visibleRef.value = true
                }

                const onHide = () => {
                    visibleRef.value = false
                }

                // Register Vue Easy Lightbox globally
                app.component('VueEasyLightbox', VueEasyLightbox)

                return {
                    showLightbox,
                    visibleRef,
                    imgsRef,
                    indexRef,
                    onHide
                }
            },
            template: `
        <div @click="showLightbox(editor.getAttributes().src)">
          <slot name="image"></slot>
        </div>
        <div id="container"><slot name="des"></slot></div>
        <VueEasyLightbox
          :visible="visibleRef"
          :imgs="imgsRef"
          :index="indexRef"
          @hide="onHide"
        ></VueEasyLightbox>
      `
        })
    }
}

export default LightBoxPlugin
