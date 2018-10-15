const mongoose = require("mongoose");
const Classify = require("../model/classify.m");
const static = require("../utils/static");

const search = {
  match: {},
  skip: 0,
  limit: static.list.limit
};

module.exports = {
  /**
   * 查找多个by 参数
   * params：查询条件
   * field：筛选需要返回的字段（不传返回所有）
   */
  findMutiByParams(params, field = "") {
    return new Promise((resolve, reject) => {
      Classify.find(params, field)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
};
