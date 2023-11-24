import { createRouter, createWebHashHistory } from 'vue-router'

import config from './config.js'
import store from '../store/index'
import userInfo from '../store/userInfo'


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/mainbox',
        name: 'mainbox',
        component: () => import('../views/MainBox.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

function ConfigRouter() {
    if (!router.hasRoute('mainbox')) {
        router.addRoute({
            path: '/mainbox',
            name: 'mainbox',
            component: () => import('../views/MainBox.vue')
        })
    }

    config.forEach(item => {// 动态添加路由
        checkPermission(item) && router.addRoute('mainbox', item)
    })

    store().change(true)
}

function checkPermission(item) {
    if (item.requireAdmin) {// 判断是否为管理员
        return userInfo().userInfo.role === 1
    }
    return true
}

router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next()
    } else {
        if (!sessionStorage.getItem('token')) {
            next('/login')
        } else {

            if (!store().isGetterRouter) {
                router.removeRoute('mainbox')// 防止子路由重复

                ConfigRouter()
                next({// 第一次权限认证后重定向
                    path: to.fullPath
                })
            } else {
                next()
            }

        }
    }

})

export default router