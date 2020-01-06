<template>
  <div class="sign-in">
    <div class="sign-in-top"></div>
    <div class="sign-in-info">
      <div class="title">
        <i class="iconfont icon-kecheng"></i>
        <h2 class="lines">{{info.title}}</h2>
      </div>
      <div class="name">指导老师：{{info.teacher}}</div>
      <div class="locate">
        <i class="iconfont icon-dingweiweizhi"></i>
        <h2>{{info.locate}}</h2>
      </div>
    </div>
    <div class="sign-in-content">
      <div class="title">
        <h2>
          <i class="iconfont icon-jiancepingtaizhuijia_shijian"></i>今日签到：
        </h2>
        <div>
          <h2>进场时间 {{startSignTime}}</h2>
          <p :class="SignInStatus?'on':''">{{SignInStatus?"已签到":"未签到"}}</p>
        </div>
        <div>
          <h2>退场时间 {{endSignTime}}</h2>
          <p :class="SignOutStatus?'on':''">{{SignOutStatus?"已签到":"未签到"}}</p>
        </div>
      </div>
      <div class="sign">
        <div class="sign-btn">
          <!-- 未到上课签到时间 -->
          <div v-if="!SignInStatus && !allowStartSign" class="off">
            <p>
              <span>距下次签到</span>
              <span>{{startCountDown}}</span>
            </p>
          </div>
          <!-- 上课未签到，且没有迟到，且已到可以上课签到时间 -->
          <div
            v-if="!SignInStatus && !isStartbeLate && allowStartSign"
            :class="signScope?'on':'off'"
            @click="startSign()"
          >
            <p>
              <font>签到</font>
            </p>
          </div>
          <!-- 上课未签到，且已经迟到，且已到可以上课签到时间，且没有到下课时间 -->
          <div
            v-if="!SignInStatus && isStartbeLate && !isEndLeave"
            :class="signScope?'on warn':'off'"
            @click="startSign()"
          >
            <p>
              <font>迟到打卡</font>
            </p>
          </div>
          <!-- 上课已签到，未到下课签到时间（早退时间段） -->
          <div v-if="SignInStatus && !isEndLeave" class="off">
            <p>
              <span>距下次签到</span>
              <span>{{endCountDown}}</span>
            </p>
          </div>
          <!-- 下课未签到，且已到下课签到时间，未超过下课可以打卡时间，且上课已签到 -->
          <div
            v-if="!SignOutStatus && isEndLeave && !isEndLeaveOut && SignInStatus"
            :class="signScope?'on':'off'"
            @click="endSign()"
          >
            <p>
              <font>签到</font>
            </p>
          </div>
          <!-- 上课已签到，下课已签到 -->
          <div v-if="SignInStatus && SignOutStatus" class="off">
            <p>
              <font>签到完成</font>
            </p>
          </div>
          <!-- 上课未签到，下课未签到，且已到下课时间，且已超过下课可以打卡时间 -->
          <div v-if="(!SignInStatus || !SignOutStatus) && isEndLeave && isEndLeaveOut" class="off">
            <p>
              <font>缺勤</font>
            </p>
          </div>
        </div>
        <div class="sign-locate">
          <!-- 未进入考勤范围 -->
          <div class="locate-btn" v-if="!signScope" @click="getLocate()">
            <i class="iconfont icon-dingweiweizhi"></i>
            点击进行定位
          </div>
          <!-- 已进入考勤范围 -->
          <div class="locate-btn" v-if="signScope">
            <i class="iconfont icon-dui"></i>
            已进入考勤范围
          </div>
          <p class="locate-content">{{locateContent}}</p>
        </div>
        <!-- <div>{{signData}}</div> -->
      </div>
    </div>
    <hint :commonMsg="commonMsg" title="未在考勤区内" viceTitle="请重新定位" />
  </div>
</template>

