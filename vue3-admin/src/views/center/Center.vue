<template>
    <div class="center">

        <el-page-header icon="" title="企业门户管理系统">
            <template #content>
                <span class="text-large font-600 mr-3">个人中心</span>
            </template>
        </el-page-header>

        <el-row>

            <el-col :span="8">
                <el-card style="text-align: center; font-size: .375rem;">
                    <el-avatar :size="200" :src="avatarUrl" />
                    <h1>{{ store().userInfo.username }}</h1>
                    <h1>{{ store().userInfo.role === 1 ? '管理员' : '编辑' }}</h1>
                </el-card>
            </el-col>

            <el-col :span="16">

                <el-card header="个人信息">

                    <el-form style="padding: .375rem 0;" ref="userFormRef" :model="userForm" :rules="rules"
                        label-width="120px" class="demo-ruleForm" status-icon>

                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">

                            <el-select v-model="userForm.gender" class="m-2" placeholder="Select" size="large"
                                style="width: 100%;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>

                        </el-form-item>

                        <el-form-item label="个人介绍" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>

                        <el-form-item label="头像" prop="avatar">
                            <Upload :avatar="userForm.avatar" @sendFile="getFile"></Upload>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="hanleSubmit">更新</el-button>
                        </el-form-item>

                    </el-form>

                </el-card>

            </el-col>

        </el-row>

    </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { computed, reactive, ref } from "vue"
import store from '../../store/userInfo'
import upload from '../../util/upload'
import Upload from "../../components/upload/Upload.vue";


const avatarUrl = computed(() => store().userInfo.avatar ? 'http://localhost:3000' + store().userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)



const { username, gender, introduction, avatar } = store().userInfo;

const userFormRef = ref(null);
const userForm = reactive({
    username,
    gender: gender.toString(),
    introduction,
    avatar,
    file: null
})

const rules = reactive({
    username: [{ required: true, message: '请输入名字', trigger: 'blur' },],
    gender: [{ required: true, message: '请选择性别', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入个人介绍', trigger: 'blur' },],
    avatar: [{ required: true, message: '请上传头像', trigger: 'blur' },],
})


const options = [
    {
        value: '1',
        label: '男'
    },
    {
        value: '2',
        label: '女'
    },
    {
        value: '0',
        label: '保密'
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
            const res = await upload('/admin-api/user/upload', userForm)
            if (res.ActionType === 'ok') {
                store().changeUserInfo(res.data);
                ElMessage.success('更新成功')
            }
        }
    })
}


</script>

<style lang="scss" scoped>
.center {
    height: 100%;
    overflow: hidden;

    .el-page-header {
        margin: .125rem .25rem;
    }

    .el-row {
        font-size: .5rem;

        .el-col {

            padding: 0 .25rem;

            .el-card {

                margin-top: .25rem;
            }

        }


    }

}
</style>