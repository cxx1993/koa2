const mongoose = require("mongoose");
const Record = require("../model/record.m");
const static = require("../utils/static");

const search = {
  match: {},
  skip: 0,
  limit: static.list.limit
};

module.exports = {
  /**
   * 查找符合条件的list
   * 关联查询classifies表和users表
   */
  list: function(q) {
    let query = { ...search, ...q };
    let { match, skip, page, limit } = query;

    if (page != undefined) {
      skip = (page - 1) * limit;
    }

    return new Promise(function(resolve, reject) {
      Record.aggregate([
        {
          $match: match
        },
        { $skip: skip },
        { $limit: limit },
        { $sort: { createDate: -1 } },
        // 关联查询classifies表
        {
          $lookup: {
            from: "classifies",
            localField: "classifyId",
            foreignField: "_id",
            as: "classify"
          }
        },
        // 关联查询users表
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $project: {
            type: 1,
            balance: 1,
            createDate: 1,
            content: 1,
            username: "$user.username",
            name: "$classify.name",
            stName: "$classify.stName"
          }
        }
      ])
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  },
  // 返回符合条件的list
  count(query = {}) {
    return new Promise((resolve, reject) => {
      Record.find(query)
        .then(res => resolve(res))
        .catch(res => reject(0));
    });
  },
  findOneById(id) {
    return new Promise((resolve, reject) => {
      Record.findOneById(id)
        .then(res => resolve(res))
        .catch(res => reject(0));
    });
  },
  deleteOneById() {},
  deletes() {},
  addOne() {},
  updateOneById() {}
};
