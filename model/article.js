// 创建文章集合
// 引入mongoose模块
const mongoose = require('mongoose');

// 创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 200,
        minlength: 1,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    pic: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

// 创建文章集合
const Article = mongoose.model('Article', articleSchema);

// 将文章集合规则作为模块成员导出
module.exports = {
    Article: Article
}