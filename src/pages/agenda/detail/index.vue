<template>
  <div class="workProgram-detail">
    <p class="detail-back">
      <img src="/static/images/detail-back.jpg" mode="widthFix" />
    </p>
    <div class="detail-content wxparse-mains" v-if="detail.Content">
      <wxParse :content="detail.Content" />
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
      .$signGet("文章详情", {
        id: o.id
      })
      .then(res => {
        vm.detail = res.Data;
      });
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.workProgram-detail {
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 96rpx;
    background-color: white;
    z-index: 999;
    box-shadow: 0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
    ul {
      height: 96rpx;
      overflow: hidden;
      li {
        display: inline-block;
        width: 49.9vw;
        text-align: center;
        font-size: 32rpx;
        line-height: 96rpx;
        color: #999;
        position: relative;
        &.on {
          color: #e53330;
          &:before {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60rpx;
            height: 6rpx;
            background-color: #e53330;
            content: "";
            position: absolute;
          }
        }
      }
    }
  }
  .top-h {
    height: 96rpx;
  }
  .detail-content {
    padding: 40rpx 58rpx;
    position: relative;
    z-index: 9;
  }
  .detail-back {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
