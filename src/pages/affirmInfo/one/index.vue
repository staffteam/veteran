<template>
  <div class="affirm-info">
    <p>
      <img src="/static/images/login-back.jpg" mode="widthFix" />
    </p>
    <div class="login" v-if="!errorCorrection">
      <div class="login-main">
        <div class="title">
          <i class="iconfont icon-dingweiweizhi"></i>
          地区验证
        </div>
        <div class="form">
          <div class="item">
            <span>地&emsp;&emsp;区</span>
            <input
              type="text"
              v-model="userInfo.Areas"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
              @click="showCityPicker"
            />
            <city-picker
              id="city-picker"
              :value="cityPickerValue"
              :isShow="cityPickerIsShow"
              @sureclick="cityPickerOnSureClick"
              @cancelclick="cityPickerOnCancelClick"
            />
          </div>
          <div class="item">
            <span>教&ensp;学&ensp;点</span>
            <input
              type="text"
              v-model="userInfo.SchoolName"
              placeholder-style="color:#e53330;"
              :disabled="isReadonly"
              @click="openSelect"
            />
            <single-picker
              :isShowPicker="isOpen"
              @sure="schoolSure"
              @cancle="schoolCancle"
              scrollType="normal"
              :listData="[schoolData]"
              :defaultPickData="schoolValue"
              indicatorStyle="height:35px"
              sureStyle="color:#e53330;font-size:30rpx;"
              cancelStyle="color:#333333;font-size:30rpx;"
              chooseItemTextStyle="color:#333333;font-size:30rpx;"
              pickerHeaderStyle="border-bottom:1px solid #e5e5e5;"
              titleStyle="display:none;"
              cancelText="取消"
              sureText="确定"
            ></single-picker>
          </div>
        </div>
        <div class="submit-btn">
          <div class="correction" @click="correction()">{{isReadonly?'纠错':'返回'}}</div>
          <div class="gonext" @click="gonext()">{{isReadonly?'下一步':'提交'}}</div>
        </div>
      </div>
    </div>
    <div class="error-correction" v-if="errorCorrection">
      <i class="iconfont icon-dui"></i>
      <h2>提交成功</h2>
      <div>工作人员将会在3个工作日内审核您的申请，敬请留意</div>
      <p @click="affirmCorrection(true)">知道了</p>
    </div>
    <hint :commonMsg="commonMsg" :title="commonTitle" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      commonMsg: false,
      commonTitle: "",
      userInfo: {},
      hostInfo: {},
      isReadonly: true,
      errorCorrection: false,
      cityPickerValue: [0, 0],
      cityPickerIsShow: false,
      schoolList: [],
      schoolJson: {},
      schoolValue: [0],
      schoolData: [],
      isOpen: false
    };
  },
  methods: {
    openSelect() {
      if(!this.isReadonly){
        this.isOpen = true;
      }
    },
    schoolSure(val) {
      debugger;
      this.isOpen = false;
      // this.schoolValue = val;
      // this.userInfo.SchoolName = this.schoolData[val[0]];
      // this.userInfo.SchoolId = this.schoolJson[this.schoolData[val[0]]];
    },
    schoolCancle(){
      this.isOpen = false;
    },
    /**
     * 城市选择确认
     */
    cityPickerOnSureClick: function(e) {
      let _data = e.mp.detail;
      this.userInfo.Areas = _data.valueName[0] + _data.valueName[1];
      this.cityPickerValue = _data.valueCode;
      this.cityPickerIsShow = false;
    },
    /**
     * 城市选择取消
     */
    cityPickerOnCancelClick: function(event) {
      this.cityPickerIsShow = false;
    },
    showCityPicker() {
      if (!this.isReadonly) {
        this.cityPickerIsShow = true;
      }
    },
    showHint(text, time = 1000) {
      let vm = this;
      vm.commonMsg = true;
      vm.commonTitle = text;
      setTimeout(_ => {
        vm.commonMsg = false;
        vm.commonTitle = "";
      }, time);
    },
    correction() {
      if (this.isReadonly) {
        this.isReadonly = false;
        this.hostInfo = {
          Areas: this.userInfo.Areas,
          SchoolName: this.userInfo.SchoolName
        };
        this.userInfo.Areas = "";
        this.userInfo.SchoolName = "";
      } else {
        this.isReadonly = true;
        this.userInfo.Areas = this.hostInfo.Areas;
        this.userInfo.SchoolName = this.hostInfo.SchoolName;
      }
    },
    gonext() {
      let vm = this;
      let userInfo = mpvue.getStorageSync("userInfo");
      if (vm.userInfo.Areas == "") {
        vm.showHint("请输入地区");
      } else if (vm.userInfo.SchoolName == "") {
        vm.showHint("请输入教学点");
      } else {
        if (!this.isReadonly) {
          vm.$api
            .$signPost("纠错", {
              Areas: vm.userInfo.Areas,
              SchoolId: vm.userInfo.SchoolId
            })
            .then(res => {
              userInfo.Areas = vm.userInfo.Areas;
              userInfo.SchoolName = vm.userInfo.SchoolName;
              userInfo.SchoolId = vm.userInfo.SchoolId;
              mpvue.setStorageSync("userInfo", userInfo);
              mpvue.navigateTo({
                url: "../../affirmInfo/two/main"
              });
            });
          this.errorCorrection = true;
        } else {
          vm.affirmCorrection();
        }
      }
    },
    affirmCorrection(is) {
      let vm = this;
      if (is) {
        mpvue.navigateTo({
          url: "../../affirmInfo/two/main"
        });
      } else {
        vm.$api
          .$signPost("学员确认信息", {
            userid: vm.userInfo.userid
          })
          .then(res => {
            mpvue.navigateTo({
              url: "../../affirmInfo/two/main"
            });
          });
      }
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
    let userInfo = mpvue.getStorageSync("userInfo");
    if (userInfo) {
      this.userInfo = userInfo;
    }
    this.$api.$signGet("教学点列表", {}).then(res => {
      if (res.Success) {
        vm.schoolList = [
          ...res.Data,
          {
            CreateTime: "2019-12-20 17:13:35",
            EnCode: "school",
            Id: "1207947833622138881",
            Image: null,
            IsTree: null,
            Name: "坂田教学点2",
            ParentId: null,
            SortNo: 0,
            UpdateTime: null
          }
        ];
        let _arr = [],
          _arr2 = {};
        vm.schoolList.forEach(value => {
          _arr.push(value.Name);
          _arr2[value.Name] = value.Id;
        });
        console.log(_arr);
        this.schoolData = _arr;
        this.schoolJson = _arr2;
      }
    });
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
.affirm-info {
  & > p {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    img {
      width: 100%;
    }
  }
  .login {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 9;
    .login-main {
      padding: 260rpx 120rpx 0;
      .title {
        font-size: 28rpx;
        color: rgba(168, 125, 87, 1);
        line-height: 40rpx;
        i {
          font-size: 28rpx;
          margin-right: 20rpx;
          color: #a87d57;
          display: inline-block;
        }
      }
      .form {
        .item {
          overflow: hidden;
          margin-top: 40rpx;
          &:first-child {
            margin-top: 20rpx;
          }
          span {
            display: block;
            width: 160rpx;
            text-align: left;
            font-size: 28rpx;
            line-height: 96rpx;
            color: #a87d57;
            float: left;
          }
          input {
            float: right;
            border: 2rpx solid #e53330;
            height: 92rpx;
            width: calc(~"100% - 224rpx");
            background: rgba(255, 253, 249, 1);
            border-radius: 4rpx;
            font-size: 28rpx;
            color: #e53330;
            padding: 0 30rpx;
          }
        }
      }
      .submit-btn {
        margin-top: 275rpx;
        .correction {
          width: 184rpx;
          height: 88rpx;
          background: rgba(229, 51, 48, 0.1);
          border-radius: 4rpx;
          text-align: center;
          line-height: 88rpx;
          font-size: 28rpx;
          color: rgba(229, 51, 48, 1);
          float: left;
        }
        .gonext {
          width: 184rpx;
          height: 88rpx;
          float: right;
          background: rgba(229, 51, 48, 1);
          border-radius: 4rpx;
          text-align: center;
          line-height: 88rpx;
          font-size: 28rpx;
          color: white;
        }
      }
    }
  }
  .error-correction {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    position: relative;
    z-index: 9;
    text-align: center;
    padding-top: 277rpx;
    & > i {
      font-size: 144rpx;
      color: #e53330;
    }
    & > h2 {
      margin-top: 48rpx;
      font-size: 40rpx;
      line-height: 56rpx;
      font-weight: 600;
      color: #e53330;
    }
    & > div {
      font-size: 28rpx;
      line-height: 40rpx;
      color: #e53330;
      width: 400rpx;
      margin: 0 auto;
      margin-top: 20rpx;
    }
    & > p {
      width: 184rpx;
      height: 88rpx;
      background: rgba(229, 51, 48, 1);
      border-radius: 4rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 88rpx;
      color: white;
      margin: 0 auto;
      margin-top: 147rpx;
    }
  }
}
</style>
