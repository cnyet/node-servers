/**
 * 随机字符串
 */
exports.randomStr = function() {
  return Math.random().toString(16).substr(2);
}

exports.combine = function(params) {
  var keys = Object.keys(params).sort();
  var arr = keys.map(function(item, index){
    if (index < keys.length -1) {
      item = item + '=' + params[item] + '&';
    } else {
      item = item + '=' + params[item];
    }
    return item;
  });
  var res = arr.reduce(function(accumulator, currentVal) {
    return accumulator + currentVal;
  });
  return res;
}