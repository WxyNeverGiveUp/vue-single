<template>  
    <div class="login">
        <el-form ref="form" label-width="80px" label-position="top" id="login_in" :class="{ 'hide': !isHide }">
            <h1>系统登录</h1>
            <el-form-item>
                <el-input v-model="loginData.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="loginData.userpsw" placeholder="密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit_login">立即登录</el-button>
                <el-button @click="regbtn">注册账号</el-button>
            </el-form-item>
        </el-form>
        <el-form ref="form" label-position="top" id="register" :class="{ 'hide': isHide }">
            <h1>账号注册</h1>
            <el-form-item>
                <el-input v-model="regData.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="regData.psw" placeholder="密码" type="password" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="regData.tpsw" placeholder="重复密码" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit_req">立即注册</el-button>
                <el-button @click="loginbtn">返回登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script type="text/javascript">
export default{
    data() {
        return{
            loginData: {
            },
            regData: {      
            },
            fetchData:{
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
        submit_login: function(){
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
                    alert(content.msg);
                }
            },function(response){
                console.log(response);
            })
        },
        submit_req: function(){
            var reg_name =  this.regData.username;
            var reg_psw = this.regData.psw;
            if(reg_psw !== this.regData.tpsw){
                this.$message({
                    type: 'error',
                    message: '两次密码不一致'
                });
                this.regData.username = "";
                this.regData.psw = "";
                this.regData.tpsw = "";
            }else{
                var url="/api/addAdmin";
                this.$http.post(url,{
                    username: this.regData.username,
                    userpsw: this.regData.psw
                },{}).then(function(data){
                    console.log("注册请求成功！ ",data.body);
                    console.log(data.body);
                    if (data.body) {
                        this.$message({
                            type: 'success',
                            message: '注册成功'
                        });
                        this.loginbtn()
                    }
                },function(response){
                    console.log(response);
                })
            }
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
    .sub_btn{
        cursor: pointer;
        background: none;
        color: #E23A6E;
    }
    .sub_btn:hover{
        background: #E23A6E;
        color: #FFFFFF;
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
        margin: 0 auto;
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>