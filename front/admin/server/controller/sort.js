let moment = require('moment'); // 格式化时间
var func = require('../sql/sqlfun'); // 封装连接池的功能
var $sql = require('../sql/sql');// sql语句
let path = require('path'); // 路径模块


/*格式化 参数*/
function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}


module.exports = {
    /**
     * 新增栏目
     * @param name 栏目名称
     * @return 栏目是否添加成功的信息
    */
    add(req,res){
        let sql = $sql.sort.add;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.name],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: '200',
                    msg: '添加新栏目成功',
                })
            }
        })
    },
    /**
     * 获取栏目
     * @return 所有博客栏目
    */
    fetch(req,res){
        let sql = $sql.sort.fetch;
        let params = req.query;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                result = formatData(result);
                res.json({
                    code: '200',
                    msg: '获取栏目信息成功',
                    sortList: result,
                })
            }
        })
    },
}