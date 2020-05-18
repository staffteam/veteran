<template>
  <div class="sign-in">
    <div class="sign-in-top"></div>
    <div class="sign-in-info">
      <div class="title">
        <i class="iconfont icon-kecheng"></i>
        <h2 class="lines">{{info.Cource.Title}}</h2>
      </div>
      <div class="name">指导老师：{{info.Cource.TeacherName}}</div>
      <div class="locate">
        <i class="iconfont icon-dingweiweizhi"></i>
        <h2>{{info.Cource.Address}}</h2>
      </div>
    </div>
    <div class="sign-in-content">
      <div class="list-title">学院考勤</div>
      <div class="list-info">
        <ul>
          <li v-for="item in signData" :key="item.id">
            <h2>{{item.num}}</h2>
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
      <div class="list-title">学员列表</div>
      <div class="list-search">
        <p>
          <i class="iconfont icon-sousuo"></i>
          <input type="search" v-model="searchVal" @confirm="searchSubmit" placeholder="搜索" />
        </p>
      </div>
      <div class="list-main">
        <ul>
          <li v-for="item in userData" :key="item.id">
            <div class="top">
              <img :src="item.Image" mode="widthFix" />
              <!-- {{item.ShortName}} -->
            </div>
            <div class="center">
              <h2 class="center-title">{{item.Name}}</h2>
              <div class="center-sign">
                <div>
                  <h2>进场签到</h2>
                  <p :class="item.SignInStatus?'on':''">{{item.SignInStatus?'已签到':'未签到'}}</p>
                </div>
                <div>
                  <h2>课后签退</h2>
                  <p :class="item.SignOutStatus?'on':''">{{item.SignOutStatus?'已签退':'未签退'}}</p>
                </div>
              </div>
            </div>
            <div class="btn">
              <!-- 下课未签到 -->
              <p v-if="!item.SignOutStatus" class="readonly">确认签到</p>
              <!-- 上课已签到，下课已签到 -->
              <p
                v-if="item.SignInStatus && item.SignOutStatus && !item.IsConfirm"
                class="on"
                @click="goSign(item)"
              >确认签到</p>
              <!-- 上课已签到，下课已签到，已确认签到 -->
              <p v-if="item.SignInStatus && item.SignOutStatus && item.IsConfirm" class="off">已确认</p>
            </div>
          </li>
        </ul>
        <load-data :isLoading="isLoading" :isNotData="isNotData" />
      </div>
    </div>
    <div class="sign-btn-h"></div>
    <div class="sign-in-btn" @click="allSign()">一键确认签到</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      isNotData: false,
      isGet: true,
      pageNum: 1,
      pageSize: 10,
      info: { Cource: {} },
      signData: [],
      userData: [],
      userDataHost: [],
      searchVal: "",
      pid: "",
      userInfo: {}
    };
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let vm = this;
    if (vm.isGet) {
      vm.pageNum++;
      vm.getData();
    }
  },
  methods: {
    getData() {
      let vm = this;
      vm.isGet = false;
      vm.isLoading = true;
      vm.$api
        .$signGet("老师查看课程签到列表", {
          id: vm.pid,
          page: vm.pageNum
        })
        .then(res => {
          wx.stopPullDownRefresh();
          if (res.Data.length > 0) {
            vm.isGet = true;
            vm.isLoading = false;
            vm.userData = [...vm.userData, ...res.Data];
            vm.userDataHost = [...vm.userData, ...res.Data];
          } else {
            vm.isGet = false;
            vm.isLoading = false;
            vm.isNotData = true;
          }
        });
    },
    getSignInfo() {
      let vm = this;
      vm.$api
        .$signGet("老师查看课程", {
          id: vm.pid,
          userid: mpvue.getStorageSync("userid")
        })
        .then(res => {
          vm.info = res.Data;
          vm.signData = [
            {
              title: "参与人数",
              num: res.Data.Total,
              id: 0
            },
            {
              title: "已签到",
              num: res.Data.SignInCount,
              id: 1
            },
            {
              title: "未签到",
              num: res.Data.NoSignInCount,
              id: 2
            }
          ];
        });
    },
    allSign() {
      let vm = this;
      let is = true;
      this.userData = this.userData.map(value => {
        if (!value.IsConfirm) {
          is = false;
        }
        return value;
      });
      if (is) {
        mpvue.showToast({
          title: "没有可签到的人员",
          icon: "none"
        });
      } else {
        vm.$api
          .$signGet("老师一键确认签到", {
            args: {
              id: vm.pid,
              userid: mpvue.getStorageSync("userid")
            }
          })
          .then(res => {
            mpvue.showToast({
              title: "确认签到成功",
              icon: "success"
            });
            vm.userData = this.userData.map(value => {
              value.IsConfirm = true;
              return value;
            });
          });
      }
    },
    goSign(item) {
      let vm = this;
      vm.$api
        .$signGet("老师确认签到", {
          args: {
            id: vm.pid,
            userid: mpvue.getStorageSync("userid"),
            stuid: item.Id
          }
        })
        .then(res => {
          mpvue.showToast({
            title: "确认签到成功",
            icon: "success"
          });
          vm.userData = this.userData.map(value => {
            if (item.Id == value.Id) {
              value.IsConfirm = true;
            }
            return value;
          });
        });
    },
    searchSubmit() {
      let vm = this;
      this.userData = this.userDataHost.filter(value => {
        return value.Name.indexOf(vm.searchVal) >= 0;
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
    let vm = this;
    if (vm.pid) {
      vm.isGet = true;
      vm.pageNum = 1;
      vm.isLoading = false;
      vm.isNotData = false;
      vm.userData = [];
      vm.userDataHost = [];
      vm.getSignInfo();
      vm.getData();
    }
  },
  onPullDownRefresh: function() {
    let vm = this;
    vm.isGet = true;
    vm.pageNum = 1;
    vm.isLoading = false;
    vm.isNotData = false;
    vm.userData = [];
    vm.userDataHost = [];
    vm.getSignInfo();
    vm.getData();
  },
  onLoad(o) {
    let vm = this;
    vm.pid = o.id;
    vm.userInfo = mpvue.getStorageSync("userInfo");
    vm.getSignInfo();
    vm.getData();
  }
};
</script>

<style lang="less" scoped>
.sign-in {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-top: 20rpx;
  .sign-in-top {
    position: absolute;
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
      height: 35rpx;
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
    margin: 20rpx 32rpx;
    min-height: calc(~"100vh - 400rpx");
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10rpx;
    padding: 46rpx 0 0;
    .list-title {
      height: 32rpx;
      line-height: 32rpx;
      padding-left: 20rpx;
      border-left: 10rpx solid #e53330;
      font-size: 32rpx;
    }
    .list-info {
      padding: 50rpx 0;
      text-align: center;
      height: 180rpx;
      ul {
        li {
          display: inline-block;
          width: 100rpx;
          margin: 0 50rpx;
          h2 {
            font-size: 44rpx;
            line-height: 44rpx;
          }
          p {
            font-size: 24rpx;
            line-height: 24rpx;
            margin-top: 15rpx;
          }
        }
      }
    }
    .list-search {
      margin: 40rpx 24rpx 20rpx;
      & > p {
        border: 1px solid #cccccc;
        height: 70rpx;
        i {
          width: 65rpx;
          display: block;
          text-align: center;
          line-height: 68rpx;
          font-size: 28rpx;
          color: #b2b2b2;
          float: left;
        }
        input {
          width: calc(~"100% - 65rpx");
          float: right;
          height: 68rpx;
          border: 0px;
          font-size: 28rpx;
        }
      }
    }
    .list-main {
      min-height: calc(~"100% - 374rpx");
      ul {
        li {
          margin: 0 24rpx;
          border-bottom: 1px solid #e5e5e5;
          padding: 30rpx 0;
          overflow: hidden;
          .top {
            width: 80rpx;
            height: 80rpx;
            float: left;
            border-radius: 50%;
            line-height: 80rpx;
            text-align: center;
            font-size: 26rpx;
            color: white;
            background-color: #eee;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .center {
            float: left;
            margin-left: 24rpx;
            width: calc(~"100% - 264rpx");
            .center-title {
              font-size: 36rpx;
            }
            .center-sign {
              margin-top: 23rpx;
              overflow: hidden;
              & > div {
                width: 110rpx;
                float: left;
                margin-right: 40rpx;
                &:last-child {
                  margin-right: 0;
                }
                h2 {
                  font-size: 26rpx;
                  color: #666;
                }
                p {
                  width: 98rpx;
                  height: 36rpx;
                  background: #ff8915;
                  border-radius: 18rpx;
                  color: white;
                  font-size: 22rpx;
                  line-height: 36rpx;
                  margin-top: 8rpx;
                  text-align: center;
                  &.on {
                    background: rgba(81, 197, 18, 1);
                  }
                }
              }
            }
          }
          .btn {
            float: right;
            p {
              text-align: center;
              &.readonly {
                width: 144rpx;
                height: 60rpx;
                background: rgba(255, 255, 255, 1);
                border-radius: 8rpx;
                border: 2rpx solid rgba(229, 51, 48, 1);
                font-size: 28rpx;
                color: rgba(229, 51, 48, 1);
                line-height: 60rpx;
                opacity: 0.5;
              }
              &.on {
                width: 144rpx;
                height: 60rpx;
                background: rgba(255, 255, 255, 1);
                border-radius: 8rpx;
                border: 2rpx solid rgba(229, 51, 48, 1);
                font-size: 28rpx;
                color: rgba(229, 51, 48, 1);
                line-height: 60rpx;
              }
              &.off {
                width: 144rpx;
                height: 60rpx;
                background: rgba(229, 51, 48, 0.4);
                border-radius: 8rpx;
                font-size: 28rpx;
                color: rgba(255, 255, 255, 1);
                line-height: 60rpx;
              }
            }
          }
        }
      }
    }
  }
  .sign-btn-h {
    height: 100rpx;
  }
  .sign-in-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    font-size: 32rpx;
    color: white;
    z-index: 999;
    background-color: #e53330;
  }
}
</style>
