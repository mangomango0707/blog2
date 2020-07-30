// 导入文章集合
const { Article } = require('../../model/article');
// 导入用户集合
const { User } = require('../../model/user');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');

module.exports = async(req, res) => {

    const userId = req.params.id;
    // console.log(userId);

    // 接受客户端传递过来的搜索关键字、当前页码和每页显示的数据条数
    let { query, pagenum, pagesize } = req.query;
    // console.log(req.query);

    // 文章数据总数
    let total = await Article.find({ author: userId }).count();

    // 总页数，向上取整
    let totalpage = Math.ceil(total / pagesize);

    // 数据开始查询的位置
    let start = (pagenum - 1) * pagesize;

    // 根据id查询文章信息
    let articles = await Article.find({ author: userId }).sort({ publishDate: -1 }).populate('author').limit(pagesize - 0).skip(start); // console.log(article);

    if (articles) {
        res.send({ totalpage: totalpage, pagenum: pagenum, total: total, articles: articles, message: '获取用户文章数据成功', code: 1 });
    } else {
        res.send(new ErrorModel('查询用户文章失败'));
    }
}