<template>
		<el-form
			ref="article"
			:model="article"
			:rules="rules"
			:show-message="false"
		>
			<el-form-item prop="title" size="medium" class="title">
				<el-input v-model="article.title" placeholder="请输入文章标题"></el-input>
				<el-button type="primary" round @click="dialogFormVisible = true">发布博客</el-button>
			</el-form-item prop="content">
			<el-form-item prop="content" class="content">
	        	<mavon-editor ref="md" v-model="article.content" @imgAdd="$imgAdd"></mavon-editor>    
			</el-form-item>
			<el-dialog title="发布博客" :visible.sync="dialogFormVisible">
			    <el-form-item label="文章分类" prop="name">
			      	<el-select v-model="name" placeholder="请选择">
			      	   	<el-option
			      	     	v-for="item in options"
			      	     	:key="item.id"
			      	     	:label="item.name"
			      	     	:value="item.name">
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
				},
				options:[ // 博客分类
				],
				name:'', // 使用新值，因为默认传值，否则不能正常显示
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
		    	var url = "/api/article/edit";
		    	this.$refs[formName].validate((valid) => {
		    	    if (valid) {
		    	        this.$axios.post(url,{
		    	        	article_name: this.article.title,
		    	        	article_content: this.article.content,
		    	        	article_type: this.name,
		    	        	article_id: this.articleId, // 从vuex里拿出的文章id
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
			/*获取文章分类选项*/
			let url = "/api/article/typeFetch";
			this.$axios.get(url,{
			}).then((res) => {
				let data = res.data;
				if(res.status == 200){
					console.log(data.list);
					this.options = data.list;
				}
			}).catch((err) => {
				console.log(err);
			})

			/*获取文章详情*/
			let url2 = "/api/article/fetchOne";
			let article_id = this.articleId;
			this.$axios.get(url2,{
				params:{
					article_id: article_id,
				}
			}).then((res) => {
				let data = res.data;
				if(data.code == 200){
					this.article.title = data.article[0].article_name;
					this.article.content = data.article[0].article_content;
					this.name = data.article[0].article_type;
				}
			}).catch((err) => {
				console.log(err);
			})
		},
		computed: {
		    user(){
		         //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
		        return this.$store.state.user
		    },
		    articleId(){
		        return this.$store.state.article
		    },
		},
	}
</script>

<style scoped>
	.title .el-input{
		width: 85%;
	}
	.title .el-button{
		width: 10%;
	}
	.markdown-body{
		min-height: 500px
	}
</style>