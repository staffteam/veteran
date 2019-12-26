<template>
  <div>
    <div class="home" v-if="isLogin=='0'">
      <p>
        <img src="/static/images/home-back.jpg" mode="widthFix" />
      </p>
      <ul>
        <li v-for="(item,index) in homeNavData" :key="index">
          <a :href="item.url">
            <p>
              <img :src="item.icon" mode="widthFix" />
            </p>
            <h2>{{item.title}}</h2>
          </a>
        </li>
      </ul>
    </div>
    <div class="login" v-if="isLogin=='1'">
      <p>
        <img src="/static/images/login-back.jpg" mode="widthFix" />
      </p>
      <div class="login-main">
        <div class="title">
          <p>您好！</p>
          <p>欢迎来到军戎飞扬</p>
        </div>
        <div class="form">
          <div class="item">
            <i class="iconfont icon--umpuser2"></i>
            <input
              type="number"
              v-model="form.phone"
              placeholder="请输入手机号码"
              placeholder-style="color:#A87D57;"
            />
          </div>
          <div class="item">
            <i class="iconfont icon-mima"></i>
            <input
              type="text"
              v-model="form.code"
              placeholder="请输入验证码"
              placeholder-style="color:#A87D57;"
            />
            <p @click="getCode()" :class="!isGetCode?'on':''">{{codeText}}</p>
          </div>
        </div>
        <div class="agreement">
          输入验证码表示同意
          <a href="../agreement/main">《用户协议》</a>
        </div>
        <div class="submit-btn" v-if="!hasUserInfo">
          登录
          <button class="userLogin" open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
        </div>
        <div class="submit-btn" @click="goLogin()" v-if="hasUserInfo">登录</div>
      </div>
    </div>
    <hint :commonMsg="commonMsg" :title="commonTitle" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      commonMsg: false,
      commonTitle: "",
      form: {
        phone: "",
        code: ""
      },
      codeText: "获取验证码",
      homeNavData: [
        {
          title: "工作方案",
          url: "../workProgram/list/main",
          icon: "/static/images/home-list1.png"
        },
        {
          title: "课程安排",
          url: "../agenda/list/main",
          icon: "/static/images/home-list2.png"
        },
        {
          title: "课程回放",
          url: "../course/playback/main",
          icon: "/static/images/home-list3.png"
        },
        {
          title: "在线试题",
          url: "../testQuestions/main",
          icon: "/static/images/home-list4.png"
        },
        {
          title: "上课签到",
          url: "../sign/in/main",
          icon: "/static/images/home-list5.png"
        },
        {
          title: "文体娱乐",
          url: "../entertainment/list/main",
          icon: "/static/images/home-list6.png"
        },
        {
          title: "结业典礼",
          url: "../closingCeremony/list/main",
          icon: "/static/images/home-list7.png"
        },
        {
          title: "技能培训",
          url: "../skillTraining/list/main",
          icon: "/static/images/home-list8.png"
        },
        {
          title: "调查问卷",
          url: "../questionnaire/main",
          icon: "/static/images/home-list9.png"
        },
        {
          title: "组织架构",
          url: "../structure/list/main",
          icon: "/static/images/home-list10.png"
        },
        {
          title: "开班仪式",
          url: "../ceremony/list/main",
          icon: "/static/images/home-list11.png"
        },
        {
          title: "企业招聘",
          url: "../recruitment/list/main",
          icon: "/static/images/home-list12.png"
        },
        {
          title: "人才空间",
          url: "../talentSpace/list/main",
          icon: "/static/images/home-list13.png"
        },
        {
          title: "学员查询",
          url: "../student/query/main",
          icon: "/static/images/home-list15.png"
        },
        {
          title: "敬请期待",
          url: "",
          icon: "/static/images/home-list14.png"
        }
      ],
      hasUserInfo: false,
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      isLogin: "-1",
      isGetCode: false,
      isCode:""
    };
  },
  methods: {
    getUserInfo: function(e) {
      if (!e.mp.detail || !e.mp.detail.userInfo) return;
      var vm = this;
      var userInfo_ = e.mp.detail.userInfo;
      vm.hasUserInfo = true;
      vm.getInfo(userInfo_, _ => {
        vm.goLogin();
      });
    },
    showHint(text, time = 1000) {
      let vm = this;
      vm.commonMsg = true;
      vm.commonTitle = text;
      setTimeout(_ => {
        vm.commonMsg = false;
        vm.commonTitle = "";
      }, time);
    },
    goLogin() {
      let vm = this;
      if (vm.form.phone == "") {
        vm.showHint("请输入手机号");
      } else if (!/^1[3456789]\d{9}$/.test(vm.form.phone)) {
        vm.showHint("手机号格式有误");
      } else if (vm.form.code == "") {
        vm.showHint("请输入验证码");
      } else if (vm.form.code != vm.isCode) {
        vm.showHint("验证码有误");
      } else {
        this.$api
          .$signGet("根据手机号获取学员信息", {
            phone: vm.form.phone,
            userid: mpvue.getStorageSync("loginCode")
          })
          .then(res => {
            debugger;
            if (res.ErrorCode == 1) {
              let userInfo = mpvue.getStorageSync("userInfo");
              mpvue.setStorageSync("userInfo", {
                ...userInfo,
                ...res.Data,
                loginKey: mpvue.getStorageSync("loginCode"),
                wx_avatarUrl: userInfo.avatarUrl,
                wx_city: userInfo.city
              });
              vm.form.phone = "";
              vm.form.code = "";
              vm.hasUserInfo = false;
              mpvue.setStorageSync("oneLogin", "1");
              mpvue.navigateTo({
                url: "../affirmInfo/one/main"
              });
            } else {
            }
          });
      }
    },
    getCode() {
      let vm = this;
      if (vm.codeText == "获取验证码" || vm.codeText == "重新获取验证码") {
        if (vm.form.phone == "") {
          vm.showHint("请输入手机号");
        } else if (!/^1[3456789]\d{9}$/.test(vm.form.phone)) {
          vm.showHint("手机号格式有误");
        } else {
          this.$api
            .$signGet("获取验证码", {
              phone: String(vm.form.phone)
            })
            .then(res => {
              if (res.ErrorCode == 1) {
                mpvue.showToast({
                  title: "发送成功",
                  icon: "success",
                  duration: 1000
                });
                vm.codeText = "60s后重新获取";
                vm.isGetCode = true;
                vm.isCode = res.Data;
                let _i = 60;
                let timeObj = setInterval(_ => {
                  _i--;
                  if (_i == 0) {
                    vm.codeText = "重新获取验证码";
                    clearInterval(timeObj);
                    vm.isGetCode = false;
                  } else {
                    vm.codeText = `${_i}s后重新获取`;
                  }
                }, 1000);
              } else {
                mpvue.showToast({
                  title: res.Msg,
                  icon: "none",
                  duration: 1000
                });
              }
            });
        }
      }
    }
  },
  created() {
    let userInfo = mpvue.getStorageSync("userInfo");
    if (!userInfo.loginKey) {
      //没有登录
      mpvue.hideTabBar();
    }
  },
  onShow() {
    mpvue.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#E53330",
      animation: {
        duration: 400,
        timingFunc: "easeIn"
      }
    });
    if (!mpvue.getStorageSync("loginCode")) {
      mpvue.login({
        success: function(res) {
          if (res.code) {
            // 发起网络请求
            let _code = res.code;
            mpvue.setStorageSync("loginCode", _code);
          } else {
            mpvue.showToast({
              title: "网络发生异常！",
              icon: "none",
              duration: 2000
            });
          }
        }
      });
    }
    let oneLogin = mpvue.getStorageSync("oneLogin");
    let userInfo = mpvue.getStorageSync("userInfo");
    let loginKey = mpvue.getStorageSync("loginKey");
    //没有认证但登录了，跳转至认证模块
    if (!loginKey && userInfo && userInfo.loginKey && oneLogin != "1") {
      mpvue.redirectTo({
        url: "../affirmInfo/one/main"
      });
    } else {
      mpvue.setStorageSync("oneLogin", "-1");
      if (userInfo.loginKey && loginKey) {
        this.isLogin = "0";
        mpvue.showTabBar();
      }
      if (!userInfo.loginKey) {
        this.isLogin = "1";
        mpvue.hideTabBar();
      }
    }
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  & > p {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
    }
  }
  ul {
    position: relative;
    z-index: 9;
    width: calc(~"100% - 80rpx");
    margin: 40rpx auto;
    li {
      text-align: center;
      width: calc(~"82% / 3");
      margin: 30rpx 3%;
      position: relative;
      overflow: hidden;
      border-radius: 24rpx;
      float: left;
      p {
        width: 150rpx;
        height: 150rpx;
        margin: 0 auto;
        border-radius: 20rpx;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      h2 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 32rpx;
        color: white;
        line-height: 60rpx;
      }
    }
  }
}
.login {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  & > p {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
    }
  }
  .login-main {
    position: relative;
    z-index: 9;
    .title {
      padding-top: 100rpx;
      padding-left: 95rpx;
      font-size: 44rpx;
      color: rgba(229, 51, 48, 1);
      line-height: 62rpx;
    }
    .form {
      margin: 130rpx 75rpx 0;
      .item {
        padding: 0 20rpx;
        border-bottom: 2rpx solid #e53330;
        overflow: hidden;
        i.iconfont {
          font-size: 29rpx;
          color: #e53330;
          float: left;
          width: 75rpx;
          display: block;
          text-align: center;
          line-height: 50rpx;
          padding: 20rpx 0;
        }
        input {
          height: 90rpx;
          font-size: 28rpx;
          color: #a87d57;
          width: calc(~"100% - 75rpx");
          display: block;
          float: right;
        }
        &:last-child {
          margin-top: 40rpx;
          input {
            width: calc(~"100% - 275rpx");
            float: left;
          }
          p {
            width: 200rpx;
            float: right;
            line-height: 50rpx;
            color: #a87d57;
            text-align: right;
            font-size: 28rpx;
            padding: 20rpx 0;
            &.on {
              color: #e53330;
            }
          }
        }
      }
    }
    .agreement {
      margin: 30rpx 85rpx;
      font-size: 24rpx;
      color: rgba(168, 125, 87, 1);
      line-height: 33rpx;
      a {
        display: inline-block;
        font-size: 24rpx;
        color: #e53330;
      }
    }
    .submit-btn {
      width: 380rpx;
      height: 86rpx;
      margin: 120rpx auto 0;
      background: rgba(229, 51, 48, 1);
      border-radius: 8rpx;
      text-align: center;
      font-size: 32rpx;
      line-height: 86rpx;
      color: white;
      position: relative;
      button {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        opacity: 0;
      }
    }
  }
}
</style>
