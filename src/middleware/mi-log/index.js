/**
 * log 中间件是基于 log4js 的封装
 * 日志打印
 */
const logger = require("./logger");
module.exports = options => {
  const loggerMiddleware = logger(options);

  return (ctx, next) => {
    return loggerMiddleware(ctx, next).catch(e => {
      if (ctx.status < 500) {
        ctx.status = 500;
      }
      ctx.log.error(e.stack);
      ctx.state.logged = true;
      ctx.throw(e);
    });
  };
};
