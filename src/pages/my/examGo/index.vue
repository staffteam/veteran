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
              :class="items.check?'on':''"
              :key="items.id"
              @click="goCheck(item,items.id)"
            >
              <p>{{optionsArr[i]}}</p>
              <h2>{{items.title}}</h2>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <div class="exam-go-bottom-h"></div>
    <div class="exam-go-bottom" v-if="!isFinish">
      <p :class="isFirst?'off':''" @click="prevGo()">上一题</p>
      <p @click="nextGo()">下一题</p>
    </div>
    <div class="finish" v-if="isFinish && !isAnalysis" @click="goFinish">交卷并查看结果</div>
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
          options: [
            {
              id: "1_1",
              title: "事物之间有其固有的联系 "
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
          radio: false,
          title:
            "2金秋时节农民采摘柿子时，最后总要在树上留一些熟透的柿子。果农说，这是留给喜鹊的食物。每到冬天，喜鹊都在果树上筑过冬，到春天也不飞走，整天忙着捕捉果树上的虫子，从而保证了来年柿子的丰收。关于这一事例留给我们的启示，错误的表述是( )",
          options: [
            {
              id: "2_1",
              title: "事物之间有其固有的联系 "
            },
            {
              id: "2_2",
              title: "人与自然的关系是相互利用的关系 "
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
      isAnalysis:false
    };
  },
  methods: {
    prevGo() {
      if (this.examinationNum > 1) {
        if (this.examinationNum == 2) {
          this.isFirst = true;
        }
        this.examinationNum--;
      }
    },
    nextGo() {
      if (+this.exam.totalTitle > this.examinationNum) {
        if (+this.exam.totalTitle - 1 == this.examinationNum) {
          this.isFinish = true;
        }
        this.examinationNum++;
      }
    },
    goCheck(item, _id) {
      let vm = this;
      vm.examListData = vm.examListData.map(value => {
        if (value.id == item.id) {
          value.options = value.options.map(value2 => {
            //判断是否单选
            if (item.radio) {
              if (value2.id == _id) {
                value2.check = true;
                vm.checks[value.id] = [value2];
              } else {
                value2.check = false;
              }
            } else {
              if (value2.id == _id) {
                value2.check = !value2.check;
                //选中后，存储信息
                if (value2.check) {
                  //如果没有储存过，创建容器
                  if (!vm.checks[value.id]) {
                    vm.checks[value.id] = [value2];
                  } else {
                    vm.checks[value.id].push(value2);
                  }
                } else {
                  //取消选中
                  vm.checks[value.id] = vm.checks[value.id].filter(value3 => {
                    return value2.id != value3.id;
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
    goFinish() {
      mpvue.setStorageSync("examChecks",this.checks);
      mpvue.redirectTo({
        url: "../../my/examResult/main"
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
    let _time = +this.exam.testTime;
      if (_time > 60) {
        let _h = (_time - _time % 60) / 60;
        let _m = _time % 60;
        this.countDown.h = +_h > 9 ? _h : "0" + _h;
        this.countDown.m = +_m > 9 ? _m : "0" + _m;
        this.countDown.s = "00";
      } else {
        this.countDown.h = "00";
        this.countDown.m = +_time > 9 ? _time : "0" + _time;
        this.countDown.s = "00";
      }
      let vm = this;
      let timeObj = setInterval(_ => {
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
            clearInterval(timeObj);
            setTimeout(_ => {
              mpvue.redirectTo({
                url: "../../my/examResult/main"
              });
            }, 2000);
          }
          vm.countDown.s = +s - 1 > 9 ? +s - 1 : "0" + (+s - 1);
        }
      }, 1000);
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
  .exam-go-bottom-h{
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
