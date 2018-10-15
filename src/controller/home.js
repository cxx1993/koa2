// 引入 service 文件
const HomeService = require("../service/home");

module.exports = {
  // 修改 index 方法
  index: async function(ctx, next) {
    await ctx.render("admin/home", { title: "iKcamp欢迎您" });
  },
  home: async (ctx, next) => {
    ctx.response.body = "<h1>HOME page</h1>";
  },
  homeParams: async (ctx, next) => {
    ctx.response.body = "<h1>HOME page /:id/:name</h1>";
  },
  login: async (ctx, next) => {
    await ctx.render("admin/login", {
      btnName: "GoGoGo"
    });
  },
  // 修改 register 方法
  register: async function(ctx, next) {
    let params = ctx.request.body;
    let name = params.name;
    let password = params.password;
    let res = await HomeService.register(name, password);
    if (res.status == "-1") {
      await ctx.render("admin/login", res.data);
    } else {
      ctx.state.title = "个人中心";
      await ctx.render("admin/success", res.data);
    }
  }
};

