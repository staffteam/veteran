<template>
  <div class="member">
    <div class="title">
      <p>
        <img src="/static/images/member-top-back.jpg" mode="widthFix" />
      </p>
      <div class="title-main">
        <p>
          <img :src="userInfo.avatarUrl" mode="widthFix" />
        </p>
        <div>
          <h2>{{userInfo.name}}</h2>
          <p>{{userInfo.squadronNum}}退役军人</p>
        </div>
      </div>
    </div>
    <div class="member-top-list">
      <ul>
        <li>
          <a href="../my/exam/main">
            <img src="/static/images/member-top-list1.jpg" />
          </a>
        </li>
        <li>
          <a href="../sign/in/main">
            <img src="/static/images/member-top-list2.jpg" />
          </a>
        </li>
      </ul>
    </div>
    <div class="member-main-list">
      <h2>我的工具</h2>
      <scroll-view scroll-y="false" class="main-list">
        <ul>
          <li v-for="item in memberListData" :key="item.id">
            <a :href="item.url" v-if="item.icon != 'icon-fenxiang'">
              <h2>
                <i :class="'iconfont '+item.icon"></i>
                {{item.title}}
              </h2>
              <i class="iconfont icon-you1"></i>
            </a>
            <div v-if="item.icon == 'icon-fenxiang'">
              <button open-type='share' class="btn-share"></button>
              <h2>
                <i :class="'iconfont '+item.icon"></i>
                {{item.title}}
              </h2>
              <i class="iconfont icon-you1"></i>
            </div>
          </li>
          <li @click="outLogin()">
            <h2>
              <i class="iconfont icon-tuichu"></i> 退出登录
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
      memberListData: [
        {
          url: "../my/diploma/main",
          icon: "icon-jieyezhengshu",
          title: "结业证书",
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
      ]
    };
  },
  methods: {
    outLogin() {
      mpvue.removeStorageSync("userInfo");
      mpvue.removeStorageSync("userid");
      mpvue.switchTab({
        url: "../index/main"
      });
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
  },
  onShareAppMessage: function () {
    return {
      title: '军戎飞扬',
      desc: '军戎飞扬',
      path: '/pages/index/main',
      imageUrl:'/static/images/about-top.jpg'
    }
  },
  onLoad() {
    let vm = this;
    let userInfo = mpvue.getStorageSync("userInfo");
    vm.userInfo = userInfo;
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
        }
      }
    }
  }
  .member-main-list {
    border-top: 20rpx solid #f7f7f7;
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
          &>div{
            position: relative;
            width: 100%;
            height: 100%;
            button{
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              z-index: 9;
              opacity: 0;
            }
          }
          h2 {
            float: left;
            line-height: 103rpx;
            i {
              color: #e53330;
              font-size: 35rpx;
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
