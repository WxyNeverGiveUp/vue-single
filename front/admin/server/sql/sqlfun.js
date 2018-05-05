// 封装一些简单的功能  连接池
let mysql = require('mysql');
let db = require('../db_config/db');
let pool = mysql.createPool(db);

module.exports = {
	// 封装连接池
    connPool (sql, val, cb) {
        pool.getConnection((err, conn) => {
            let q = conn.query(sql, val, (err, result) => {

                if (err) {
                    console.log(err);
                }

                console.log(a);

                cb(err, result);
                // 释放连接池
                conn.release();
            });
        });
    },

    // json格式
    jsonWrite (res, ret) {
	    if(typeof ret === 'undefined') {
	        res.json({
	            code: '1',
	            msg: '操作失败'
	        });
	    } else {
	        res.json(ret);
	    }
	},


};