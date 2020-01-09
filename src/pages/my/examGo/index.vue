<template>
  <div class="exam-go">
    <div class="exam-go-top">
      <h2>{{exam.Content}}</h2>
      <div>
        <p :class="warn?'on':''" v-if="!isAnalysis">
          <i class="iconfont icon-jiancepingtaizhuijia_shijian"></i>
          {{countDown.h+':'+countDown.m+':'+countDown.s}}
        </p>
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
              :class="items.check?'on':''"
              :key="items.Id"
              @click="goCheck(item,items)"
            >
              <p>{{items.optionIndex}}</p>
              <h2>{{items.optionText}}</h2>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <div class="exam-go-bottom-h"></div>
    <div class="exam-go-bottom">
      <p :class="isFirst?'off':''" @click="prevGo()">上一题</p>
      <p v-if="!isFinish" @click="nextGo()">下一题</p>
      <p v-if="isFinish" class="finish" @click="goFinish">提交</p>
    </div>
    <!-- <div class="finish" v-if="isFinish && !isAnalysis" @click="goFinish">交卷并查看结果</div> -->
    <hint :commonMsg="commonMsg" title="考试时间到" viceTitle="将自动交卷" />
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
      exam: {},
      countDown: {
        h: "00",
        m: "00",
        s: "00"
      },
      examinationNum: 1,
      overtime: false,
      warn: false,
      checks: {},
      isAnalysis: false,
      timeObj: {}
    };
  },
  methods: {
    prevGo() {
      if (this.examinationNum > 1) {
        if (this.examinationNum == 2) {
          this.isFirst = true;
        }
        this.examinationNum--;
        this.isFinish = false;
      }
    },
    nextGo() {
      let vm = this;
      if (+vm.exam.TopicCount > vm.examinationNum) {
        let is = false;
        vm.exam.TopicList.forEach((value, index) => {
          if (index + 1 == vm.examinationNum) {
            value.OptionList.forEach(value2 => {
              if (value2.check) {
                is = true;
              }
            });
          }
        });
        if (is) {
          if (+vm.exam.TopicCount - 1 == vm.examinationNum) {
            vm.isFinish = true;
          }
          vm.examinationNum++;
          vm.isFirst = false;
        } else {
          mpvue.showToast({
            title: "请选择选项",
            icon: "none"
          });
        }
      }
    },
    goCheck(item, items) {
      let vm = this;
      vm.exam.TopicList = vm.exam.TopicList.map(value => {
        if (value.Id == item.Id) {
          value.OptionList = value.OptionList.map(value2 => {
            //判断是否单选
            if (!item.IsMultiple) {
              if (value2.Id == items.Id) {
                value2.check = true;
                vm.checks[value.Id] = [value2];
              } else {
                value2.check = false;
              }
            } else {
              if (value2.Id == items.Id) {
                value2.check = !value2.check;
                //选中后，存储信息
                if (value2.check) {
                  //如果没有储存过，创建容器
                  if (!vm.checks[value.Id]) {
                    vm.checks[value.Id] = [value2];
                  } else {
                    vm.checks[value.Id].push(value2);
                  }
                } else {
                  //取消选中
                  vm.checks[value.Id] = vm.checks[value.Id].filter(value3 => {
                    return value2.Id != value3.Id;
                  });
                }
              }
            }
            return value2;
          });
        }
        return value;
      });
      console.log(JSON.stringify(vm.checks));
    },
    goFinish(obj) {
      if (!obj) {
        let is = false;
        vm.exam.TopicList.forEach((value, index) => {
          if (index + 1 == vm.examinationNum) {
            value.OptionList.forEach(value2 => {
              if (value2.check) {
                is = true;
              }
            });
          }
        });
        if (!is) {
          mpvue.showToast({
            title: "请选择选项",
            icon: "none"
          });
        }
      }
      let vm = this,
        score = 0,
        isPass = false,
        time = 0,
        examArr = [],
        examJson = {};
      Object.keys(vm.checks).forEach(item => {
        let ids = [];
        vm.checks[item].forEach(value => {
          ids.push(value.Id);
        });
        //判断是否选中
        if (vm.checks[item].length > 0) {
          //判断是否为多选题
          if (vm.checks[item][0].IsMultiple) {
            //如果是多选题，则判断选项中是否有错误的选项
            let _is = true; //默认题目选择正确，得分
            vm.checks[item].forEach(value => {
              if (!value.IsRight) {
                //这是一道错误题，记零分
                _is = false;
              }
            });
            //如果在上面进行验证时，验证通过，没有选择错误题，则进行下面的验证
            if (_is) {
              //判断是否漏选了正确的题目
              vm.exam.TopicList.forEach(value => {
                //在列表中找到对应的题目
                if (item == value.Id) {
                  //遍历题目中的选项
                  value.OptionList.forEach(value2 => {
                    //满足条件：该题是正确的，且没有选中，则该题为零分
                    if (!value2.check && value2.IsRight) {
                      _is = false;
                    }
                  });
                }
              });
            }
            //如果上面的两个验证都通过，则该题正确，反之亦然
            if (_is) {
              score = score + vm.checks[item][0].Score;
            }
            examJson[item] = _is;
          } else {
            //如果这是一道单选题，则判断是否选中正确项
            if (vm.checks[item][0].IsRight) {
              //选中正确，记分
              score = score + vm.checks[item][0].Score;
              examJson[item] = true;
            } else {
              examJson[item] = false;
            }
          }
        }
        examArr.push({
          SubjectTopicId: item,
          SubjectOptionId: ids.join(",")
        });
      });
      let examResultList = [];
      vm.exam.TopicList.forEach(value => {
        if (examJson[value.Id]) {
          examResultList.push({ Id: value.Id, IsRight: true });
        } else {
          examResultList.push({ Id: value.Id, IsRight: false });
        }
      });
      //判断得分是否大于等于及格分数
      isPass = score > vm.exam.PassScore;
      //计算剩余时间分钟数，秒钟忽略
      let _outTime = +vm.countDown.h * 60 + vm.countDown.m;
      //考试时间减去剩余时间，得出实际考试时间
      time = +vm.exam.ExamTime - _outTime;
      let prams = {
        SubjectId: vm.exam.Id,
        StudentId: mpvue.getStorageSync("userid"),
        Score: score,
        IsPass: isPass,
        ExamTime: time,
        ExamDetails: examArr
      };
      vm.$api.$signPost("交卷", prams).then(res => {
        mpvue.showToast({
          title: "提交成功",
          icon: "success"
        });
        setTimeout(_ => {
          mpvue.setStorageSync("examPrams", {
            ...prams,
            Name: vm.exam.Name,
            PassScore: vm.exam.PassScore,
            examResultList: examResultList,
            MaxScore: vm.exam.Score
          });
          clearInterval(vm.timeObj);
          mpvue.redirectTo({
            url: "../../my/examResult/main"
          });
        }, 1500);
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
    vm.countDown = {
      h: "00",
      m: "00",
      s: "00"
    };
    vm.examinationNum = 1;
    vm.isFirst = true;
    vm.isFinish = false;
    vm.commonMsg = false;
    vm.overtime = false;
    vm.warn = false;
    vm.checks = {};
    vm.isAnalysis = false;
    vm.exam = {};
    clearInterval(vm.timeObj);
    this.$api
      .$signGet("科目详情", {
        id: o.id,
        userid: mpvue.getStorageSync("userid")
      })
      .then(res => {
        vm.exam = res.Data;
        vm.exam.TopicList = vm.exam.TopicList.map(value => {
          value.OptionList = value.OptionList.map((value2, _index) => {
            value2.IsMultiple = value.IsMultiple;
            value2.Score = value.Score;
            value2.optionIndex =
              value2.Content.split("：")[0] == ""
                ? vm.optionsArr[_index]
                : value2.Content.split("：")[0];
            value2.optionText = value2.Content.split("：")[1];
            return value2;
          });
          return value;
        });
        let _time = +vm.exam.ExamTime;
        if (_time > 60) {
          let _h = (_time - _time % 60) / 60;
          let _m = _time % 60;
          vm.countDown.h = +_h > 9 ? _h : "0" + _h;
          vm.countDown.m = +_m > 9 ? _m : "0" + _m;
          vm.countDown.s = "00";
        } else {
          vm.countDown.h = "00";
          vm.countDown.m = +_time > 9 ? _time : "0" + _time;
          vm.countDown.s = "00";
        }
        vm.timeObj = setInterval(_ => {
          let { h, m, s } = vm.countDown;
          if (s == 0) {
            if (h == 0 && m == 1) {
              //小于一分钟，警告
              vm.warn = true;
            }
            //减少一分钟
            if (m == 0 && h != 0) {
              //大于等于一小时 减少一小时
              vm.countDown.h = +h - 1 > 9 ? +h - 1 : "0" + (+h - 1);
              vm.countDown.m = "59";
              vm.countDown.s = "59";
            } else if (m != 0) {
              //大于等于一分钟 减少一分钟
              vm.countDown.m = +m - 1 > 9 ? +m - 1 : "0" + (+m - 1);
              vm.countDown.s = "59";
            }
          } else {
            if (h == 0 && m == 0 && s == 1) {
              //小于一小时 倒计时结束
              vm.commonMsg = true;
              clearInterval(vm.timeObj);
              setTimeout(_ => {
                vm.goFinish(true);
              }, 2000);
            }
            vm.countDown.s = +s - 1 > 9 ? +s - 1 : "0" + (+s - 1);
          }
        }, 1000);
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
          p {
            width: 56rpx;
            height: 56rpx;
            float: left;
            border: 1rpx solid #ffc247;
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
  }
  div.finish {
    width: 100%;
    height: 96rpx;
    line-height: 96rpx;
    background-color: #e53330;
    text-align: center;
    color: white;
    font-size: 32rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .exam-go-bottom-h {
    height: 118rpx;
  }
  .exam-go-bottom {
    height: 118rpx;
    border-top: 1px solid #e5e5e5;
    background-color: white;
    text-align: center;
    padding-top: 18rpx;
    position: fixed;
    z-index: 99;
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
      &.finish {
        background-color: #e53330;
        color: white;
      }
    }
  }
}
</style>
