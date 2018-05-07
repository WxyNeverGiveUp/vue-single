// 暴露后端接口
let path = '/api';

module.exports = {
   
    // user
    userLogin: '/login',
    userAddTourist: '/addTourist', // 添加游客用户
    userAddAdmin: '/addAdmin', // 添加管理员用户
    userFetch: '/user/list/fetchData',
    userDelOne: '/user/list/delOne',
    userUpdate: '/user/list/update',
};