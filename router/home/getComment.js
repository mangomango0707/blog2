// 导入用户集合
const { User } = require('../../model/user');
// 导入文章集合
const { Article } = require('../../model/article');
// 导入评论集合
const { Comment } = require('../../model/comment');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');

module.exports = async(req, res) => {

    // 接收客户端传过来的文章id
    let aid = req.params.id;
    console.log(aid);
    // 接受客户端传递过来的搜索关键字、当前页码和每页显示的数据条数
    let { query, pagenum, pagesize } = req.query;
    // console.log(req.query);

    // 文章数据总数
    let total = await Comment.find({ aid: aid }).count();

    // 总页数，向上取整
    let totalpage = Math.ceil(total / pagesize);

    // 数据开始查询的位置
    let start = (pagenum - 1) * pagesize;

    let comments = await Comment.find({ aid: aid }).sort({ time: -1 }).populate('uid').limit(pagesize - 0).skip(start);
    console.log(comments);
    res.send({ totalpage: totalpage, pagenum: pagenum, total: total, comments: comments, message: '获取评论数据成功', code: 1 });
}