<template>
    <div class="home">

        <el-page-header icon="" title="企业门户管理系统">
            <template #content>
                <span class="text-large font-600 mr-3">首页</span>
            </template>
        </el-page-header>

        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="50" :src="avatarUrl" />
                </el-col>
                <el-col :span="20" style="font-size: .375rem; line-height: 50px;">欢迎{{ store().userInfo.username
                }}回来</el-col>
            </el-row>
        </el-card>

        <el-card class="box-card" header="公司产品">

            <el-carousel :interval="4000" type="card" height="5rem">
                <el-carousel-item v-for="item in productInfo" :key="item._id">
                    <img :src="'http://localhost:3000' + item.cover">
                </el-carousel-item>
            </el-carousel>

        </el-card>

    </div>
</template>

<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import store from '../../store/userInfo'


const avatarUrl = computed(() => store().userInfo.avatar ? 'http://localhost:3000' + store().userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)
const productInfo = ref([])


onMounted(() => {
    axios.get('/admin-api/product/list').then(res => {
        productInfo.value = res.data.data
        console.log(productInfo.value)
    })
})

</script>

<style lang="scss" scoped>
.home {
    height: 100%;
    overflow: hidden;

    .el-page-header {
        margin: .125rem .25rem;
    }

    .el-card {
        width: 98%;
        height: 11%;
        margin: .5rem auto;


        :deep(.el-card__body) {
            padding: .25rem;
        }
    }

    .el-card:last-child {
        height: 71%;
    }

    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 2.5rem;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }

    img {
        max-width: 100%;
        height: auto;
    }
}
</style>