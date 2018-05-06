<template>
	<el-aside>
		<el-menu :default-openeds="['1']">
      		<el-submenu index="1">
        		<template slot="title">账号管理</template>
        		<el-menu-item-group>
          			<el-menu-item index="1-1">
          				<router-link to="/user/list">账号列表</router-link>
          			</el-menu-item>
          			<el-menu-item index="1-2">增添账号</el-menu-item>
        		</el-menu-item-group>
      		</el-submenu>
      		<el-submenu index="2">
        	<template slot="title">文章管理</template>
        		<el-menu-item-group>
          			<el-menu-item index="2-1">文章列表</el-menu-item>
          			<el-menu-item index="2-2">新增文章</el-menu-item>
        		</el-menu-item-group>
      		</el-submenu>
      		<el-submenu index="3">
        		<template slot="title">栏目管理</template>
        		<el-menu-item-group>
          			<el-menu-item index="3-1">栏目列表</el-menu-item>
          			<el-menu-item index="3-2">选项2</el-menu-item>
        		</el-menu-item-group>
        		<el-menu-item-group title="分组2">
          			<el-menu-item index="3-3">选项3</el-menu-item>
        		</el-menu-item-group>
      		</el-submenu>
      		<el-submenu index="4">
        		<template slot="title">评论管理</template>
        		<el-menu-item-group>
          			<el-menu-item index="3-1">评论列表</el-menu-item>
        		</el-menu-item-group>
      		</el-submenu>
    	</el-menu>
	</el-aside>
</template>

<style>
	.el-aside {
	  	color: #333;
	  	text-align: center;
	  	line-height: 200px;
		background-color: rgb(238, 241, 246);
	}
	.el-menu {
		border: 1px solid #eee;
	}
</style>