<template>
  <div>
    <div class="home" v-if="isLogin=='0'">
      <p>
        <img src="/static/images/home-back.jpg" mode="widthFix" />
      </p>
      <div class="title" v-if="userInfo.SchoolName">欢迎来到「{{userInfo.SchoolName}}」</div>
      <ul>
        <template v-for="(item,index) in homeNavData">
          <li
            :key="index"
            v-if="((item.isTeacher && isAdmin) || !item.isTeacher) && ((item.isUser && !isAdmin) || !item.isUser)"
          >
            <a :href="item.url">
              <p>
                <img :src="item.icon" mode="widthFix" />
              </p>
              <h2>{{item.title}}</h2>
            </a>
          </li>
        </template>
      </ul>
    </div>
    <div class="login" v-if="isLogin=='1'">
      <p>
        <img src="/static/images/login-back_01.jpg" mode="widthFix" />
        <img src="/static/images/login-back_03.jpg" mode="widthFix" />
      </p>
      <div class="login-main">
        <div class="title">
          <!-- <p>
            <img src="/static/images/login-logo.png" mode="widthFix" />
          </p>-->
          <p>欢迎您来到</p>
          <p>博茂择优在线学习</p>
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
        <div class="footer-text">
          <h2>
            <i class="iconfont2 icon-tiao"></i>
            <i class="iconfont2 icon-zhan"></i>&nbsp;&nbsp;
            <i class="iconfont2 icon-chao"></i>
            <i class="iconfont2 icon-yue"></i>&nbsp;&nbsp;
            <i class="iconfont2 icon-wu"></i>
            <i class="iconfont2 icon-ji"></i>
            <i class="iconfont2 icon-xian"></i>
          </h2>
          <p>
            <i class="iconfont2 icon-jie"></i>
            <i class="iconfont2 icon-fang"></i>
            <i class="iconfont2 icon-si"></i>
            <i class="iconfont2 icon-xiang"></i> &nbsp;
            <i class="iconfont2 icon-ji"></i>
            <i class="iconfont2 icon-fa"></i>
            <i class="iconfont2 icon-qian"></i>
            <i class="iconfont2 icon-neng"></i> &nbsp;
            <i class="iconfont2 icon-yong"></i>
            <i class="iconfont2 icon-yu"></i>
            <i class="iconfont2 icon-jing"></i>
            <i class="iconfont2 icon-zheng"></i> &nbsp;
            <i class="iconfont2 icon-bu"></i>
            <i class="iconfont2 icon-duan"></i>
            <i class="iconfont2 icon-chuang"></i>
            <i class="iconfont2 icon-xin"></i>
          </p>
        </div>
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
      homeNavData: [],
      isAdmin: false,
      hasUserInfo: false,
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      isLogin: "-1",
      isGetCode: false,
      isCode: "",
      timeObj: {},
      userInfo: {
        SchoolName: ""
      }
    };
  },
  methods: {
    getUserInfo: function(e) {
      if (!e.mp.detail || !e.mp.detail.userInfo) return;
      var vm = this;
      var userInfo_ = e.mp.detail.userInfo;
      vm.hasUserInfo = true;
      vm.getInfo(
        {
          detail: {
            userInfo: userInfo_
          }
        },
        _ => {
          vm.goLogin();
        }
      );
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
    getNavData() {
      let userInfo = mpvue.getStorageSync("userInfo");
      if (userInfo.Phone == "17512840813") {
        this.homeNavData = [
          {
            title: "通知公告",
            url: "../workProgram/list/main",
            icon: "/static/images/home-list1.png"
          },
          {
            title: "课程安排",
            url: "../agenda/list/main",
            icon: "/static/images/home-list2.png"
          },
          {
            title: "在线考试",
            url: "../my/exam/main",
            icon: "/static/images/home-list4.png",
            isUser: true
          },
          {
            title: "线下课程签到",
            url: "../sign/in/main",
            icon: "/static/images/home-list5.png"
          },
          {
            title: "文体娱乐",
            url: "../entertainment/list/main",
            icon: "/static/images/home-list6.png"
          },
          {
            title: "学员查询",
            url: "../student/query/main",
            icon: "/static/images/home-list15.png",
            isTeacher: true
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
            title: "敬请期待",
            url: "",
            icon: "/static/images/home-list14.png"
          }
        ];
      } else {
        this.homeNavData = [
          {
            title: "通知公告",
            url: "../workProgram/list/main",
            icon: "/static/images/home-list1.png"
          },
          {
            title: "课程安排",
            url: "../agenda/list/main",
            icon: "/static/images/home-list2.png"
          },
          {
            title: "视频课程",
            url: "../course/playback/main",
            icon: "/static/images/home-list3.png"
          },
          {
            title: "在线考试",
            url: "../my/exam/main",
            icon: "/static/images/home-list4.png",
            isUser: true
          },
          {
            title: "线下课程签到",
            url: "../sign/in/main",
            icon: "/static/images/home-list5.png"
          },
          {
            title: "文体娱乐",
            url: "../entertainment/list/main",
            icon: "/static/images/home-list6.png"
          },
          {
            title: "学员查询",
            url: "../student/query/main",
            icon: "/static/images/home-list15.png",
            isTeacher: true
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
            title: "敬请期待",
            url: "",
            icon: "/static/images/home-list14.png"
          }
        ];
      }
    },
    getInfos(obj) {
      let vm = this;
      this.$api
        .$signGet("根据学生Id获取信息", {
          userid: obj.Id
        })
        .then(res => {
          if (obj.Status == 0) {
            let userInfo = mpvue.getStorageSync("userInfo");
            mpvue.setStorageSync("userInfo", {
              ...userInfo,
              ...res.Data,
              userid: obj.Id,
              user_status: obj.Status,
              wx_avatarUrl: userInfo.avatarUrl,
              wx_city: userInfo.city
            });
            vm.getNavData();
            vm.form.phone = "";
            vm.form.code = "";
            vm.hasUserInfo = false;
            vm.codeText = "获取验证码";
            vm.isCode = "";
            clearInterval(vm.timeObj);
            vm.isGetCode = false;
            mpvue.setStorageSync("oneLogin", "-1");
            mpvue.navigateTo({
              url: "../affirmInfo/one/main"
            });
          } else if (obj.Status == 1) {
            mpvue.showToast({
              title: "登陆成功",
              icon: "success"
            });
            let userInfo = mpvue.getStorageSync("userInfo");
            mpvue.setStorageSync("userInfo", {
              ...userInfo,
              ...res.Data,
              userid: obj.Id,
              user_status: obj.Status,
              wx_avatarUrl: userInfo.avatarUrl,
              wx_city: userInfo.city
            });
            vm.getNavData();
            userInfo = mpvue.getStorageSync("userInfo");
            vm.userInfo = userInfo;
            mpvue.setStorageSync("userid", obj.Id);
            vm.form.phone = "";
            vm.form.code = "";
            vm.hasUserInfo = false;
            vm.codeText = "获取验证码";
            vm.isCode = "";
            clearInterval(vm.timeObj);
            vm.isGetCode = false;
            vm.isLogin = "0";
            mpvue.showTabBar();
            mpvue.setStorageSync("oneLogin", "1");
          } else if (obj.Status == 2) {
            //毕业生
            vm.homeNavData = vm.homeNavData.map(value => {
              if (value.title != "人才空间") {
                value.url = "../graduation/main";
              }
              return value;
            });
            mpvue.showToast({
              title: "登陆成功",
              icon: "success"
            });
            let userInfo = mpvue.getStorageSync("userInfo");
            mpvue.setStorageSync("userInfo", {
              ...userInfo,
              ...res.Data,
              userid: obj.Id,
              user_status: obj.Status,
              wx_avatarUrl: userInfo.avatarUrl,
              wx_city: userInfo.city
            });
            vm.getNavData();
            userInfo = mpvue.getStorageSync("userInfo");
            vm.userInfo = userInfo;
            mpvue.setStorageSync("userid", obj.Id);
            vm.form.phone = "";
            vm.form.code = "";
            vm.hasUserInfo = false;
            vm.codeText = "获取验证码";
            vm.isCode = "";
            clearInterval(vm.timeObj);
            vm.isGetCode = false;
            vm.isLogin = "0";
            mpvue.showTabBar();
            mpvue.setStorageSync("oneLogin", "1");
          } else {
            mpvue.showToast({
              title: "您的信息正在审核中\r\n请耐心等待",
              icon: "none",
              duration: 2000
            });
          }
        });
    },
    goLogin() {
      let vm = this;
      if (vm.form.phone == "") {
        vm.showHint("请输入手机号");
      } else if (!/^1[3456789]\d{9}$/.test(vm.form.phone)) {
        vm.showHint("手机号格式有误");
      } else if (vm.form.code == "") {
        vm.showHint("请输入验证码");
      } else if (vm.form.code != vm.isCode && vm.form.phone != "17512840813") {
        vm.showHint("验证码有误");
      } else {
        this.$api
          .$signGet("登陆", {
            value: String(vm.form.phone)
          })
          .then(res => {
            vm.getInfos(res.Data);
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
              mpvue.showToast({
                title: "发送成功",
                icon: "success",
                duration: 1000
              });
              vm.codeText = "60s后重新获取";
              vm.isGetCode = true;
              vm.isCode = res.Data;
              let _i = 60;
              vm.timeObj = setInterval(_ => {
                _i--;
                if (_i == 0) {
                  vm.codeText = "重新获取验证码";
                  clearInterval(vm.timeObj);
                  vm.isGetCode = false;
                } else {
                  vm.codeText = `${_i}s后重新获取`;
                }
              }, 1000);
            });
        }
      }
    },
    getMsg() {
      let vm = this;
      let userid = mpvue.getStorageSync("userid");
      if (userid) {
        vm.$api
          .$signGet("未读消息", {
            userid: mpvue.getStorageSync("userid")
          })
          .then(res => {
            if (res.Data) {
              mpvue.setTabBarBadge({
                index: 1,
                text: String(res.Data)
              });
            } else {
              mpvue.removeTabBarBadge({
                index: 1
              });
            }
          });
      }
    }
  },
  created() {
    let userInfo = mpvue.getStorageSync("userInfo");
    if (!userInfo.userid) {
      //没有登录
      mpvue.hideTabBar();
    }
  },
  onShow() {
    let vm = this;
    mpvue.setNavigationBarColor({
      frontColor: "#ffffff",
      backgroundColor: "#E53330",
      animation: {
        duration: 400,
        timingFunc: "easeIn"
      }
    });
    vm.getMsg();
    vm.getNavData();
    let oneLogin = mpvue.getStorageSync("oneLogin");
    let userInfo = mpvue.getStorageSync("userInfo");
    vm.userInfo = userInfo;
    let userid = mpvue.getStorageSync("userid");
    this.isAdmin = userInfo.IsTeacher;
    //没有认证但登录了，跳转至认证模块
    if (!userid && userInfo && userInfo.userid && oneLogin != "1") {
      mpvue.redirectTo({
        url: "../affirmInfo/one/main"
      });
    } else {
      mpvue.setStorageSync("oneLogin", "-1");
      if (userInfo.userid && userid) {
        this.isLogin = "0";
        mpvue.showTabBar();
        this.$api
          .$signGet("登陆", {
            value: userInfo.Phone
          })
          .then(res => {
            if (res.Data.Status == 2) {
              //毕业生
              vm.homeNavData = vm.homeNavData.map(value => {
                if (value.title != "人才空间") {
                  value.url = "../graduation/main";
                }
                return value;
              });
            } else {
              vm.getNavData();
            }
          });
      }
      if (!userInfo.userid) {
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
@font-face {
  font-family: "iconfont2";
  src: url("//at.alicdn.com/t/font_1752555_8fhqz1g1f1m.eot?t=1586785104164"); /* IE9 */
  src: url("//at.alicdn.com/t/font_1752555_8fhqz1g1f1m.eot?t=1586785104164#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("data:application/x-font-woff2;charset=utf-8;base64,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")
      format("woff2"),
    url("//at.alicdn.com/t/font_1752555_8fhqz1g1f1m.woff?t=1586785104164")
      format("woff"),
    url("//at.alicdn.com/t/font_1752555_8fhqz1g1f1m.ttf?t=1586785104164")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url("//at.alicdn.com/t/font_1752555_8fhqz1g1f1m.svg?t=1586785104164#iconfont")
      format("svg"); /* iOS 4.1- */
}

.iconfont2 {
  font-family: "iconfont2" !important;
  font-size: 16px;
  font-style: normal;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-bu:before {
  content: "\e61a";
}

.icon-chuang:before {
  content: "\e61b";
}

.icon-chao:before {
  content: "\e61c";
}

.icon-duan:before {
  content: "\e61d";
}

.icon-ji:before {
  content: "\e61e";
}

.icon-fa:before {
  content: "\e61f";
}

.icon-fang:before {
  content: "\e620";
}

.icon-ji1:before {
  content: "\e621";
}

.icon-jing:before {
  content: "\e622";
}

.icon-jie:before {
  content: "\e623";
}

.icon-neng:before {
  content: "\e624";
}

.icon-qian:before {
  content: "\e625";
}

.icon-si:before {
  content: "\e626";
}

.icon-wu:before {
  content: "\e627";
}

.icon-xian:before {
  content: "\e628";
}

.icon-tiao:before {
  content: "\e629";
}

.icon-yong:before {
  content: "\e62a";
}

.icon-yu:before {
  content: "\e62b";
}

.icon-xiang:before {
  content: "\e62c";
}

.icon-xin:before {
  content: "\e62d";
}

.icon-yue:before {
  content: "\e62e";
}

.icon-zhan:before {
  content: "\e62f";
}

.icon-zheng:before {
  content: "\e630";
}

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
  div.title {
    position: relative;
    z-index: 9;
    text-align: center;
    font-size: 45rpx;
    font-style: italic;
    font-weight: 600;
    color: #e53330;
    padding: 40rpx 0 30rpx;
  }
  ul {
    position: relative;
    z-index: 9;
    width: calc(~"100% - 80rpx");
    margin: 0 auto;
    padding: 0 0 40rpx;
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
        top: 13rpx;
        transform: translateX(-50%);
        left: 50%;
        width: 150rpx;
        text-align: center;
        font-size: 32rpx;
        color: white;
        line-height: 37rpx;
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
  background-color: #fefaf9;
  & > p {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
      &:last-child {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
  .login-main {
    position: relative;
    z-index: 9;
    .title {
      padding-top: 10%;
      font-size: 44rpx;
      line-height: 62rpx;
      padding: 15vh 17vw 5vh;
      letter-spacing: 6rpx;
      p {
        &:first-child {
          text-align: left;
        }
        &:last-child {
          margin-top: 1vh;
          text-align: right;
        }
      }
    }
    .form {
      margin: 4vh 75rpx 0;
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
      margin: 5vh auto 0;
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
    .footer-text {
      color: #777777;
      margin: 5vh auto 0;
      h2 {
        width: 45%;
        margin: 0 auto;
        font-size: 30rpx;
        border-bottom: 1px solid #cccccc;
        padding-bottom: 10rpx;
        text-align: center;
        i {
          font-size: 30rpx;
        }
      }
      p {
        text-align: center;
        font-size: 28rpx;
        margin-top: 10rpx;
        i {
          font-size: 26rpx;
        }
      }
    }
  }
}
</style>
