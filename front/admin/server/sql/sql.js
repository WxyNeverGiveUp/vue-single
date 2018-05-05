// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT userpassword FROM admin_user WHERE username = ?;', // 登录查询
        add: 'INSERT INTO admin_user(username, userpassword) values ( ?, ?);', // 增添用户
        fetch: 'SELECT username FROM admin_user;', // 查找用户
    }
}

module.exports = sqlMap;