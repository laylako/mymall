import Vue from 'vue'
import VueRouter from "vue-router";

const Home = () => import("views/home/Home")
const Category = () => import("views/category/Category")
const Cart = () => import("views/cart/Cart")
const Profile = () => import("views/profile/Profile")

// 1. 安装插件（在组件中挂载 $router 属性）（执行插件的 install 方法）
Vue.use(VueRouter)

// 映射关系：url路径和组件的映射
const routes=[
    {
        path: '',
        redirect: '/home'
    },
    {
        path:'/home',
        component: Home
    },
    {
        path:'/category',
        component: Category
    },
    {
        path:'/cart',
        component: Cart
    },
    {
        path:'/profile',
        component: Profile
    }
]

// 2. 创建 VueRouter 对象
const router=new VueRouter({
    routes,
    mode: 'history'
})

// 3. 将 router 对象传入到 vue 实例中（所以要导出，然后在 main.js 里使用）
export default router