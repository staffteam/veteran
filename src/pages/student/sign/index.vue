<template>
  <div class="sign-list">
    <ul>
      <li v-for="item in signListData" :key="item.id" :class="item.sign?'on':''">
        <div>
          <h2 class="line">{{item.title}}</h2>
          <p>{{item.date}} {{item.timeArea}}</p>
        </div>
        <p>{{item.sign?'已签到':'未签到'}}</p>
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
      signListData: [
        {
          title: "信息办与基础工作安排培训信息办信息办与基础工作",
          date: "2019年8月16号",
          timeArea: "14:00-16:00",
          sign: false,
          id: 0
        },
        {
          title: "信息办与基础工作安排培训信息办信息办与基础工作",
          date: "2019年8月16号",
          timeArea: "14:00-16:00",
          sign: true,
          id: 1
        },
        {
          title: "信息办与基础工作安排培训信息办信息办与基础工作",
          date: "2019年8月16号",
          timeArea: "14:00-16:00",
          sign: true,
          id: 2
        },
        {
          title: "信息办与基础工作安排培训信息办信息办与基础工作",
          date: "2019年8月16号",
          timeArea: "14:00-16:00",
          sign: true,
          id: 3
        },
        {
          title: "信息办与基础工作安排培训信息办信息办与基础工作",
          date: "2019年8月16号",
          timeArea: "14:00-16:00",
          sign: true,
          id: 4
        }
      ]
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
      setTimeout(_ => {
        vm.isGet = false;
        vm.isLoading = false;
        vm.isNotData = true;
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
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
.sign-list{
  min-height: 100vh;
  background-color: #f7f7f7;
  ul{
    li{
      border-bottom: 1rpx solid #EEEEEE;
      padding: 31rpx 32rpx;
      overflow: hidden;
      background-color: white;
      &.on{
        &>p{
          color: #51C512;
        }
      }
      &>div{
        width: 554rpx;
        float:left;
        h2{
          font-size: 32rpx;
          line-height: 45rpx;
        }
        p{
          margin-top: 10rpx;
          line-height: 37rpx;
          color: #999;
          font-size: 26rpx;
        }
      }
      &>p{
        float: right;
        text-align: right;
        font-size: 28rpx;
        color: #FF8915;
        line-height: 40rpx;
      }
    }
  }
}
</style>
