/**
 * 自动填充插件
 * @author：chenxin
 */

(function() {
  // 默认参数
  let initParams = {
    paramsname: "name",
    key: "name",
    async: false, // 默认不开启
    onchange: () => {},
    choose: () => {}
  };
  function Auto(params) {
    initParams = { ...initParams, ...params }; // assign 参数
    const { id, arr, async, url } = params;
    this.el = $(`#${id}`);

    if (async && url) {
      // 开启异步模式
      this.async = true;
    } else {
      this.initArr = arr && arr.length ? arr : [];
      this.async = false;
    }
    this.init();
  }

  // 隐藏
  Auto.prototype.clean = function() {
    $("#autoComplete")
      .css({ left: 0, top: 0 })
      .html("")
      .hide();
  };

  // 绑定keydown，focus事件 普通类型
  Auto.prototype.bindEV = function() {
    const that = this;
    let { paramsname, key } = initParams; // 传出参数名

    this.el.on("keyup focus", function(e) {
      if (e.type === "keyup") {
        // 如果是keyup就执行keyup传入的函数
        initParams.onchange &&
          typeof initParams.onchange === "function" &&
          initParams.onchange();
      }
      $("#autoComplete")
        .html("")
        .hide();
      const val = $(this).val();
      if (val === "") {
        return;
      }
      let showArr = [],
        html = "";
      if (that.async) {
        // 开启异步模式
        const { url } = initParams;
        const data = {};
        data[paramsname] = val;
        $.ajax({
          url,
          type: "post",
          data,
          success: function(res) {
            if (res.length === 0) {
              that.showEmpty();
            } else {
              // 拼接showArr
              html =
                "<ul>" +
                res
                  .map((v, i) => {
                    return "<li key=" + i + ">" + v[key] + "</li>";
                  })
                  .join("") +
                "</ul>";
              that.initArr = res;
              that.showUl(html);
            }
          },
          error: function(err) {
            that.showEmpty();
          }
        });
      } else {
        // 开启静态模式
        // 匹配arr
        showArr = that.initArr.filter(v => {
          return v.indexOf(val) != -1;
        });

        // 拼接showArr
        html =
          "<ul>" +
          showArr
            .map(v => {
              return "<li>" + v + "</li>";
            })
            .join("") +
          "</ul>";
        that.showUl(html);
      }
    });
  };

  // 展示空
  Auto.prototype.showEmpty = function() {
    const html = " <ul><li class='empty'>没有数据</li></ul>";
    this.showUl(html);
  };
  // 展示ul
  Auto.prototype.showUl = function(html) {
    // 确定位置
    const left = this.el.offset().left + "px";
    const top = this.el.offset().top + 40 + "px";

    // 展示showArr
    $("#autoComplete")
      .css({ left: left, top: top })
      .append(html)
      .show();
  };

  // 失去焦点
  Auto.prototype.blur = function() {
    const that = this;
    this.el.on("blur", function() {
      that.clean();
    });
  };

  // 选择li
  Auto.prototype.choose = function() {
    const that = this;
    $(document).on("click", "#autoComplete li", function() {
      const val = $(this).text();
      if (!$(this).hasClass("empty")) {
        that.el.val(val);
        // 选中的li的数据
        const chooseLi = that.initArr[$(this).attr("key")];
        // 执行传入的choose回调
        initParams.choose &&
          typeof initParams.choose === "function" &&
          initParams.choose(chooseLi);
      } else {
        that.el.val("");
      }

      that.clean(); // 隐藏
    });
  };

  // 初始化
  Auto.prototype.init = function() {
    $("body").append("<div id='autoComplete' class='autoComplete'></div>");

    this.bindEV();
    this.choose();
    // this.blur();
  };

  window.Auto = Auto;
})();

// 使用示例
// const auto1 = new Auto({
//   id: "user",
//   arr: ["aaaa", "abba", "eewaee", "ddaas", "bbbb", "cccc"]
// });

// const auto2 = new Auto({
//   id: "user",
//   async: true,
//   url: "/user/find/name",
//   paramsname: "username",
//   key: "username",
//   onchange: function() {
//     $("#userId").val("");
//   },
//   choose: function(res) {
//     $("#userId").val(res.id);
//   }
// });
