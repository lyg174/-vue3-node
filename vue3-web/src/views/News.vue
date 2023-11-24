<!--language: Vue-->
<template>
    <div class="news">

        <div class="news-header">
            <h1 style="font-size: 1.75rem; color: white; text-align: center; padding-top: 1.625rem;">新闻资讯</h1>

            <div class="search">

                <el-popover placement="bottom" title="结果" width="50%" :visible="visible">
                    <template #reference>
                        <el-input v-model="searchText" placeholder="请输入" :prefix-icon="Search" clearable
                            @input="visible = true" @blur="visible = false" size="large" maxlength="20" />
                    </template>

                    <div v-if="searchNews.length">
                        <div class="search-item" v-for="item in searchNews" :key="item._id" @click="handleSelectNew(item._id)">
                            {{ item.title }}
                        </div>
                    </div>

                    <div v-else>
                        <el-empty description="没东西" style="height: 200px;" :image-size="80" />
                    </div>

                </el-popover>

            </div>

        </div>

        <div class="topnews">

            <el-row :gutter="20">
                <el-col :span="6" v-for="item in  topNews " :key="item._id">

                    <el-card :body-style="{ padding: '0px' }" shadow="hover"  @click="handleSelectNew(item._id)">
                        <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"></div>
                        <div style="padding: .175rem">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ new Date(item.editTime).toLocaleString('zh-CN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                }) }}</time>
                            </div>
                        </div>
                    </el-card>

                </el-col>
            </el-row>

            <el-tabs style="margin-top: 20px;" v-model="activeName" class="demo-tabs">
                <el-tab-pane v-for="item in tableList" :label="item.label" :name="item.name" :key="item.name">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <div v-for="data in tableNews[item.name]" :key="data._id">

                                <el-card class="table-card" :body-style="{ padding: '0px' }" shadow="hover"  @click="handleSelectNew(data._id)">
                                    <div class="table-image"
                                        :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }">
                                    </div>
                                    <div style="padding: .175rem">
                                        <span style="font-size: 24px; font-weight: 700;">{{ data.title }}</span>
                                        <div>
                                            <time class="table-time" style="color: gray;">{{ formatTime(data.editTime)
                                            }}</time>
                                        </div>
                                    </div>
                                </el-card>

                            </div>
                        </el-col>

                        <el-col :span="6">
                            <el-timeline>
                                <el-timeline-item v-for="data in tableNews[item.name]" :key="data._id"
                                    :timestamp="formatTime(data.editTime)">
                                    {{ data.title }}
                                </el-timeline-item>
                            </el-timeline>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>

        </div>

        <el-backtop :right="100" :bottom="100" />

    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import lodash from 'lodash'
import {useRouter} from 'vue-router'


const router = useRouter()
const searchText = ref('')
const visible = ref(false)
const isPublishNews = ref([])
const activeName = ref(1)

const tableList = [
    {
        label: '最新动态',
        name: 1
    },
    {
        label: '典型案例',
        name: 2
    },
    {
        label: '通知公告',
        name: 3
    }
]

const searchNews = computed(() => searchText.value ? isPublishNews.value.filter(item => item.title.includes(searchText.value)) : [])
const topNews = computed(() => isPublishNews.value.slice(0, 4))
const tableNews = computed(() => lodash.groupBy(isPublishNews.value, 'category'))

onMounted(() => {
    getNewsList()
})

const formatTime = (time) => {
    return new Date(time).toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })
}

const getNewsList = () => {
    axios.get('/web-api/news/list').then(res => {
        isPublishNews.value = res.data.data;
        console.log(isPublishNews.value);
        console.log(lodash.groupBy(isPublishNews.value, 'category'));
    })
}

const handleSelectNew = (id) => {
    router.push(`/news/${id}`)
}

</script>

<style lang="scss" scoped>
.news {
    overflow: hidden;

    .news-header {
        position: relative;

        width: 100%;
        height: 500px;
        background-image: url('../assets/04.jpg');
        background-size: cover;
    }

    .search {
        width: 100%;
        position: absolute;
        top: 70%;
        text-align: center;

        .el-input {
            width: 50%;
        }

    }

    .topnews {
        margin: .25rem;

        .image {
            width: 100%;
            height: 3.125rem;
            background-size: cover;
        }

        .table-card {
            margin-bottom: .125rem;
        }

        .table-image {
            width: 20%;
            height: 3.125rem;
            background-size: cover;
            float: left;
        }

    }
}

.search-item {
    height: 50px;
    line-height: 50px;

    &:hover {
        background-color: rgb(238, 237, 237);
        color: red;
    }
}
</style>