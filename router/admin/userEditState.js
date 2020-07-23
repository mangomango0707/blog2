// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');

module.exports = async(req, res) => {
    // 接受客户端传递过来的参数
    const { id, type } = req.params;
    // console.log(req.params);

    // 根据id查询用户，并改变用户状态
    await User.updateOne({ _id: id }, { state: type });

    res.send(new SuccessModel('更新用户状态成功'));
}