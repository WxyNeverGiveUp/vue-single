let moment = require('moment'); // 格式化时间
var func = require('../sql/sqlfun'); // 封装连接池的功能
var $sql = require('../sql/sql');// sql语句
let path = require('path'); // 路径模块


// 格式化 参数
function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}

module.exports = {
    /**
     * 登录
     * @param username 用户名
     * @return psw 用户密码
               level 用户等级
    */
    login(req, res){
        var sql = $sql.user.login;    
        var params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.username],function(err,result) {
            console.log(result);
            if(!result.length){
                res.json({
                    code: 400, 
                    msg: '用户名不存在'
                });
                console.log('查询失败');
            }else{
                console.log(result);
                res.json({
                    code: 200, 
                    msg: '登录成功',
                    psw: result[0].userpassword,
                    level: result[0].level,
                });
                console.log('登录成功！');
            }
        })  
    },
    /**
     * 检查用户是否已经注册
     * @param username 用户名
     * @return 已经存在则返回，否则到下一路由
    */
    usertest(req,res,next){
        var sql = $sql.user.usertest;    
        var params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.username],function(err,result) {
            if(err){
                console.log(err);
            }
            result = formatData(result);
            console.log(result);
            if(result[0]){
                res.json({
                    code: 1,
                    msg: '此账号已经存在',
                })
            }else{
                next()
            }
        })
    },
    /**
     * 增加用户(等级自定义)
     * @param username 用户名
     * @param userpsw  用户密码
     * @return 添加成功则返回成功信息
    */
    addUser(req, res){
        var sql = $sql.user.addUser;    
        var params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.username,params.userpsw,params.level],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: 200,
                    msg: '添加用户成功',
                    userInfo: result[0],
                })
            }
        })
    },
    /**
     * 增加管理员用户
     * @param username 用户名
     * @param userpsw  用户密码
     * @return 添加成功则返回成功信息
    */
    addAdmin(req, res){
        var sql = $sql.user.addAdmin;    
        var params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.username,params.userpsw],function(err,result) {
            if(err){
                console.log("params",params);
                console.log(err);
            }
            if(result){
                res.json({
                    code: 200,
                    msg: '添加用户成功',
                    userInfo: result[0],
                })
            }
        })
    },
    /**
     * 增加游客用户
     * @param username 用户名
     * @param userpsw  用户密码
     * @return 添加成功则返回成功信息
    */
    addTourist(req, res){
        var sql = $sql.user.addTourist;    
        var params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.username,params.userpsw],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                func.jsonWrite(res,result);
            }
        })
    },
    /**
     * 查询所有用户
     * @param 无
     * @return 所有用户信息
    */
    fetch(req, res){
            var sql = $sql.user.fetch;   
            var params = req.body;
            console.log("sql",sql);
            console.log("params",params);
            func.connPool(sql, [], function(err, result) {    
                if (err) {       
                    console.log(err);
                }        
                if (result) {
                    result = formatData(result);
                    /* 处理数据 */
                    result.forEach(function(item,index){
                        if(item.level == 1){
                            item.level = '管理员账户'
                        }else{
                            item.level = '游客账户'
                        }
                    })
                    res.json({
                        code: 200,
                        msg: 'done',
                        list: result
                    })
                    console.log('res:' + res);
                    res.end('is over');
                }
            })
    },
    /**
     * 删除一个用户
     * @param userId 用户的唯一id
     * @return 删除成功的信息
    */
    delOne(req, res){
        var sql = $sql.user.delOne;    
        var params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.userId],function(err,result) {
            if (err) {       
                console.log(err);
            }        
            if (result) {
                res.json({
                    code: 200,
                    msg: 'done',
                })
                console.log('res:' + res);
                res.end('is over');
            }
        })
    },
    /**
     * 修改一个用户的密码
     * @param userpsw 用户的新密码
     * @param username 要修改的用户名
     * @return 删除成功的信息
    */
    update(req,res){
        var sql = $sql.user.update;    
        var params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.userpsw , params.username],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: 200,
                    msg: '修改成功',
                })
                console.log('res:' + res);
                res.end('is over');
            }
        })
    },
    /**
     * 上传图片
     * @param img 图片地址
     * @return 图片上传是否成功的信息
    */
    upload(req,res){
        let sql = $sql.user.upload;    
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        
        let absolutePath = path.resolve(__dirname, '../'+req.file.path); // 由于multer中间件，上传的文件信息会绑定到 req.file中 , '../'代表回退一级目录
        let a  = 2;

        func.connPool(sql, [absolutePath], (err, rows) => {
            console.log(a);
            res.send({code: 200, msg: 'done', url: absolutePath});
        }, res);
    }
}