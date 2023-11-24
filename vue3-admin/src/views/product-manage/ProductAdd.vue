<template>
    <div class="productadd">

        <el-page-header icon="" title="产品管理">
            <template #content>
                <span class="text-large font-600 mr-3">添加产品</span>
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
                    <el-button type="primary" @click="hanleSubmit">添加产品</el-button>
                </el-form-item>

            </el-form>

        </el-card>

    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Upload from '../../components/upload/Upload.vue';
import { ElMessage } from 'element-plus'
import upload from '../../util/upload';


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
            const res = await upload('/admin-api/product/add', productForm)
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
.productadd {

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