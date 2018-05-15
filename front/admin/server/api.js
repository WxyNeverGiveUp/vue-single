// 暴露后端接口
let path = '/api';

module.exports = {
   
    /*user*/
    userLogin: '/login',
    userAddTourist: '/addTourist', // 添加游客用户
    userAddAdmin: '/addAdmin', // 添加管理员用户
    userAdd: '/user/addUser', // 添加用户(自定义等级)
    userFetch: '/user/list/fetchData',
    userDelOne: '/user/list/delOne',
    userUpdate: '/user/list/update',

    /*article*/
    upload: '/article/upload', // 上传文件
    articleAdd: '/article/add', // 添加文章
    articleFetch: '/article/fetch', // 添加文章
    articleTypeFetch: '/article/typeFetch', // 添加文章
    articleDelOne: '/article/delOne', // 删除一篇文章
    articleFetchOne: '/article/fetchOne', // 获取一篇文章
    articleUpOne: '/article/upOne', // 置顶一篇文章
    articleEdit: '/article/edit', // 修改一篇文章

    /*sort*/
    sortFetch: '/sort/fetch', // 获取栏目信息
    sortAdd: '/sort/add', // 增添新栏目信息
    sortEdit: '/sort/edit', // 修改栏目信息
    sortDel: '/sort/del', // 删除栏目信息
};