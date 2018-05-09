// 路由文件 供入口文件app.js 调用
var express = require('express');
var router = express.Router();
let user = require('../controller/user');
let api = require('../api');
let upload = require('../utils/upload'); // 上传文件工具类

/*user*/
router.post(api.userAddAdmin, user.usertest, user.addAdmin);// 管理员用户添加
router.post(api.userAddTourist, user.usertest, user.addTourist);// 游客用户添加
router.post(api.userAdd, user.usertest, user.addUser);// 自定义用户添加
router.post(api.userLogin, user.login);// 用户登录
router.post(api.userFetch, user.fetch);// 用户列表
router.post(api.userDelOne, user.delOne);// 删除一个用户
router.post(api.userUpdate, user.update);// 修改一个用户的信息

/*article*/
router.post(api.upload, upload.single('avatar'),user.upload);// 上传照片


module.exports = router;