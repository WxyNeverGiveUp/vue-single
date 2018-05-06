<template>
	<div>
		<Header></Header>
        <el-container>
            <Sidebar></Sidebar>
            <el-main>
                <template>
                    <el-table
                    	class="my-table"
						v-loading="load"
                      	:data="tableData"
                      	:cell-style="cellStyle"
                      	border
                      	stripe
                      	style="width: 100%">
                      	<el-table-column
                        	prop="user_id"
                        	label="序号"
                        	width="180">
                      	</el-table-column>
                      	<el-table-column
                        	prop="username"
                        	label="账号"
                        	width="180">
                      	</el-table-column>
                      	<el-table-column
                        	prop="userpassword"
                        	label="密码">
                      	</el-table-column>
                      		<el-table-column
                      	  	label="操作">
                      	  	<template scope="scope">
				                    <el-button
				                    	type="primary"
				                        @click="">修改
				                    </el-button>
				                    <el-button
				                        type="danger"
				                        @click="delOne(scope.row.user_id)">删除
				                    </el-button>
                				</template>
                      		</el-table-column>
                    </el-table>
                  </template>
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size='pageSize'
                    :current-page='currentPage'
                    :total="total"
                    @current-change="handleCurrentChange">
                  </el-pagination>
            </el-main>
        </el-container>
        <Footer></Footer>
	</div>
</template>

<script>
    import Header from '../../common/header.vue';
    import Sidebar from '../../common/sidebar.vue';
	import Footer from '../../common/footer.vue';

    export default {
    	data(){
    		return {
    			tableData: [], // 总数据
    			infoList: [], // 每一页封装的数据
    			total: 0, // 总页数
    			pageSize: 3, // 每页展示的数量
    			currentPage: 1, // 当前页
    			/*table样式*/
    			cellStyle: {
    				textAlign: 'left'
    			},
    			load: false,
    		}
    	},
        created(){
        	this.load = true;

        	var url="/api/user/list/fetchData";
        	this.$http.post(url,{
        	},{}).then(function(data){
        	    console.log("请求成功！ ",data.body);
        	    var content = data.body;
        	    console.log(data);
        	    if (content.code == 200) {
        	        // this.tableData = data.body.list;
        	        this.infoList = data.body.list;
        	        this.total = data.body.list.length;
        	        this.load = false;
        	        this.computerArr();
        	    }else{
        	        alert(content.msg);
        	    }
        	},function(res){
        	    console.log(res);
        	})     	    
        },
        methods: {
        	delOne: function(id){
        		var url = "api/user/list/delOne";
        		this.$http.post(url,{
        			userId: id
        		},{}).then(function(data){
        			console.log(data.body);
        			if(data.body.code == 200){
        				alert('删除成功');
        				this.tableData.splice(this.tableData.findIndex((tableData) => tableData.user_id === id),1)
        			}
        		},function(res){
        			console.log(res);
        		})
        	},
        	// 计算分页
        	computerArr: function(){
        		// 页数，如果有小数，只取整数
        		let pageNum = Number(String(this.total / this.pageSize).split('.')[0]);
        		// 定义一个空数组
        		let newArr = [];
        		// 遍历获取的数据，每次遍历的数组的0位置开始截取，截取的数量为每页显示的数量
        		for(let i=0;i<pageNum;i++){
        			newArr.push(this.infoList.splice(0, this.pageSize));
        		}
        		// 判断剩余的数据有没有小于每一页的数量，如果小于，就把剩下的数据放入newArr数组中去
        		if(this.infoList.length < this.pageSize){
        			newArr.push(this.infoList.splice(0,this.infoList.length))
        		}
        		// 将新的数组赋给infoList，用来渲染页面页面
        		this.infoList = newArr;
        		console.log(newArr);
        		// 第一次进入页面显示this.infoList[]数组的第一个元素
        		this.tableData = this.infoList[0];
        	},
        	handleCurrentChange: function(currentPage){
        		// currentPage为当前的页数
        		// 显示当前页数对应的数据
        		this.tableData = this.infoList[currentPage - 1];
        	},
        },
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
	/*.cell{
		text-align: center;
	}*/
</style>