<template>
    <div class="useradd">
        <el-page-header icon="" title="用户管理">
            <template #content>
                <span class="text-large font-600 mr-3">添加用户</span>
            </template>
        </el-page-header>

        <el-card>

            <el-form style="padding: .375rem 0;" ref="userFormRef" :model="userForm" :rules="rules" label-width="120px"
                class="demo-ruleForm" status-icon>

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" clearable />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" type="password" show-password clearable />
                </el-form-item>

                <el-form-item label="角色" prop="role">

                    <el-select v-model="userForm.role" class="m-2" placeholder="Select" size="large" style="width: 100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>

                </el-form-item>

                <el-form-item label="个人介绍" prop="introduction">
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>

                <el-form-item label="头像" prop="avatar">
                    <Upload :avatar="userForm.avatar" @sendFile="getFile"></Upload>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="hanleSubmit">添加用户</el-button>
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


const userFormRef = ref(null);
const userForm = reactive({
    username: '',
    password: '',
    role: 2,
    introduction: '',
    avatar: '',
    gender: 0,
    file: null
})

const rules = reactive({
    username: [{ required: true, message: '请输入名字', trigger: 'blur' },],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' },],
    role: [{ required: true, message: '请选择权限', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' },],
    avatar: [{ required: true, message: '请上传头像', trigger: 'blur' },],
})


const options = [
    {
        value: 1,
        label: '管理员'
    },
    {
        value: 2,
        label: '编辑'
    }
]

// 获取图片上传报文
const getFile = (raw) => {
    userForm.avatar = URL.createObjectURL(raw)
    userForm.file = raw;
}

const hanleSubmit = () => {
    userFormRef.value.validate(async valid => {
        if (valid) {
            const res = await upload('/admin-api/user/add', userForm)
            if (res.ActionType === 'ok') {
                ElMessage.success('添加成功')
            } else {
                ElMessage.error('用户名重复')
            }
        }
    })
}

</script>

<style lang="scss" scoped>
.useradd {
    height: 100%;
    overflow: hidden;

    .el-page-header {
        margin: .125rem .25rem;
    }

    .el-card {
        width: 90%;
        height: 90%;
        margin: .375rem auto;
    }
}
</style>