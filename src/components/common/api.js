import common from './common';

const api = 'https://jrfy.szyinghe.cn';
const path = {
  '根据手机号获取学员信息': `${api}/Member/GetInfoByPhone`,
  '获取验证码': `${api}/Member/GetValidateCode`,
  '纠错': `${api}/Member/UpdateInfo`,
  '学员确认信息': `${api}/Member/InfoConfirm`,
  '用户反馈': `${api}/Member/SubmitMessage`,
  '教学点列表': `${api}/Member/GetSchoolList`,
  '登陆': `${api}/Member/Login`,
  '根据学生Id获取信息': `${api}/Member/GetInfoById`,
  '根据日期获取签到状态': `${api}/Course/GetSignInDateList`,
  '根据日期获取课程': `${api}/Course/GetCourseListByDate`,
  '学员课程详情': `${api}/Course/GetCourseDetail`,
  '老师查看课程': `${api}/Course/GetCourseSignInDetail`,
  '老师查看课程签到列表': `${api}/Course/GetSignInList`,
  '学生签到': `${api}/Course/CourseSignIn`,
  '老师确认签到': `${api}/Course/ConfirmSignIn`,
  '老师一键确认签到': `${api}/Course/ConfirmSignInAll`,
  '满意度调查': `${api}/Questionnaire/GetQuestionnaireDetail`,
  '问卷提交': `${api}/Questionnaire/SubmitQuestionnaire`,
  '视频课程列表': `${api}/Course/GetVedioCourceList`,
  '视频课程详情': `${api}/Course/GetVedioCourseDetail`,
  '视频课程签到': `${api}/Course/VedioCourseSignIn`,
  '科目列表': `${api}/Exam/GetSubjectList`,
  '科目详情': `${api}/Exam/GetSubjectDetail`,
  '交卷': `${api}/Exam/SubmitExam`,
  '公司列表': `${api}/Company/GetCompanyList`,
  '职位列表': `${api}/Company/GetRecruitList`,
  '老师根据日期获取签到状态': `${api}/Course/GetDateListByTeacher`,
  '老师根据日期获取课程': `${api}/Course/GetCourseListByTeacher`,
  '文章列表': `${api}/Article/GetArticleList`,
  '文章详情': `${api}/Article/GetArticleDetail`,
  '关于我们': `${api}/Article/GetArticleDetailByEnCode`,
  '考试成绩':`${api}/Member/GetMyScorelist`,
  '学员签到列表':`${api}/Member/GetMySignInlist`,
  '我的证书':`${api}/Member/GetMyDiploma`,
  '人才交流':`${api}/Company/GetRcjlCompanyList`,
  '人才交流详情':`${api}/Company/GetRcjlRecruitList`,
  '用户协议':`${api}/Article/GetArticleDetailByEnCode?enCode=yhxy`
};
const load = {
  show() {
    mpvue.showLoading({
      title: '请稍后...',
      mask:true
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
          if (res.data.Success) {
            resolve(res.data);
          } else {
            mpvue.showToast({
              title: res.data.Msg,
              icon: "none",
              duration: 1000
            });
          }
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
          if (res.data.Success) {
            resolve(res.data);
          } else {
            mpvue.showToast({
              title: res.data.Msg,
              icon: "none",
              duration: 1000
            });
          }
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
          if (res.data.Success) {
            resolve(res.data);
          } else {
            mpvue.showToast({
              title: res.data.Msg,
              icon: "none",
              duration: 1000
            });
          }
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
          if (res.data.Success) {
            resolve(res.data);
          } else {
            mpvue.showToast({
              title: res.data.Msg,
              icon: "none",
              duration: 1000
            });
          }
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
const $signPost = (name, data, header,isArgs) => {
  load.show();
  return new Promise((resolve, reject) => {
    if(!isArgs){
      data={
        args:JSON.stringify(data)
      }
    }
    let obj = {
      url: path[name],
      method: 'POST',
      dataType: 'json',
      data: data,
      success(res) {
        load.hide();
        if (res.statusCode == '200') {
          if (res.data.Success) {
            resolve(res.data);
          } else {
            mpvue.showToast({
              title: res.data.Msg,
              icon: "none",
              duration: 1000
            });
          }
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
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        ...header,
        ...common.getSign(data)
      };
    } else {
      obj.header = {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        ...common.getSign(data)
      };
    }
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
          if (res.data.Success) {
            resolve(res.data);
          } else {
            mpvue.showToast({
              title: res.data.Msg,
              icon: "none",
              duration: 1000
            });
          }
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
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        ...header,
        ...common.getSign(data)
      };
    } else {
      obj.header = {
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        ...common.getSign(data)
      };
    }
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
