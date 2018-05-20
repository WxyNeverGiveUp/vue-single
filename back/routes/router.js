// 路由文件 供入口文件app.js 调用
let express = require('express');
let router = express.Router();
let user = require('../controller/user'); // 用户管理
let article = require('../controller/article'); // 文章管理
let sort = require('../controller/sort'); // 栏目管理
let comment = require('../controller/comment'); // 评论管理
let api = require('../api'); // 后台接口
let upload = require('../utils/upload'); // 上传文件工具类

/*user*/
router.get(api.userFetch, user.fetch);// 用户列表

router.post(api.userAddAdmin, user.usertest, user.addAdmin);// 管理员用户添加
router.post(api.userAddTourist, user.usertest, user.addTourist);// 游客用户添加
router.post(api.userAdd, user.usertest, user.addUser);// 自定义用户添加
router.post(api.userLogin, user.login);// 用户登录
router.post(api.userDelOne, user.delOne);// 删除一个用户
router.post(api.userUpdate, user.update);// 修改一个用户的信息

/*article*/
router.get(api.articleFetchOne, article.fetchOne); // 获取一篇文章
router.get(api.articleFetch, article.fetch); // 获取文章内容
router.get(api.articleTypeFetch, article.getArticleType); // 获取文章类型

router.post(api.upload, upload.single('avatar'), user.upload);// 上传照片
router.post(api.articleAdd, article.add); // 添加文章
router.post(api.articleDelOne, article.delOne); // 删除一篇文章
router.post(api.articleEdit, article.edit); // 修改一篇文章
router.post(api.articleUpOne, article.upOne); // 置顶一篇文章


/*sort*/
router.get(api.sortFetch, sort.fetch); // 获取栏目列表

router.post(api.sortAdd, sort.add); // 新增一个栏目
router.post(api.sortEdit, sort.editArticle, sort.editSort); // 修改一个栏目,先将文章表的栏目名修改，再将栏目表里的栏目名修改
router.post(api.sortDel, sort.delArticle, sort.delSort); // 修改一个栏目,先将文章表的栏目名修改，再将栏目表里的栏目名修改

/*comment*/
router.get(api.commentFetch, comment.fetch); // 获取评论列表

router.post(api.commentAdd, comment.add); // 添加一条评论
router.post(api.commentDel, comment.del); // 删除一条评论

module.exports = router;