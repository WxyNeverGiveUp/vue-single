<template>
    <div>
        <Header></Header>
        <el-container>
            <Sidebar></Sidebar>
            <el-main>
                欢迎来到wuxy720后台管理系统
            </el-main>
        </el-container>
        <Footer></Footer>
    </div>
    
</template>

<script>
    import Header from '../common/header.vue';
    import Sidebar from '../common/sidebar.vue';
	import Footer from '../common/footer.vue';

    export default {
        computed: {
            user(){
                 //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
                return this.$store.state.user
            }
        },
        components: {
        	Header,
            Sidebar,
            Footer,
        },
    }
</script>

<style>

</style>