<template>
	<div>
		<header>
			<router-link to="/">
				WUXY720
			</router-link>
		</header>
		<div class="tag-list">
			<ul>
				<li @click="articleAllFetch">
					<el-tag type="success">
						全部
					</el-tag>
				</li>
				<li v-for="item in tagList">
					<el-tag>
						{{ item.name }}
					</el-tag>
				</li>
			</ul>
		</div>
		<div class="main">
			<ul>
				<li v-for="item in paginationData.tableData" >
					<span class="time">{{ item.article_time }}</span>
					<el-tag class="tag">{{ item.article_type }}</el-tag>
					<router-link :to="{ name:'detail', params:{ id: item.article_id }}">{{ item.article_name }}</router-link>
					<!-- <h2 @click="findDetail">{{ item.article_name }}</h2> -->
				</li>
			</ul>
		</div>
		<el-pagination
			background
			layout="prev, pager, next"
			:page-size='paginationData.pageSize'
			:current-page='paginationData.currentPage'
			:total="paginationData.total"
			@current-change="handleCurrentChange">
		</el-pagination> 
	</div>
</template>

<script>
	export default{
		data(){
			return {
				/* 分页的数据 */
				paginationData: {
				    tableData: [], // 总数据
				    infoList: [], // 每一页封装的数据
				    total: 0, // 总页数
				    pageSize: 5, // 每页展示的数量
				    currentPage: 1, // 当前页
				},
				/* 标签内容 */
				tagList:[
				],
			}
		},
		mounted(){
			this.articleAllFetch();
			this.sortFetch();
		},
		methods: {
			/* 获取所有文章 */
			articleAllFetch: function(){
				/* 获取文章 */
				let url = "/api/article/fetch";
				this.$axios.get(url,{
				}).then((res) => {
					let data = res.data;
					if (data.code == 200) {
					    this.paginationData.infoList = data.articleList;
					    this.paginationData.total = data.articleList.length;
					    this.computerArr();
					}else{
						this.$message({
							tyep: 'error',
							message: content.msg,
						})
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			/* 获取文章分类 */
			sortFetch: function(){

				/* 获取标签 */
				let url = "/api/sort/fetch";
				this.$axios.get(url,{
				}).then((res) => {
					let data = res.data;
					if (data.code == 200) {
						this.tagList = data.sortList;
					}else{
						this.$message({
							tyep: 'error',
							message: content.msg,
						})
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			/*计算分页*/
			computerArr: function(){
				// 页数，如果有小数，只取整数
				let pageNum = Number(String(this.paginationData.total / this.paginationData.pageSize).split('.')[0]);
				// 定义一个空数组
				let newArr = [];
				// 遍历获取的数据，每次遍历的数组的0位置开始截取，截取的数量为每页显示的数量
				for(let i=0;i<pageNum;i++){
					newArr.push(this.paginationData.infoList.splice(0, this.paginationData.pageSize));
				}
				// 判断剩余的数据有没有小于每一页的数量，如果小于，就把剩下的数据放入newArr数组中去
				if(this.paginationData.infoList.length < this.paginationData.pageSize){
					newArr.push(this.paginationData.infoList.splice(0,this.paginationData.infoList.length))
				}
				// 将新的数组赋给infoList，用来渲染页面页面
				this.paginationData.infoList = newArr;
				console.log(newArr);
				// 第一次进入页面显示this.infoList[]数组的第一个元素
				this.paginationData.tableData = this.paginationData.infoList[0];
			},
			// 使用分页的数据
			handleCurrentChange: function(currentPage){
				// currentPage为当前的页数
				// 显示当前页数对应的数据
				this.paginationData.tableData = this.paginationData.infoList[currentPage - 1];
			    /*设置table的自动生成序号 */
			    this.paginationData.currentPage = currentPage;
			},
			/*设置table的自动生成序号*/
			typeIndex(index) {
			    return index + (this.paginationData.currentPage - 1) * this.paginationData.pageSize + 1;
			},	   
		}
	}
</script>

<style scoped>
	header{
		margin: 50px auto 15px;
		text-align: center;
		letter-spacing: 5px;
	}
	.tag-list{
		text-align: center;
	}
	.tag-list ul li{
		margin: 20px 5px 0 5px;
		display: inline-block;
	}
	.tag-list .tag{
		cursor: pointer;
	}
	.main{
		max-width: 600px;
		margin: 50px auto;
		padding: 0 30px 50px;
	}
	.main ul {
	  	list-style-type: none;
	 	padding: 0;
	  	padding-top: 4px;
	}
	.main ul li {
	  	position: relative;
	  	padding: 30px 0 30px;
	  	border-bottom: 1px solid #e6e6e6;
	}
	.main ul li:first-child {
	  	margin-top: -30px;
	}
	.main .time{
		font-size: 13px;
		color: #999;
		position: absolute;
		left: 0;
		top: 33px;
	}
	.main .tag{
		font-size: 13px;
		position: absolute;
		left: 20px;
		top: 55px;
	}
	.main a{
		font-size: 20px;
		letter-spacing: 1px;
		margin-left: 140px;
	}
	.main a:hover{
        color: #f33;
		cursor: pointer;
	}
	.el-pagination{
		text-align: center;
	}
	a:hover{
        color: #f33;
		text-decoration: none;
	}
</style>