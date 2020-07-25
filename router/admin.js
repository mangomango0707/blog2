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

// 添加文章
admin.post('/addArticle', require('./admin/articleAdd'));
// 获取文章列表数据
admin.get('/articles', require('./admin/articles'));
// 根据id查询文章信息
admin.get('/findArticle/:id', require('./admin/articleFindById'));
// 修改文章
admin.put('/editArticle/:id', require('./admin/articleEdit'));
// 删除文章
admin.delete('/deleteArticle/:id', require('./admin/articleDelete'));

module.exports = admin;