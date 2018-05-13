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

/*获取当前时间*/
function CurentTime(){ 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();            //秒
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) 
            clock += '0'; 

        clock += mm + ":"; 
        if (ss < 10) 
            clock += '0'; 

        clock += ss; 
        return(clock); 
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
        let time = CurentTime();
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
    /**
     * 获取文章内容
     * @return json格式的所有文章
    */
    fetch(req,res){
        let sql = $sql.article.fetch;
        let params = req.query;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[],function(err,result) {
            if(err){
                console.log(err);
            }
            if(result){
                result = formatData(result);
                /* 处理数据 */
                result.sort((a,b)=>{
                    return b.article_up - a.article_up;
                })
                result.forEach(function(item,index){
                    if(item.article_up == 1){
                        item.article_up = '置顶'
                    }else{
                        item.article_up = '未置顶'
                    }
                })
                res.json({
                    code: '200',
                    msg: '获取文章成功',
                    articleList: result,
                })
            }
        })
    },
    /**
     * 获取文章分类
     * @return json格式的所有文章分类
    */
    getArticleType(req,res){
        let sql = $sql.article.getArticleType;
        let params = req.query;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql,[],function(err,result){
            if(err){
                console.log(err);
            }
            if(result){
                result = formatData(result);
                res.json({
                    code: '200',
                    msg: '获取文章成功',
                    list: result,
                })
            }
        })
    },
    /**
     * 删除文章
     * @param article_id 文章id
     * @return 文章是否删除成功的信息
    */
    delOne(req,res){
        let sql = $sql.article.delOne;
        let params = req.body;
        console.log("sql",sql)
        console.log("params",params)
        func.connPool(sql, [params.article_id], function(err,result){
            if(err){
                console.log(err);
            }
            if(result){
                res.json({
                    code: '200',
                    msg: '删除文章成功',
                })
            }
        })
    },
    /**
     * 修改文章时获取某一篇文章
     * @param article_id 文章id
     * @return 文章内容，文章标题，文章分类
    */
    fetchOne(req,res){
        let sql = $sql.article.fetchOne;
        let params = req.query;
        console.log("sql",sql)
        console.log("params",params)
        func.connPool(sql, [params.article_id], function(err,result){
            if(err){
                console.log(err);
            }
            if(result){
                let article = formatData(result)
                res.json({
                    code: '200',
                    msg: '获取文章成功',
                    article: article,
                })
            }
        })
    },
    /**
     * 选择是否置顶文章
     * @param article_up 是否置顶
     * @param article_id 文章id
     * @return 是否成功置顶文章的信息
    */
    upOne(req,res){
        let sql = $sql.article.upOne;
        let params = req.body;
        console.log("sql",sql);
        console.log("params",params);
        func.connPool(sql, [params.article_up, params.article_id],function(err, result){
            if(err){
                console.log(err);
            }
            if(result){
                let msg = "";
                if(params.article_up == 1){
                    msg = '置顶文章成功';
                }
                else{
                    msg = '取消置顶成功';
                }
                res.json({
                    code: '200',
                    msg: msg,
                })
            }
        })
    },
}