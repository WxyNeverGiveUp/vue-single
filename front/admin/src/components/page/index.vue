<template>
    <div>
        <Header></Header>
        <el-container>
            <el-aside>
                <el-menu :default-openeds="openeds">
                    <el-submenu index="1">
                        <template slot="title">账号管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link :to="/index/user/list">账号列表</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link :to="/index/user/add">添加账号</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                    <template slot="title">文章管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">
                                <router-link :to="/index/article/list">文章列表</router-link>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <router-link :to="/index/article/add">添加文章</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">栏目管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">
                                <router-link :to="/index/sort/list">栏目列表</router-link>
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                <router-link :to="/index/sort/add">添加栏目</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">评论管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">
                                <router-link :to="/index/comment/list">评论列表</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
            <Footer></Footer>
        </el-container>
    </div>
</template>

<script>
    import Header from '../common/header.vue';
	import Footer from '../common/footer.vue';

    export default {
        data(){
            return {
                openeds: [],
            }
        },
        computed: {
            user(){
                //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
                return this.$store.state.user
            }
        },
        components: {
        	Header,
            Footer,
        },
    }
</script>

<style>
    .el-main{
        min-height: 600px;
    }
    .el-container{
        display: block;
        margin-left: 300px;
        background: #ecf0f5;
    }
    .el-aside{
        position: absolute;
        top: 60px;
        bottom: 0px;
        left: 0px;
        width: 240px;
        border: 1px solid #ccc;
    }
</style>