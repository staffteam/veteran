<template>
  <div class="not-exam" >
    <img src="/static/images/not-exploit.jpg" mode="widthFix" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
.not-exam{
    width: 100%;
    height: 100vh;
    img{
      max-width:40%;
      position: relative;
      display: block;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
