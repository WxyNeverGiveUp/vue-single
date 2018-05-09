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
            style="width: 100%">
            <el-table-column
                type="index"
                :index="typeIndex"
                label="序号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="user_id"
                label="数据库内序号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="level"
                label="账号身份"
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
	                        @click="toUpdate(scope.row.username)">修改
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
        :page-size='paginationData.pageSize'
        :current-page='paginationData.currentPage'
        :total="paginationData.total"
        @current-change="handleCurrentChange">
      </el-pagination>
      <!-- dialog -->
      <el-dialog title="修改账户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="form.psw" auto-complete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" :label-width="formLabelWidth">
            <el-input v-model="form.tpsw" auto-complete="off" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </el-dialog>
            
	</div>
</template>

<script>
    export default {
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
                /*dialog*/
                dialogFormVisible: false,
                /* form 的内容*/
                form: {
                    psw: '',
                    username: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
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
        	        this.paginationData.infoList = data.body.list;
        	        this.paginationData.total = data.body.list.length;
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
                this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    /*删除操作*/
                    var url = "api/user/list/delOne";
                    this.$http.post(url,{
                        userId: id
                    },{}).then(function(data){
                        console.log(data.body);
                        if(data.body.code == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.paginationData.tableData.splice(this.paginationData.tableData.findIndex((tableData) => tableData.user_id === id),1)
                        }
                    },function(res){
                        console.log(res);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        		
        	},
            // 点击修改窗口
            toUpdate: function(username){
                this.dialogFormVisible = true; // dialog可见
                this.form.username = username; // 传值
            },
            update: function(){
                var url = "api/user/list/update";
                var update_psw = this.form.psw;
                var update_tpsw = this.form.tpsw;
                if(update_psw != update_tpsw){
                    this.form.psw = "";
                    this.form.tpsw = "";
                    this.$message({
                        type: 'error',
                        message: '两次密码不一致'
                    });
                }
                else{
                    this.$http.post(url,{
                        userpsw: this.form.psw,
                        username: this.form.username,
                    },{}).then(function(data){
                        this.dialogFormVisible = false
                        if(data.body.code == 200){
                            console.log(data.body.msg);
                            // 更新密码的数据
                            let index = this.paginationData.tableData.findIndex((tableData) => tableData.username === this.form.username);
                            this.paginationData.tableData[index].userpassword = this.form.psw;
                        }
                        console.log(data);
                    },function(res){
                        console.log(res);
                    })
                }
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
        computed: {
            user(){
                 //因为在main.js中已经全局注册了store，所以这里直接用this.$直接使用。
                return this.$store.state.user
            }
        },
    }
</script>

<style>
	
</style>