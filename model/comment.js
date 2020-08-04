// 创建评论集合
// 引入mongoose模块
const mongoose = require('mongoose');

// 创建文章集合规则
const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        default: Date.now
    },
    time: {
        type: Date
    }
});

// 创建评论集合
const Comment = mongoose.model('Comment', commentSchema);

// 将评论集合作为模块成员导出
module.exports = {
    Comment: Comment
}