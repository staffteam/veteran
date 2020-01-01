<template>
  <div class="my-exam">
    <div class="top"><img src="/static/images/about-top.jpg" mode="widthFix"></div>
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
        aboutusContent:""
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
    this.$api.$signGet('关于我们',{
      enCode:"gywm"
    }).then(res=>{
      vm.aboutusContent = res.Data.Content;
    })
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.detail-content{
  padding: 55rpx;
}
</style>
