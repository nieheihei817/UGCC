<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()
const valueHtml = ref('')

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      base64LimitSize: 10 * 1024000 // 10KB
    }
  }
}

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor

  // 明确禁用上传服务器配置
  if (editor.config) {
    editor.config.uploadImgShowBase64 = true

    // 自定义图片插入逻辑
    editor.config.MENU_CONF.uploadImage.customInsert = async (file, insertImgFn) => {
      // 弹出输入框让用户输入 alt
      const alt = prompt('请输入图片的alt文本：') || ''

      // 使用 FileReader 读取文件为 base64
      const reader = new FileReader()
      reader.onload = () => {
        const base64Image = reader.result
        // 插入图片并设置 alt 属性
        insertImgFn(base64Image, { alt })
      }
      reader.readAsDataURL(file)
    }
  } else {
    console.error('Editor config is not initialized yet')
  }
}

const submitPassage = () => {
  const editor = editorRef.value
  console.log(editor)
  console.log(valueHtml.value)
}

const mode = 'default' // 或 'simple'

</script>

