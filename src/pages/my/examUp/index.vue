<template>
  <div class="exam-detail">
    <div class="exam-detail-top">
      <img src="/static/images/exam-detail-top.jpg" mode="widthFix" />
    </div>
    <div class="exam-detail-main">
      <h2>{{exam.Name}}</h2>
      <div class="content">
        <p>
          <img src="/static/images/load-up.png" mode="widthFix" />
        </p>
        <h2>考试完毕</h2>
        <span>成绩正在统计中，请等待公布</span>
      </div>
    </div>
    <div class="go-exam" @click="goExam">返回首页</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exam: {}
    };
  },
  methods: {
    goExam() {
      mpvue.reLaunch({
        url: "../../index/main"
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
    this.$api
      .$signGet("科目详情", {
        id: o.id,
        userid: mpvue.getStorageSync("userid")
      })
      .then(res => {
        vm.exam = res.Data;
      });
  }
};
</script>

<style lang="less" scoped>
.exam-detail {
  .exam-detail-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
  }
  .exam-detail-main {
    position: relative;
    z-index: 9;
    & > h2 {
      padding: 38rpx 75rpx 44rpx;
      font-size: 40rpx;
      color: white;
      line-height: 56rpx;
      text-align: center;
    }
    .content {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0 40rpx rgba(229, 51, 48, 0.2);
      border-radius: 10rpx;
      margin: 0 30rpx;
      padding:127rpx 0 155rpx 0;
      & > p {
        width: 256rpx;
        margin: 0 auto;
      }
      h2 {
        text-align: center;
        margin-top: 49rpx;
        font-size: 40rpx;
        line-height: 56rpx;
        color: #f46e68;
        font-weight: 500;
      }
      span {
        display: block;
        text-align: center;
        margin-top: 4rpx;
        font-size: 28rpx;
        color: rgba(244, 110, 104, 1);
        line-height: 40rpx;
      }
    }
  }
  .go-exam {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 96rpx;
    text-align: center;
    background-color: #e53330;
    font-size: 32rpx;
    color: white;
    line-height: 96rpx;
  }
}
</style>
