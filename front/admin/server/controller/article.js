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
        let params = req.query;
        console.log("sql",sql);
        console.log("params",params);
        let time = CurentTime();
        func.connPool(sql,[params.name, time, params.content, params.up],function(err,result) {
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
                res.json({
                    code: '200',
                    msg: '获取文章成功',
                    articleList: result,
                })
            }
        })
    },
}