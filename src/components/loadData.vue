
<template>
  <div class="null-data">
    <p class="loading" v-if="isLoading">
      <img src="/static/images/loading.gif" alt /> 加载中···
    </p>
    <p class="null-data-text" v-if="isNotData">- 暂无更多数据 -</p>
  </div>
</template>
<script>
export default {
  name: "hint",
  data() {
    return {};
  },
  props: {
    isLoading: {
      default: false
    },
    isNotData: {
      default: false
    },
  }
};
</script>
<style lang="less">
.null-data{
    padding: 40rpx 0;
    text-align: center;
    p{
        height: 30rpx;
        line-height: 30rpx;
    }
    .loading{
        img{
            width: 26rpx;
            height: 26rpx;
            vertical-align: middle;
        }
        font-size:26rpx;
        color: #999;
    }
    .null-data-text{
        font-size:26rpx;
        color: #999;
    }
}
</style>