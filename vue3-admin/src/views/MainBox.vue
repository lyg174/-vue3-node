<template>
    <div class="mainbox">
        <el-container>
            <el-aside :width="store().isCollapse? '64px' : '200px'">
                <SideMenu></SideMenu>
            </el-aside>

            <el-container>
                
                <el-header style="padding: 0;">
                    <TopHeader></TopHeader>
                </el-header>

                <el-main style="padding: 0;">
                    <router-view></router-view>
                </el-main>
                
            </el-container>

        </el-container>
    </div>
</template>

<script setup>
import TopHeader from '../components/mainbox/TopHeader.vue';
import SideMenu from '../components/mainbox/SideMenu.vue';

import store from '../store/sideMenu';




</script>

<style lang="scss" scoped>
.mainbox {
    display: flex;

    width: 100%;
    height: 100vh;
}
</style>