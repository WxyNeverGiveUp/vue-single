// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT userpassword FROM admin_user WHERE username = ?;', // 登录查询
        add: 'INSERT INTO admin_user(username, userpassword) VALUES ( ?, ?);', // 增添用户
        fetch: 'SELECT * FROM admin_user;', // 查找用户
        delOne: 'DELETE FROM admin_user WHERE user_id = ?', // 删除一个用户
    }
}

module.exports = sqlMap;