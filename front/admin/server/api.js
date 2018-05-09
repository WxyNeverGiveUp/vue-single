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
};