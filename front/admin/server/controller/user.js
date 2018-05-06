var models = require('../db_config/db');//数据库链接信息
var mysql = require('mysql'); // 数据库
let moment = require('moment'); // 格式化时间
var func = require('../sql/sqlfun'); // 封装连接池的功能
var $sql = require('../sql/sql');//sql语句

// 数据库普通连接
// var conn = mysql.createConnection(models.mysql);
// 数据库连接池
let pool = mysql.createPool(models.mysql); 

// 格式化 参数
function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}

module.exports = {
    // 用户登录接口
    login(req, res){
        var sql = $sql.user.login;    
        var params = req.body;
        func.connPool(sql,[params.username],function(err,result) {
            console.log(result);
            if(!result.length){
                res.json({
                    code: 400, 
                    msg: '用户名不存在'
                });
                console.log('查询失败');
            }else{
                res.json({
                    code: 200, 
                    msg: '登录成功'
                });
                console.log('登录成功！');
            }
        })
        
    },
    // 增加新用户
    add(req, res){
        var sql = $sql.user.add;    
        var params = req.body;
        console.log(params.username);
        console.log(params.userpsw);
        func.connPool(sql,[params.username,params.userpsw],function(err,result) {
            // res.json({
            //     code: 200, 
            //     msg: '注册成功'
            // });
            // console.log('注册成功！')
            if(err){
                console.log(err);
            }
            if(result){
                func.jsonWrite(res,result);
            }
        })
    },
    // 查询所有用户
    fetch(req, res){
        pool.getConnection(function(err,conn){
            var sql = $sql.user.fetch;    
            var params = req.body; 
            console.log("sql",sql);
            console.log("params",params);
            conn.query(sql, [], function(err, result) {    
                if (err) {       
                    console.log(err);
                }        
                if (result) {
                    result = formatData(result);
                    res.json({
                        code: 200,
                        msg: 'done',
                        list: result
                    })
                    console.log('res:' + res);
                    res.end('is over');
                }
            })

            // 释放连接池
            conn.release();
        })
    },
    // 删除一个用户
    delOne(req, res){
        pool.getConnection(function(err,conn){
            var sql = $sql.user.delOne;    
            var params = req.body; 
            console.log("sql",sql);
            console.log("params",params);
            conn.query(sql, [params.userId], function(err, result) {    
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

            // 释放连接池
            conn.release();
        })
    },
}