<template>
	<div>
		<header>
			<router-link to="/list">
				LIST
			</router-link>
		</header>
		<div class="main">
			<h1 class="title">{{ article.title }}</h1>
			<h3 class="date">
				{{ article.time }}
				<el-tag>
					{{ article.tag }}
				</el-tag>
			</h3>
			<mavon-editor 
				ref="md" 
				v-model="article.content" 
				:toolbarsFlag="toolbarsFlag"
				:subfield="subfield"
				:boxShadow="boxShadow"
				:defaultOpen="defaultOpen">
			</mavon-editor> 
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				/* 文章仅仅展示 */
				boxShadow: false,
				toolbarsFlag: false, 
				subfield: false, 
				defaultOpen: "preview",
				/* 文章内容 */
				article:{
				},
			}
		},
		created(){
			/* 获取文章详情 */
			let url = "/api/article/fetchOne";
			let id = this.$route.params.id;
			this.$axios.get(url,{
				params:{
					article_id: id,
				}
			}).then((res) => {
				let data = res.data;
				if (data.code == 200) {
					this.article = data.article;
					this.article.title = data.article[0].article_name;
					this.article.content = data.article[0].article_content;
					this.article.time = data.article[0].article_time;
					this.article.tag = data.article[0].article_type;
				}else{
					this.$message({
						tyep: 'error',
						message: content.msg,
					})
				}
			}).catch((err) => {
				console.log(err);
			})
		}
	}
</script>

<style scoped>
	header{
		margin: 10px auto 15px;
		text-align: center;
		letter-spacing: 5px;
	}
	.main{
		position: relative;
		max-width: 800px;
		margin: 50px auto;
		padding: 0 30px 50px;
	}
	.date{
		font-size: 13px;
		color: #999;
		margin: 0 0 30px;
		letter-spacing: 1px;
	}
	.title{
		font-size: 32px;
		margin: 0 0 10px;
		letter-spacing: 1px;
		text-align: center;
	}
	.markdown-body{
		border: none;
		background-color: #fff;
	}
	a:hover{
	    color: #f33;
		text-decoration: none;
	}
</style>