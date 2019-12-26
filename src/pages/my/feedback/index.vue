<template>
  <div class="my-exam">
    <!--pages/feedbackForm/feedbackForm.wxml-->
    <div class="val">
      <div class="title">
        <text>*</text>请描述你的问题
      </div>
      <div class="content">
        <textarea placeholder="请填写5个字以上的问题描述" maxlength="500" v-model="feedbackVal"></textarea>
        <text>{{feedbackVal.length}}/500</text>
      </div>
    </div>
    <div class="phones">
      <div class="title">
        <text>*</text>请留下你的手机号码
      </div>
      <div class="content">
        <input v-model="phoneVal" placeholder="请完善手机号码" />
      </div>
    </div>
    <div class="btn" @click="onSubmit">提交</div>
    <hint :commonMsg="commonMsg" :title="commonTitle" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      commonMsg: false,
      commonTitle: "",
      feedbackVal: "",
      phoneVal: ""
    };
  },
  methods: {
    showHint(text, time = 1000) {
      let vm = this;
      vm.commonMsg = true;
      vm.commonTitle = text;
      setTimeout(_ => {
        vm.commonMsg = false;
        vm.commonTitle = "";
      }, time);
    },
    onSubmit() {
      let vm = this;
      if (this.feedbackVal.length < 5) {
        vm.showHint("请完善您的意见");
      } else if (this.phoneVal == "") {
        vm.showHint("请完善您的手机号码");
      } else if (!/^1[3456789]\d{9}$/.test(this.phoneVal)) {
        vm.showHint("手机号格式错误");
      } else {
        mpvue.showLoading({
          title: "请稍后"
        });
        mpvue.hideLoading();
        mpvue.showToast({
          title: "提交成功！",
          mask: true,
          icon: "success",
          duration: 2000
        });
      }
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
/* pages/feedbackForm/feedbackForm.wxss */

.val {
  padding: 40rpx 32rpx;
}

.val .title {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 45rpx;
}

.val .title text {
  color: rgba(242, 71, 36, 1);
}

.val .content {
  margin-top: 16rpx;
  height: 480rpx;
  background: rgba(247, 247, 247, 1);
  border-radius: 8rpx;
  position: relative;
}

.val .content textarea {
  padding: 24rpx 32rpx 58rpx 32rpx;
  font-size: 28rpx;
  line-height: 40rpx;
  width: calc(100% - 64rpx);
  height: calc(100% - 78rpx);
}

.val .content text {
  position: absolute;
  right: 20rpx;
  bottom: 20rpx;
  font-size: 28rpx;
  color: rgba(153, 153, 153, 1);
  line-height: 40rpx;
}

.phones {
  padding: 20rpx 32rpx;
}

.phones .title {
  font-size: 32rpx;
  font-weight: 600;
  line-height: 45rpx;
}

.phones .title text {
  color: rgba(242, 71, 36, 1);
}

.phones .content {
  margin-top: 16rpx;
  height: 88rpx;
  background: rgba(247, 247, 247, 1);
  border-radius: 8rpx;
}

.phones .content input {
  font-size: 28rpx;
  height: 88rpx;
  width: 100%;
  padding-left: 32rpx;
}

.btn {
  width: 360rpx;
  height: 70rpx;
  background: rgba(229, 51, 48, 1);
  border-radius: 4rpx;
  margin: 0 auto;
  margin-top: 80rpx;
  font-size: 32rpx;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  line-height: 70rpx;
}
</style>
