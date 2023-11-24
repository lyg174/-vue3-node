<template>
    <div class="navbar">

        <el-menu :default-active="route.fullPath" class="el-menu-demo" mode="horizontal" :router="true">

            <el-menu-item index="/home">首页</el-menu-item>

            <el-menu-item index="/news">新闻中心</el-menu-item>

            <el-menu-item index="/product">产品与服务</el-menu-item>

            <el-menu-item index="" @click="handleClick">登录</el-menu-item>

            <div style="margin-left: auto; padding: 0 .375rem; line-height: 59px; font-size: 16px;">
                <span>企业门户官网</span>
            </div>

        </el-menu>



    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'


const router = useRouter()
const route = useRoute()

const handleClick = () => {
    window.location = 'http://localhost:5174/'
}


</script>

<style lang="scss" scoped>
.navbar {
    position: sticky;
    top: 0;
    z-index: 1000;
}

</style>