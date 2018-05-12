<template>
	<el-form :model="regData" ref="regData" label-width="80px;" :rules="rules" label-position="left">
		<el-form-item label="账号" prop="username">
			<el-input v-model="regData.username"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="psw">
			<el-input v-model="regData.psw" type="password"></el-input>
		</el-form-item>
		<el-form-item label="重复密码" prop="tpsw">
			<el-input v-model="regData.tpsw" type="password"></el-input>
		</el-form-item>
		<el-form-item label="用户类型" prop="level">
			<el-select v-model="regData.level">
				<el-option label="游客账户" value="0"></el-option>
				<el-option label="管理员账户" value="1"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="商品图片">
            <el-upload
            	name="avatar"
                class="upload-demo"
                action="http://localhost:8080/api/article/upload"
                :file-list="regData.imgs"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
		<el-form-item>
		    <el-button type="primary" @click="submit_req('regData')">立即注册</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	
	export default{
		data(){
			var validatePass2 = (rule, value, callback) => {
			    if (value === '') {
			        callback(new Error('请再次输入密码'));
			    } else if (value !== this.regData.psw) {
			        callback(new Error('两次输入密码不一致!'));
			    } else {
			        callback();
			    }
			};
			return{
				regData:{
				},
				rules:{
					username:[
						{required:true, message:"请输入账号", trigger:"blur"}
					],
					psw:[
						{required:true, message:"请输入密码", trigger:"blur"}
					],
					tpsw:[
						{required:true, validator:validatePass2, trigger:"blur"}
					],
					level:[
						{required:true, message:"请选择用户类型", trigger:"blur"}
					],
				}
			}
		},
		methods: {
			submit_req: function(formName){
				var url = "/api/user/addUser"
				this.$refs[formName].validate((valid) => {
					if(valid){
						this.$http.post(url,{
							username: this.regData.username,
							userpsw: this.regData.osw,
							level: this.regData.level,
						},{}).then(function(data){
							var content = data.body;
							if(content.code == 200){
								this.$message({
									type: 'success',
									message: content.msg
								})
							}else{
								this.$message({
									type: 'error',
									message: content.msg
								})
							}
						},function(res){
							console.log(res);
						})
					}
				})
			},
		},
	}
</script>

<style scoped>
	.el-form{
		width: 550px;
		margin: 0 auto;
		padding: 35px 35px 15px;
		border: 1px solid #eaeaea;
		border-radius: 6px;
		box-shadow: 0 0 25px #cac6c6;
		background: #fff;
	}
</style>