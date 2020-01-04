<template>
  <div class="affirm-info">
    <p>
      <img src="/static/images/login-back_01.jpg" mode="widthFix" />
      <img src="/static/images/login-back_03.jpg" mode="widthFix" />
    </p>
    <div class="error-correction">
      <p>
        <img src="/static/images/graduation.png" mode="widthFix" />
      </p>
      <h2>恭喜您，完成适应性培训！</h2>
      <div>您的培训已结束，可以在人才空间寻找合适的岗位</div>
      <p class="btn" @click="affirmCorrection()">人才空间</p>
      <p class="btn-text" @click="backHome()">返回首页</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    backHome() {
      mpvue.switchTab({
        url: "../index/main"
      });
    },
    affirmCorrection() {
      mpvue.navigateTo({
        url: "../talentSpace/list/main"
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
  onUnload() {
    mpvue.setStorageSync("oneLogin", "1");
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
.affirm-info {
  background-color: #fefaf9;
  & > p {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
      &:last-child {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
    }
  }
  .error-correction {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 9;
    text-align: center;
    padding-top: 277rpx;
    & > p:first-child {
      width: 300rpx;
      margin: 0 auto;
    }
    & > i {
      font-size: 144rpx;
      color: #e53330;
    }
    & > h2 {
      margin-top: 48rpx;
      font-size: 40rpx;
      line-height: 56rpx;
      font-weight: 600;
      color: #e53330;
    }
    & > div {
      font-size: 28rpx;
      line-height: 40rpx;
      color: #999;
      width: 90%;
      margin: 0 auto;
      margin-top: 20rpx;
    }
    & > p.btn {
      width: 500rpx;
      height: 88rpx;
      background: rgba(229, 51, 48, 1);
      border-radius: 5rpx;
      font-size: 32rpx;
      text-align: center;
      line-height: 88rpx;
      color: white;
      margin: 0 auto;
      margin-top: 120rpx;
    }
    & > p.btn-text {
      width: 184rpx;
      height: 88rpx;
      border-radius: 4rpx;
      font-size: 32rpx;
      text-align: center;
      line-height: 88rpx;
      color: #e53330;
      margin: 0 auto;
      margin-top: 20rpx;
    }
  }
}
</style>
