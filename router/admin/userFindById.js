// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');

module.exports = async(req, res) => {
    const id = req.params.id;
    // console.log(id);

    // 根据id查询用户信息
    let user = await User.findOne({ _id: id });
    if (user) {
        res.send(new SuccessModel(user, '查询用户成功'));
    } else {
        res.send(new ErrorModel('查询用户失败'));
    }
}