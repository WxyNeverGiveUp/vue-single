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
     * 新增评论
     * @param comment_content 评论内容
     * @param comment_user_id 评论者id
     * @param comment_time 评论创建时间
     * @param comment_aritcle_id 评论的文章
     * @return 评论是否添加成功的信息
    */
    add(req,res){
        let sql = $sql.comment.add;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        let comment_time = func.CurentTime();
        func.connPool(sql,[params.comment_content, params.comment_user_id, comment_time, params.comment_aritcle_id],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: '200',
                    msg: '添加评论成功',
                })
            }
        })
    },
    /**
     * 获取评论内容
     * @return json格式的所有评论
    */
    fetch(req,res){
        let sql = $sql.comment.fetch;
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
                    msg: '获取评论成功',
                    commentList: result,
                })
            }
        })
    },
    /**
     * 删除一条评论内容
     * params c_id 评论的自增id
     * @return json格式的所有评论
    */
    del(req,res){
        let sql = $sql.comment.del;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.c_id],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: '200',
                    msg: '删除评论成功',
                })
            }
        })
    }
}