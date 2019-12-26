<template>
  <div class="common-msg" v-if="commonMsg">
    <div>
      <p>
        <i class="iconfont icon-tishi"></i>
      </p>
      <h2>
        <span>{{title}}</span>
        <span>{{viceTitle}}</span>
      </h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "hint",
  data() {
    return {};
  },
  props: {
    commonMsg: {
      default: false
    },
    title: {
      default: ""
    },
    viceTitle: {
      default: ""
    }
  }
};
</script>
<style lang="less">
.common-msg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 240rpx;
    padding: 30rpx 24rpx;
    background: rgba(58, 58, 58, 1);
    border-radius: 4rpx;
    opacity: 0.9;
    text-align: center;
    p {
      i {
        font-size: 52rpx;
        color: white;
        font-weight: 400;
      }
    }
    h2 {
      text-align: center;
      color: white;
      margin-top: 18rpx;
      line-height: 42rpx;
      font-size: 28rpx;
      font-weight: 400;
      span {
        display: block;
      }
    }
  }
}
</style>