const routers = [
    {
        path: '/home',
        component: () => import('../views/home/Home.vue')
    },
    {
        path: '/center',
        component: () => import('../views/center/Center.vue')
    },
    {
        path: '/user-manage/useradd',
        component: () => import('../views/user-manage/UserAdd.vue'),
        requireAdmin: true
    },
    {
        path: '/user-manage/userlist',
        component: () => import('../views/user-manage/UserList.vue'),
        requireAdmin: true
    },
    {
        path: '/news-manage/newadd',
        component: () => import('../views/news-manage/NewsAdd.vue')
    },
    {
        path: '/news-manage/newlist',
        component: () => import('../views/news-manage/NewsList.vue')
    },
    {
        path:'/news-manage/newsedit/:id',
        name:'newsedit',
        component: () => import('../views/news-manage/NewsEdit.vue')
    },
    {
        path: '/product-manage/productadd',
        component: () => import('../views/product-manage/ProductAdd.vue')
    },
    {
        path: '/product-manage/productlist',
        component: () => import('../views/product-manage/ProductList.vue')
    },
    {
        path: '/product-manage/productedit/:id',
        component: () => import('../views/product-manage/ProductEdit.vue')
    },
]


export default routers