<template>
	<div>
		<template>
			<el-table
			    class="my-table"
			    v-loading="load"
			    :data="paginationData.tableData"
			    :cell-style="cellStyle"
			    border
			    stripe
			    :show-overflow-tooltip="true"
			    style="width: 100%">
			        <el-table-column
			            type="index"
			            :index="typeIndex"
			            width="180"
			            label="序号">
			        </el-table-column>
			        <el-table-column
			            prop="article_name"
			            label="文章标题"
			            width="180">
			        </el-table-column>
			        <el-table-column
			            prop="article_type"
			            label="文章分类">
			        </el-table-column>
			        <el-table-column
			            prop="article_time"
			            label="发布时间"
			            width="180">
			        </el-table-column>
			        <el-table-column
			            prop="article_up"
			            label="是否置顶">
			        </el-table-column>
			        <el-table-column
			            label="操作"
			            width="300">
			            <template scope="scope">
			            	<el-button
								type="success"
			            		@click="upOne(scope.$index,scope.row.article_id,scope.row)">
			            		置顶/取消置顶
			            	</el-button>
			                <el-button
			                    type="primary"
			                    @click="toUpdate(scope.row.article_id)">修改
			                </el-button>
			                <el-button
			                    type="danger"
			                    @click="delOne(scope.row.article_id)">删除
			                </el-button>
			            </template>
			        </el-table-column>
			</el-table>  
		</template>  
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
				/*table参数*/
				cellStyle: {
					textAlign: 'left'
				},
				/* 分页的数据 */
				paginationData: {
				    tableData: [], // 总数据
				    infoList: [], // 每一页封装的数据
				    total: 0, // 总页数
				    pageSize: 10, // 每页展示的数量
				    currentPage: 1, // 当前页
				},
				load: false,
			}
		},
		methods: {
				toUpdate: function(id){
					// 保存是哪篇文章
					this.$store.commit('chooseArticle',id);
					this.$router.push({
						path: './edit',
					})
				},
				delOne: function(id){
					this.$confirm("此操作将永久删除此文章，是否继续?", "提示", {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					}).then(() => {
						let url= "/api/article/delOne";
						this.$axios.post(url,{
							article_id: id,
						}).then((res)=>{
							let data = res.data;
							if(data.code == 200){
								this.$message({
									type: 'success',
									message: '删除成功'
								})
								this.paginationData.tableData.splice(this.paginationData.tableData.findIndex((tableData) => tableData.article_id === id),1)
							}
						}).catch((err)=>{
							console.log(err);
						})
					}).catch(() => {
	                    this.$message({
	                        type: 'info',
	                        message: '已取消删除'
	                    });          
                	});
				},
				/*置顶文章或取消置顶*/
				upOne: function(index,id,row){
					let url = "/api/article/upOne";
					let up = 1;
					let newContent = "置顶";
					if(row.article_up == "置顶"){
						up = 0;
						newContent = "未置顶"
					}
					this.$axios.post(url,{
						article_id: id,
						article_up: up
					}).then((res)=>{
						let data = res.data;
						if(data.code == 200){
							this.paginationData.tableData[index].article_up = newContent; // 更改dom 信息
							this.$message({
								type: 'success',
								message: data.msg
							})
						}
					}).catch((err)=>{
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
		},
		mounted(){
        	this.load = true;
			let url = "/api//article/fetch/";
			this.$axios.get(url,{
			}).then((res) => {
				let data = res.data;
				if (data.code == 200) {
				    this.paginationData.infoList = data.articleList;
				    this.paginationData.total = data.articleList.length;
				    this.load = false;
				    this.computerArr();
				}else{
				    alert(content.msg);
				}
			}).catch((err) => {
				console.log(err);
			})
		},
	}
</script>