// 路由文件 供入口文件app.js 调用
var express = require('express');
var router = express.Router();
let user = require('../controller/user');
let api = require('../api');

// 用户注册
router.post(api.userAdd, user.add);
router.post(api.userLogin, user.login);
router.post(api.userFetch, user.fetch);


module.exports = router;