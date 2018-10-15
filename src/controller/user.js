// 引入 service 文件
const service = require("../service/user");
const static = require("../utils/static");
const format = require("../utils/format");

module.exports = {
  // 根据name查找用户信息
  findByName: async function(ctx, next) {
    let { username } = ctx.request.body;
    if (!username) {
      ctx.body = [];
      return;
    }
    // const params = { username: new RegExp(username, "i") };
    const params = { username: { $regex: username, $options: "i" } };
    // 这个地方是user的service
    const data = await service.findMutiByParams(params, "username _id");

    ctx.body = data;
  }
};
