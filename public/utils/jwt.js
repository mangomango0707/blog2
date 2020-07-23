// // 引入模块依赖
// const fs = require('fs');
// const path = require('path');
// const jwt = require('jsonwebtoken');

// // 创建token类
// class Jwt {
//     constructor(data) {
//         this.data = data;
//     }

//     // 生成token
//     generateToken() {
//         let data = this.data;
//         let created = Math.floor(Date.now() / 1000);
//         let cert = fs.readFileSync(path.join(__dirname, '../pem/id_rsa.pem')); //私钥
//         let token = jwt.sign({
//             data,
//             exp: created + 60 * 30,
//         }, cert, { algorithm: 'RS256' });
//         return token;
//     }

//     // 校验token
//     verifyToken() {
//         let token = this.data;
//         let cert = fs.readFileSync(path.join(__dirname, '../pem/id_rsa_pub.pem')); //公钥 可以自己生成
//         let res;
//         try {
//             let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {};
//             let { exp = 0 } = result, current = Math.floor(Date.now() / 1000);
//             if (current <= exp) {
//                 res = result.data || {};
//             }
//         } catch (error) {
//             res = 'err';
//         }
//         return res;
//     }
// }

// module.exports = Jwt;