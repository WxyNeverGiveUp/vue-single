<template>
	<div>
		<Header></Header>
        <el-container>
            <Sidebar></Sidebar>
            <el-main>
                这是添加页面
            </el-main>
        </el-container>
        <Footer></Footer>
	</div>
</template>

<script>
	import Header from '../../common/header.vue';
	import Sidebar from '../../common/sidebar.vue';
	import Footer from '../../common/footer.vue';
	export default{
		components: {
			Header,
			   Sidebar,
			   Footer,
		},
	}
</script>

<style>
	
</style>