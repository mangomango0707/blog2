// 引用express框架
const express = require('express');
// 创建博客管理页面路由
const admin = express.Router();

// 挂载二级路由

// 实现登录功能
admin.post('/login', require('./admin/login'));

module.exports = admin;