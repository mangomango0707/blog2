// 创建用户集合
// 引入mongoose模块
const mongoose = require('mongoose');
// 导入Joi验证数据
const Joi = require('joi');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        // 保证优先在插入数据库时不重复
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        default: 'normal'
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});

// 创建集合
const User = mongoose.model('User', userSchema);

// 验证用户信息
const validateUser = user => {
    // 自定义验证规则
    const Schema = {
        username: Joi.string().min(2).max(30).required().error(new Error('用户名不符合要求')),
        email: Joi.string().email().required().error(new Error('邮箱地址不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{2,30}$/).required().error(new Error('密码不符合要求')),
        role: Joi.string().valid('normal', 'admin').error(new Error('角色非法')),
        state: Joi.number().valid(0, 1).error(new Error('状态非法'))
    };
    // 进行验证
    return Joi.validate(user, Schema);
}

// 将用户集合作为模块成员导出
module.exports = {
    User,
    validateUser
}