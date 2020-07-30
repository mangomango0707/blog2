// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');
// 导入bcrypt模块对密码进行加密
const bcrypt = require('bcrypt');
// 引入formidable第三方模块解析表单（包含文件上传）
const formidable = require('formidable');
// 导入路径处理模块
const path = require('path');

module.exports = async(req, res) => {

    // 创建表单解析对象
    const form = new formidable.IncomingForm();

    // 配置上传文件的存放位置(绝对路径)
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'avatar');

    // 保留上传文件的后缀
    form.keepExtensions = true;

    // 解析表单
    form.parse(req, async(err, fields, files) => {

        console.log(files);
        console.log(fields);
        // 验证当前邮箱是否被注册过
        let user = await User.findOne({ email: fields.email });
        if (user) {
            return res.status(400).send(new ErrorModel('邮箱地址已经被占用了！'));
        }

        // 对密码进行加密操作
        // 生成随机码
        const salt = await bcrypt.genSalt(10);
        console.log(fields.password);
        // 进行加密
        const password = await bcrypt.hash(fields.password, salt);
        // 替换密码
        fields.password = password;

        // 将用户信息添加到数据库中
        const newUser = await User.create({
            username: fields.username,
            email: fields.email,
            password: fields.password,
            avatar: (files.file.path || '').split('public')[1],
            role: fields.role,
        });
        res.send(new SuccessModel(newUser, '添加用户成功'));
    });


}