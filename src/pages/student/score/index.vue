<template>
  <div class="score-list">
    <ul>
      <li v-for="item in scoreListData" :key="item.id" :class="item.qualified?'on':''">
        <h2 class="line">{{item.title}}</h2>
        <p>{{item.score}}</p>
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
      scoreListData: [
        {
          title: "资料分析",
          score: "59",
          qualified: false,
          id: 0
        },
        {
          title: "马克思理论",
          score: "90",
          qualified: true,
          id: 1
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
.score-list {
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
      & > h2 {
        width: 70%;
        float:left;
        line-height: 45rpx;
        font-size: 32rpx;
      }
      & > p {
        float: right;
        text-align: right;
        font-size: 32rpx;
        color: #ff8915;
        line-height: 45rpx;
      }
    }
  }
}
</style>
