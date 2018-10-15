const moment = require("moment");
/**
 * 根据年&周数返回当周的startDate和endDate
 * year:  年份
 * index: 周数 1开始
 * return: ['2015-02-12','2015-02-19']
 */
const weekFormat = function(year, index) {
  index = Number(index);
  var d = new Date(year, 0, 1);
  while (d.getDay() !== 1) {
    d.setDate(d.getDate() + 1);
  }
  var to = new Date(year + 1, 0, 1);
  var i = 1;
  var arr = [];

  // eslint-disable-next-line
  for (var from = d; from < to; ) {
    if (i === index) {
      arr.push(moment(from).format("YYYY-MM-DD"));
    }
    var j = 6;
    while (j > 0) {
      from.setDate(from.getDate() + 1);
      if (i === index && j === 1) {
        arr.push(moment(from).format("YYYY-MM-DD"));
      }
      j--;
    }
    if (i === index) {
      return arr;
    }
    from.setDate(from.getDate() + 1);
    i++;
  }
};

/**
 *
 * type:日0 周1 月2
 */
function caculate(params) {
  const { sdate, edate, type } = params;
  const _format = params._format || "YYYY-MM-DD"; // hh:mm:ss
  //   ===  -1 是因为moment是以周日为一周的开始的
  const s = moment(sdate).subtract(1, "d");
  const e = moment(edate).subtract(1, "d");
  const sYear = s.year(); // 起始年
  const eYear = e.year(); // 结束年
  const sWeek = s.week(); // 在该年的起始周
  const eWeek = e.week(); // 在该年的结束周
  let monthArr = [];
  //   if (sYear === eYear) {
  //     // 在同一年
  //     for (let j = sWeek; j <= eWeek; j++) {
  //       let range = weekFormat(sYear, j); // 当前周的时间范围
  //       if (j === sWeek) {
  //         //   第一次 起始时间放sdate
  //         monthArr.push([s.add(1, "d").format(_format), range[1]]);
  //       } else if (j === eWeek) {
  //         //   最后一次 结束时间放edate
  //         monthArr.push([range[0], e.add(1, "d").format(_format)]);
  //       } else {
  //         monthArr.push([range[0], range[1]]);
  //       }
  //     }
  //   } else {
  // 不在同一年
  for (let i = sYear; i <= eYear; i++) {
    let sWeek2, eWeek2;

    if (i === sYear) {
      sWeek2 = sWeek;
      eWeek2 = moment(i + 1 + "-01-01")
        .subtract(2, "d")
        .week(); // 起始年份的结束周
    } else if (i === eYear) {
      sWeek2 = 1;
      eWeek2 = eWeek;
    } else {
      sWeek2 = 1;
      eWeek2 = moment(i + 1 + "-01-01")
        .subtract(2, "d")
        .week();
    }
    console.log(sWeek2, eWeek2);
    for (let j = sWeek2; j <= eWeek2; j++) {
      console.log("for:", i, j);
      let range = weekFormat(i, j); // 当前周的时间范围
      console.log(range);


      if (j === sWeek2) {
        //   第一次 起始时间放sdate
        monthArr.push([s.add(1, "d").format(_format), range[1]]);
      } else if (j === eWeek2) {
        //   最后一次 结束时间放edate
        monthArr.push([range[0], e.add(1, "d").format(_format)]);
      } else {
        monthArr.push([range[0], range[1]]);
      }
    }
  }
  //   }
//   return monthArr;
    return [];
}

const res = caculate({
  sdate: "2017-09-30",
  edate: "2018-02-28",
  type: 0
});

console.log(res);
