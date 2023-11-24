<template>
    <div id="editor">

    </div>
</template>

<script setup>
import { onMounted, defineEmits, defineProps } from 'vue'
import E from 'wangeditor'

const emit = defineEmits(['sendHtml'])
const props = defineProps({
    content: String
})

onMounted(() => {
    const editor = new E('#editor')
    editor.create()
    // 设置初始内容
    props.content && editor.txt.html(props.content)

    editor.config.onchange = (newHtml) => {
        emit('sendHtml', newHtml)
    }

})





</script>

<style lang="scss" scoped>
#editor {
    width: 100%;
}
</style>