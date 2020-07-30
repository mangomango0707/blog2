// 引用express框架
const express = require('express');
// 引入处理post请求的body-parser模块
const bodyParser = require('body-parser');
// 导入express-session模块实现session功能
const session = require('express-session');
const path = require('path');
// 导入jwt token工具
const jwt = require('jsonwebtoken');
// 导入用户集合
const { User } = require('./model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('./model/resModel');

// 创建网站服务器
const app = express();

// 数据库连接
require('./model/connect');

// 设置跨域
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // 设置允许跨域的域名，*任意域名跨域
    res.header('Access-Control-Allow-Headers', 'content-type, Authorization'); // 允许的header类型
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS'); // 跨域允许的请求方式
    if (req.method.toLowerCase() == 'options') {
        res.send(200); // 让options尝试请求快速结束
    } else {
        next();
    }
});
// 解析token获取用户信息
// app.all('*', async function(req, res, next) {
//     var token = req.headers['Authorization'];
//     if (token) {
//         var id = jwt.verify(token, 'Fizz');

//         console.log(id);
//         // 根据id查询用户信息
//         let user = await User.findOne({ _id: id });
//         if (user) {
//             req.id = user._id;
//             next();
//         } else {
//             res.send(new ErrorModel('查询登录用户失败'));
//         }
//     }
// })

// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json类型
app.use(bodyParser.json())

// 拦截请求交给session处理，配置session
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
    secret: 'secret key'
}))



// 导入路由对象
const admin = require('./router/admin');
const home = require('./router/home');
const { func } = require('joi');

// 为路由对象匹配一级请求路径
app.use('/admin', admin);
app.use('/home', home);

// 读取图片
app.get('/public*', function(req, res) {
    res.sendFile(__dirname + req.url);
    // console.log(__dirname + req.url);
})

// app.use('/file', require('./router/admin/upload'));

// 错误处理中间件
// app.use((err, req, res, next) => {
//     // 把next中的参数err转化为对象
//     const result = JSON.parse(err);
//     // 拼接参数
//     let params = [];
//     for (let attr in params) {
//         if (attr != 'path') {
//             params.push(attr + '=' + result[attr]);
//         }
//     }
//     res.send(`${result.path}?${params.join('&')}`);
// })

// 监听端口
app.listen(8081)
console.log("网站服务器启动成功");