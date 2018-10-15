const Router = require("koa-router");
var controller = require("../controller/user");

var router = new Router({
  prefix: "/user"
});
// 项目列表页 list
// router.get("/", controller.view_index);
// // 跳转至au页
// router.get("/add", controller.view_au);

// ====json请求====
// 模糊查询多条数据by name
router.post("/find/name", controller.findByName);

module.exports = router;
