import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/page/index'
import userList from '@/components/page/user/list'

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
	    name: 'index',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,  
        },
	    component: index,
    },
    {
        path: '/user/list',
        name: 'userList',
        component: userList,
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,  
        },
    }
  ]
})
