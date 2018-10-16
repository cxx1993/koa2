/**
 * 集中调用中间件
 */
const path = require("path");
const ip = require("ip");
const bodyParser = require("koa-bodyparser");
const nunjucks = require("koa-nunjucks-2");
const staticFiles = require("koa-static");
const json = require("koa-json");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mp');

// 引入日志中间件
const miLog = require("./mi-log");
// 引入请求错误中间件
const miHttpError = require("./mi-http-error");

module.exports = app => {
  // 应用请求错误中间件
  app.use(
    miHttpError({
      // 请求错误输出页面位置
      errorPageFolder: path.resolve(__dirname, "../../views/error")
    })
  );

  app.use(json());

  // 将配置中间件的参数在注册中间件时作为参数传入
  app.use(
    miLog({
      env: app.env, // koa 提供的环境变量
      projectName: "koa2-tutorial",
      appLogLevel: "debug",
      dir: "logs",
      serverIp: ip.address()
    })
  );

  // 指定 public目录为静态资源目录，用来存放 js css images 等
  app.use(staticFiles(path.resolve(__dirname, "../../public")));

  // 指定 views目录为html资源目录
  app.use(
    nunjucks({
      ext: "html",
      path: path.join(__dirname, "../../views"),
      nunjucksConfig: {
        trimBlocks: true,
        noCache: process.env.NODE_ENV !== "production"  // 取消缓存，实时刷新页面
      }
    })
  );

  app.use(bodyParser());

  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500;
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack);
      }
    }
  });
};
