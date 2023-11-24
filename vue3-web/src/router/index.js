import { createRouter, createWebHashHistory } from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/news',
        name: 'news',
        component: () => import('../views/News.vue')
    },
    {
        path: '/news/:id',
        name: 'new',
        component: () => import('../views/New.vue')
    },
    {
        path: '/product',
        name: 'product',
        component: () => import('../views/Product.vue')
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


router.beforeEach((to, from, next) => {
    Nprogress.start() // 开启进度条
    next()
})

router.afterEach((to, from, next) => {
    Nprogress.done() // 结束进度条
})

export default router