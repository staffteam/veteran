<template>
  <!--pages/grade/grade.wxml-->
  <div class="grade">
    <div class="back">
      <img src="/static/images/find-top.jpg" mode="widthFix" />
    </div>

    <div class="form">
      <!-- <div class="item">
        <text>姓名</text>
        <input v-model="form.name" placeholder="请输入姓名" />
      </div>-->
      <div class="item">
        <text>手机号</text>
        <input v-model="form.phone" placeholder="请输入手机号" />
      </div>
      <!-- <div class="item">
        <text>身份证号</text>
        <input v-model="form.identity" placeholder="请输入身份证号" />
      </div>-->
      <div class="item code">
        <text>验证码</text>
        <input v-model="form.code" id="inputCode" placeholder="请输入验证码" />
        <div id="checkCode" @click="checkClick">{{checkCode}}</div>
      </div>
      <!-- <div class="tip">温馨提示：手机号与身份证号必须填一项</div> -->
    </div>
    <div class="btn">
      <div class="submit" @click="onsubmit">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        identity: "",
        code: "",
        phone: "",
        name: ""
      },
      checkCode: ""
    };
  },
  methods: {
    checkClick() {
      this.createCode(4);
    },
    //生成验证码的方法
    createCode(length) {
      var code = "";
      var codeLength = parseInt(length); //验证码的长度
      ////所有候选组成验证码的字符，当然也可以用中文的
      var codeChars = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
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
      );
      //循环组成验证码的字符串
      for (var i = 0; i < codeLength; i++) {
        //获取随机验证码下标
        var charNum = Math.floor(Math.random() * 62);
        //组合成指定字符验证码
        code += codeChars[charNum];
      }
      this.checkCode = code;
    },
    onsubmit() {
      if (this.form.phone == "") {
        mpvue.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 2000
        });
      } else if (
        this.form.phone != "" &&
        !/^1[3456789]\d{9}$/.test(this.form.phone)
      ) {
        wx.showToast({
          title: "手机号格式有误",
          icon: "none",
          duration: 2000
        });
      } else if (this.validateCode()) {
        mpvue.navigateTo({
          url: `../../student/info/main?id=${this.form.phone}`
        });
      }
    },
    //检查验证码是否正确
    validateCode() {
      //获取显示区生成的验证码
      var checkCode = this.checkCode;
      //获取输入的验证码
      var inputCode = this.form.code;
      if (inputCode.length <= 0) {
        wx.showToast({
          title: "请输入验证码！",
          icon: "none",
          duration: 2000
        });
        return false;
      } else if (inputCode.toUpperCase() != checkCode.toUpperCase()) {
        wx.showToast({
          title: "验证码输入有误！",
          icon: "none",
          duration: 2000
        });
        this.createCode(4);
        return false;
      } else {
        return true;
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
    this.createCode(4);
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
/* pages/grade/grade.wxss */

.grade .back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  img {
    display: block;
  }
}

.form {
  position: relative;
  width: 686rpx;
  margin: 0 auto;
  margin-top: 270rpx;
  box-shadow: 0px 0px 40rpx 0px rgba(0, 0, 0, 0.1);
  border-radius: 10rpx;
  z-index: 9;
  background-color: white;
  padding: 30rpx;
  .tip {
    font-size: 26rpx;
    padding: 30rpx 0 0;
    color: rgba(33, 192, 254, 1);
  }
  .item {
    overflow: hidden;
    border-bottom: 1px solid #eee;
    &:last-child {
      border-bottom: 0;
    }
    text {
      font-size: 32rpx;
      color: rgba(102, 102, 102, 1);
      line-height: 88rpx;
      display: block;
      float: left;
      width: 130rpx;
    }
    input {
      float: right;
      width: calc(100% - 180rpx);
      height: 88rpx;
      font-size: 28rpx;
    }
  }
  .code {
    input {
      float: left;
      margin-left: 50rpx;
      width: calc(100% - 310rpx);
    }
    #checkCode {
      width: 100rpx;
      float: right;
      line-height: 88rpx;
      font-size: 32rpx;
      color: #999;
      text-align: center;
      font-family: Arial;
      font-style: italic;
      font-weight: bolder;
    }
  }
}

.btn {
  width: 510rpx;
  height: 88rpx;
  margin: 0 auto;
  margin-top: 125rpx;
  background: rgba(229, 51, 48, 1);
  border-radius: 4rpx;
  font-size: 30rpx;
  color: rgba(255, 255, 255, 1);
  line-height: 88rpx;
  text-align: center;
}
</style>
