<!--language: JavaScript-->
<template>
    <div class="upload">
        <el-upload class="avatar-uploader" :show-file-list="true" :auto-upload="false" :on-change="changeAvatar">
            <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
    </div>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue';


// 定义props，用于接收父组件传入的avatar属性
const props = defineProps({
    avatar: String
})

// 定义emit，用于发送文件
const emit = defineEmits(['sendFile'])

// 计算uploadAvatar，如果avatar属性中包含blob，则返回avatar，否则返回本地地址
const uploadAvatar = computed(() =>
    props.avatar.includes('blob') ? props.avatar : 'http://localhost:3000' + props.avatar
)

// 定义changeAvatar函数，用于发送文件
const changeAvatar = (uploadFile) => {
    emit('sendFile', uploadFile.raw)
}

</script>

<style lang="scss" scoped>
.upload {

    // 设置图片样式
    :deep(.avatar-uploader .avatar) {
        width: 2.225rem;
        height: 2.225rem;
        display: block;
    }

    // 设置上传框样式
    :deep(.avatar-uploader .el-upload) {
        border: 1px dashed rgb(139, 131, 131);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    // 设置上传框鼠标悬停样式
    :deep(.avatar-uploader .el-upload:hover) {
        border-color: rgb(11, 121, 199);
    }

    // 设置图标样式
    :deep(.el-icon.avatar-uploader-icon) {
        font-size: .35rem;
        color: #8c939d;
        width: 2.225rem;
        height: 2.225rem;
        text-align: center;
    }
}
</style>