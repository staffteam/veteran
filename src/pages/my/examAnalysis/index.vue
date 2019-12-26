<template>
  <div class="exam-go">
    <div class="exam-go-top">
      <h2>{{exam.testContent}}</h2>
      <div>
        <p :class="warn?'on':''" v-if="!isAnalysis">
          <i class="iconfont icon-jiancepingtaizhuijia_shijian"></i>
          {{countDown.h+':'+countDown.m+':'+countDown.s}}
        </p>
        <p>
          <i class="iconfont icon-timu"></i>
          {{examinationNum}}/{{exam.totalTitle}}
        </p>
      </div>
    </div>
    <div class="exam-go-top-h"></div>
    <template v-for="(item,index) in examListData">
      <div class="exam-go-main" :key="item.id" v-if="(index+1) == examinationNum">
        <div class="title">
          <span>{{item.radio?'(单选题)':'(多选题)'}}</span>
          {{item.title}}
        </div>
        <div class="check-list">
          <ul>
            <li
              v-for="(items,i) in item.options"
              :class="items.success?'success':items.check?'error':''"
              :key="items.id"
            >
              <p>{{optionsArr[i]}}</p>
              <h2>{{items.title}}</h2>
            </li>
          </ul>
        </div>
        <div class="exam-go-analysis">
          <h2>题目解析</h2>
          <p>正确答案：{{item.success}}</p>
          <div>解析：{{item.analysis}}</div>
        </div>
      </div>
    </template>
    <div class="exam-go-bottom-h"></div>
    <div class="exam-go-bottom" v-if="isAnalysis">
      <p :class="isFirst?'off':''" @click="prevGo()">上一题</p>
      <p v-if="!isFinish" @click="nextGo()">下一题</p>
      <p v-if="isFinish" @click="backGo()">返回个人中心</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFirst: true,
      isFinish: false,
      optionsArr: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
      commonMsg: false,
      exam: {
        testContent: "政治常识科目",
        totalTitle: "2",
        testTime: "30"
      },
      countDown: {
        h: "00",
        m: "00",
        s: "00"
      },
      examinationNum: 1,
      overtime: false,
      warn: false,
      examListData: [
        {
          id: "1",
          radio: true,
          title:
            "金秋时节农民采摘柿子时，最后总要在树上留一些熟透的柿子。果农说，这是留给喜鹊的食物。每到冬天，喜鹊都在果树上筑过冬，到春天也不飞走，整天忙着捕捉果树上的虫子，从而保证了来年柿子的丰收。关于这一事例留给我们的启示，错误的表述是( )",
          success: "A",
          analysis:
            "这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析",
          options: [
            {
              id: "1_1",
              title: "事物之间有其固有的联系 ",
              check: true,
              success: true
            },
            {
              id: "1_2",
              title: "人与自然的关系是相互利用的关系 "
            },
            {
              id: "1_3",
              title: "人们可以发现并利用规律来实现自己的目的 "
            },
            {
              id: "1_4",
              title: "保持生态系统的平衡是人类生存发展的必要条件发展的必要条件 "
            }
          ]
        },
        {
          id: "2",
          radio: true,
          title:
            "2金秋时节农民采摘柿子时，最后总要在树上留一些熟透的柿子。果农说，这是留给喜鹊的食物。每到冬天，喜鹊都在果树上筑过冬，到春天也不飞走，整天忙着捕捉果树上的虫子，从而保证了来年柿子的丰收。关于这一事例留给我们的启示，错误的表述是( )",
          success: "B",
          analysis:
            "这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析这是一段文字解析",
          options: [
            {
              id: "2_1",
              title: "事物之间有其固有的联系 ",
              check: true,
              error: true
            },
            {
              id: "2_2",
              title: "人与自然的关系是相互利用的关系 ",
              success: true
            },
            {
              id: "2_3",
              title: "人们可以发现并利用规律来实现自己的目的 "
            },
            {
              id: "2_4",
              title: "保持生态系统的平衡是人类生存发展的必要条件 "
            }
          ]
        }
      ],
      checks: {},
      isAnalysis: false
    };
  },
  methods: {
    prevGo() {
      if (this.examinationNum > 1) {
        if (this.examinationNum == 2) {
          this.isFirst = true;
        }
        this.isFinish = false;
        this.examinationNum--;
      }
    },
    nextGo() {
      if (+this.exam.totalTitle > this.examinationNum) {
        if (+this.exam.totalTitle - 1 == this.examinationNum) {
          this.isFinish = true;
        }
        this.isFirst = false;
        this.examinationNum++;
      }
    },
    backGo() {
      mpvue.reLaunch({
        url: "../../member/main"
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
  },
  onLoad(o) {
    //全部题目解析
    if (o.analysis == "all") {
      this.isAnalysis = "all";
    } else {
      this.isAnalysis = "err";
    }
  }
};
</script>

<style lang="less" scoped>
.exam-go {
  .exam-go-top {
    height: 88rpx;
    line-height: 88rpx;
    position: fixed;
    left: 16rpx;
    right: 16rpx;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 15rpx;
    z-index: 999;
    background-color: white;
    h2 {
      float: left;
      font-size: 26rpx;
    }
    div {
      float: right;
      text-align: right;
      p {
        display: inline-block;
        margin-left: 60rpx;
        &:first-child {
          margin-left: 0;
        }
        i {
          color: #fd6055;
          font-size: 26rpx;
          display: block;
          margin-right: 15rpx;
          float: left;
        }
        &.on {
          color: #fd6055;
        }
        font-size: 26rpx;
      }
    }
  }
  .exam-go-top-h {
    height: 88rpx;
  }
  .exam-go-main {
    margin: 17rpx 32rpx;
    .title {
      font-size: 32rpx;
      line-height: 50rpx;
      color: #666;
      span {
        color: #fd6055;
      }
    }
    .check-list {
      margin-top: 40rpx;
      ul {
        li {
          overflow: hidden;
          margin-top: 28rpx;
          &:first-child {
            margin-top: 0;
          }
          &.on {
            p {
              background-color: #ffc247;
              color: white;
            }
          }
          &.success {
            p {
              background-color: #51c512;
              border: 1px solid #51c512;
              color: white;
            }
          }
          &.error {
            p {
              background-color: #ff5a5a;
              border: 1px solid #ff5a5a;
              color: white;
            }
          }
          p {
            width: 56rpx;
            height: 56rpx;
            float: left;
            border: 1px solid #ffc247;
            border-radius: 50%;
            text-align: center;
            line-height: 56rpx;
            color: #ffc247;
            font-size: 26rpx;
          }
          h2 {
            margin-left: 80rpx;
            font-size: 30rpx;
            line-height: 42rpx;
            padding: 7rpx 0;
          }
        }
      }
    }
    .exam-go-analysis {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 40rpx 0px rgba(0, 0, 0, 0.05);
      border-radius: 1px;
      margin-top: 70rpx;
      padding: 32rpx;
      h2{
        font-size: 34rpx;
        line-height: 48rpx;
        padding-left: 26rpx;
        position: relative;
        &:before{
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10rpx;
          height: 10rpx;
          border-radius: 50%;
          background-color: #FF8915;
        }
      }
      p{
        margin-top: 30rpx;
        font-size: 30rpx;
        color: #666;
      }
      div{
        margin-top: 15rpx;
        font-size: 30rpx;
        line-height: 42rpx;
        color: #666;
      }
    }
  }
  .exam-go-bottom-h {
    height: 118rpx;
  }
  .exam-go-bottom {
    height: 118rpx;
    border-top: 1px solid #e5e5e5;
    background-color: white;
    z-index: 99;
    text-align: center;
    padding-top: 18rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    p {
      width: 328rpx;
      height: 80rpx;
      border-radius: 4rpx;
      border: 2rpx solid #e53330;
      text-align: center;
      line-height: 80rpx;
      font-size: 36rpx;
      display: inline-block;
      color: #e53330;
      margin: 0 15rpx;
      &.off {
        border: 2rpx solid #e5e5e5;
        color: #999;
      }
    }
  }
}
</style>
