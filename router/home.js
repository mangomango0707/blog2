// 引用express框架
const express = require('express');
// 创建博客管理页面路由
const home = express.Router();

// 挂载二级路由

// 实现登录功能
home.post('/login', require('./home/login'));
// 实现注册功能
home.post('/register', require('./home/register'));

module.exports = home;