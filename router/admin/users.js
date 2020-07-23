// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');

module.exports = async(req, res) => {
    // 接收客户端传递过来的搜索关键字、当前页码和每页显示的数据条数
    let { query, pagenum, pagesize } = req.query;
    console.log(req.query);

    // 用户数据的总记录数
    let total = await User.countDocuments({});

    // 总页数，向上取整
    let totalpage = Math.ceil(total / pagesize);

    // 数据开始查询的位置
    let start = (pagenum - 1) * pagesize;

    // 如果搜索关键字存在
    if (query) {
        // 创建正则表达式对象
        var reg = new RegExp(query);

        var _filter = {
            // 多字段匹配
            $or: [
                { 'username': { $regex: reg } },
                { 'email': { $regex: reg } }
            ]
        };

        await User.find(_filter, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(new ErrorModel(err.message));
            }
            console.log(data);
            total = data.length;
            totalpage = Math.ceil(total / pagesize);
            return res.status(200).send({ totalpage: totalpage, pagenum: pagenum, total: total, users: data, message: '获取用户数据成功', code: 1 })
        });
    } else {
        // 获取用户数据,limit函数只能接收number类型，而前端传过来的是字符串，故需转化为number类型，- 0即可
        let users = await User.find({}).limit(pagesize - 0).skip(start);
        res.send({ totalpage: totalpage, pagenum: pagenum, total: total, users: users, message: '获取用户数据成功', code: 1 });
    }
}