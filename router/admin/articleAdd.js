// 引入formidable第三方模块解析表单（包含文件上传）
const formidable = require('formidable');
// 导入路径处理模块
const path = require('path');
// 导入文章集合
const { Article } = require('../../model/article');
const { SuccessModel, ErrorModel } = require('../../model/resModel');
const { User } = require('../../model/user');
const multer = require('multer');

// 设置文件上传保存路径
const upload = multer({ dest: path.join(__dirname, '../', '../', 'public', 'uploads') });

module.exports = (req, res) => {

    // console.log(req.body);
    // console.log(req.pic);


    // 创建表单解析对象
    const form = new formidable.IncomingForm();

    // 配置上传文件的存放位置(绝对路径)
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');

    // 保留上传文件的后缀
    form.keepExtensions = true;

    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // err：错误对象，if表单解析错误，err即存储错误信息，成功则为null
        // fields：对象类型，保存普通表单数据
        // files：对象类型，保存和文件上传相关的数据

        // 添加文章到数据库
        console.log(fields);
        console.log(files.file.path);

        // let user = await User.findOne({ username: fields.author });
        // 多条件查询：$or 满足一个即查询，$and 满足所有查询
        let user = await User.findOne({
            $or: [
                { username: fields.authorName },
                { _id: fields.author }
            ]
        });
        if (user) {
            const article = await Article.create({
                title: fields.title,
                author: user._id,
                publishDate: fields.publishDate,
                pic: (files.file.path || '').split('public')[1],
                content: fields.content
            });

            console.log(article);
            res.send(new SuccessModel(article, '添加文章成功！'));
        } else {
            res.send(new ErrorModel('添加失败或者该作者不是用户，请先注册！'));
        }
    });
};