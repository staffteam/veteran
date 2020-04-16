<template>
  <div class="msg-main">
    <div class="my-msg">
      <div class="list" v-for="(item,index) in msgListData" :key="index">
        <div class="title">{{item.key}}</div>
        <ul>
          <li v-for="(items,i) in item.value" :key="i">
            <a :href="'../../my/messageDetail/main?id='+items.Id">
              <h2 :class="'line '+(!items.IsRead?'on':'')">{{items.Title}}</h2>
              <p class="line">{{items.Description}}</p>
              <div>
                <span>查看详情</span>
                <i class="iconfont icon-you1"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <load-data v-if="msgListData.length>0" :isLoading="isLoading" :isNotData="isNotData" />
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
      msgListData: []
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
      this.$api
        .$signGet("消息列表", {
          userid: mpvue.getStorageSync("userid"),
          page: vm.pageNum
        })
        .then(res => {
          if (res.Data.length > 0) {
            vm.isLoading = false;
            vm.isGet = true;
            vm.msgListData = [...res.Data, ...vm.msgListData];
          } else {
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
    this.isGet = true;
    this.pageNum = 1;
    this.pageSize = 10;
    this.msgListData = [];
    this.getData();
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
.msg-main {
  background-color: #f9fafb;
}
.my-msg {
  min-height: 100vh;
  padding: 30rpx;
  .list {
    margin-top: 30rpx;
    &:first-child {
      margin-top: 0;
    }
    .title {
      width: 248rpx;
      height: 36rpx;
      margin: 0 auto;
      background: rgba(215, 221, 224, 1);
      border-radius: 18rpx;
      font-size: 22rpx;
      color: rgba(255, 255, 255, 1);
      line-height: 36rpx;
      text-align: center;
    }
    ul {
      li {
        margin-top: 30rpx;
        background: rgba(255, 255, 255, 1);
        border-radius: 8rpx;
        padding: 24rpx 32rpx 0;
        &:first-child {
          margin-top: 20rpx;
        }
        h2 {
          font-size: 32rpx;
          font-weight: 600;
          line-height: 45rpx;
          height: 45rpx;
          position: relative;
          &.on {
            padding-left: 32rpx;
            &::before {
              position: absolute;
              width: 16rpx;
              height: 16rpx;
              background-color: #e53330;
              border-radius: 50%;
              display: block;
              content: "";
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
        p {
          margin-top: 10rpx;
          font-size: 26rpx;
          color: #999999;
        }
        div {
          border-top: 1rpx solid #e5e5e5;
          height: 90rpx;
          line-height: 90rpx;
          margin-top: 20rpx;
          span {
            font-size: 28rpx;
            color: #666666;
            display: inline-block;
          }
          i {
            float: right;
            font-size: 26rpx;
            color: #cccccc;
          }
        }
      }
    }
  }
}
</style>
