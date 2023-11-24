<template>
    <div class="productedit">

        <el-page-header @back="handleBack" title="新闻编辑">
            <template #content>
                <span class="text-large font-600 mr-3">编辑新闻</span>
            </template>
        </el-page-header>

        <el-card>

            <el-form style="padding: .375rem 0;" ref="productFormRef" :model="productForm" :rules="rules"
                label-width="120px" class="demo-ruleForm" status-icon>

                <el-form-item label="产品名称" prop="title">
                    <el-input v-model="productForm.title" clearable />
                </el-form-item>

                <el-form-item label="产品简要描述" prop="title">
                    <el-input v-model="productForm.introduction" clearable type="textarea" />
                </el-form-item>

                <el-form-item label="产品详细描述" prop="title">
                    <el-input v-model="productForm.detail" clearable type="textarea" />
                </el-form-item>


                <el-form-item label="产品图片" prop="cover">
                    <Upload :avatar="productForm.cover" @sendFile="getFile"></Upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="hanleSubmit">添加新闻</el-button>
                </el-form-item>

            </el-form>

        </el-card>

    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import Upload from '../../components/upload/Upload.vue';
import { ElMessage } from 'element-plus'
import upload from '../../util/upload';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import axios from 'axios';

onMounted(async () => {
    const res = await axios.get(`/admin-api/product/list/${route.params.id}`)
    Object.assign(productForm, res.data.data[0])
    console.log(productForm);
})

const route = useRoute();
const router = useRouter();
const productFormRef = ref(null);
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '',
    file: null,
})

const rules = reactive({
    title: [{ required: true, message: '请输入名称', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入简要描述', trigger: 'blur' },],
    detail: [{ required: true, message: '请输入详细描述', trigger: 'blur' },],
    cover: [{ required: true, message: '请上传图片', trigger: 'blur' },],
})

// 获取图片上传报文
const getFile = (raw) => {
    productForm.cover = URL.createObjectURL(raw)
    productForm.file = raw;
}

const hanleSubmit = () => {
    productFormRef.value.validate(async valid => {
        if (valid) {
            console.log(productForm);
            const res = await upload('/admin-api/product/list', productForm)
            if (res.ActionType === 'ok') {
                ElMessage.success('添加成功')
            } else {
                ElMessage.error('添加失败')
            }
        }
    })
}

const handleBack = () => {
    router.back();
}



</script>

<style lang="scss" scoped>
.productedit {

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