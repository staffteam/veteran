<template>
  <div class="my-exam">
    <div class="top">
      <img src="/static/images/about-top.jpg" mode="widthFix" />
    </div>
    <div class="detail-content wxparse-mains" v-if="aboutusContent!=''">
      <wxParse :content="aboutusContent" />
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
      aboutusContent: ""
    };
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
    this.$api
      .$signGet("关于我们", {
        enCode: "gywm"
      })
      .then(res => {
        vm.aboutusContent = res.Data.Content;
      });
  }
};
</script>
<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.my-exam {
  .top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .detail-content {
    position: relative;
    z-index: 9;
    padding: 55rpx;
    padding-top: 220rpx;
  }
}
</style>
