import common from './common';

const api = 'https://jrfy.szyinghe.cn';
const path = {
  '根据手机号获取学员信息': `${api}/Member/GetInfoByPhone`,
  '获取验证码': `${api}/Member/GetValidateCode`,
  '纠错': `${api}/Member/UpdateInfo`,
  '学员确认信息': `${api}/Member/InfoConfirm`,
  '用户反馈': `${api}/Member/SubmitMessage`,
  '教学点列表': `${api}/Member/GetSchoolList`,
  '课程详情': `${api}/Course/GetVedioCourseDetail`,
  '登陆':`${api}/Member/Login`,
  '根据学生Id获取信息':`${api}/Member/GetInfoById`
};
const load = {
  show() {
    mpvue.showLoading({
      title: '请稍后...'
    });
  },
  hide() {
    mpvue.hideLoading();
  }
}
const $get = (name, data, header) => {
  load.show();
  return new Promise((resolve, reject) => {
    let obj = {
      url: path[name],
      method: 'GET',
      dataType: 'json',
      data: data,
      success(res) {
        load.hide();
        if (res.statusCode == '200') {
          resolve(res.data);
        } else {
          mpvue.showToast({
            title: "网络异常，请稍后重试",
            icon: "none",
            duration: 1000
          });
          reject(res);
        }
      },
      fail(res) {
        load.hide();
        mpvue.showToast({
          title: "网络异常，请稍后重试",
          icon: "none",
          duration: 1000
        });
        reject(res);
      }
    };
    if (header) {
      obj.header = header;
    }
    mpvue.request(obj);
  })
}
const $post = (name, data, header) => {
  load.show();
  return new Promise((resolve, reject) => {
    let obj = {
      url: path[name],
      method: 'POST',
      dataType: 'json',
      data: data,
      success(res) {
        load.hide();
        if (res.statusCode == '200') {
          resolve(res.data);
        } else {
          mpvue.showToast({
            title: "网络异常，请稍后重试",
            icon: "none",
            duration: 1000
          });
          reject(res);
        }
      },
      fail(res) {
        load.hide();
        mpvue.showToast({
          title: "网络异常，请稍后重试",
          icon: "none",
          duration: 1000
        });
        reject(res);
      }
    };
    if (header) {
      obj.header = header;
    }
    mpvue.request(obj);
  })
}
const $keyGet = (name, data, header) => {
  load.show();
  return new Promise((resolve, reject) => {
    let obj = {
      url: path[name],
      method: 'GET',
      dataType: 'json',
      data: {
        loginKey: mpvue.getStorageSync('loginKey'),
        ...data
      },
      success(res) {
        load.hide();
        if (res.statusCode == '200') {
          resolve(res.data);
        } else {
          mpvue.showToast({
            title: "网络异常，请稍后重试",
            icon: "none",
            duration: 1000
          });
          reject(res);
        }
      },
      fail(res) {
        load.hide();
        mpvue.showToast({
          title: "网络异常，请稍后重试",
          icon: "none",
          duration: 1000
        });
        reject(res);
      }
    };
    if (header) {
      obj.header = header;
    }
    mpvue.request(obj);
  })
}
const $keyPost = (name, data, header) => {
  load.show();
  return new Promise((resolve, reject) => {
    let obj = {
      url: path[name],
      method: 'POST',
      dataType: 'json',
      data: {
        loginKey: mpvue.getStorageSync('loginKey'),
        ...data
      },
      success(res) {
        load.hide();
        if (res.statusCode == '200') {
          resolve(res.data);
        } else {
          mpvue.showToast({
            title: "网络异常，请稍后重试",
            icon: "none",
            duration: 1000
          });
          reject(res);
        }
      },
      fail(res) {
        load.hide();
        mpvue.showToast({
          title: "网络异常，请稍后重试",
          icon: "none",
          duration: 1000
        });
        reject(res);
      }
    };
    if (header) {
      obj.header = header;
    }
    mpvue.request(obj);
  })
}
const $signPost = (name, data, header) => {
  load.show();
  return new Promise((resolve, reject) => {
    let obj = {
      url: path[name],
      method: 'POST',
      dataType: 'json',
      data: {
        ...data
      },
      success(res) {
        load.hide();
        if (res.statusCode == '200') {
          resolve(res.data);
        } else {
          mpvue.showToast({
            title: "网络异常，请稍后重试",
            icon: "none",
            duration: 1000
          });
          reject(res);
        }
      },
      fail(res) {
        load.hide();
        mpvue.showToast({
          title: "网络异常，请稍后重试",
          icon: "none",
          duration: 1000
        });
        reject(res);
      }
    };
    if (header) {
      obj.header = header;
      obj.header = {
        ...header,
        ...common.getSign(data)
      };
    } else {
      obj.header = common.getSign(data);
    }
    console.log(obj.header);
    mpvue.request(obj);
  })
}
const $signGet = (name, data, header) => {
  load.show();
  return new Promise((resolve, reject) => {
    let obj = {
      url: path[name],
      method: 'GET',
      dataType: 'json',
      data: {
        ...data
      },
      success(res) {
        load.hide();
        if (res.statusCode == '200') {
          resolve(res.data);
        } else {
          mpvue.showToast({
            title: "网络异常，请稍后重试",
            icon: "none",
            duration: 1000
          });
          reject(res);
        }
      },
      fail(res) {
        load.hide();
        mpvue.showToast({
          title: "网络异常，请稍后重试",
          icon: "none",
          duration: 1000
        });
        reject(res);
      }
    };
    if (header) {
      obj.header = header;
      obj.header = {
        ...header,
        ...common.getSign(data)
      };
    } else {
      obj.header = common.getSign(data);
    }
    console.log(obj.header);
    mpvue.request(obj);
  })
}
export default {
  $get,
  $post,
  $keyGet,
  $keyPost,
  api,
  $signPost,
  $signGet
}
