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
        <div class="desc">您好，为了解您对我们服务的满意度，以便我们后续优化和改善服务质量，希望您能真实编写以下信息并提出宝贵建议，谢谢您的配合！</div>
        <ul>
          <li v-for="(item,index) in formData" :key="index">
            <div class="title">
              <span>{{(index+1)>9?(index+1):'0'+(index+1)}}</span>
              <h2>{{item.title+(item.radio?'(单选)':'(多选)')}}</h2>
            </div>
            <div class="option">
              <div
                :class="'list '+(item.radio?'radio':'multiple')+' '+(items.check!==undefined?items.check?'on':'':'')"
                v-for="(items,i) in item.answerlist"
                :key="i"
                @click="formCheck(item,items)"
              >
                <div class="title">{{items.content}}</div>
              </div>
            </div>
            <textarea v-if="item.content!=undefined" v-model="item.content" placeholder="请填写原因" ></textarea>
          </li>
          <li>
            <div class="title"><span>03</span><h2>您遇到的任何问题或者建议都可以反馈给我们</h2></div>
            <textarea v-model="feedbackContent" placeholder="请填写问题或者建议" ></textarea>
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
      feedbackContent:""
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
            vm.form[value.id] != undefined &&
            value.min_check_count > 0 &&
            vm.form[value.id].length == 0
          ) {
            _is = false;
          }
          if (vm.form[value.id] === undefined) {
            _is = false;
          }
          if (
            vm.form[value.id] != undefined &&
            vm.form[value.id].length > 0 &&
            value.min_check_count > vm.form[value.id].length
          ) {
            _i = index;
            _item = value;
            _if = false;
          }
        }
      });
      if (!_if) {
        mpvue.showToast({
          title:
            "第" +
            (_i + 1) +
            "题最少选择" +
            _item.min_check_count +
            "项，请补充",
          icon: "none",
          time: "2000"
        });
        return;
      }
      if (_is) {
        if(this.formData[1].content == '' || this.feedbackContent == ''){
          mpvue.showToast({
            title: "請完善表單！",
            icon: "none",
            time: "2000"
          });
          return false;
        }
        vm.score = 0;
        this.formData.forEach(value => {
          if (vm.form[value.id]) {
            value.answerlist.forEach(value2 => {
              vm.form[value.id].forEach(_id => {
                if (_id == value2.id) {
                  vm.score = vm.score + value2.score;
                }
              });
            });
          }
        });
        let topics = [];
        for (let item in vm.form) {
          let _obj = {};
          _obj.topic_id = item;
          _obj.answer_id = vm.form[item].join(",");
          topics.push(_obj);
        }
        let upInfo = mpvue.getStorageSync("upInfo");
        mpvue.showLoading({
          title: "正在提交"
        });
        mpvue.request({
          method: "POST",
          url: `${vm.$api}/questionnaire/questionnaireFormSave`,
          data: {
            qid: vm.pid,
            loginkey: mpvue.getStorageSync("sessionId"),
            nickname: mpvue.getStorageSync("nickName"),
            sex: upInfo.sex,
            age: upInfo.age,
            address: upInfo.address,
            topics: topics
          },
          success: function(res) {
            if (res.statusCode == 200) {
              var datas = res.data.data;
              mpvue.hideLoading();
              mpvue.showToast({
                title: "提交成功！",
                icon: "success",
                time: 2000
              });
              mpvue.setStorageSync("upInfo", {
                sex: upInfo.sex,
                age: upInfo.age,
                address: upInfo.address,
                qid: vm.pid,
                score: vm.score
              });
              setTimeout(_ => {
                mpvue.navigateTo({
                  url: "../testResult/main?type=" + vm.types + "&id=" + datas
                });
              }, 2000);
            } else {
              mpvue.showToast({
                title: "網絡發生異常！",
                icon: "none",
                time: "2000"
              });
            }
          }
        });
      } else {
        mpvue.showToast({
          title: "請完善表單！",
          icon: "none",
          time: "2000"
        });
      }
    },
    formCheck(item, items) {
      let id = item.id;
      let _che = [];
      let vm = this;
      if (
        !items.check &&
        vm.form[id] &&
        vm.form[id].length == item.max_check_count &&
        !item.radio
      ) {
        mpvue.showToast({
          title: "该题最多选择" + item.max_check_count + "项",
          icon: "none",
          time: "2000"
        });
        return false;
      }
      this.formData = this.formData.map((value, index) => {
        if (value.id == id) {
          value.answerlist.map(value2 => {
            if (value2.id == items.id) {
              value2.check = true;
              if (vm.form[id]) {
                console.log(vm.form[id]);
                vm.form[id].forEach(the => {
                  if (the == value2.id && !value.radio) {
                    value2.check = false;
                  } else {
                    _che.push(the);
                  }
                });
                if (value2.check && !value.radio) {
                  _che.push(value2.id);
                }
              } else {
                _che.push(value2.id);
              }
            } else {
              if (value.radio) {
                value2.check = false;
              }
            }
            return value2;
          });
        }
        return value;
      });
      this.form[id] = _che;
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
    let datas = {
      id: 6,
      title: "腸道健康",
      desc: "腸道健康",
      classfy_id: 15,
      topic_id: "33,34,35,36,37,38,39,40,41,42",
      is_show: 1,
      publish_time: "2019-11-27 17:11:07",
      sort_order: null,
      count: null,
      create_time: null,
      topiclist: {
        "33": {
          id: 33,
          title: "请问您对我们的住宿满意吗？",
          min_check_count: 1,
          max_check_count: 1,
          answerlist: {
            "37": { id: 37, content: "A：满意", score: 0 },
            "38": { id: 38, content: "B：一般", score: 1 },
            "39": { id: 39, content: "C：不满意", score: 1 }
          }
        },
        "34": {
          id: 34,
          title: "请问您对我们的课程满意吗？",
          min_check_count: 1,
          max_check_count: 1,
          content:"",
          answerlist: {
            "39": { id: 39, content: "A：满意", score: 0 },
            "40": { id: 40, content: "B：一般", score: 1 },
            "41": { id: 41, content: "C：不满意", score: 1 }
          }
        },
      }
    };
    vm.formData = [];
    vm.pid = datas.id;
    for (let item in datas.topiclist) {
      datas.topiclist[item].radio = datas.topiclist[item].max_check_count == 1;
      let _arr = [];
      for (let item2 in datas.topiclist[item].answerlist) {
        _arr.push(datas.topiclist[item].answerlist[item2]);
      }
      datas.topiclist[item].answerlist = _arr;
      vm.formData.push(datas.topiclist[item]);
    }
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
        textarea{
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