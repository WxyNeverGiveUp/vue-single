import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index' // 索引页
import list from '@/components/list' // 列表页
import detail from '@/components/detail' // 详情页

Vue.use(Router)

export default new Router({
  	routes: [
    	{
    		path: '/',
	    	name: 'index',
            component: index,
    	},
    	{
    		path: '/list',
	    	name: 'list',
            component: list,
    	},
        {
            path: '/detail/:id',
            name: 'detail',
            component: detail,
        }
  	]
})
