// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT userpassword,level FROM admin_user WHERE username = ?;', // 登录查询
        usertest: 'SELECT username FROM admin_user WHERE username = ?;', // 查询是否已经有该账号
        addUser: 'INSERT INTO admin_user(username, userpassword, level) VALUES (?, ?, ?);', // 添加用户(自定义等级)
        addTourist: 'INSERT INTO admin_user(username, userpassword, level) VALUES (?, ?, 0);', // 增添游客用户
        addAdmin: 'INSERT INTO admin_user(username, userpassword, level) VALUES (?, ?, 1);', // 增添管理员用户
        fetch: 'SELECT * FROM admin_user;', // 查找用户列表
        delOne: 'DELETE FROM admin_user WHERE user_id = ?;', // 删除一个用户
        update: 'UPDATE admin_user SET userpassword = ? WHERE username = ?;', // 修改密码
        upload: 'INSERT INTO img(img_path) VALUES(?);', // 上传图片
    },
    // 文章
    article: {
        add: 'INSERT INTO article(article_name, article_time, article_content, article_up, article_type) VALUES(?, ?, ?, ?, ?);', // 添加文章
        edit: 'UPDATE article SET article_name = ?, article_content = ?, article_type = ? WHERE article_id = ?;', // 修改文章
        fetch: 'SELECT * FROM article;', // 获取文章内容
        getArticleType: 'SELECT * FROM article_sort;', // 获取文章类型列表
        delOne: 'DELETE FROM article WHERE article_id = ?;', // 删除一篇文章
        fetchOne: 'SELECT * FROM article WHERE article_id = ?;', // 获取一篇文章
        upOne: 'UPDATE article SET article_up = ? WHERE article_id = ?;' // 置顶一篇文章
    },
    // 栏目
    sort: {
        fetch: 'SELECT * FROM article_sort;', // 获取栏目内容
        add: 'INSERT INTO article_sort(name) VALUES (?);', // 增添一个栏目
        editArticle: 'UPDATE article SET article_type = ? WHERE article_type = ?;', // 先将article表中的栏目进行更新
        editSort: 'UPDATE article_sort SET name = ? WHERE id = ?;', // 先将article表中的栏目进行更新
        delArticle: 'UPDATE article SET article_type = "暂无栏目" WHERE article_type = ?;', // 先删除文章表中的栏目，设置为暂无栏目
        delSort: 'DELETE FROM article_sort WHERE id = ?；', // 后删除栏目表中的栏目
    },
    // 评论
    comment: {
        fetch: `SELECT comment.c_id, comment.comment_content, comment.comment_time, admin_user.username, article.article_name
                FROM comment
                INNER JOIN admin_user
                ON comment.comment_user_id = admin_user.user_id
                INNER JOIN article
                ON comment.comment_article_id = article.article_id;`, // 获取评论内容(三表联合查询)
        add: 'INSERT INTO comment(comment_content, comment_user_id, comment_time, comment_article_id) VALUES(?, ?, ?, ?);', // 添加一条评论
        del: 'DELETE FROM comment WHERE c_id = ?;', // 删除一条评论
    }
}

module.exports = sqlMap;