<template>
  <div class="not">
    正在建设中...
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
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
.not{
  padding: 200rpx 0;
  text-align: center;
  font-size:35rpx;
  color:#999;
}
</style>
