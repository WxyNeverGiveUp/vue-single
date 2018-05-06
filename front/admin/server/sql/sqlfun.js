// 封装一些简单的功能  连接池
let mysql = require('mysql'); // 数据库
let db = require('../db_config/db');
let pool = mysql.createPool(db.mysql);

module.exports = {
	// 封装连接池
    connPool (sql, options, callback) {
        pool.getConnection(function(err,conn){  
            if(err){  
                callback(err,null,null); 
                console.log(err); 
            }else{  
                conn.query(sql,options,function(err,results,fields){  
                    //释放连接  
                    conn.release();  
                    //事件驱动回调  
                    callback(err,results,fields);  
                });  
            }  
        });
    },
    // json格式
    jsonWrite (res, ret) {
	    if(typeof ret === 'undefined') {
	        res.json({
	            code: '1',
	            msg: '操作失败',
	        });
	    } else {
	        res.json(ret);
	    }
	},


};