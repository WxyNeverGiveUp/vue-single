// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT userpassword,level FROM admin_user WHERE username = ?;', // 登录查询
        usertest: 'SELECT username FROM admin_user WHERE username = ?', // 查询是否已经有该账号
        addUser: 'INSERT INTO admin_user(username, userpassword, level) VALUES (?, ?, ?);', // 添加用户(自定义等级)
        addTourist: 'INSERT INTO admin_user(username, userpassword, level) VALUES ( ?, ?, 0);', // 增添游客用户
        addAdmin: 'INSERT INTO admin_user(username, userpassword, level) VALUES ( ?, ?, 1);', // 增添管理员用户
        fetch: 'SELECT * FROM admin_user;', // 查找用户列表
        delOne: 'DELETE FROM admin_user WHERE user_id = ?', // 删除一个用户
        update: 'UPDATE admin_user SET userpassword = ? WHERE username = ?', // 修改密码
        upload: 'INSERT INTO img(img_path) VALUES(?)', // 上传图片
    }
}

module.exports = sqlMap;