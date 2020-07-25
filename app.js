// 引用express框架
const express = require('express');
// 引入处理post请求的body-parser模块
const bodyParser = require('body-parser');
// 导入express-session模块实现session功能
const session = require('express-session');
const path = require('path');

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
})

// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 处理json类型
app.use(bodyParser.json())

// 拦截请求交给session处理，配置session
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: false, //添加 saveUninitialized 选项
    secret: 'secret key'
}))


// var multer = require('multer')
// const formidable = require('formidable');
// // const upload = multer({ dest: path.join(__dirname, '../', '../', 'public', 'uploads') });

// // app.use(upload.single('file')); //

// app.post('/upload', (req, res) => {
//     // console.log(req.body); //获取到的age和name
//     // console.log(req.file); //获取到的文件

//     // 创建表单解析对象
//     const form = new formidable.IncomingForm();

//     // 配置上传文件的存放位置(绝对路径)
//     form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');

//     // 保留上传文件的后缀
//     form.keepExtensions = true;

//     // 解析表单
//     form.parse(req, async(err, fields, files) => {
//         // err：错误对象，if表单解析错误，err即存储错误信息，成功则为null
//         // fields：对象类型，保存普通表单数据
//         // files：对象类型，保存和文件上传相关的数据

//         // 添加文章到数据库
//         console.log(fields);
//         console.log(files);

//         let user = await User.findOne({ username: fields.author });
//         if (user) {
//             const article = await Article.create({
//                 title: fields.title,
//                 author: user._id,
//                 publishDate: fields.publishDate,
//                 pic: (files.path || '').split('public')[1],
//                 content: fields.content
//             });

//             console.log(article);
//             res.send(new SuccessModel(article, '添加文章成功！'));
//         } else {
//             res.send(new ErrorModel('添加失败或者该作者不是用户，请先注册！'));
//         }



//     });

//     // res.send('ok');
//     //做些其他事情
// })


// 导入路由对象
const admin = require('./router/admin');
const home = require('./router/home');

// 为路由对象匹配一级请求路径
app.use('/admin', admin);
app.use('/home', home);
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