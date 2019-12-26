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
          :class="(theDay == item.num+1?'on':'')+' '+(thisDay == item.num+1?'the':'')"
          @click="getTheDay(item.num+1)"
        >
          <p>{{item.num+1}}</p>
        </div>
      </div>
    </div>
    <scroll-view scroll-y="true" class="sign-in-content">
      <ul v-if="signInListData.length>0">
        <li v-for="(item,index) in signInListData" :key="index" :class="(item.sign?'on':'off')">
          <div class="time">{{item.timeArea}}</div>
          <div class="content">
            <a :href="!isAdmin?'../../sign/detail/main':'../../sign/admin/main'">
              <div class="l">
                <h2>{{item.title}}</h2>
                <p>{{item.desc}}</p>
              </div>
              <div class="r">
                <p v-if="item.sign">已签到</p>
                <p v-else>未签到</p>
              </div>
            </a>
          </div>
        </li>
      </ul>
      <div class="notdata" v-if="signInListData.length==0">- 暂无课程 -</div>
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
      signInDate: "",
      signInContent: "",
      firstDay: [],
      endDay: [],
      theDay: 1,
      thisDay: 1,
      signInListData: [],
      dateObj: { year: "", month: "" },
      isAdmin: false
    };
  },
  methods: {
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
      this.dateObj = { year: year, month: month };
      let thisDate = new Date();
      if (isThis) {
        this.thisDay = date.getDate();
        this.theDay = date.getDate();
        this.getData();
      } else {
        this.thisDay = "";
        this.theDay = "";
      }
      let begin = year + "-" + month + "-01 00:00:00";
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
    },
    getData() {
      this.signInListData = [
        {
          timeArea: "09:00-10:00",
          title: "退伍军人培训学习",
          desc: "中国上海市浦东新区浦建路769号",
          sign: true,
          id: 0
        },
        {
          timeArea: "14:00-16:00",
          title: "退伍军人培训学习",
          desc: "中国福建省厦门市莲花五村龙昌里344号",
          sign: false,
          id: 1
        },
        {
          timeArea: "14:00-16:00",
          title: "退伍军人培训学习",
          desc: "中国上海市浦东新区浦建路769号",
          sign: false,
          id: 2
        }
      ];
    },
    getTheDay(day) {
      this.theDay = day;
      this.getData();
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
        &.on {
          p {
            background-color: #e53330;
            color: white !important;
          }
        }
        &.the {
          p {
            border: 1px solid #e53330;
            color: #e53330;
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
