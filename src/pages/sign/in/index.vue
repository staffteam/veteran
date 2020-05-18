<template>
  <div class="sign-in">
    <div class="sign-in-top"></div>
    <div class="sign-in-date">
      <div class="title">
        <p class="l" @click="prevDate()">
          <i class="iconfont icon-xiangzuo"></i>
        </p>
        <h2>{{signInDate}}</h2>
        <p class="r" @click="nextDate()">
          <i class="iconfont icon-you1"></i>
        </p>
      </div>
      <div class="period">
        <ul>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>
      </div>
      <div class="calendar">
        <div v-for="item in firstDay" :key="item.id"></div>
        <div
          v-for="item in endDay"
          :key="item.id"
          :class="(isSignInData[item.num+1]===undefined?'':isSignInData[item.num+1]?'already-sign':'not-sign')+' '+(isOutTime[item.num+1]===undefined?'':isOutTime[item.num+1]?'out-time':'the-time')+' '+(staySignInData[item.num+1]?'the':'')+' '+(theDay == item.num+1?'on':'')"
          @click="getTheDay(item.num+1,staySignInData[item.num+1])"
        >
          <p>{{item.num+1}}</p>
        </div>
      </div>
    </div>
    <scroll-view scroll-y="true" class="sign-in-content">
      <ul v-if="signInListData.length>0">
        <li
          v-for="(item,index) in signInListData"
          :key="index"
          :class="(isAdmin?(item.isStart?'on':item.isEnd?'off':'later'):(item.IsSignIn?'on':theisLater?'later':'off'))"
        >
          <div class="time">{{item.SignInTime+'-'+item.SignOutTime}}</div>
          <div class="content">
            <a
              :href="!isAdmin?'../../sign/detail/main?id='+item.Id:'../../sign/admin/main?id='+item.Id"
            >
              <div class="l">
                <h2>{{item.Title}}</h2>
                <p>{{item.Address}}</p>
              </div>
              <div class="r" v-if="!isAdmin">
                <p v-if="item.IsSignIn">已签到</p>
                <p v-if="!item.IsSignIn && theisLater">待签到</p>
                <p v-if="!item.IsSignIn  && !theisLater">未签到</p>
              </div>
              <div class="r" v-if="isAdmin">
                <p v-if="item.isStart">开始签到</p>
                <p v-if="!item.isStart && !item.isEnd">未开始</p>
                <p v-if="!item.isStart && item.isEnd">结束签到</p>
              </div>
            </a>
          </div>
        </li>
      </ul>
      <div class="notdata" v-if="signInListData.length==0">- 暂无课程数据 -</div>
      <!-- {{testJson}} -->
      <!-- <load-data v-if="signInListData.length>0" :isLoading="isLoading" :isNotData="isNotData" /> -->
    </scroll-view>
  </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
