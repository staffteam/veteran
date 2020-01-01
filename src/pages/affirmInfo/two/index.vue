<template>
  <div class="affirm-info">
    <p>
      <img src="/static/images/login-back_01.jpg" mode="widthFix" />
      <img src="/static/images/login-back_03.jpg" mode="widthFix" />
    </p>
    <div class="login" v-if="!errorCorrection">
      <div class="login-main">
        <div class="title">
          <i class="iconfont icon-shenfenzheng"></i>
          身份验证
        </div>
        <div class="form">
          <div class="item">
            <span>姓&emsp;&emsp;名</span>
            <input
              type="text"
              v-model="userInfo.Name"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <div class="item">
            <span>身份证号</span>
            <input
              type="text"
              v-model="userInfo.IdCard"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <div class="item">
            <span>手&emsp;&emsp;机</span>
            <input
              type="text"
              v-model="userInfo.Phone"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
        </div>
        <div class="submit-btn">
          <div class="correction" @click="correction()">{{isReadonly?'纠错':'取消纠错'}}</div>
          <div class="gonext" @click="gonext()">{{isReadonly?'下一步':'提交'}}</div>
        </div>
      </div>
    </div>
    <div class="error-correction" v-if="errorCorrection">
      <i class="iconfont icon-dui"></i>
      <h2>提交成功</h2>
      <div>工作人员将会在3个工作日内审核您的申请，敬请留意</div>
      <p @click="affirmCorrection(true)">知道了</p>
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
          Name: this.userInfo.Name,
          IdCard: this.userInfo.IdCard,
          Phone: this.userInfo.Phone
        };
        this.userInfo.Name = "";
        this.userInfo.IdCard = "";
        this.userInfo.Phone = "";
      } else {
        this.isReadonly = true;
        this.userInfo.Name = this.hostInfo.Name;
        this.userInfo.IdCard = this.hostInfo.IdCard;
        this.userInfo.Phone = this.hostInfo.Phone;
      }
    },
    gonext() {
      let vm = this;
      if (vm.userInfo.Name == "") {
        vm.showHint("请输入姓名");
      } else if (vm.userInfo.IdCard == "") {
        vm.showHint("请输入身份证");
      } else if (
        !/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
          vm.userInfo.IdCard
        ) &&
        !/^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(vm.userInfo.IdCard) &&
        !/^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/.test(vm.userInfo.IdCard)
      ) {
        vm.showHint("身份证格式有误");
      } else if (vm.userInfo.Phone == "") {
        vm.showHint("请输入手机号");
      } else if (!/^1[3456789]\d{9}$/.test(vm.userInfo.Phone)) {
        vm.showHint("手机号格式有误");
      } else {
        if (!this.isReadonly) {
          this.errorCorrection = true;
        } else {
          if (!this.isReadonly) {
            vm.$api
              .$signPost("纠错", {
                Name: vm.userInfo.Name,
                IdCard: vm.userInfo.IdCard,
                Phone: vm.userInfo.Phone,
                StudentId: vm.userInfo.userid
              })
              .then(res => {
                vm.errorCorrection = true;
              });
          } else {
            vm.affirmCorrection();
          }
        }
      }
    },
    affirmCorrection(is) {
      let vm = this;
      if (is) {
        mpvue.removeStorageSync("userInfo");
        mpvue.removeStorageSync("userid");
        mpvue.switchTab({
          url: "../../index/main"
        });
      } else {
        mpvue.navigateTo({
          url: "../../affirmInfo/three/main"
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
  background-color: #fefaf9;
  & > p {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
      &:last-child{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
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
          input {
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
        }
      }
      .submit-btn {
        margin-top: 120rpx;
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
