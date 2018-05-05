<template>  
    <!-- <div class="Login">
        <a href="javascript:void(0)" v-on:click = "loginbtn">登 &nbsp;  &nbsp;   录&nbsp;&nbsp;</a>
        <a href="javascript:void(0)" v-on:click = "regbtn">|&nbsp;&nbsp;注册新用户</a>
        <form @submit.prevent="submit_login" method="post" id="login_in">
            <input type="text" name="" value="" placeholder="请输入用户名" v-model="loginData.username"/><label for=""></label>
            <input type="password" name="" placeholder="请输入密码" v-model="loginData.psw"/>
            <input type="submit" class="sub_btn" value="登    录"/>
        </form>
        <form @submit.prevent="submit_req" method="post" id="login_registered">
            <input type="text" name="" id="" value="" placeholder="用户名" v-model="regData.username"/><label for=""></label>
            <input type="password" name="" placeholder="密码" v-model="regData.psw"/>
            <input type="password" name="" placeholder="确认密码" v-model="regData.tpsw"/>
            <input type="submit" class="sub_btn" value="立即注册"/>
        </form>
        <el-row :gutter="20">
            <el-col :span="16">
                <div class="grid-content bg-purple" @click="fetch_data">
                    点击触发 查询
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                      <ul>
                        <li v-for="(item,index) in fetchData">
                          <div>{{item.username}}</div>
                        </li>
                      </ul>
                </div>
            </el-col>
        </el-row>
        <router-link to="/index" class="btn">
            <el-button>登录</el-button>
        </router-link>
    </div> -->
    <div class="login">
        <el-form ref="form" label-width="80px" label-position="top" id="login_in">
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
        <el-form ref="form" label-width="80px" label-position="top" id="register">
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
        } 
    },
    methods: {
        loginbtn: function(){
            document.getElementById("login_in").style.display="block";
            document.getElementById("register").style.display="none";
        },
        regbtn: function(){
            document.getElementById("login_in").style.display="none";
            document.getElementById("register").style.display="block";
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
                userpsw: this.loginData.psw
            },{}).then(function(data){
                console.log("请求成功！ ",data.body);
                var content=data.body;
                if (content.length != 0) {
                    alert("登录成功！");
                    this.$store.commit('changeLogin',data.body[0]);
                    this.$store.commit('changeUser',{
                        username: this.loginData.username
                    });
                    this.$router.push(
                        { path: 'index' }
                    )
                }else{
                    alert("账户密码错误！");
                }
            },function(response){
                console.log(response);
            })
        },
        submit_req: function(){
            var reg_name =  this.regData.username;
            var reg_psw = this.regData.psw;
            if(reg_psw !== this.regData.tpsw){
                alert("两次输入密码不正确！");
                this.regData.username = "";
                this.regData.psw = "";
                this.regData.tpsw = "";
            }else{
                var url="/api/addUser";
                this.$http.post(url,{
                    username: this.regData.username,
                    userpsw: this.regData.psw
                },{}).then(function(data){
                    console.log("注册请求成功！ ",data.body);
                    if (data.body.affectedRows > 0) {
                        document.getElementById("login_in").style.display="block";
                        document.getElementById("register").style.display="block";
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
    #register{
        display: none;
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