const Router = require("koa-router");
var controller = require("../controller/record");

var router = new Router({
  prefix: "/record"
});
// 项目列表页 list
router.get("/", controller.view_index);
// 跳转至au页
router.all("/add", controller.view_au);
// 新增一条数据
router.post("/oooo", controller.add);
//

// ====json请求====
// 模糊查询多条数据by name
// router.post('/find/name', controller.findByName);

// // 增加
// // 一条数据
// router.post('/add', $tkCheck, controller.add);

// // 删除
// // 一条数据 by ID
// router.delete('/delete/:id', $tkCheck, controller.delete);
// // 多条数据
// router.delete('/deletes', $tkCheck, controller.deletes);

// // 修改
// // 一条数据 by ID
// router.put('/update/:id', $tkCheck, controller.update);

// // 查
// // 单条数据 by ID
// router.get('/find/:id', $tkCheck, controller.find);
// // 多条数据 by 查询条件
// router.post('/list', $tkCheck, controller.list);

module.exports = router;
