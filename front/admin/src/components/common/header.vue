<template>
	<el-header>
		<section v-show="user">
        <!-- 这里的user是从下面JavaScript的computed的user()方法中得到的。 -->
            <p>欢迎你, {{ user }}</p>
        </section>
	</el-header>
</template>

<script>
	export default {
		computed: {
		    user(){
		         //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
		        return this.$store.state.user
		    }
		}
	}
</script>