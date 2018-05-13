<template>
	<el-header class="clearfix">
		<div class="logo">
			wuxy720-BLOG
		</div>
        <!-- 这里的user是从下面JavaScript的computed的user()方法中得到的。 -->
        <div class="header-menu">
        	欢迎你, <span class="user">{{ user }}</span>
        	<el-button
        		type="danger"
        		@click="logout"
        		round
        	>退出登录</el-button>
        </div>
	</el-header>
</template>

<script>
	export default {
		computed: {
		    user(){
		         //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
		        return this.$store.state.user
		    }
		},
		methods: {
			logout: function(){
				this.$store.commit('changeLogin',0);
				this.$store.commit('changeUser',"");
				this.$router.push({ 
				    path: '/' 
				});
			}
		}
	}
</script>

<style>
	.el-header{
		padding-right: 15px;
		background-color: #3c8dbc;
		color: #fff;
	}
	.header-menu{
		float: right;
		height: 60px;
		line-height: 60px;
	}
	.logo{
		display: inline-block;
		width: 200px;
		font-size: 20px;
		line-height: 60px;
		text-align: center;
	}
	.user{
		font-weight: 700;
		margin-right: 15px;
	}
	
</style>