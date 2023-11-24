<template>
    <div class="newslist">

        <el-card>

            <el-page-header icon="" title="新闻管理">
                <template #content>
                    <span class="text-large font-600 mr-3">新闻列表</span>
                </template>
            </el-page-header>

            <el-table :data="tableData" max-height="570" style="width: 100%" table-layout="fiexd">

                <el-table-column prop="title" label="标题" />

                <el-table-column prop="category" label="分类" :filters="[
                    { text: '最新动态', value: 1 },
                    { text: '典型案例', value: 2 },
                    { text: '通知公告', value: 3 },
                ]" :filter-method="filterHandler">

                    <template #default="scope">
                        {{ scope.row.category === 1 ? '最新动态' : scope.row.category === 2 ? '典型案例' : '通知公告' }}
                    </template>

                </el-table-column>

                <el-table-column prop="editTime" label="更新时间">

                    <template #default="scope">

                        {{ new Date(scope.row.editTime).toLocaleString('zh-CN', {
                            year: 'numeric', month: 'long',
                            day: 'numeric'
                        }) }}

                    </template>

                </el-table-column>

                <el-table-column prop="isPublish" label="是否发布" :filters="[
                    { text: '已发布', value: '1' },
                    { text: '未发布', value: '0' }
                ]" :filter-method="filterHandler">

                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" class="ml-2"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-value="1"
                            inactive-value="0" @change="handleSwitch(scope.row)" />
                    </template>

                </el-table-column>

                <el-table-column prop="address" label="操作">

                    <template #default="scope">

                        <el-tooltip class="box-item" effect="dark" content="预览" placement="top">
                            <el-button type="warning" circle @click="handlePreview(scope.row)">
                                <el-icon>
                                    <Search />
                                </el-icon>
                            </el-button>
                        </el-tooltip>

                        <el-tooltip class="box-item" effect="dark" content="编辑" placement="top">
                            <el-button type="success" circle @click="handleEdit(scope.row)">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                            </el-button>
                        </el-tooltip>


                        <el-popconfirm title="你确定要删除吗" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDel(scope.row._id)">

                            <template #reference>

                                <el-button type="danger" circle>
                                    <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </el-tooltip>
                                </el-button>

                            </template>

                        </el-popconfirm>


                    </template>

                </el-table-column>
            </el-table>

        </el-card>

        <el-dialog v-model="centerDialogVisible" title="编辑用户" width="50%" align-center>
            <h1>{{ newsPreview.title }}</h1>

            <div>{{ new Date(newsPreview.editTime).toLocaleString('zh-CN', {
                year: 'numeric', month: 'long',
                day: 'numeric'
            }) }}</div>

            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>

            <div v-html="newsPreview.content" class="content"></div>
        </el-dialog>

    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue"
import axios from "axios"
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'
import store from '../../store/userInfo'


const router = useRouter();
const tableData = ref([]);
const newsPreview = ref({});
const centerDialogVisible = ref(false);

const filterHandler = (value, row, column) => {// 分类
    const property = column['property']
    return row[property] === value
}

onMounted(() => {
    getNewsList();

})

const getNewsList = () => {
    const userInfo = {
        role: store().userInfo.role,
        username: store().userInfo.username
    }
    axios.get('/admin-api/news/list', { params: userInfo }).then(res => {
        tableData.value = res.data.data;
        console.log(tableData.value);
    })
}

const handleSwitch = (data) => {
    axios.put('/admin-api/news/publish', { _id: data._id, isPublish: data.isPublish }).then(res => {
        data.isPublish === '1' ? ElMessage.success('发布成功') : ElMessage.error('取消发布')
        getNewsList();
    })
}

const handlePreview = (data) => {
    centerDialogVisible.value = true;
    newsPreview.value = data;
}

const handleEdit = (data) => {
    router.push(`/news-manage/newsedit/${data._id}`)
}

const handleDel = (id) => {
    axios.delete(`/admin-api/news/list/${id}`).then(res => getNewsList())
}

</script>

<style lang="scss" scoped>
.newslist {

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

:deep(.content) {

    img {
        max-width: 100%;
    }
}
</style>