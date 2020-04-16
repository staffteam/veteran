<template>
  <div class="affirm-info">
    <p>
      <img src="/static/images/login-back_01.jpg" mode="widthFix" />
      <img src="/static/images/login-back_03.jpg" mode="widthFix" />
    </p>
    <div class="login" v-if="!errorCorrection">
      <div class="login-main">
        <div class="title">
          <i class="iconfont icon-dingweiweizhi"></i>
          身份归属验证
        </div>
        <div class="form">
          <div class="item">
            <span>班级编号</span>
            <input
              type="text"
              v-model="userInfo.ClassNo"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <div class="item">
            <span>班级管理员</span>
            <input
              type="text"
              v-model="userInfo.ClassManager"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <!-- <div class="item">
            <span>分队编号</span>
            <input
              type="text"
              v-model="userInfo.SquadNo"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <div class="item">
            <span>分&ensp;队&ensp;长</span>
            <input
              type="text"
              v-model="userInfo.SquadCaptain"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div> -->
          <div class="item">
            <span>管理员联系电话</span>
            <input
              type="text"
              v-model="userInfo.ManagerPhone"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
            />
          </div>
          <div class="item">
            <span>报名学习时间</span>
            <input
              type="text"
              v-model="userInfo.ApplyTime"
              placeholder-style="color:#e53330;"
              disabled="disabled"
              @click="openDate"
            />
            <date-picker
              id="date-picker"
              :value="dateVal"
              :issShow="issShow"
              :isShow="isShow"
              @sureclick="sureClick"
              @cancelclick="cancelclick"
            />
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
      <h2>纠错信息提交成功</h2>
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
      errorCorrection: false,
      dateVal: ["", "", ""],
      issShow: false,
      isShow: false
    };
  },
  methods: {
    openDate() {
      this.isShow = true;
      this.issShow = true;
    },
    sureClick: function(e) {
      this.issShow = false;
      let val = e.mp.detail.value;
      this.dateVal = val;
      setTimeout(_ => {
        this.userInfo.ApplyTime = `${val[0]}-${val[1]}-${val[2]}`;
        this.isShow = false;
      }, 10);
    },
    cancelclick: function(event) {
      this.issShow = false;
      setTimeout(_ => {
        this.isShow = false;
      }, 200);
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
          ClassNo: this.userInfo.ClassNo,
          ClassManager: this.userInfo.ClassManager,
          ApplyTime: this.userInfo.ApplyTime,
          ManagerPhone: this.userInfo.ManagerPhone
        };
      } else {
        this.isReadonly = true;
        this.userInfo.ClassNo = this.hostInfo.ClassNo;
        this.userInfo.ClassManager = this.hostInfo.ClassManager;
        this.userInfo.ApplyTime = this.hostInfo.ApplyTime;
        this.userInfo.ManagerPhone= this.hostInfo.ManagerPhone
      }
    },
    gonext() {
      let vm = this;
      if (vm.userInfo.ClassNo == "") {
        vm.showHint("请输入班级编号");
      } else if (vm.userInfo.ClassManager == "") {
        vm.showHint("请输入班级管理员");
      } else if (vm.userInfo.ManagerPhone == "") {
        vm.showHint("请输入管理员联系电话");
      } else if (!/^1[3456789]\d{9}$/.test(vm.userInfo.ManagerPhone)) {
        vm.showHint("管理员联系电话有误");
      } else if (vm.userInfo.ApplyTime == "") {
        vm.showHint("请选择学习时间");
      } else {
        if (!this.isReadonly) {
          vm.$api
            .$signPost("纠错", {
              ClassNo: vm.userInfo.ClassNo,
              ClassManager: vm.userInfo.ClassManager,
              ApplyTime: vm.userInfo.ApplyTime,
              ManagerPhone:vm.userInfo.ManagerPhone,
              StudentId: vm.userInfo.userid
            })
            .then(res => {
              vm.errorCorrection = true;
              mpvue.removeStorageSync("userInfo");
              mpvue.removeStorageSync("userid");
              mpvue.removeStorageSync("oneLogin");
            });
        } else {
          vm.affirmCorrection();
        }
      }
    },
    affirmCorrection(is) {
      let vm = this;
      if (is) {
        vm.errorCorrection = false;
        vm.userInfo = {};
        vm.isReadonly = true;
        mpvue.switchTab({
          url: "../../index/main"
        });
      } else {
        vm.$api
          .$signPost(
            "学员确认信息",
            {
              userid: vm.userInfo.userid
            },
            false,
            true
          )
          .then(res => {
            mpvue.showToast({
              title: "信息确认成功",
              icon: "success"
            });
            setTimeout(_ => {
              mpvue.setStorageSync("userid", vm.userInfo.userid);
              mpvue.setStorageSync("oneLogin", "1");
              mpvue.switchTab({
                url: "../../index/main"
              });
            }, 1500);
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
      let time = this.userInfo.ApplyTime;
      if (time) {
        this.userInfo.ApplyTime = time.split(" ")[0];
      }
    } else {
      mpvue.switchTab({
        url: "../../index/main"
      });
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
      padding: 160rpx 80rpx 0;
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
            width: 220rpx;
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
            width: calc(~"100% - 284rpx");
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
