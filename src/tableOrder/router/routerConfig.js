const routers = [
    {
        path: '/401',
        name: 'error_401',
        meta: { title: '401' },
        component: (resolve) => require(['../../comm/components/error_page/401.vue'], resolve)
    },
    {
        path: '/',
        meta: { title: '初期设定', showArrow: false },
        component: (resolve) => require(['../views/index.vue'], resolve),
    },
    {
        path: '/selectNum',
        name: 'selectNum',
        meta: { showArrow: false },
        component: (resolve) => require(['../views/selectNum.vue'], resolve),
    },
    {
        path: '/menu',
        name: 'menu',
        meta: { showArrow: true },
        component: (resolve) => require(['../views/menu.vue'], resolve),
    },
]
export default routers
