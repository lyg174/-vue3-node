<template>
    <div class="product">

        <el-carousel v-if="productList.length" height="calc(100vh - 60px)" direction="vertical" :autoplay="true"
            :interval="3000">
            <el-carousel-item v-for="item in  productList " :key="item._id">
                <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">

                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <h1>{{ item.title }}</h1>
                            </div>
                        </template>
                        <div class="introduction">{{ item.introduction }}</div>
                        <div class="detail">{{ item.detail }}</div>
                    </el-card>

                </div>
            </el-carousel-item>
        </el-carousel>

        <el-empty v-else description="乱删东西？" />
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";


const productList = ref([])

onMounted(() => {
    axios.get('/web-api/product/list').then(res => {
        productList.value = res.data.data;
    })
})


</script>

<style lang="scss" scoped>
.product {

    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }

    .image {
        width: 100%;
        height: 100%;
        background-size: cover;
    }

    .box-card {
        width: 50%;
        height: 100%;
        background-color: rgb(255, 255, 255, 0.7);

        .detail {
            margin-top: 20px;
        }
    }
}
</style>