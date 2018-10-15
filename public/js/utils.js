(function() {
  // 代码提示
  const prompt = {
    alert: function(_option) {
      const _default = {
        title: "提示",
        content: "",
        btn: "确定"
      };
      const _newOP = { ..._default, ..._option };
      const { title, content, btn, showTitle } = _newOP;
      $("#cAlert .title").html(title);
      $("#cAlert .content").html(content);
      $("#cAlert .btn").html(btn);
      showTitle ? $("#cAlert .title").show() : $("#cAlert .title").hide();
      $("#cAlert").modal();
    }
  };

  const untils = {
    //提示
    ...prompt
  };
  window.untils = untils;
})();
