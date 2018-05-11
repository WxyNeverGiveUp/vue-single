<template>
	<el-form
		ref="article"
		:model="article"
		:rules="rules"
		:show-message="false"
	>
		<el-form-item prop="title" size="medium">
			<el-input v-model="article.title" placeholder="请输入文章标题" ></el-input>
			<el-button type="primary" round @click="dialogFormVisible = true">发布博客</el-button>
		</el-form-item prop="content">
		<el-form-item prop="content">
        	<mavon-editor ref="md" v-model="article.content" @imgAdd="$imgAdd"></mavon-editor>    
		</el-form-item>
		<el-dialog title="发布博客" :visible.sync="dialogFormVisible">
		    <el-form-item label="文章分类" prop="type">
		      	<el-select v-model="article.type" placeholder="请选择">
		      	   	<el-option
		      	     	v-for="item in options"
		      	     	:key="item.id"
		      	     	:label="item.name"
		      	     	:value="item.id">
		      	   	</el-option>
		      	 </el-select>
		    </el-form-item>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="subArticle('article')">确定发布</el-button>
		  	</div>
		</el-dialog>
	</el-form>
</template>

<script>
	export default{
		data(){
			return{
				dialogFormVisible: false,
				article:{
				},
				rules:{
					title: [
						{required:true,}
					],
					content: [
						{required:true,}
					],
					type: [
						{required:true,}
					]
				},
				options:[ // 博客分类
				],
			}
		},
		methods: {
		    // 绑定@imgAdd event
		    $imgAdd(pos, $file){
		        // 第一步.将图片上传到服务器.
		       var formdata = new FormData();
		       formdata.append('avatar', $file);
		       this.$axios({
		           url: 'http://localhost:8080/api/article/upload',
		           method: 'post',
		           data: formdata,
		           headers: { 'Content-Type': 'multipart/form-data' },
		       }).then((res) => {
		           // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
		           // $vm.$img2Url 详情见本页末尾
		           // 将md源码中图片文件名替换为url(如![h](./0) -> ![h](http://path/to/png/some.png))
		           this.$refs.md.$img2Url(pos, res.data.url);
		       })
		    },
		    subArticle(formName){
		    	var url = "/api/article/add";
		    	this.$refs[formName].validate((valid) => {
		    	    if (valid) {
		    	        this.$axios.post(url,{
		    	        	title: this.article.title,
		    	        	content: this.article.content,
		    	        	type: this.article.type,
		    	        	up: 0, // 默认不置顶
		    	        }).then((res) => {
		    	        	var data = res.data;
		    	        	if(data.code == 200){
		    					this.dialogFormVisible = false
		    	        		this.$message({
		    	        			type: "success",
		    	        			message: data.msg + ", 并在三秒后回到列表页",
		    	        		})
		    	        	}
		    	        }).catch((err) => {
		    	        	console.log(err);
		    	        })
		    	    } else {
		    	        this.$message({
		    	        	type: "error",
		    	        	message: "请填写或选择文章内容、标题、文章分类"
		    	        })
		    	        return false;
		    	    }
		    	});
		    },
		},
		mounted(){
			let url = "/api/article/typeFetch";
			this.$axios.get(url,{
			}).then((res) => {
				let data = res.data;
				if(res.status == 200){
					this.options = data.list;
				}
			}).catch((err) => {
				console.log(err);
			})
		},
	}
</script>

<style>
	.el-input{
		width: 85%;
	}
	.el-button{
		width: 10%;
	}
</style>