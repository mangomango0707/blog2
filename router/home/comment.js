// 导入用户集合
const { User } = require('../../model/user');
// 导入文章集合
const { Article } = require('../../model/article');
// 导入评论集合
const { Comment } = require('../../model/comment');
// 导入响应数据模型
const { SuccessModel, ErrorModel } = require('../../model/resModel');

module.exports = async(req, res) => {
    // 获取前端传递过来的aid， uid，comment
    const { aid, uid, content } = req.body;

    const comment = await Comment.create({
        aid: aid,
        uid: uid,
        content: content,
        time: new Date()
    });
    res.send(new SuccessModel(comment, '添加评论成功'));
}