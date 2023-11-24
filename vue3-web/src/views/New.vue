<!--language: Vue-->
<template>
    <div class="new">

        <el-row>

            <el-col :span="17" :offset="1">
                <h1>{{ currentNew.title }}</h1>
                <span>{{ formatTime(currentNew.editTime) }}</span>

                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>

                <div class="content" v-html="currentNew.content"></div>
            </el-col>

            <el-col :span="4" :offset="1">

                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <h2>最近新闻</h2>
                        </div>
                    </template>
                    <div v-for="item in topNewsList" :key="item._id" class="text item" @click="handleSelectNew(item._id)">
                        <h1>{{ item.title }}</h1><br />
                        <time>{{ formatTime(item.editTime) }}</time>
                    </div>
                </el-card>

            </el-col>

        </el-row>

    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()
const router = useRouter()
const currentNew = ref({})
const topNewsList = ref([])

// 监听路由参数变化
watchEffect(() => {
    // 如果没有路由参数，则返回
    if(!route.params.id) return

    // 获取新闻数据
    axios.get(`/web-api/news/list/${route.params.id}`).then(res => {
        currentNew.value = res.data.data[0]
        console.log(currentNew.value);
    })

    // 获取最近新闻列表
    axios.get(`/web-api/news/toplist?limit=4`).then(res => {
        topNewsList.value = res.data.data
        console.log(topNewsList.value);
    })
})

// 格式化时间
const formatTime = (time) => {
    return new Date(time).toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
}

// 点击新闻列表跳转至新闻详情页
const handleSelectNew = (id) => {
    router.push(`/news/${id}`)
}


</script>

<style lang="scss" scoped>
.new {

    .el-row {
        margin-top: 20px;

        .text {
            padding: .175rem;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>