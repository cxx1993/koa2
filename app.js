const Koa = require("koa");
const app = new Koa();

const router = require("./src/router");

const middleware = require("./src/middleware/index"); // 引入中间件

middleware(app);
router(app);

module.exports = app;
