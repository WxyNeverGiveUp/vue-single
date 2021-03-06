// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import store from './store.js';
import ElementUI from 'element-ui';
import './assets/css/base/reset.css';
/* 引入axios */
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'element-ui/lib/theme-chalk/index.css';
/* 引入markdown编辑器 */
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
/* 引入第三方字体库*/
import './assets/font/font-awesome/css/font-awesome.min.css';
/* 使用vue2.0配对的ElementUI */
Vue.use(ElementUI, { size: 'small' });
/* 使用vue-resource做http请求 */
Vue.use(VueResource);
/* 使用markdown编辑器*/
Vue.use(mavonEditor);

Vue.config.productionTip = false
Vue.prototype.$axios = axios


// 全局导航钩子
router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        // 通过vuex state获取当前的token是否存在
        // console.log(isEmptyObject(store.state.user)) 
        if(!isEmptyObject(store.state.user)) {   
            next();
        }
        else { 
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})


function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 注册全局 store
  components: { App },
  template: '<App/>'
})