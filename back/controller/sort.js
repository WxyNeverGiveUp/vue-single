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
    /**
     * 修改文章表栏目
     * params new_type 新的栏目名
     * params old_type 旧的栏目名
     * return 文章表中栏目是否修改成功的信息
    */
    editArticle(req,res,next){
        let sql = $sql.sort.editArticle;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.new_type, params.old_type],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                next()
            }
        })
    },
    /**
     * 删除栏目表里的栏目
     * params name 栏目表中，新的栏目名
     * params id 栏目表中id
     * return 栏目表中栏目
    */
    editSort(req,res){
        let sql = $sql.sort.editSort;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.name, params.id],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: '200',
                    msg: '修改成功',
                })
            }
        })
    },
    /**
     * 删除文章表栏目
     * params article_type 栏目表中的
     * return 文章表中栏目是否修改成功的信息
    */
    delArticle(req,res,next){
        let sql = $sql.sort.delArticle;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.article_type],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                next()
            }
        })
    },
    /**
     * 删除栏目表里的栏目
     * params id 栏目表中id
     * return 是否删除栏目表中栏目
    */
    delSort(req,res){
        let sql = $sql.sort.delSort;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[params.id],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: '200',
                    msg: '删除栏目成功',
                })
            }
        })
    }
}