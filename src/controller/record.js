// 引入 service 文件
const service = require("../service/record");
const static = require("../utils/static");
const format = require("../utils/format");

module.exports = {
  /* record index
   * 返回list以及list相关数据
   * render至admin/record/list
   */
  view_index: async function(ctx, next) {
    let { page } = ctx.query; // 要请求的页数，从1开始算
    page = Number(page) || 1;
    let list = await service.list({
      page
    });
    let count = await service.count().length;
    let currentPage = page;

    limit = static.list.limit;

    let totalPage =
      (limit ? parseInt(count / limit) : parseInt(count / static.list.limit)) +
      1;
    // 处理list中的date
    list = format.time(list);

    await ctx.render("admin/record/list", {
      title: "记录列表",
      list,
      count,
      currentPage,
      totalPage
    });
  },
  // 定位至新增编辑页面
  view_au: async function(ctx, next) {
    await ctx.render("admin/record/au", {
      title: "新增记录",
      list: [1, 2, 3]
    });
  }
};
