<template>
  <div class="info">
    <div class="top">
      <p>
        <img :src="info.Image" mode="aspectFill" />
      </p>
      <h2>{{info.Name}}</h2>
    </div>
    <div class="form-line"></div>
    <div class="form-item">
      <span>性别</span>
      <div>{{info.Sex?'男':'女'}}</div>
    </div>
    <div class="form-item">
      <span>年龄</span>
      <div>{{info.Age || '未公开'}}</div>
    </div>
    <div class="form-line"></div>
    <div class="form-item">
      <span>中队编号</span>
      <div>{{info.SquadronNo }}</div>
    </div>
    <div class="form-item">
      <span>分队编号</span>
      <div>{{info.SquadNo}}</div>
    </div>
    <div class="form-item">
      <span>上课签到</span>
      <div>
        <a :href="'../../student/sign/main?id='+info.Id">
          查看详情
          <i class="iconfont icon-you1"></i>
        </a>
      </div>
    </div>
    <div class="form-item">
      <span>考试成绩</span>
      <div>
        <a :href="'../../student/score/main?id='+info.Id">
          查看详情
          <i class="iconfont icon-you1"></i>
        </a>
      </div>
    </div>
    <div class="form-line"></div>
    <div class="form-item">
      <span>职务</span>
      <div>{{info.Title }}</div>
    </div>
    <div class="form-item">
      <span>手机</span>
      <div>{{info.Phone}}</div>
    </div>
    <div class="form-item">
      <span>联系地址</span>
      <div>{{info.Areas}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pid: "",
      info: {
      }
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
  onLoad(o) {
    let vm = this;
    vm.pid = o.id;
    this.$api.$signGet('根据手机号获取学员信息',{
      phone:o.id,
      userid:mpvue.getStorageSync('userid')
    }).then(res=>{
      vm.info = res.Data;
    })
  }
};
</script>

<style lang="less" scoped>
.info {
  .top {
    padding: 40rpx 0;
    background-color: white;
    text-align: center;
    p {
      width: 190rpx;
      height: 190rpx;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h2 {
      margin-top: 20rpx;
      font-size: 36rpx;
      line-height: 50rpx;
    }
  }
  .form-line {
    height: 20rpx;
    background-color: #f7f7f7;
  }
  .form-item {
    height: 104rpx;
    line-height: 104rpx;
    margin: 0 32rpx;
    border-bottom: 1rpx solid #e5e5e5;
    span {
      display: block;
      float: left;
      width: 208rpx;
      font-size: 32rpx;
    }
    div {
      width: calc(~"100% - 208rpx");
      float: right;
      color: #666;
      font-size: 28rpx;
      a {
        display: block;
        color: #666;
        font-size: 28rpx;
        i {
          display: block;
          float: right;
          font-size: 26rpx;
          color: #cccccc;
        }
      }
    }
  }
}
</style>
