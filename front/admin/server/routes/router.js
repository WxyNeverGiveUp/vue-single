// 路由文件 供入口文件app.js 调用
var express = require('express');
var router = express.Router();
let user = require('../controller/user');
let api = require('../api');

// 用户添加
router.post(api.userAdd, user.add);
// 用户登录
router.post(api.userLogin, user.login);
// 用户列表
router.post(api.userFetch, user.fetch);
// 删除一个用户
router.post(api.userDelOne, user.delOne);



module.exports = router;