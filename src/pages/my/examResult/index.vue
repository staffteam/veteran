<template>
  <div class="exam-detail">
    <div class="exam-detail-top">
      <img src="/static/images/exam-detail-top.jpg" mode="widthFix" />
    </div>
    <div class="exam-detail-main">
      <h2>{{exam.Name}}</h2>
      <div class="content">
        <div class="score">
          <p>
            <img src="/static/images/score-back.png" mode="widthFix" />
          </p>
          <h2>{{exam.Score}}</h2>
          <span>{{exam.IsPass?'恭喜你，通过考试':'很遗憾，继续努力'}}</span>
        </div>
        <div class="list">
          <p>答题用时：<span>{{exam.ExamTime}}分钟</span></p>
          <p>合格分数：<span>{{exam.PassScore}}分</span></p>
        </div>
      </div>
    </div>
    <div class="exam-detail-list">
      <ul>
        <li v-for="(item,index) in exam.examResultList" :key="item.Id" :class="item.IsRight?'on':''">
          <i class="iconfont icon-youxiajiaogouxuan" v-if="item.IsRight"></i>
          <i class="iconfont icon-del-right" v-if="!item.IsRight"></i>
          {{index+1}}
        </li>
      </ul>
    </div>
    <div class="go-exam-h"></div>
    <div :class="'go-exam '+(!isError?'one':'')">
      <p @click="allAnalysis">全部解析</p>
      <p @click="errAnalysis" v-if="isError">错题解析</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exam: {},
      score: "80",
      consuming: "20",
      isQualified: true,
      examListData: [
        { correct: true, id: 1 },
        { correct: false, id: 2 },
        { correct: true, id: 3 }
      ],
      isError:true
    };
  },
  methods: {
    allAnalysis(){
      mpvue.navigateTo({
        url: "../../my/examAnalysis/main?analysis=all"
      });
    },
    errAnalysis(){
      mpvue.navigateTo({
        url: "../../my/examAnalysis/main?analysis=err"
      });
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
    let vm = this;
    this.exam = mpvue.getStorageSync("examPrams");
    this.isError = this.exam.MaxScore!=this.exam.Score;
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
.exam-detail {
  .exam-detail-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
  }
  .exam-detail-main {
    position: relative;
    z-index: 9;
    & > h2 {
      padding: 38rpx 75rpx 24rpx;
      font-size: 40rpx;
      color: white;
      line-height: 56rpx;
      text-align: center;
    }
    .content {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0 40rpx rgba(229, 51, 48, 0.2);
      border-radius: 10rpx;
      margin: 0 30rpx;
      padding-top: 59rpx;
      height: 580rpx;
      .score{
        width: 60%;
        margin: 0 auto;
        position: relative;
        h2{
          font-size: 100rpx;
          color: white;
          text-align: center;
          position: absolute;
          left: 0;
          top: 70rpx;
          width: 100%;
        }
        span{
          display: block;
          position: absolute;
          bottom: 70rpx;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: 32rpx;
          color: white;
        }
      }
      .list{
        margin-top: 25rpx;
        padding-left: 32%;
        p{
          color: #999;
          font-size: 28rpx;
          margin-top: 12rpx;
          &:first-child{
            margin-top: 0px;
          }
          span{
            color: #333;
          }
        }
      }
    }
  }
  .exam-detail-list{
    margin: 25rpx 15rpx 25rpx;
    ul{
      overflow: hidden;
      li{
        width: 60rpx;
        height: 60rpx;
        margin: 15rpx;
        border: 1px solid #E53330;
        line-height: 60rpx;
        text-align: center;
        color: #E53330;
        position: relative;
        overflow: hidden;
        float:left;
        i{
          position: absolute;
          right: 0;
          bottom: 0;
          line-height: 30rpx;
          font-size: 30rpx;
          color: #E53330;
        }
        &.on{
          border: 1px solid #64BE50;
          color: #64BE50;
          i{
            color: #64BE50;
          }
        }
      }
    }
  }
  .go-exam-h{
    height: 96rpx;
  }
  .go-exam {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 96rpx;
    &.one{
      p{
        width: 100%;
      }
    }
    p {
      width: 50%;
      float: left;
      text-align: center;
      background-color: #e53330;
      font-size: 32rpx;
      color: white;
      line-height: 96rpx;
      &:first-child {
        background-color: #ff8915;
      }
    }
  }
}
</style>
