<template>
    <div class="topheader">
        <div class="left">
            <el-icon @click="store().change()">
                <Menu />
            </el-icon>
            <span style="margin-left: .125rem;">企业门户管理系统</span>
        </div>

        <div class="right">
            <span>欢迎 {{ userInfoStore().userInfo.username }} 回来</span>

            <el-dropdown>

                <el-icon>
                    <User />
                </el-icon>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="router.push('/center')">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import store from '../../store/sideMenu'
import { useRouter } from 'vue-router';
import userInfoStore from '../../store/userInfo'

const router = useRouter();

const handleLogout = () => {
    sessionStorage.removeItem('token');
    userInfoStore().clearUserInfo();
    router.push('/login');
}

</script>

<style lang="scss" scoped>
.topheader {
    background-color: #2d3a4b;
    height: 100%;
    padding: .25rem;

    display: flex;
    justify-content: space-between;
    align-items: center;


    .left,
    .right {
        display: flex;
        font-size: .30rem;
        color:white;
        
        i {
            margin: auto;
            color:white;
            font-size: .30rem;
        }

        i:hover {
            cursor: pointer;
            border: 1px solid #2d3a4b;
        }
    }


}
</style>