// 引用express框架
const express = require('express');
// 创建博客管理页面路由
const admin = express.Router();

// 挂载二级路由

// 实现获取用户数据列表功能
admin.get('/users', require('./admin/users'));
// 修改用户的状态（启用/禁用）
admin.put('/users/:id/state/:type', require('./admin/userEditState'));
// 添加用户
admin.post('/addUser', require('./admin/userAdd'));
// 根据id查询用户信息
admin.get('/findUser/:id', require('./admin/userFindById'));
// 修改用户
admin.put('/editUser/:id', require('./admin/userEdit'));
// 删除用户
admin.delete('/deleteUser/:id', require('./admin/userDelete'));

module.exports = admin;