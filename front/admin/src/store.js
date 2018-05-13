/* 使用vuex做状态管理 */

import Vue from 'vue'
import Vuex from 'vuex'
/* 持久化状态存储 */
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		isLogin: 0,
		user: '',
		article: '', 
	},
	actions:{

	},
	mutations:{
		changeLogin(state,data){
		  	state.isLogin = data;
		},
		changeUser(state, data){
		  	state.user = data.username;
		},
		chooseArticle(state, data){
		  	state.article = data;
		},
	},
	// 状态持久化插件
	plugins: [createPersistedState()]
})
