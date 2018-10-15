// 引入 service 文件
const service = require("../service/classify");
const static = require("../utils/static");
const format = require("../utils/format");

module.exports = {
  /* classify show
   * 返回全部的list以及list相关数据
   * render至admin/classify/show
   * list只包含name和stName
   */
  view_show: async function(ctx, next) {
    let list = await service.findMutiByParams({}, "name stName");
    await ctx.render("admin/classify/show", {
      title: "图标列表",
      list
    });
  },
  // 根据name查找用户信息
  findByName: async function(ctx, next) {
    let { name } = ctx.request.body;
    if (!name) {
      ctx.body = [];
      return;
    }
    // const params = { username: new RegExp(username, "i") };
    const params = { name: { $regex: name, $options: "i" } };
    // 这个地方是user的service
    const data = await service.findMutiByParams(params, "name stName _id");

    ctx.body = data;
  }
};
