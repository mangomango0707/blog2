// 引入用户集合
const { User, validateUser } = require('../../model/user');
// 引入响应模板
const { SuccessModel, ErrorModel } = require('../../model/resModel');
// 导入bcrypt模块对密码进行加密
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    // console.log(req.body);
    // 先验证数据格式
    // try {
    //     await validateUser(req.body);
    // } catch (error) {
    //     // 验证不通过，重定向回注册页面，并把错误信息添加到请求地址中
    //     return next(JSON.stringify({ path: '/home/register', message: error.message }));
    // }

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
    await User.create(req.body);

    res.send(new SuccessModel(req.body, "注册成功"));
}