<template>
    <div class="newsadd">

        <el-page-header icon="" title="新闻管理">
            <template #content>
                <span class="text-large font-600 mr-3">添加新闻</span>
            </template>
        </el-page-header>

        <el-card>

            <el-form style="padding: .375rem 0;" ref="newsFormRef" :model="newsForm" :rules="rules" label-width="120px"
                class="demo-ruleForm" status-icon>

                <el-form-item label="标题" prop="title">
                    <el-input v-model="newsForm.title" clearable />
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <Editor @sendHtml="getHtml"></Editor>
                </el-form-item>

                <el-form-item label="类别" prop="category">

                    <el-select v-model="newsForm.category" class="m-2" placeholder="Select" size="large"
                        style="width: 100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>

                </el-form-item>

                <el-form-item label="封面图片" prop="cover">
                    <Upload :avatar="newsForm.cover" @sendFile="getFile"></Upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="hanleSubmit">添加新闻</el-button>
                </el-form-item>

            </el-form>

        </el-card>
    </div>
</template>

<script setup>
import Editor from '../../components/editor/Editor.vue'
import { reactive, ref } from 'vue'
import Upload from '../../components/upload/Upload.vue';
import { ElMessage } from 'element-plus'
import upload from '../../util/upload';
import store from '../../store/userInfo'

const newsFormRef = ref(null);
const newsForm = reactive({
    title: '',
    content: '',
    category: 1,
    cover: '',
    file: null,
    isPublish: 0,
    author: store().userInfo.username,
    role: store().userInfo.role
})

const rules = reactive({
    title: [{ required: true, message: '请输入标题', trigger: 'blur' },],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' },],
    category: [{ required: true, message: '请选择类别', trigger: 'blur' },],
    cover: [{ required: true, message: '请上传封面', trigger: 'blur' },],
})


const options = [
    {
        value: 1,
        label: '最新动态'
    },
    {
        value: 2,
        label: '典型案例'
    },
    {
        value: 3,
        label: '通知公告'
    }
]

// 获取图片上传报文
const getFile = (raw) => {
    newsForm.cover = URL.createObjectURL(raw)
    newsForm.file = raw;
}
// 获取富文本编辑器内容
const getHtml = (html) => {
    newsForm.content = html;
}

const hanleSubmit = () => {
    newsFormRef.value.validate(async valid => {
        if (valid) {
            console.log(newsForm);
            const res = await upload('/admin-api/news/add', newsForm)
            if (res.ActionType === 'ok') {
                ElMessage.success('添加成功')
            } else {
                ElMessage.error('添加失败')
            }
        }
    })
}

</script>

<style lang="scss" scoped>
.newsadd {

    height: 100%;
    overflow: hidden;

    .el-page-header {
        margin: .125rem .25rem;
    }

    .el-card {
        overflow: auto;

        width: 90%;
        height: 90%;
        margin: .375rem auto;
    }
}
</style>