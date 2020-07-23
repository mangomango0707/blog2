// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');
// 导入bcrypt模块对密码进行加密
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    // 验证当前邮箱是否被注册过
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send(new ErrorModel('邮箱地址已经被占用了！'));
    }

    // 对密码进行加密操作
    // 生成随机码
    const salt = await bcrypt.genSalt(10);
    // 进行加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;

    // 将用户信息添加到数据库中
    const newUser = await User.create(req.body);
    res.send(new SuccessModel(newUser, '添加用户成功'));
}