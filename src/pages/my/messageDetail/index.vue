<template>
  <div class="msg-detail">
    <div class="detail-main">
      <div class="title">
        <h2>{{detail.Title}}</h2>
        <p>{{detail.UpdateTime}}</p>
      </div>
      <div class="detail-content wxparse-mains" v-if="detail.Content">
        <rich-text :nodes="detail.Content"></rich-text>
      </div>
    </div>
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
      detail: {}
    };
  },
  methods: {
    tagClick(item) {
      this.tagCheck = item.id;
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
    vm.$api
      .$signGet("消息详情", {
        id: o.id,
        userid: mpvue.getStorageSync("userid")
      })
      .then(res => {
        vm.detail = res.Data;
        if (vm.detail.UpdateTime) {
          let timeArr = vm.detail.UpdateTime.split(":");
          vm.detail.UpdateTime = `${timeArr[0]}:${timeArr[1]}`;
        }else{
          let timeArr = vm.detail.ActiveTime.split(":");
          vm.detail.UpdateTime = `${timeArr[0]}:${timeArr[1]}`;
        }
      });
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.msg-detail {
  background-color: #f9fafb;
  padding: 30rpx;
  .detail-main {
    background-color: white;
    padding: 32rpx;
    .title {
      h2 {
        font-size: 32rpx;
        font-weight: 600;
      }
      p {
        font-size: 22rpx;
        color: rgba(153, 153, 153, 1);
        line-height: 30rpx;
        margin-top: 12rpx;
      }
    }
    .detail-content {
      margin-top: 16rpx;
    }
  }
}
</style>
