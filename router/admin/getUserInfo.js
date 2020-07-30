// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');
// 导入jwt token工具
const jwt = require('jsonwebtoken');

module.exports = async(req, res) => {
    // 解析token获取用户信息
    var token = req.headers['Authorization'];
    console.log(token);
    if (token == undefined) {
        return;
    } else {
        var id = jwt.verify(token.split(' ')[1], 'Fizz');

        // 根据id查询用户信息
        let user = await User.findOne({ _id: id });
        if (user) {
            res.send(new SuccessModel(user, '查询登录用户成功'));
        } else {
            res.send(new ErrorModel('查询登录用户失败'));
        }
    }


}