import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login' // 登录页面
import index from '@/components/page/index' // 后台管理页面
import welcome from '@/components/page/welcome' // 欢迎页面
import userList from '@/components/page/user/list' // 用户列表
import userAdd from '@/components/page/user/add'  // 用户添加
import articleAdd from '@/components/page/article/add' // 文章添加
import articleList from '@/components/page/article/list' // 文章列表
import articleEdit from '@/components/page/article/edit' // 修改文章
import sortList from '@/components/page/sort/list' // 栏目列表
import sortAdd from '@/components/page/sort/add' // 添加栏目

Vue.use(Router)

export default new Router({
  routes: [
    {
	    path: '/',
	    name: 'login',
	    component: login
    },
    {
    	path: '/index',
        redirect: '/index/welcome',
	    name: 'index',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,  
        },
	    component: index,
        children: [
            {
                //欢迎页面
                path: '/index/welcome',
                component: welcome,
            },
            {
                // 用户列表
                path: '/index/user/list',
                component: userList,
            },
            {
                // 用户添加
                path: '/index/user/add',
                component: userAdd,
            },
            {
                // 文章添加
                path: '/index/article/add',
                component: articleAdd,
            },
            {
                // 文章列表
                path: '/index/article/list',
                component: articleList,
            },
            {
                // 文章列表
                path: '/index/article/edit',
                component: articleEdit,
            },
            {
                // 栏目列表
                path: '/index/sort/list',
                component: sortList,
            },
            {
                // 添加栏目
                path: '/index/sort/add',
                component: sortAdd,
            }
        ]
    },
  ]
})
