// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');
// 引入formidable第三方模块解析表单（包含文件上传）
const formidable = require('formidable');
// 导入路径处理模块
const path = require('path');

module.exports = async(req, res) => {

    // 接收客户端传递过来的id, restful获取参数，用req.params
    const id = req.params.id;
    // console.log(id);

    // 创建表单解析对象
    const form = new formidable.IncomingForm();

    // 配置上传文件的存放位置(绝对路径)
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'avatar');

    // 保留上传文件的后缀
    form.keepExtensions = true;

    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // console.log(files.file);
        // 根据id查询用户
        let user = await User.findOne({ _id: id });
        // console.log(user);


        if (user) {
            // 更新用户信息
            await User.updateOne({ _id: id }, {
                avatar: (files.file.path || '').split('public')[1]
            });
            res.send(new SuccessModel('修改头像成功'));
        } else {
            res.send(new ErrorModel('修改头像失败'));
        }
    })
}