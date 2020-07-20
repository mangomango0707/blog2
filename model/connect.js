// 与mongodb数据库连接设置

// 引入mongoose模块
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://mango:mango@localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("数据库连接成功！"))
    .catch(() => console.log("数据库连接失败！"));