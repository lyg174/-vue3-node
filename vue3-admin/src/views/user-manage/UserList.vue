<template>
    <div class="userlist">
        <el-card>

            <el-page-header icon="" title="用户管理">
                <template #content>
                    <span class="text-large font-600 mr-3">用户列表</span>
                </template>
            </el-page-header>

            <el-table :data="tableData" max-height="570" style="width: 100%" table-layout="fiexd">

                <el-table-column prop="username" label="用户名" />

                <el-table-column prop="avatar" label="头像">

                    <template #default="scope">
                        <el-avatar :size="50"
                            :src="scope.row.avatar ? 'http://localhost:3000' + scope.row.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
                    </template>

                </el-table-column>

                <el-table-column prop="role" label="角色">

                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>

                        <el-tag v-else class="ml-2" type="success">编辑</el-tag>
                    </template>

                </el-table-column>

                <el-table-column prop="address" label="操作">

                    <template #default="scope">

                        <el-button type="primary" plain @click="handleEdit(scope.row._id)">编辑</el-button>

                        <el-popconfirm title="你确定要删除吗" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDel(scope.row._id)">

                            <template #reference>
                                <el-button type="danger">删除</el-button>
                            </template>

                        </el-popconfirm>

                    </template>

                </el-table-column>
            </el-table>

        </el-card>

        <el-dialog v-model="centerDialogVisible" title="编辑用户" width="30%" align-center>

            <el-form style="padding: .375rem 0;" ref="userFormRef" :model="userForm" :rules="rules" label-width="120px"
                class="demo-ruleForm" status-icon>

                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
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

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm">
                        确认修改
                    </el-button>
                </span>
            </template>

        </el-dialog>

    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue"
import axios from "axios"
import { ElMessage } from "element-plus";

const tableData = ref([]);
const centerDialogVisible = ref(false)
const userForm = ref({})
const userFormRef = ref(null)

const rules = reactive({
    username: [{ required: true, message: '请输入名字', trigger: 'blur' },],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' },],
    role: [{ required: true, message: '请选择权限', trigger: 'blur' },],
    introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' },],
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


onMounted(() => {
    getUserList();

})

const getUserList = () => {
    axios.get('/admin-api/user/list').then(res => {
        tableData.value = res.data.data;
    })
}

const handleEdit = (id) => {
    centerDialogVisible.value = true;
    axios.get(`/admin-api/user/list/${id}`).then(res => {
        userForm.value = res.data.data[0];
    })
}

const handleEditConfirm = () => {// 确认修改
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await axios.put(`/admin-api/user/list/${userForm.value._id}`, userForm.value)

            if (res.data.ActionType === 'ok') {
                centerDialogVisible.value = false;
                ElMessage.success('修改成功')
                getUserList();
            } else {
                handleEdit(userForm.value._id);
                ElMessage.error('用户名重复');
            }

        }
    })
}

const handleDel = async (id) => {
    await axios.delete(`/admin-api/user/list/${id}`).then(res => {
        console.log(res.data.ActionType);
    })

    getUserList();
    // tableData.value = tableData.value.filter(item => item._id !== id);
}

</script>

<style lang="scss" scoped>
.userlist {
    height: 100%;
    overflow: hidden;

    .el-page-header {
        margin: .125rem .25rem;
    }

    .el-card {
        width: 97%;
        margin: .375rem auto;
    }
}
</style>