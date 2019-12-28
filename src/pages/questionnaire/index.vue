<template>
  <div class="test-up">
    <div class="top">
      <img src="/static/images/survey-top.jpg" mode="widthFix" alt />
    </div>
    <div class="form">
      <div class="content">
        <div class="title">
          <img src="/static/images/survey-title.png" mode="widthFix" />
        </div>
        <div class="desc">{{hintTitle}}</div>
        <ul>
          <li v-for="(item,index) in formData" :key="index">
            <div class="title">
              <span>{{(index+1)>9?(index+1):'0'+(index+1)}}</span>
              <h2>{{item.Title}}</h2>
            </div>
            <div class="option">
              <div
                :class="'list radio '+' '+(items.check!==undefined?items.check?'on':'':'')"
                v-for="(items,i) in item.OptionList"
                :key="i"
                @click="formCheck(item,items)"
              >
                <div class="title">{{items.Content}}</div>
              </div>
            </div>
            <textarea v-if="item.IsInput" v-model="item.Content" :placeholder="item.Placeholder"></textarea>
          </li>
        </ul>
        <div class="btn">
          <p @click="submitUp">提交</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radioList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      formData: [],
      form: {},
      types: "",
      pid: "",
      score: 0,
      feedbackContent: "",
      hintTitle: ""
    };
  },
  methods: {
    submitUp() {
      let _is = true;
      let _if = true;
      let _i = 0;
      let _item = {};
      let vm = this;
      this.formData.forEach((value, index) => {
        if (_if) {
          if (
            (vm.form[value.Id] != undefined && vm.form[value.Id].length == 0) ||
            (vm.form[value.Id] === undefined && value.OptionList.length > 0)
          ) {
            _is = false;
            _if = false;
          }
          if (
            vm.form[value.Id] != undefined &&
            vm.form[value.Id].length == 1 &&
            value.IsInput &&
            value.Content == ""
          ) {
            _is = false;
            _if = false;
          }
        }
      });
      if (_is) {
        let _arr = [];
        let userid = mpvue.getStorageSync("userid");
        this.formData.forEach(value => {
          let _json = {
            StudentId: String(userid),
            QuestionnaireId: vm.pid,
            TopicId: value.Id
          };
          if (vm.form[value.Id]) {
            _json.OptionId = vm.form[value.Id][0];
          }
          if (value.IsInput) {
            _json.Content = value.Content;
          }
          _arr.push(_json);
        });
        vm.$api.$signPost("问卷提交",_arr).then(res => {
          mpvue.showToast({
            title: "提交成功",
            icon: "success"
          });
          setTimeout(_ => {
            mpvue.navigateBack({
              delta: 1
            });
          }, 1500);
        });
      } else {
        mpvue.showToast({
          title: "请完善您的表单",
          icon: "none",
          time: "2000"
        });
      }
    },
    formCheck(item, items) {
      let Id = item.Id;
      let _che = [];
      let vm = this;
      this.formData = this.formData.map((value, index) => {
        if (value.Id == Id) {
          value.OptionList.map(value2 => {
            if (value2.Id == items.Id) {
              value2.check = true;
              _che = [value2.Id];
              if (value2.IsInput) {
                value.IsInput = true;
                value.Placeholder = value2.Placeholder;
                value.Content = "";
              } else {
                value.IsInput = false;
                value.Placeholder = "";
                value.Content = "";
              }
            } else {
              value2.check = false;
            }
            return value2;
          });
        }
        return value;
      });
      this.form[Id] = _che;
      console.log(this.form);
    }
  },
  created() {},
  mounted() {
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
    this.types = o.type;
    let vm = this;
    vm.$api
      .$signGet("满意度调查", {
        userid: mpvue.getStorageSync("userid")
      })
      .then(res => {
        vm.hintTitle = res.Data.Description;
        vm.formData = res.Data.TopicList.map(value => {
          value.Content = "";
          return value;
        });
        console.log(vm.formData);
        vm.pid = res.Data.Id;
      });
  }
};
</script>
<style lang="less" scoped>
.form {
  .content {
    & > .title {
      width: 70%;
      margin: 0 auto;
      padding: 48rpx 0;
    }
    & > .desc {
      margin: 0 40rpx;
      font-size: 30rpx;
      line-height: 50rpx;
    }
    margin: 12rpx;
    background-color: #faf5f0;
    padding-bottom: 48rpx;
    ul {
      li {
        padding: 40rpx 56rpx;
        & > div.title {
          span {
            width: 62rpx;
            height: 62rpx;
            display: block;
            float: left;
            border-radius: 50%;
            text-align: center;
            line-height: 62rpx;
            background: rgba(255, 255, 255, 1);
            font-size: 35rpx;
            font-weight: bold;
            color: rgba(210, 170, 120, 1);
            margin-right: 20rpx;
          }
          h2 {
            font-size: 32rpx;
            line-height: 62rpx;
          }
        }
        & > div.option {
          margin-top: 32rpx;
          div.list {
            width: 614rpx;
            background: rgba(255, 255, 255, 1);
            border-radius: 8rpx;
            line-height: 42rpx;
            padding: 15rpx 0;
            margin: 24rpx auto;
            padding-left: 74rpx;
            position: relative;
            font-size: 30rpx;
            &.on {
              background-color: rgba(229, 51, 48, 0.2);
              &:before {
                background-color: #3c3c3c;
              }
            }
            &:before {
              position: absolute;
              left: 36rpx;
              top: 50%;
              transform: translateY(-50%);
              width: 16rpx;
              height: 16rpx;
              border-radius: 50%;
              border: 1px solid #999999;
              display: block;
              content: "";
            }
          }
        }
        textarea {
          margin-top: 30rpx;
          width: calc(~"100% - 64rpx");
          height: 240rpx;
          background-color: white;
          padding: 15rpx 32rpx;
          font-size: 30rpx;
        }
      }
    }
    .btn {
      width: 510rpx;
      height: 88rpx;
      background: rgba(229, 51, 48, 1);
      border-radius: 4rpx;
      margin: 34rpx auto 0;
      color: white;
      text-align: center;
      line-height: 88rpx;
    }
  }
}
</style>