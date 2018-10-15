/**
 * 转换函数
 * @author:chenxin
 */
const moment = require("moment");
const _ = require("lodash");
const static = require("./static");

const { res_code } = static;
module.exports = {
  /**
   * 转换list里的date格式的数据
   * 默认输出格式：type - YYYY/MM/DD hh:mm:ss
   * 默认字段：params - createDate
   */
  time(arr, type = "YYYY/MM/DD hh:mm:ss", params = "createDate") {
    return _.map(arr, function(v) {
      if (v[params] != null || v[params] != undefined) {
        let obj = [];
        obj[params] = moment(v[params]).format(type);
        return { ...v, ...obj };
      } else {
        return v;
      }
    });
  },
  formatCode(code) {
    if (!code) {
      return "";
    }
    let i = res_code.length;
    for (let i = 0, len = res_code.length; i < len; i++) {
      // ...
      if (res_code[i].key === code) {
        return res_code[i].value;
      }
    }

    return "";
  }
};
