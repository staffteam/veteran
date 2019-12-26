<template>
  <div class="affirm-info">
    <p>
      <img src="/static/images/login-back.jpg" mode="widthFix" />
    </p>
    <div class="login" v-if="!errorCorrection">
      <div class="login-main">
        <div class="title">
          <i class="iconfont icon-dingweiweizhi"></i>
          队伍归属验证
        </div>
        <div class="form">
          <div class="item">
            <span>中队编号</span>
            <input
              type="text"
              v-model="userInfo.squadronNum"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <div class="item">
            <span>中&ensp;队&ensp;长</span>
            <input
              type="text"
              v-model="userInfo.foreman"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <div class="item">
            <span>分&ensp;队&ensp;长</span>
            <input
              type="text"
              v-model="userInfo.hisCommander"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <div class="item">
            <span>退役时间</span>
            <picker
              mode="date"
              :disabled="isReadonly"
              :value="userInfo.retiredTime"
              @change="bindTimeChange"
            >
              <view class="picker">{{userInfo.retiredTime}}</view>
            </picker>
          </div>
        </div>
        <div class="submit-btn">
          <div class="correction" @click="correction()">{{isReadonly?'纠错':'取消纠错'}}</div>
          <div class="gonext" @click="gonext()">{{isReadonly?'确定':'提交'}}</div>
        </div>
      </div>
    </div>
    <div class="error-correction" v-if="errorCorrection">
      <i class="iconfont icon-dui"></i>
      <h2>提交成功</h2>
      <div>工作人员将会在3个工作日内审核您的申请，敬请留意</div>
      <p @click="affirmCorrection">知道了</p>
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
      userInfo: {},
      hostInfo: {},
      isReadonly: true,
      errorCorrection: false
    };
  },
  methods: {
    bindTimeChange(e) {
      this.userInfo.retiredTime = e.mp.detail.value;
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
    correction() {
      if (this.isReadonly) {
        this.isReadonly = false;
        this.hostInfo = {
          squadronNum: this.userInfo.squadronNum,
          foreman: this.userInfo.foreman,
          hisCommander: this.userInfo.hisCommander,
          retiredTime: this.userInfo.retiredTime
        };
        this.userInfo.squadronNum = "";
        this.userInfo.foreman = "";
        this.userInfo.hisCommander = "";
        this.userInfo.retiredTime = "";
      } else {
        this.isReadonly = true;
        this.userInfo.squadronNum = this.hostInfo.squadronNum;
        this.userInfo.foreman = this.hostInfo.foreman;
        this.userInfo.hisCommander = this.hostInfo.hisCommander;
        this.userInfo.retiredTime = this.hostInfo.retiredTime;
      }
    },
    gonext() {
      let vm = this;
      if (vm.userInfo.squadronNum == "") {
        vm.showHint("请输入中队编号");
      } else if (vm.userInfo.foreman == "") {
        vm.showHint("请输入中队长姓名");
      } else if (vm.userInfo.hisCommander == "") {
        vm.showHint("请输入分队长姓名");
      } else if (vm.userInfo.retiredTime == "") {
        vm.showHint("请选择退役时间");
      } else {
        if (!this.isReadonly) {
          this.errorCorrection = true;
        } else {
          let userInfo = mpvue.getStorageSync("userInfo");
          userInfo.squadronNum = this.userInfo.squadronNum;
          userInfo.foreman = this.userInfo.foreman;
          userInfo.hisCommander = this.userInfo.hisCommander;
          userInfo.retiredTime = this.userInfo.retiredTime;
          mpvue.setStorageSync("userInfo", userInfo);
          mpvue.setStorageSync("userid", userInfo.userid);
          wx.switchTab({
            url: "../../index/main"
          });
        }
      }
    },
    affirmCorrection() {
      let vm = this;
      let userInfo = mpvue.getStorageSync("userInfo");
      userInfo.squadronNum = this.userInfo.squadronNum;
      userInfo.foreman = this.userInfo.foreman;
      userInfo.hisCommander = this.userInfo.hisCommander;
      userInfo.retiredTime = this.userInfo.retiredTime;
      mpvue.setStorageSync("userInfo", userInfo);
      mpvue.setStorageSync("userid", userInfo.userid);
      wx.switchTab({
        url: "../../index/main"
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
    let userInfo = mpvue.getStorageSync("userInfo");
    if (userInfo) {
      this.userInfo = userInfo;
    }
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
.affirm-info {
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
      padding: 260rpx 120rpx 0;
      .title {
        font-size: 28rpx;
        color: rgba(168, 125, 87, 1);
        line-height: 40rpx;
        i {
          font-size: 28rpx;
          margin-right: 20rpx;
          color: #a87d57;
          display: inline-block;
        }
      }
      .form {
        .item {
          overflow: hidden;
          margin-top: 40rpx;
          &:first-child {
            margin-top: 20rpx;
          }
          span {
            display: block;
            width: 160rpx;
            text-align: left;
            font-size: 28rpx;
            line-height: 96rpx;
            color: #a87d57;
            float: left;
          }
          input,
          .picker {
            float: right;
            border: 2rpx solid #e53330;
            height: 92rpx;
            width: calc(~"100% - 224rpx");
            background: rgba(255, 253, 249, 1);
            border-radius: 4rpx;
            font-size: 28rpx;
            color: #e53330;
            padding: 0 30rpx;
          }
          .picker {
            width: calc(~"100% - 164rpx");
            line-height: 92rpx;
          }
        }
      }
      .submit-btn {
        margin-top: 68rpx;
        .correction {
          width: 184rpx;
          height: 88rpx;
          background: rgba(229, 51, 48, 0.1);
          border-radius: 4rpx;
          text-align: center;
          line-height: 88rpx;
          font-size: 28rpx;
          color: rgba(229, 51, 48, 1);
          float: left;
        }
        .gonext {
          width: 184rpx;
          height: 88rpx;
          float: right;
          background: rgba(229, 51, 48, 1);
          border-radius: 4rpx;
          text-align: center;
          line-height: 88rpx;
          font-size: 28rpx;
          color: white;
        }
      }
    }
  }
  .error-correction {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 9;
    text-align: center;
    padding-top: 277rpx;
    & > i {
      font-size: 144rpx;
      color: #e53330;
    }
    & > h2 {
      margin-top: 48rpx;
      font-size: 40rpx;
      line-height: 56rpx;
      font-weight: 600;
      color: #e53330;
    }
    & > div {
      font-size: 28rpx;
      line-height: 40rpx;
      color: #e53330;
      width: 400rpx;
      margin: 0 auto;
      margin-top: 20rpx;
    }
    & > p {
      width: 184rpx;
      height: 88rpx;
      background: rgba(229, 51, 48, 1);
      border-radius: 4rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 88rpx;
      color: white;
      margin: 0 auto;
      margin-top: 147rpx;
    }
  }
}
</style>
