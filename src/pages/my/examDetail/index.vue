<template>
  <div class="exam-detail">
    <div class="exam-detail-top">
      <img src="/static/images/exam-detail-top.jpg" mode="widthFix" />
    </div>
    <div class="exam-detail-main">
      <h2>政治常识科目政治常识科目政治常识科目</h2>
      <div class="content">
        <ul>
          <li>
            <p>
              <img src="/static/images/test-icon1.png" mode="widthFix" />
            </p>
            <div>
              <h2>试卷总分</h2>
              <p>{{exam.totalPoints}}分</p>
            </div>
          </li>
          <li>
            <p>
              <img src="/static/images/test-icon2.png" mode="widthFix" />
            </p>
            <div>
              <h2>及格分</h2>
              <p>{{exam.passingGrade}}分</p>
            </div>
          </li>
          <li>
            <p>
              <img src="/static/images/test-icon3.png" mode="widthFix" />
            </p>
            <div>
              <h2>总题数</h2>
              <p>{{exam.totalTitle}}题</p>
            </div>
          </li>
          <li>
            <p>
              <img src="/static/images/test-icon4.png" mode="widthFix" />
            </p>
            <div>
              <h2>考试时长</h2>
              <p>{{exam.testTime}}分钟</p>
            </div>
          </li>
        </ul>
        <div class="test-item">
          <h2>考试时间</h2>
          <div style="padding-top:36rpx;">
            <p>{{exam.start_time}}</p>
            <span>至</span>
            <p>{{exam.end_time}}</p>
          </div>
        </div>
        <div class="test-item">
          <h2>考试内容</h2>
          <div>
            <h2>{{exam.testContent}}</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="go-exam" @click="goExam">
      开始答题
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exam: {
        totalPoints: "100",
        passingGrade: "60",
        totalTitle: "20",
        testTime: "15",
        start_time: "2019-12-10",
        end_time: "2019-12-30",
        testContent: "政治常识测试"
      }
    };
  },
  methods: {
    goExam(){
      mpvue.reLaunch({
        url:'../../my/examGo/main'
      })
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
      ul {
        overflow: hidden;
        li {
          width: 50%;
          float: left;
          padding: 70rpx 0 70rpx 71rpx;
          border: 1rpx solid #e5e5e5;
          &:first-child{
            border-top: 0;
            border-left: 0;
          }
          &:nth-child(2){
            border-top: 0;
            border-right: 0;
          }
          &:nth-child(3){
            border-left: 0;
            border-bottom: 0;
          }
          &:nth-child(4){
            border-right: 0;
            border-bottom: 0;
          }
          & > p {
            width: 70rpx;
            height: 74rpx;
            float:left;
            border-radius: 4rpx;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          div{
            margin-left: 100rpx;
            h2{
              font-size: 28rpx;
              line-height: 35rpx;
              color: #999999;
            }
            p{
              font-size: 32rpx;
              line-height: 40rpx;
              color: #666666;
            }
          }
        }
      }
      .test-item{
        border-top: 1rpx solid #e5e5e5;
        height: 200rpx;
        &>h2{
          width: 50%;
          float:left;
          line-height: 200rpx;
          font-size: 28rpx;
          color: #999999;
          text-align: center;
        }
        div{
          width: 50%;
          float: right;
          text-align: center;
          h2{
            line-height: 200rpx;
            font-size: 32rpx;
            color: #666666;
          }
          p{
            font-size: 30rpx;
            color: #666666;
            line-height: 42rpx;
          }
          span{
            display: block;
            color: #999999;
            line-height: 40rpx;
          }
        }
      }
    }
  }
  .go-exam{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 96rpx;
    text-align: center;
    background-color: #E53330;
    font-size: 32rpx;
    color: white;
    line-height: 96rpx;
  }
}
</style>
