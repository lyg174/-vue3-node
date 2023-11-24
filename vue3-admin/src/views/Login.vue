<template>
    <div>
        <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" :options='cfg' />

        <el-form status-icon label-width="120px" class="demo-ruleForm">
            <h1 style="font-size: .375rem; color: white; text-align: center;">企业门户管理系统</h1>

            <el-form-item class="item" label="账号">
                <el-input v-model.number="user" />
            </el-form-item>

            <el-form-item class="item" label="密码">
                <el-input v-model="password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item class="item">
                <el-button type="primary" @click="hanleLogin">登录</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '../router';
import config from './particle/config'
import axios from 'axios';
import store from '../store/userInfo'
import index from '../store/index'

import { ElMessage } from 'element-plus'

const particlesInit = config.particlesInit;
const particlesLoaded = config.particlesLoaded;
const cfg = config.cfg;


const user = ref('admin');
const password = ref('123');

const open4 = () => {
    ElMessage.error('用户名或密码错误')
}

const hanleLogin = () => {

    axios.post('/admin-api/user/login', { username: user.value, password: password.value }).then(res => {
        if (res.data.ActionType === 'ok') {
            console.log(res.data.data);
            store().changeUserInfo(res.data.data)
            index().change(false)// 用于控制路由访问权限
            router.push('/home')
        } else {
            open4()
        }
    })
}

</script>

<style lang="scss" scoped>
.demo-ruleForm {

    width: 7.5rem;
    height: 4.375rem;

    text-align: center;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(0, 0, 0, 0.3);
    padding: .125rem;

    .item {
        margin: .375rem .25rem 0 0;
    }
}

div :deep(.el-form-item__label) {
    color: white;
    width: 98px !important;
}
</style>