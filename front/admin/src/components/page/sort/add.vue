<template>
	<el-form :model="regData" ref="regData" label-width="80px;" :rules="rules" label-position="left">
		<el-form-item label="栏目名称" prop="name">
			<el-input v-model="regData.name"></el-input>
		</el-form-item>
		<el-form-item>
		    <el-button type="primary" @click="submit_req('regData')">添加栏目</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default{
		data(){
			return{
				regData:{
				},
				rules:{
					name:[
						{required:true, message:"请输入栏目名称", trigger:"blur"}
					]
				}
			}
		},
		methods: {
			submit_req: function(formName){
				let url = "/api/sort/add"
				this.$refs[formName].validate((valid) => {
					if(valid){
						this.$axios.post(url,{
							name: this.regData.name
						}).then((res) => {
							let data = res.data;
							if(data.code == 200){
								this.$message({
									type: 'success',
									message: data.msg
								})
							}
						}).catch((err)=>{
							console.log(err);
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