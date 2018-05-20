/*前台所有的请求全部放在这里*/
let moment = require('moment'); // 格式化时间
let func = require('../sql/sqlfun'); // 封装连接池的功能
let $sql = require('../sql/sql');// sql语句
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
     * 新增文章
     * @param name 文章名称
     * @param content 文章内容
     * @param time 文章创建时间
     * @param up 文章是否置顶
     * @return 文章是否添加成功的信息
    */
    add(req,res){
        let sql = $sql.article.add;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        let time = func.CurentTime();
        func.connPool(sql,[params.title, time, params.content, params.up, params.type],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: '200',
                    msg: '添加文章成功',
                })
            }
        })
    },
}