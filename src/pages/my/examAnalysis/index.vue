<template>
  <div class="exam-go">
    <div class="exam-go-top">
      <h2>{{exam.Content}}</h2>
      <div>
        <p>
          <i class="iconfont icon-timu"></i>
          {{examinationNum}}/{{exam.TopicCount}}
        </p>
      </div>
    </div>
    <div class="exam-go-top-h"></div>
    <template v-for="(item,index) in exam.TopicList">
      <div class="exam-go-main" :key="item.Id" v-if="(index+1) == examinationNum">
        <div class="title">
          <span>{{!item.IsMultiple?'(单选题)':'(多选题)'}}</span>
          {{item.Title}}
        </div>
        <div class="check-list">
          <ul>
            <li
              v-for="(items,i) in item.OptionList"
              :class="items.IsRight?'success':items.check?'error':''"
              :key="items.Id"
            >
              <p>{{items.optionIndex}}</p>
              <h2>{{items.optionText}}</h2>
            </li>
          </ul>
        </div>
        <div class="exam-go-analysis">
          <h2>题目解析</h2>
          <p>正确答案：{{item.success}}</p>
          <div>解析：{{item.Explain}}</div>
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
      commonMsg: false,
      exam: {},
      examPrams: [],
      examinationNum: 1,
      overtime: false,
      warn: false,
      examListData: [],
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
      if (+this.exam.TopicCount > this.examinationNum) {
        if (+this.exam.TopicCount - 1 == this.examinationNum) {
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
    let vm = this;
    vm.isFirst = true;
    vm.isFinish = false;
    vm.commonMsg = false;
    vm.examinationNum = 1;
    vm.overtime = false;
    vm.warn = false;
    vm.isAnalysis = false;
    //全部题目解析
    if (o.analysis == "all") {
      vm.isAnalysis = "all";
    } else {
      vm.isAnalysis = "err";
    }
    vm.examPrams = mpvue.getStorageSync("examPrams");
    let examJson = {},
      examErr = {};
    vm.examPrams.ExamDetails.forEach(value => {
      let _arr = value.SubjectOptionId.split(",");
      examJson[value.SubjectTopicId] = {};
      _arr.forEach(value2 => {
        examJson[value.SubjectTopicId][value2] = true;
      });
    });
    vm.examPrams.examResultList.forEach(value => {
      examErr[value.Id] = value.IsRight;
    });
    vm.$api
      .$signGet("科目详情", {
        id: vm.examPrams.SubjectId,
        userid: mpvue.getStorageSync("userid")
      })
      .then(res => {
        vm.exam = res.Data;
        vm.exam.TopicList = vm.exam.TopicList.map(value => {
          value.OptionList = value.OptionList.map(value2 => {
            value2.check = examJson[value.Id][value2.Id];
            value2.optionIndex = value2.Content.split("：")[0];
            value2.optionText = value2.Content.split("：")[1];
            if (value2.IsRight) {
              if (value.success) {
                value.success = value.success + "," + value2.optionIndex;
              } else {
                value.success = value2.optionIndex;
              }
            }
            return value2;
          });
          return value;
        });
        vm.exam.TopicList = vm.exam.TopicList.filter(value => {
          //判断考题解析是否是全部考题解析
          if (vm.isAnalysis == "all") {
            return true;
          } else {
            //只解析错误考题
            if (examErr[value.Id] === false) {
              return true;
            } else {
              return false;
            }
          }
        });
        vm.exam.TopicCount = vm.exam.TopicList.length;
        if (+vm.exam.TopicCount == vm.examinationNum) {
          vm.isFinish = true;
        }
        console.log(vm.exam.TopicList);
      });
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
      h2 {
        font-size: 34rpx;
        line-height: 48rpx;
        padding-left: 26rpx;
        position: relative;
        &:before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10rpx;
          height: 10rpx;
          border-radius: 50%;
          background-color: #ff8915;
        }
      }
      p {
        margin-top: 30rpx;
        font-size: 30rpx;
        color: #666;
      }
      div {
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
      line-height: 76rpx;
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
