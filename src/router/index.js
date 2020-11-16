import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		redirect:'/home'
	},
	//登陆界面
	{
		path:'/login',
		component: () => import('@/views/Login/Login')
	},
	//一级路由
	{
		path:'/home',
		component: () => import('@/views/Home/Home'),
		children:[
			{
				path:'/home',
				redirect: '/home/index'
			},
			//home里的首页
			{
				path:'index',
				component: () => import('@/views/Index/Index')
			},
			//home里的菜单管理
			{
				path:'menu',
				component: () => import('@/views/Menu/Menu')
			},
			{
				path:'menu/add',
				component: () => import('@/views/Menu/Menuadd')
			},
			{
				path:'menu/edit',
				component: () => import('@/views/Menu/Menuadd')
			},
			//home里的角色管理
			{
				path:'role',
				component: () => import('@/views/Role/Role')
			},
			{
				path:'role/add',
				component: () => import('@/views/Role/Roleadd')
			},
			{
				path:'role/edit',
				component: () => import('@/views/Role/Roleadd')
			},
			//home里的管理员管理
			{
				path:'user',
				component: () => import('@/views/User/User')
			},
			{
				path:'user/add',
				component: () => import('@/views/User/Useradd')
			},
			{
				path:'user/edit',
				component: () => import('@/views/User/Useradd')
			},
			//home里的商品分裂
			{
				path:'category',
				component: () => import('@/views/Category/Category')
			},
			{
				path:'category/add',
				component: () => import('@/views/Category/Categoryadd')
			},
			{
				path:'category/edit',
				component: () => import('@/views/Category/Categoryadd')
			},
			//home里的商品规格
			{
				path:'specs',
				component: () => import('@/views/Specs/Specs')
			},
			{
				path:'specs/add',
				component: () => import('@/views/Specs/Specsadd')
			},
			{
				path:'specs/edit',
				component: () => import('@/views/Specs/Specsadd')
			},
			//home里的商品管理
			{
				path:'goods',
				component: () => import('@/views/Goods/Goods')
			},
			{
				path:'goods/add',
				component: () => import('@/views/Goods/Goodsadd')
			},
			{
				path:'goods/edit',
				component: () => import('@/views/Goods/Goodsadd')
			},
			//home里的轮播图管理
			{
				path:'banner',
				component: () => import('@/views/Banner/Banner')
			},
			{
				path:'banner/add',
				component: () => import('@/views/Banner/Banneradd')
			},
			{
				path:'banner/edit',
				component: () => import('@/views/Banner/Banneradd')
			}
		]
	}
]

const router = new VueRouter({
  routes
})

export default router
