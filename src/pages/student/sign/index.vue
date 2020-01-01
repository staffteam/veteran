<template>
  <div class="sign-list">
    <ul>
      <li v-for="item in signListData" :key="item.id" :class="item.Status?'on':''">
        <div>
          <h2 class="line">{{item.Title}}</h2>
          <p>{{item.StartTime}} {{item.SignInTime}}-{{item.SignOutTime}}</p>
        </div>
        <p>{{item.Status?'已签到':'未签到'}}</p>
      </li>
    </ul>
    <load-data :isLoading="isLoading" :isNotData="isNotData" />
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
      pid: "",
      signListData: []
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
      this.$api
        .$signGet("学员签到列表", {
          page: vm.pageNum,
          userid: vm.pid
        })
        .then(res => {
          if (res.Data.length > 0) {
            vm.isGet = true;
            vm.isLoading = false;
            res.Data = res.Data.map(value=>{
              value.SignInTime = value.SignInTime.split(':')[0]+value.SignInTime.split(':')[1];
              value.SignOutTime = value.SignOutTime.split(':')[0]+value.SignOutTime.split(':')[1];
              return value;
            })
            vm.signListData = [...vm.signListData,...res.Data];
          } else {
            vm.isGet = false;
            vm.isLoading = false;
            vm.isNotData = true;
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
  },
  onLoad(o) {
    let vm = this;
    vm.pid = o.id;
    vm.signListData=[];
    vm.getData();
  }
};
</script>

<style lang="less" scoped>
.sign-list {
  min-height: 100vh;
  background-color: #f7f7f7;
  ul {
    li {
      border-bottom: 1rpx solid #eeeeee;
      padding: 31rpx 32rpx;
      overflow: hidden;
      background-color: white;
      &.on {
        & > p {
          color: #51c512;
        }
      }
      & > div {
        width: 554rpx;
        float: left;
        h2 {
          font-size: 32rpx;
          line-height: 45rpx;
        }
        p {
          margin-top: 10rpx;
          line-height: 37rpx;
          color: #999;
          font-size: 26rpx;
        }
      }
      & > p {
        float: right;
        text-align: right;
        font-size: 28rpx;
        color: #ff8915;
        line-height: 40rpx;
      }
    }
  }
}
</style>
