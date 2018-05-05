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
        pool.getConnection(function(err,conn){
            var sql = $sql.user.login;    
            var params = req.body; 
            console.log("sql",sql);
            console.log("params",params);
            conn.query(sql, [params.username], function(err, result) {    
                if (err) {       
                    console.log(err);
                }        
                if (result) {
                    // func.jsonWrite(res, result);
                    for(var i = 0; i < result.length; i++){
                        console.log("请求回来！",result[i])
                        console.log("请求结果！",typeof result[i],result[i].userpsw);
                        if (result[i].userpsw == params.userpsw) {
                            res.send("返回回来了！");
                        }
                    }
                    res.end('is over');
                }
            })

            // 释放连接池
            conn.release();
        })
        
    },
    // 增加用户功能
    add(req, res){
        pool.getConnection(function(err,conn){
            var sql = $sql.user.add;    
            var params = req.body; 
            console.log("sql",sql);
            console.log("params",params);
            conn.query(sql, [params.username,params.userpsw], function(err, result) {    
                if (err) {       
                    console.log(err);
                }        
                if (result) {
                    func.jsonWrite(res, result);
                    console.log('res:' + res);
                    for(var i = 0; i < result.length; i++){
                        console.log("请求回来！",result[i])
                        console.log("请求结果！",typeof result[i],result[i].userpsw);
                        if (result[i].userpsw == params.userpsw) {
                            res.send("返回回来了！");
                        }
                    }
                    res.end('is over');
                }
            })

            // 释放连接池
            conn.release();
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
                    func.jsonWrite(res, result);
                    console.log('res:' + res);
                    res.end('is over');
                }
            })

            // 释放连接池
            conn.release();
        })
    },
}