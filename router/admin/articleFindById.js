// 导入文章集合
const { Article } = require('../../model/article');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');

module.exports = async(req, res) => {
    const id = req.params.id;
    // console.log(id);

    // 根据id查询文章信息
    let article = await Article.findOne({ _id: id }).populate('author');
    // console.log(article);
    if (article) {
        res.send(new SuccessModel(article, '查询文章成功'));
    } else {
        res.send(new ErrorModel('查询文章失败'));
    }
}