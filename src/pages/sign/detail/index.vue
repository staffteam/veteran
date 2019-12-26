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
          <p :class="isStartSign?'on':''">{{isStartSign?"已签到":"未签到"}}</p>
        </div>
        <div>
          <h2>退场时间 {{endSignTime}}</h2>
          <p :class="isEndSign?'on':''">{{isEndSign?"已签到":"未签到"}}</p>
        </div>
      </div>
      <div class="sign">
        <div class="sign-btn">
          <!-- 未到上课签到时间 -->
          <div v-if="!allowStartSign" class="off">
            <p>
              <span>距下次签到</span>
              <span>{{startCountDown}}</span>
            </p>
          </div>
          <!-- 上课未签到，且没有迟到，且已到可以上课签到时间 -->
          <div
            v-if="!isStartSign && !isStartbeLate && allowStartSign"
            :class="signScope?'on':'off'"
            @click="startSign()"
          >
            <p>
              <font>签到</font>
            </p>
          </div>
          <!-- 上课未签到，且已经迟到，且已到可以上课签到时间，且没有到下课时间 -->
          <div
            v-if="!isStartSign && isStartbeLate && !isEndLeave"
            :class="signScope?'on warn':'off'"
            @click="startSign()"
          >
            <p>
              <font>迟到打卡</font>
            </p>
          </div>
          <!-- 上课已签到，未到下课签到时间（早退时间段） -->
          <div v-if="isStartSign && !isEndLeave" class="off">
            <p>
              <span>距下次签到</span>
              <span>{{endCountDown}}</span>
            </p>
          </div>
          <!-- 下课未签到，且已到下课签到时间，且上课已签到 -->
          <div
            v-if="!isEndSign && isEndLeave && isStartSign"
            :class="signScope?'on':'off'"
            @click="endSign()"
          >
            <p>
              <font>签到</font>
            </p>
          </div>
          <!-- 上课已签到，下课已签到 -->
          <div v-if="isStartSign && isEndSign" class="off">
            <p>
              <font>签到完成</font>
            </p>
          </div>
          <!-- 上课未签到，下课未签到，且已到下课时间 -->
          <div v-if="!isStartSign && !isEndSign && isEndLeave" class="off">
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
        locate: ""
      },
      allowStartSign: false,
      startCountDown: "加载中···",
      endCountDown: "加载中···",
      isStartSign: false,
      isStartbeLate: false,
      isEndLeave: false,
      isEndSign: false,
      allowEndSign: false,
      startSignTime: "加载中···",
      endSignTime: "加载中···",
      locateContent: "定位中···",
      qqmapsdk: "",
      signScope: false,
      commonMsg: false
    };
  },
  methods: {
    // 上课签到
    startSign() {
      if (this.signScope) {
        this.isStartSign = true;
      } else {
        this.commonMsg = true;
        setTimeout(_ => {
          this.commonMsg = false;
        }, 2000);
      }
    },
    // 下课签到
    endSign() {
      if (this.signScope) {
        this.isEndSign = true;
      } else {
        this.commonMsg = true;
        setTimeout(_ => {
          this.commonMsg = false;
        }, 2000);
      }
    },
    getSignInfo() {
      let vm = this;
      let data = {
        start_time: "23:45",
        end_time: "23:59",
        isStartSign: false,
        isEndSign: false,
        locate: "shenz 湖南省政府",
        title:
          "信息办与基础工作安排培训课程工作安排培训课程工作安排培训课程工作安排培训课程工作安排培训",
        teacher: "刘毅"
      };
      this.isStartSign = data.isStartSign;
      this.isEndSign = data.isEndSign;
      this.info = {
        title: data.title,
        teacher: data.teacher,
        locate: data.locate
      };
      let start_h = "";
      let end_h = "";
      let start_m = "";
      let end_m = "";
      if (data.start_time && data.end_time) {
        start_h = data.start_time.split(":")[0];
        start_m = data.start_time.split(":")[1];
        end_h = data.end_time.split(":")[0];
        end_m = data.end_time.split(":")[1];
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
        let start_time = new Date(
          `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${
            data.start_time
          }:00`
        );
        let end_time = new Date(
          `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${
            data.end_time
          }:00`
        );
        //判断是否已到上课签到时间 条件：当前时间小于等于上课时间，且时间间隔不大于一小时
        this.allowStartSign = start_time.getTime() - date.getTime() <= 86400000;
        //计算当前时间与上课时间的时间差
        this.getStartCountDown(start_time);
        setInterval(_ => {
          vm.getStartCountDown(start_time);
        }, 1000);
        //判断是否迟到
        this.isStartbeLate = start_time.getTime() - date.getTime() <= 0;
        //计算当前时间与下课时间的时间差
        this.getEndCountDown(end_time);
        setInterval(_ => {
          vm.getEndCountDown(end_time);
        }, 1000);
        //判断是否已到下课时间
        this.isEndLeave = end_time.getTime() - date.getTime() <= 0;
      }
    },
    getStartCountDown(start_time) {
      let date = new Date();
      let diff = start_time.getTime() - date.getTime();
      if (diff <= 86400000) {
        let hours = Math.floor(diff / (3600 * 1000)); //计算出小时数
        let leave2 = hours % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
        let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000); //计算相差秒钟
        this.startCountDown = `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`;
      } else {
        this.allowStartSign = true;
      }
    },
    getEndCountDown(end_time) {
      let date = new Date();
      let diff = end_time.getTime() - date.getTime();
      if (diff >= 0) {
        let hours = Math.floor(diff / (3600 * 1000)); //计算出小时数
        let leave2 = diff % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
        let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000); //计算相差秒钟
        this.endCountDown = `${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }:${seconds < 10 ? "0" + seconds : seconds}`;
      } else {
        this.isEndLeave = true;
      }
    },
    getLocate() {
      let vm = this;
      mpvue.showLoading({
        title: "定位中"
      });
      mpvue.getLocation({
        type: "wgs84",
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
              vm.locateContent =
                data.result.ad_info.city +
                " " +
                data.result.formatted_addresses.recommend;
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
    this.getSignInfo();
    this.qqmapsdk = new QQMapWX({
      key: "KSVBZ-FXYEO-YPOWF-SS2GK-UBMQ7-G5BXE"
    });
    this.getLocate();
  },
  onLoad() {
    let vm = this;
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
