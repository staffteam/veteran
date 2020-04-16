<template>
  <div class="member">
    <div class="title">
      <p>
        <img src="/static/images/member-top-back.jpg" mode="widthFix" />
      </p>
      <div class="title-main">
        <p>
          <img :src="userInfo.Image" @error="errorImg" mode="widthFix" />
        </p>
        <div>
          <h2>{{userInfo.Name}}</h2>
          <p v-if="!userInfo.IsTeacher">{{userInfo.ClassNo}}</p>
        </div>
      </div>
    </div>
    <div class="member-top-list" v-if="!userInfo.IsTeacher">
      <ul>
        <li v-if="userStatus==1">
          <a href="../my/exam/main">
            <img src="/static/images/member-top-list1.jpg" />
          </a>
        </li>
        <li v-if="userStatus==2">
          <a :href="'../student/score/main?id='+userInfo.Id">
            <img src="/static/images/member-top-list1.jpg" />
          </a>
        </li>
        <li v-if="userStatus==1">
          <a href="../sign/in/main">
            <img src="/static/images/member-top-list2.jpg" />
          </a>
        </li>
        <li v-if="userStatus==2">
          <a href="../graduation/main">
            <img src="/static/images/member-top-list2.jpg" />
          </a>
        </li>
      </ul>
    </div>
    <div :class="'member-main-list '+(userInfo.IsTeacher?'teacher':'')">
      <h2>我的工具</h2>
      <scroll-view scroll-y="false" class="main-list">
        <ul>
          <li v-for="item in memberListData" :key="item.id">
            <a :href="item.url" v-if="item.icon != 'icon-send' && item.icon != 'icon-xiaoxi'">
              <h2>
                <i :class="'iconfont '+item.icon"></i>
                {{item.title}}
              </h2>
              <i class="iconfont icon-you1"></i>
            </a>
            <a :href="item.url" v-if="item.icon == 'icon-xiaoxi'">
              <div>
                <h2>
                  <i :class="'iconfont '+item.icon"></i>
                  {{item.title}}
                </h2>
                <i class="iconfont icon-you1"></i>
                <my-badge v-if="msgNum" :content="msgNum" extClass="msg-badge" />
              </div>
            </a>
            <div v-if="item.icon == 'icon-send'">
              <button open-type="share" class="btn-share"></button>
              <h2>
                <i :class="'iconfont '+item.icon"></i>
                {{item.title}}
              </h2>
              <i class="iconfont icon-you1"></i>
            </div>
          </li>
          <li @click="outLogin()">
            <h2>
              <i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></i> 退出登录
            </h2>
            <i class="iconfont icon-you1"></i>
          </li>
        </ul>
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      memberListData: [],
      userStatus: 1,
      msgNum:0
    };
  },
  methods: {
    errorImg() {
      this.userInfo.Image = "/static/images/top.png";
    },
    outLogin() {
      mpvue.removeStorageSync("userInfo");
      mpvue.removeStorageSync("userid");
      mpvue.switchTab({
        url: "../index/main"
      });
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
              vm.msgNum = res.Data;
            }else{
              vm.msgNum = 0;
            }
          });
      }
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
    let vm = this;
    let userInfo = mpvue.getStorageSync("userInfo");
    this.$api
      .$signGet("登陆", {
        value: userInfo.Phone
      })
      .then(res => {
        if (res.Data.Status == 2) {
          //毕业生
          vm.userStatus = 2;
        }
      });
      mpvue.removeTabBarBadge({
        index:1
      });
      this.getMsg();
  },
  onShareAppMessage: function() {
    return {
      title: "博茂择优",
      desc: "博茂择优",
      path: "/pages/index/main",
      imageUrl: "/static/images/about-top.jpg"
    };
  },
  onLoad() {
    let vm = this;
    let userInfo = mpvue.getStorageSync("userInfo");
    vm.userInfo = userInfo;
    if (userInfo.IsTeacher) {
      vm.memberListData = [
         {
          url: "../my/message/main",
          icon: "icon-xiaoxi",
          title: "消息提醒",
          id: "0"
        },
        {
          url: "../my/aboutus/main",
          icon: "icon-guanyu",
          title: "关于我们",
          id: "1"
        },
        {
          url: "",
          icon: "icon-fenxiang",
          title: "分享好友",
          id: "2"
        },
        {
          url: "../my/feedback/main",
          icon: "icon-fankui",
          title: "意见反馈",
          id: "3"
        },
        {
          url: "../my/help/main",
          icon: "icon-bangzhuzhongxin",
          title: "帮助中心",
          id: "4"
        }
      ];
    } else {
      vm.memberListData = [
        {
          url: "../my/diploma/main",
          icon: "icon-jieyezhengshu1",
          title: "结业证书",
          id: "0"
        },
        {
          url: "../my/message/main",
          icon: "icon-xiaoxi",
          title: "消息提醒",
          id: "99"
        },
        {
          url: "../my/aboutus/main",
          icon: "icon-prompt",
          title: "关于我们",
          id: "1"
        },
        {
          url: "",
          icon: "icon-send",
          title: "分享好友",
          id: "2"
        },
        {
          url: "../my/feedback/main",
          icon: "icon-editor",
          title: "意见反馈",
          id: "3"
        },
        {
          url: "../my/help/main",
          icon: "icon-message",
          title: "帮助中心",
          id: "4"
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
.member {
  .title {
    position: relative;
    height: 240rpx;
    & > p {
      img {
        width: 100%;
      }
    }
    .title-main {
      padding: 49rpx 79rpx;
      position: absolute;
      top: 0;
      left: 0;
      & > p {
        width: 140rpx;
        height: 140rpx;
        float: left;
        border-radius: 50%;
        overflow: hidden;
        background-color: white;
        img {
          width: 100%;
        }
      }
      div {
        margin-left: 175rpx;
        padding: 20rpx 0;
        h2 {
          font-size: 36rpx;
          font-weight: 600;
          color: rgba(253, 211, 65, 1);
          line-height: 50rpx;
          letter-spacing: 1rpx;
        }
        p {
          font-size: 24rpx;
          color: rgba(255, 255, 255, 0.5);
          line-height: 33rpx;
          letter-spacing: 1rpx;
          margin-top: 8rpx;
        }
      }
    }
  }
  .member-top-list {
    margin: 30rpx 13rpx;
    height: 165rpx;
    overflow: hidden;
    ul {
      height: 100%;
      li {
        margin: 0 13rpx;
        float: left;
        width: calc(~"50% - 26rpx");
        height: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        }
      }
    }
  }
  .member-main-list {
    border-top: 20rpx solid #f7f7f7;
    &.teacher {
      border-top: 0;
    }
    & > h2 {
      font-size: 36rpx;
      color: rgba(51, 51, 51, 1);
      line-height: 40rpx;
      height: 93rpx;
      padding: 33rpx 40rpx 20rpx;
    }
    .main-list {
      ul {
        li {
          height: 103rpx;
          border-bottom: 1rpx solid #e5e5e5;
          margin: 0 32rpx;
          & > div {
            position: relative;
            width: 100%;
            height: 100%;
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
          a {
            display: block;
            height: 100%;
            position: relative;
          }
          h2 {
            float: left;
            line-height: 103rpx;
            i {
              color: #e53330;
              font-size: 40rpx;
              float: left;
              display: block;
              margin-right: 20rpx;
            }
            font-size: 32rpx;
          }
          i.icon-you1 {
            float: right;
            font-size: 26rpx;
            color: #ccc;
            line-height: 103rpx;
          }
        }
      }
    }
  }
}
</style>

<style>
.msg-badge{
  position: absolute;
  right: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}
</style>