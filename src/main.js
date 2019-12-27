import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

import hint from './components/hint/hint'
Vue.component('hint', hint);
import loadData from './components/loadData'
Vue.component('load-data', loadData);
import select from './components/select/select'
Vue.component('single-select', select);

import common from './components/common/common';
Vue.prototype.$common = common;

import api from './components/common/api';
Vue.prototype.$api = api;

let getInfo = (e, fn) => {
  let _userInfo = e.detail.userInfo;
  if (_userInfo) {
    //用户按了允许授权按钮
    mpvue.setStorageSync("userInfo", _userInfo);
    if (fn) fn(_userInfo)
  }
}
// 查看是否授权
mpvue.getSetting({
  success: function (res) {
    if (res.authSetting['scope.userInfo']) {
      mpvue.getUserInfo({
        success: function (res) {
          //用户已经授权过
          if (!mpvue.getStorageSync("userInfo")) {
            getInfo({
              detail: {
                userInfo: res.userInfo
              }
            });
          }
        }
      })
    }
  }
})
Vue.prototype.getInfo = getInfo;

const app = new Vue(App)
app.$mount()