<script>
import QQMapWX from "@/components/locate/qqmap-wx-jssdk.min.js";
export default {
  data() {
    return {
      info: {
        title: "",
        teacher: "",
        locate: "",
        id: ""
      },
      allowStartSign: false,
      startCountDown: "加载中···",
      endCountDown: "加载中···",
      SignInStatus: false,
      isStartbeLate: false,
      isEndLeave: false,
      SignOutStatus: false,
      allowEndSign: false,
      startSignTime: "加载中···",
      endSignTime: "加载中···",
      locateContent: "定位中···",
      qqmapsdk: "",
      signScope: false,
      commonMsg: false,
      isEndLeaveOut: false,
      signData: ""
    };
  },
  methods: {
    // 上课签到
    startSign() {
      let vm = this;
      if (vm.signScope) {
        vm.$api
          .$signPost("学生签到", {
            id: vm.info.id,
            userid: mpvue.getStorageSync("userid")
          })
          .then(res => {
            mpvue.showToast({
              title: "签到成功！",
              icon: "success"
            });
            vm.SignInStatus = true;
          });
      } else {
        vm.commonMsg = true;
        setTimeout(_ => {
          vm.commonMsg = false;
        }, 2000);
      }
    },
    // 下课签到
    endSign() {
      if (this.signScope) {
        vm.$api
          .$signPost("学生签到", {
            id: vm.info.id,
            userid: mpvue.getStorageSync("userid")
          })
          .then(res => {
            mpvue.showToast({
              title: "签到成功！",
              icon: "success"
            });
            vm.SignOutStatus = true;
          });
      } else {
        this.commonMsg = true;
        setTimeout(_ => {
          this.commonMsg = false;
        }, 2000);
      }
    },
    getSignInfo(data) {
      let vm = this;
      this.SignInStatus = data.SignInStatus == null ? false : true;
      this.SignOutStatus =
        data.SignOutStatus == null ? false : data.SignOutStatus;
      this.info = {
        title: data.Title,
        teacher: data.TeacherName,
        locate: data.Address,
        id: data.Id
      };
      let start_h = "";
      let end_h = "";
      let start_m = "";
      let end_m = "";
      if (data.SignInTime && data.SignOutTime) {
        start_h = data.SignInTime.split(":")[0];
        start_m = data.SignInTime.split(":")[1];
        end_h = data.SignOutTime.split(":")[0];
        end_m = data.SignOutTime.split(":")[1];
        if (+start_h > 12) {
          this.startSignTime = `下午${+start_h - 12}:${start_m}`;
        } else {
          this.startSignTime = `上午${start_h}:${start_m}`;
        }
        if (+end_h > 12) {
          this.endSignTime = `下午${+end_h - 12}:${end_m}`;
        } else {
          this.endSignTime = `上午${end_h}:${end_m}`;
        }
        let date = new Date();
        let signTime = new Date(data.StartTime.replace(/\-/g,"\/"));
        let SignInTime = new Date(
          `${signTime.getFullYear()}/${signTime.getMonth() +
            1}/${signTime.getDate()} ${data.SignInTime}`
        );
        let SignOutTime = new Date(
          `${signTime.getFullYear()}/${signTime.getMonth() +
            1}/${signTime.getDate()} ${data.SignOutTime}`
        );
        let _outTime = data.ReservedTime * 60 * 1000;
        //判断是否已到上课签到时间 条件：当前时间小于等于上课时间，且时间间隔不大于一小时
        this.allowStartSign = SignInTime.getTime() - date.getTime() <= _outTime;
        //计算当前时间与上课时间的时间差
        this.getStartCountDown(SignInTime, _outTime);
        setInterval(_ => {
          vm.getStartCountDown(SignInTime, _outTime);
        }, 1000);
        //判断是否迟到
        this.isStartbeLate = SignInTime.getTime() - date.getTime() < -_outTime;
        //判断是否已到下课时间
        this.isEndLeave = SignOutTime.getTime() - date.getTime() <= _outTime;
        //计算当前时间与下课时间的时间差
        this.getEndCountDown(SignOutTime, _outTime);
        setInterval(_ => {
          vm.getEndCountDown(SignOutTime, _outTime);
        }, 1000);
        //判断是否已超过下课时间范围
        this.isEndLeaveOut = SignOutTime.getTime() - date.getTime() < -_outTime;
        //获取定位
        this.getLocate();
      }
    },
    getStartCountDown(SignInTime, _outTime) {
      let date = new Date();
      let diff = SignInTime.getTime() - date.getTime();
      if (diff > _outTime) {
        //当前时间小于上课时间，且没有到可以上课打卡的时间范围
        let _d = this.$common.getTimeDiff({
          start_time: date,
          end_time: SignInTime,
          units: "天"
        });
        if (_d == 0) {
          this.startCountDown = this.$common.getTimeDiff({
            start_time: date,
            end_time: SignInTime,
            format: "hh:mm:ss"
          });
        } else {
          this.startCountDown = this.$common.getTimeDiff({
            start_time: date,
            end_time: SignInTime,
            format: "DD天hh时"
          });
        }
      } else {
        if (diff <= _outTime && diff >= 0) {
          //当前时间小于等于上课时间，但已经在能打卡范围
          this.allowStartSign = true;
        } else if (diff < 0 && diff >= -_outTime) {
          //当前时间大于上课时间，但未超过上课打卡时间范围
          this.allowStartSign = true;
        } else if (diff < -_outTime) {
          //当前时间大于上课时间，且已经超过上课打卡时间范围，已迟到
          this.isStartbeLate = true;
        }
      }
    },
    getEndCountDown(SignOutTime, _outTime) {
      let date = new Date();
      let diff = SignOutTime.getTime() - date.getTime();
      if (diff > _outTime) {
        diff = diff - _outTime;
        //当前时间小于下课时间，且没有在下课可打卡的时间范围
        let _d = this.$common.getTimeDiff({
          start_time: date,
          end_time: SignOutTime,
          units: "天"
        });
        if (_d == 0) {
          this.endCountDown = this.$common.getTimeDiff({
            start_time: date,
            end_time: SignOutTime,
            format: "hh:mm:ss"
          });
        } else {
          this.endCountDown = this.$common.getTimeDiff({
            start_time: date,
            end_time: SignOutTime,
            format: "DD天hh时"
          });
        }
      } else {
        if (diff <= _outTime && diff >= 0) {
          //当前时间小于下课时间，且已经可以下课打卡
          this.isEndLeave = true;
        } else if (diff < 0 && diff >= -_outTime) {
          //当前时间小于下课时间，且可以下课打卡
          this.isEndLeave = true;
        } else if (diff < -_outTime) {
          //当前时间大于下课时间，且已经不能打卡
          this.isEndLeaveOut = true;
        }
      }
    },
    getLocate() {
      let vm = this;
      mpvue.showLoading({
        title: "定位中"
      });
      mpvue.getLocation({
        type: "gcj02",
        // isHighAccuracy:true,
        // highAccuracyExpireTime:4000,
        success: function(res) {
          console.log(res);
          //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
          vm.qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function(data) {
              mpvue.hideLoading();
              console.log(data.result);
              vm.locateContent = data.result.formatted_addresses.recommend;
              vm.signScope = vm.info.locate == vm.locateContent;
            }
          });
        }
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
    this.qqmapsdk = new QQMapWX({
      key: "B3SBZ-6KH6R-RBKWH-WQ6VY-YZ4WO-RSFHV"
    });
  },
  onLoad(o) {
    let vm = this;
    this.$api
      .$signGet("学员课程详情", {
        id: o.id,
        userid: mpvue.getStorageSync("userid")
      })
      .then(res => {
        console.log(res.Data);
        vm.getSignInfo(res.Data);
      });
  }
};
</script>

<style lang="less" scoped>
.sign-in {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-top: 20rpx;
  .sign-in-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 190rpx;
    background-color: #e53330;
  }
  .sign-in-info {
    position: relative;
    z-index: 9;
    padding: 32rpx 28rpx;
    margin: 0 30rpx;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    .title {
      i {
        display: block;
        float: left;
        font-size: 30rpx;
        color: #e53330;
        line-height: 45rpx;
      }
      h2 {
        margin-left: 33rpx;
        font-size: 32rpx;
        color: rgba(51, 51, 51, 1);
        line-height: 45rpx;
      }
    }
    .name {
      font-size: 28rpx;
      color: rgba(102, 102, 102, 1);
      line-height: 40rpx;
      margin-top: 10rpx;
      margin-left: 33rpx;
    }
    .locate {
      margin-top: 24rpx;
      font-size: 28rpx;
      color: #999999;
      line-height: 35rpx;
      i {
        float: left;
        display: block;
        font-size: 30rpx;
        color: #cccccc;
      }
      h2 {
        margin-left: 33rpx;
      }
    }
  }
  .sign-in-content {
    position: relative;
    z-index: 9;
    margin: 20rpx 30rpx;
    height: calc(~"100vh - 320rpx");
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    padding: 46rpx 28rpx;
    .title {
      h2 {
        i {
          font-size: 30rpx;
          color: #ff8915;
          float: left;
          display: block;
          margin-right: 6rpx;
        }
        font-size: 28rpx;
        color: rgba(102, 102, 102, 1);
        line-height: 40rpx;
      }
      div {
        padding-left: 36rpx;
        margin-top: 20rpx;
        h2 {
          display: inline-block;
          font-size: 32rpx;
          line-height: 36rpx;
          vertical-align: middle;
        }
        p {
          width: 98rpx;
          height: 36rpx;
          background: #ff8915;
          border-radius: 18rpx;
          color: white;
          font-size: 22rpx;
          text-align: center;
          line-height: 36rpx;
          display: inline-block;
          margin-left: 24rpx;
          vertical-align: middle;
          &.on {
            background-color: #51c512;
          }
        }
      }
    }
    .sign {
      margin-top: 160rpx;
      .sign-btn {
        & > div {
          width: 212rpx;
          height: 212rpx;
          border-radius: 50%;
          margin: 0 auto;
          &.on {
            background: linear-gradient(
              135deg,
              rgba(244, 98, 94, 1) 0%,
              rgba(229, 51, 48, 1) 100%
            );
            box-shadow: 0px 0 20rpx 0px rgba(229, 51, 48, 0.5);
          }
          &.off {
            background: linear-gradient(
              135deg,
              rgba(232, 232, 232, 1) 0%,
              rgba(204, 204, 204, 1) 100%
            );
            box-shadow: 0px 0 20rpx 0px rgba(229, 229, 229, 0.6);
          }
          &.warn {
            background: linear-gradient(
              135deg,
              rgba(255, 137, 21, 1) 0%,
              rgba(255, 137, 21, 1) 100%
            );
            box-shadow: 0px 0 20rpx 0px rgba(255, 137, 21, 0.6);
          }
          p {
            position: relative;
            top: 50%;
            text-align: center;
            transform: translateY(-50%);
            color: white;
            font {
              font-size: 40rpx;
              display: block;
            }
            span {
              font-size: 32rpx;
              line-height: 45rpx;
              display: block;
              &:last-child {
                line-height: 50rpx;
                font-size: 36rpx;
              }
            }
          }
        }
      }
      .sign-locate {
        margin-top: 40rpx;
        .locate-btn {
          text-align: center;
          i {
            font-size: 28rpx;
            color: #51c512;
            margin-right: 5rpx;
            display: inline-block;
          }
          font-size: 26rpx;
          color: #999999;
        }
        .locate-content {
          margin-top: 12rpx;
          font-size: 26rpx;
          color: #666;
          text-align: center;
          line-height: 36rpx;
        }
      }
    }
  }
}
</style>
