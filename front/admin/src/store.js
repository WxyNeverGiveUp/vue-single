/* 使用vuex做状态管理 */

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		isLogin: 0,
		user: '',
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
	}
})
