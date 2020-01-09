<template>
  <div class="agreement wxparse-mains" v-if="content">
   <wxParse :content="content" />
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
      content:""
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
    vm.$api.$signGet('用户协议',{}).then(res=>{
      vm.content = res.Data.Content;
    })
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.agreement {
  padding: 20rpx;
}
</style>