export default {
  components: {
    wxParse
  },
  data() {
    return {
      isLoading: false,
      isNotData: false,
      isGet: true,
      pageNum: 1,
      pageSize: 10,
      signInDate: "",
      signInContent: "",
      firstDay: [],
      endDay: [],
      theDay: 1,
      thisDay: 1,
      signInListData: [],
      dateObj: { year: "", month: "" },
      isAdmin: false,
      courseData: [],
      isSignInData: {},
      staySignInData: {},
      testJson:'',
      theMonth: "",
      theisLater: false,
      isOutTime: {},
      signInListDay: ""
    };
  },
  methods: {
    reachBottom() {
      let vm = this;
      if (vm.isGet) {
        vm.pageNum++;
        vm.getData(vm.signInListDay);
      }
    },
    prevDate() {
      let { year, month } = this.dateObj;
      if (month == 1) {
        year--;
        month = 12;
      } else {
        month--;
      }
      this.signInListData = [];
      this.getDates(year, month);
    },
    nextDate() {
      let { year, month } = this.dateObj;
      if (month == 12) {
        year++;
        month = 1;
      } else {
        month++;
      }
      this.signInListData = [];
      this.getDates(year, month);
    },
    getDates(_year, _month, _day) {
      let date = new Date();
      let isThis = true;
      if (_year && _month) {
        isThis =
          `${date.getFullYear()}年${date.getMonth() + 1}月` ==
          `${_year}年${_month}月`;
        date = new Date(
          `${_year}/${_month}/${isThis ? date.getDate() : "01"} 00:00:00`
        );
      }
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      this.signInDate = `${year}年${month}月`;
      this.theMonth = `${year}-${+month > 9 ? month : "0" + month}`;
      this.dateObj = { year: year, month: month };
      let thisDate = new Date();
      if (isThis) {
        this.thisDay = date.getDate();
        this.theDay = date.getDate();
        this.getData(this.thisDay);
      } else {
        this.thisDay = "";
        this.theDay = "";
      }
      let begin = year + "/" + month + "/01 00:00:00";
      let firstDate = new Date(begin);
      let lastDate = new Date(year, month, 0);
      let _endDay_ = lastDate.getDate();
      this.endDay = [];
      for (let i = 0; i < _endDay_; i++) {
        this.endDay.push({ num: i, id: `${year}_${month}_${i}` });
      }
      let _day_ = firstDate.getDay() == 0 ? 7 : firstDate.getDay();
      this.firstDay = [];
      for (let i = 0; i < _day_ - 1; i++) {
        this.firstDay.push({ num: i, id: `${year}_${month}_${i}` });
      }
      this.getDataLog(this.theMonth);
    },
    getData(day) {
      let vm = this;
      day = +day>9?day:'0'+day;
      this.signInListDay = day;
      this.$api
        .$signGet(vm.isAdmin ? "老师根据日期获取课程" : "根据日期获取课程", {
          date: vm.theMonth + "-" + day,
          userid: mpvue.getStorageSync("userid")
        })
        .then(res => {
          if (res.Data.length > 0) {
            let theDate = new Date();
            vm.signInListData = res.Data.map(value => {
              let _arr1 = value.SignInTime.split(":");
              value.SignInTime = `${_arr1[0]}:${_arr1[1]}`;
              let _arr2 = value.SignOutTime.split(":");
              value.SignOutTime = `${_arr2[0]}:${_arr2[1]}`;
              value.StartTime = value.StartTime.replace(/\-/g,"\/")
              //判断是否是老师
              if (vm.isAdmin) {
                //获取签到精准时间
                let signTime = new Date(
                  `${value.StartTime.split(" ")[0]} ${value.SignInTime}`
                );
                let outTime = new Date(
                  `${value.StartTime.split(" ")[0]} ${value.SignOutTime}`
                );
                let reservedTime = +value.ReservedTime * 60 * 1000;
                if (signTime.getTime() - theDate.getTime() > reservedTime) {
                  //上课签到时间大于当前时间，未开始
                  value.isStart = false;
                  value.isEnd = false;
                } else if (
                  outTime.getTime() - theDate.getTime() >
                  -reservedTime
                ) {
                  //下课签到时间大于当前时间，开始签到
                  value.isStart = true;
                  value.isEnd = false;
                } else {
                  //超出下课时间，结束
                  value.isStart = false;
                  value.isEnd = true;
                }
              }
              return value;
            });
          }
        });
    },
    getTheDay(day, isLater) {
      this.theDay = day;
      this.theisLater = isLater ? true : false;
      this.signInListData = [];
      this.getData(day);
    },
    getDataLog(date) {
      let vm = this;
      this.$api
        .$signGet(
          vm.isAdmin ? "老师根据日期获取签到状态" : "根据日期获取签到状态",
          {
            date: date,
            userid: mpvue.getStorageSync("userid")
          }
        )
        .then(res => {
          if (!vm.isAdmin) {
            vm.courseData = res.Data;
            let _json = {},
              stayJson = {},
              testJson ={};
            let theDate = new Date();
            vm.courseData.forEach(value => {
              //获取日期中的天数
              let day = value.Date.split(" ")[0].split("-")[2];
              _json[day] = value.IsSignIn;
              let _date = new Date(value.Date.replace(/\-/g,"\/"));
              testJson[value.Date] = _date.getTime();
              if (_date.getTime() - theDate.getTime() > 0) {
                stayJson[day] = true;
              }
            });
            vm.staySignInData = stayJson;
            vm.testJson = JSON.stringify(testJson);
            vm.isSignInData = _json;
          } else {
            vm.courseData = res.Data;
            let _json = {},
              stayJson = {};
            let theDate = new Date();
            vm.courseData.forEach(value => {
              let day = value.split(" ")[0].split("-")[2];
              let _date = new Date(value);
              let _the = `${theDate.getFullYear()}-${theDate.getMonth() +
                1}-${theDate.getDate()}`;
              if (_the == value) {
                //当天
                _json[day] = false;
              } else {
                if (_date.getTime() - theDate.getTime() > 0) {
                  stayJson[day] = true;
                } else {
                  _json[day] = true;
                }
              }
            });
            vm.staySignInData = stayJson;
            vm.isOutTime = _json;
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
    let userInfo = mpvue.getStorageSync("userInfo");
    this.isAdmin = userInfo.IsTeacher==null?false:true;
    this.signInListData = [];
    this.getDates();
  },
  onLoad() {
    let vm = this;
  }
};
</script>
<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
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
  .sign-in-date {
    position: relative;
    z-index: 9;
    width: calc(~"100% - 60rpx");
    height: 625rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 8rpx;
    margin: 0 auto;
    padding-top: 28rpx;
    .title {
      font-size: 32rpx;
      line-height: 45rpx;
      text-align: center;
      h2 {
        display: inline-block;
      }
      p.l {
        float: left;
        padding: 0 20rpx;
        font-size: 28rpx;
      }
      p.r {
        float: right;
        padding: 0 20rpx;
        font-size: 28rpx;
      }
    }
    .period {
      margin-top: 15rpx;
      border-bottom: 1px solid #e5e5e5;
      padding: 15rpx 0;
      overflow: hidden;
      ul {
        li {
          width: calc(~"100% / 7");
          float: left;
          text-align: center;
          font-size: 28rpx;
          color: #999999;
        }
      }
    }
    .calendar {
      div {
        width: calc(100% / 7);
        float: left;
        text-align: center;
        font-size: 30rpx;
        color: #999999;
        margin: 0;
        margin: 12rpx 0;
        height: 56rpx;
        line-height: 56rpx;
        border: 1rpx solid white;
        position: relative;
        &.on {
          p {
            border: 1rpx solid #e53330 !important;
            background-color: #e53330;
            color: white !important;
          }
          &:before {
            display: none !important;
          }
        }
        &.the {
          p {
            border: 1rpx solid #e53330;
            color: #e53330;
          }
          &:before {
            display: none !important;
          }
        }
        &.out-time {
          p {
            border: 1rpx solid #999;
            color: #999;
          }
        }
        &.the-time {
          p {
            border: 1rpx solid #51c512;
            color: #51c512;
          }
        }
        &.already-sign {
          &:before {
            content: "";
            display: block;
            width: 12rpx;
            height: 4rpx;
            background-color: #51c512;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
          }
        }
        &.not-sign {
          &:before {
            content: "";
            display: block;
            width: 12rpx;
            height: 4rpx;
            background-color: #ff8915;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
          }
        }
        p {
          width: 56rpx;
          height: 56rpx;
          margin: 0 auto;
          border-radius: 50%;
          text-align: center;
        }
      }
    }
  }
  .sign-in-content {
    margin-top: 20rpx;
    height: calc(~"100vh - 665rpx");
    ul {
      li {
        margin: 30rpx;
        &:first-child {
          margin-top: 0;
        }
        &.on {
          .time {
            &:before {
              background: #51c512;
            }
          }
          .content {
            .r {
              color: #51c512;
            }
          }
        }
        &.later {
          .time {
            &:before {
              background: #ff8915;
            }
          }
          .content {
            .r {
              color: #ff8915;
            }
          }
        }
        &.off {
          .time {
            &:before {
              background: #e53330;
            }
          }
          .content {
            .r {
              color: #ff8915;
            }
          }
        }
        .time {
          font-size: 28rpx;
          line-height: 40rpx;
          position: relative;
          &:before {
            content: "";
            width: 20rpx;
            height: 20rpx;
            display: inline-block;
            border-radius: 50%;
            margin-right: 10rpx;
            margin-left: 10rpx;
          }
        }
        .content {
          background-color: white;
          padding: 24rpx;
          margin-top: 10rpx;
          overflow: hidden;
          .l {
            width: 70%;
            float: left;
            h2 {
              font-size: 32rpx;
              line-height: 40rpx;
            }
            p {
              margin-top: 15rpx;
              font-size: 26rpx;
              line-height: 30rpx;
              color: #999;
            }
          }
          .r {
            width: 30%;
            float: right;
            font-size: 28rpx;
            line-height: 85rpx;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
