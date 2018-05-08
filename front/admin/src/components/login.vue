<template>  
    <div class="login">
        <el-form 
            ref="loginData" 
            :class="{'hide': !isHide}" 
            :rules="loginRules" 
            :model="loginData">
            <h1>系统登录</h1>
            <el-form-item prop="username">
                <el-input v-model="loginData.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="userpsw">
                <el-input v-model="loginData.userpsw" placeholder="密码" type="password" auto-complete="new-password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit_login('loginData')">立即登录</el-button>
                <el-button @click="regbtn">注册账号</el-button>
            </el-form-item>
        </el-form>
        <el-form 
            ref="regData" 
            :class="{'hide': isHide}" 
            :rules="regRules" 
            :model="regData">
            <h1>账号注册</h1>
            <el-form-item prop="username">
                <el-input v-model="regData.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="psw">
                <el-input v-model="regData.psw" placeholder="密码" type="password" ></el-input>
            </el-form-item>
            <el-form-item prop="tpsw">
                <el-input v-model="regData.tpsw" placeholder="重复密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit_req('regData')">立即注册</el-button>
                <el-button @click="loginbtn">返回登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script type="text/javascript">
export default{
    data() {
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
            loginData: {
            },
            regData: {      
            },
            fetchData:{
            },
            /* 登录的验证，要与loginData中的属性值对应 */
            loginRules:{
                username: [
                    { required:true, message:'请输入用户名', trigger: 'blur'}
                ],
                userpsw: [
                    { required:true, message:'请输入密码', trigger: 'blur'}
                ],
            },
            /* 注册的验证，要与regData中的属性值对应 */
            regRules: {
                username: [
                    { required:true, message:'请输入用户名', trigger: 'blur'}
                ],
                psw: [
                    { required:true, message:'请输入密码', trigger: 'blur'}
                ],
                tpsw: [
                    { validator:validatePass2, trigger: 'blur'}
                ]
            },
            isHide: true
        } 
    },
    methods: {
        loginbtn: function(){
            this.isHide = true
        },
        regbtn: function(){
            this.isHide = false
            this.regData.username = ""
            this.regData.psw = ""
            this.regData.tpsw = ""
        },
        fetch_data: function(){
            var url = "api/fetchData";
            this.$http.post(url,{
                // 不需要参数
            },{}).then(function(data){
                console.log(data.body);
                this.fetchData = data.body;
            },function(response){
                console.log(response);
            })
        },
        submit_login: function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.loginData);
                    var url="/api/login";
                    this.$http.post(url,{
                        username: this.loginData.username,
                        userpsw: this.loginData.userpsw
                    },{}).then(function(data){
                        console.log("请求成功！ ",data.body);
                        var content = data.body;
                        console.log(data.body);
                        console.log(data);
                        if (content.code == 200) {
                            if(this.loginData.userpsw != content.psw){
                                console.log(this.loginData.userpsw);
                                this.$message({
                                    type: 'error',
                                    message: '密码错误'
                                });
                            }
                            else if(content.level != 1){
                                this.$message({
                                    type: 'error',
                                    message: '该账户身份为游客，无法登陆管理系统'
                                });
                            }
                            else{
                                this.$store.commit('changeLogin',data.body[0]);
                                this.$store.commit('changeUser',{
                                    username: this.loginData.username
                                });
                                this.$router.push({ 
                                    path: 'index' 
                                });
                            }
                        }else{
                            this.$message({
                                type: 'error',
                                message: '操作失败'
                            });
                        }
                    },function(response){
                        console.log(response);
                    })
                } 
                else{
                    console.log('error submit!!');
                    return false;
                }
            });
            
        },
        submit_req: function(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){
                    var url="/api/addAdmin";
                    this.$http.post(url,{
                        username: this.regData.username,
                        userpsw: this.regData.psw,
                    },{}).then(function(data){
                        if (data.body.code == 200) {
                            console.log("注册请求成功！ ",data.body);
                            console.log(data.body);
                            this.$message({
                                type: 'success',
                                message: '注册成功'
                            });
                            this.loginbtn()
                        }else{
                            this.$message({
                                type: 'error',
                                message: data.body.msg
                            })
                        }
                    },function(response){
                        console.log(response);
                    })
                }
                else{
                    console.log('error submit!!');
                    return false; 
                }
            });
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
}
</script>
<style scoped>
    .login{
        padding-top: 100px;
    }
    .el-form{
        width: 350px;
        margin: 0 auto;
        padding: 35px 35px 15px;
        border: 1px solid #eaeaea;
        border-radius: 6px;
        box-shadow: 0 0 25px #cac6c6;
        background: #fff;
    }
</style>