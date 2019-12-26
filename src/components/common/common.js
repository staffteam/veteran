import hexMD5 from './md5';
const guid = _ => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
const getSign = param => {
  //签名算法:appId+time+guid+body+appSecret
  let appId = "AppAdmin";
  let appSecret = "VjxNekN2G2z0qrjW";
  let time = format('yyyy-MM-dd hh:mm:ss');
  let newGuid = guid();
  let sign = hexMD5(appId + time + newGuid + JSON.stringify(param) + appSecret);
  return {
    appId,
    time,
    guid:newGuid,
    sign
  };
}
const format = (format, date) => {
  date = date || new Date();
  var o = {
    "M+": date.getMonth() + 1, //month
    "d+": date.getDate(), //day
    "h+": date.getHours(), //hour
    "m+": date.getMinutes(), //minute
    "s+": date.getSeconds(), //second
    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
    "S": date.getMilliseconds() //millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}
export default {
  getSign,
  format
};
