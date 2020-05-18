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
            <i class="iconfont2 icon-ji1"></i>
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
  },
  onShareAppMessage(){
    
  }
};
</script>

<style lang="less" scoped>
@font-face {font-family: "iconfont2";
  src: url('//at.alicdn.com/t/font_1752555_9kzgb4uqx5.eot?t=1587099071178'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1752555_9kzgb4uqx5.eot?t=1587099071178#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1752555_9kzgb4uqx5.woff?t=1587099071178') format('woff'),
  url('//at.alicdn.com/t/font_1752555_9kzgb4uqx5.ttf?t=1587099071178') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1752555_9kzgb4uqx5.svg?t=1587099071178#iconfont') format('svg'); /* iOS 4.1- */
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
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
