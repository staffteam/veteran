<template>
  <div class="course-detail">
    <txv-video :vid="detail.Content" playerid="txv1" width="100%" height="420rpx"></txv-video>
    <div class="course-sign">
      <h2>离签到还需要观看</h2>
      <p>
        <span>{{countDown.h}}</span>
        <em>:</em>
        <span>{{countDown.m}}</span>
        <em>:</em>
        <span>{{countDown.s}}</span>
      </p>
      <span
        @click="courseSign()"
        :class="(isAllowSign?'on':'')+' '+(detail.IsSignIn?'off':'')"
      >{{detail.IsSignIn?'已签到':'签到'}}</span>
    </div>
    <div class="course-title">
      <h2 class="lines">{{detail.Title}}</h2>
      <div>
        <p>{{detail.ActiveTime}}</p>
        <span>阅读 {{detail.Stat}}</span>
      </div>
    </div>
    <div class="course-sign-num">
      <h2>
        已签到
        <span>{{detail.SignInTotal}}</span>人
      </h2>
      <p></p>
    </div>
    <div class="course-sign-user">
      <h2>签到名单</h2>
      <p></p>
      <scroll-view scroll-y="true" class="user-list">
        <ul>
          <li
            v-for="item in detail.SignInList"
            :key="item"
            :class="item == userInfo.Name?'on':''"
          >{{item}}</li>
        </ul>
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countDown: {
        h: "00",
        m: "00",
        s: "00"
      },
      detail: {},
      isAllowSign: false,
      isSign: false,
      userInfo: {},
      pid: "",
      timeObj: {}
    };
  },
  methods: {
    courseSign() {
      let vm = this;
      if (vm.isAllowSign && !vm.detail.IsSignIn) {
        vm.$api
          .$signPost("视频课程签到", {
            id: vm.pid,
            userid: mpvue.getStorageSync("userid")
          })
          .then(res => {
            mpvue.showToast({
              title: "签到成功",
              icon: "success"
            });
            vm.IsSignIn = true;
            vm.detail.SignInList.push(vm.userInfo.Name);
            vm.detail.SignInTotal = vm.detail.SignInList.length;
          });
      }
    },
    startCountDown() {
      let vm = this;
      clearInterval(vm.timeObj);
      vm.timeObj = setInterval(_ => {
        let { h, m, s } = vm.countDown;
        if (s == 0) {
          //减少一分钟
          if (m == 0 && h != 0) {
            //大于等于一小时 减少一小时
            vm.countDown.h = +h - 1 > 9 ? +h - 1 : "0" + (+h - 1);
            vm.countDown.m = "59";
            vm.countDown.s = "59";
          } else if (m != 0) {
            //大于等于一分钟 减少一分钟
            vm.countDown.m = +m - 1 > 9 ? +m - 1 : "0" + (+m - 1);
            vm.countDown.s = "59";
          }
        } else {
          if (h == 0 && m == 0 && s == 1) {
            //小于一小时 倒计时结束
            vm.countDown.s == 0;
            vm.isAllowSign = true;
            clearInterval(vm.timeObj);
          }
          vm.countDown.s = +s - 1 > 9 ? +s - 1 : "0" + (+s - 1);
        }
      }, 1000);
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
  onLoad(o) {
    let vm = this;
    vm.pid = o.id;
    vm.countDown = {
      h: "00",
      m: "00",
      s: "00"
    };
    vm.detail = {};
    vm.isAllowSign = false;
    vm.isSign = false;
    vm.userInfo = mpvue.getStorageSync("userInfo");
    vm.$api
      .$signGet("视频课程详情", {
        id: o.id,
        userid: mpvue.getStorageSync("userid")
      })
      .then(res => {
        if (res.Data.IsSignIn) {
          vm.isAllowSign = true;
        } else {
          let _arr = res.Data.SignInTime.split(":");
          vm.countDown.h = _arr[0];
          vm.countDown.m = _arr[1];
          vm.countDown.s = _arr[2];
          vm.startCountDown();
        }
        vm.detail = res.Data;
      });
  }
};
</script>

<style lang="less" scoped>
.course-sign {
  height: 88rpx;
  line-height: 88rpx;
  padding: 0 24rpx 0 32rpx;
  background: linear-gradient(
    135deg,
    rgba(244, 98, 94, 1) 0%,
    rgba(229, 51, 48, 1) 100%
  );
  h2 {
    font-size: 32rpx;
    color: white;
    float: left;
  }
  p {
    margin-left: 14rpx;
    color: white;
    float: left;
    height: 60rpx;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    span {
      display: block;
      float: left;
      width: 60rpx;
      height: 60rpx;
      background-color: white;
      text-align: center;
      font-size: 40rpx;
      color: #e53330;
      margin: 0 10rpx;
      line-height: 60rpx;
    }
    em {
      display: block;
      float: left;
      line-height: 53rpx;
      font-size: 48rpx;
    }
  }
  & > span {
    width: 128rpx;
    height: 56rpx;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(247, 247, 247, 1);
    border-radius: 4rpx;
    text-align: center;
    line-height: 56rpx;
    font-size: 28rpx;
    color: #999999;
    display: block;
    float: right;
    &.on {
      background: linear-gradient(
        180deg,
        rgba(246, 188, 41, 1) 0%,
        rgba(242, 139, 18, 1) 100%
      );
      color: white;
    }
    &.off {
      background: rgba(255, 255, 255, 0.6);
      color: white;
    }
  }
}
.course-title {
  margin: 32rpx 32rpx 0 32rpx;
  padding-bottom: 31rpx;
  border-bottom: 1rpx solid #e5e5e5;
  height: 176rpx;
  h2 {
    font-size: 40rpx;
    line-height: 50rpx;
    height: 100rpx;
  }
  div {
    margin-top: 15rpx;
    line-height: 30rpx;
    height: 30rpx;
    p {
      font-size: 26rpx;
      color: #999;
      float: left;
    }
    span {
      font-size: 26rpx;
      display: block;
      color: #999;
      float: right;
    }
  }
}
.course-sign-num {
  height: 110rpx;
  padding: 39rpx 0 0;
  p {
    border-bottom: 1px solid #e5e5e5;
    margin: 0 32rpx;
    margin-top: 39rpx;
  }
  h2 {
    height: 32rpx;
    line-height: 32rpx;
    font-size: 32rpx;
    padding-left: 20rpx;
    border-left: 10rpx solid #e53330;
    span {
      display: inline-block;
      font-size: 32rpx;
      color: #e53330;
    }
  }
}
.course-sign-user {
  padding: 39rpx 0 0;
  height: calc(~"100vh - 823rpx");
  & > p {
    border-bottom: 1px solid #e5e5e5;
    margin: 0 32rpx;
    margin-top: 39rpx;
  }
  & > h2 {
    height: 32rpx;
    line-height: 32rpx;
    font-size: 32rpx;
    padding-left: 20rpx;
    border-left: 10rpx solid #e53330;
    span {
      display: inline-block;
      font-size: 32rpx;
      color: #e53330;
    }
  }
  .user-list {
    height: calc(~"100% - 71rpx");
    ul {
      overflow: hidden;
      margin: 0 22rpx;
      li {
        width: 16%;
        margin: 20rpx 2%;
        font-size: 28rpx;
        float: left;
        &.on {
          color: #d2aa78;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
