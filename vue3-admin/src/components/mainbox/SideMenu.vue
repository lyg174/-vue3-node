<template>
    <div class="sidemenu">
        <el-menu :collapse="store().isCollapse" active-text-color="#ffd04b" background-color="#545c64"
            class="el-menu-vertical-demo" :default-active="route.fullPath" text-color="#fff" :collapse-transition="false"
            :router="true">


            <el-menu-item index="/home">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/center">
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>

            <el-sub-menu index="/user-manage" v-if="userInfo().userInfo.role === 1 ? 1 : 0">

                <template #title>
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>用户管理</span>
                </template>

                <el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>

            </el-sub-menu>

            <el-sub-menu index="/news-manage">

                <template #title>
                    <el-icon>
                        <MessageBox />
                    </el-icon>
                    <span>新闻管理</span>
                </template>

                <el-menu-item index="/news-manage/newadd">添加新闻</el-menu-item>
                <el-menu-item index="/news-manage/newlist">新闻列表</el-menu-item>

            </el-sub-menu>

            <el-sub-menu index="/product-manage">

                <template #title>
                    <el-icon>
                        <Reading />
                    </el-icon>
                    <span>产品管理</span>
                </template>

                <el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
                <el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>

            </el-sub-menu>

        </el-menu>

    </div>
</template>

<script setup>
import store from '../../store/sideMenu'
import { useRoute } from 'vue-router';
import userInfo from '../../store/userInfo'


const route = useRoute();



</script>

<style lang="scss" scoped>
.sidemenu {
    height: 100%;
    display: flex;

    .el-menu {
        flex: 1;
        border: none;
    }

}
</style>