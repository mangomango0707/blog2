// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');

module.exports = async(req, res) => {
    // 接收客户端传递过来的id, restful获取参数，用req.params
    const id = req.params.id;
    // console.log(req.params);
    // 接收客户端传递过来的请求参数
    const { username, email, role } = req.body;
    // console.log(id);
    // console.log(req.body);

    // 根据id查询用户
    let user = await User.findOne({ _id: id });
    // console.log(user);
    if (user) {
        // 更新用户信息
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role
        });
        res.send(new SuccessModel('修改用户成功'));
    } else {
        res.send(new ErrorModel('修改用户失败'));
    }
}