<template>
    <div class="productlist">

        <el-card>

            <el-page-header icon="" title="产品管理">
                <template #content>
                    <span class="text-large font-600 mr-3">产品列表</span>
                </template>
            </el-page-header>

            <el-table :data="tableData" max-height="570" style="width: 100%" table-layout="fiexd">

                <el-table-column prop="title" label="产品名称" />

                <el-table-column prop="introduction" label="简要描述" />

                <el-table-column prop="editTime" label="更新时间">

                    <template #default="scope">

                        {{ new Date(scope.row.editTime).toLocaleString('zh-CN', {
                            year: 'numeric', month: 'long',
                            day: 'numeric'
                        }) }}

                    </template>

                </el-table-column>


                <el-table-column prop="address" label="操作">

                    <template #default="scope">

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

    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue"
import axios from "axios"
import { useRouter } from 'vue-router'

const tableData = ref([]);
const router = useRouter();

onMounted(() => {
    getProductList();

})

const getProductList = () => {
    axios.get('/admin-api/product/list').then(res => {
        tableData.value = res.data.data;
        console.log(tableData.value);
    })
}

const handleDel = (id) => {
    axios.delete(`/admin-api/product/list/${id}`).then(res => getProductList())
}

const handleEdit = (data) => {
    router.push(`/product-manage/productedit/${data._id}`)
}

</script>

<style lang="scss" scoped>
.productlist {

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