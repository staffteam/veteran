<template>
  <div class="my-exam">
    <div class="help-tel" @click="makePhone">
      <i class="iconfont icon-dianhua"></i>
      客服热线：
      <span>{{serviceTel}}</span>
    </div>

    <div class="feedback">
      <div class="title">常见问题</div>
      <div class="li" @click="recommendClick(item.Id)" v-for="item in recommendData" :key="item.Id">
        <div class="t">{{item.Title}}</div>
        <i :class="'iconfont icon-you1 ' + (item.on?'on':'')"></i>
        <div :class="'desc wxparse-mains '+ (item.on?'on':'')">
          <wxParse :content="item.Content" />
        </div>
      </div>
      <load-data :isLoading="isLoading" :isNotData="isNotData" />
    </div>
  </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
export default {
  components: {
    wxParse
  },
  data() {
    return {
      isLoading: false,
      isNotData: false,
      isGet: true,
      pageNum: 1,
      pageSize: 10,
      serviceTel: "",
      recommendData: []
    };
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let vm = this;
    if (vm.isGet) {
      vm.pageNum++;
      vm.getData();
    }
  },
  methods: {
    makePhone() {
      wx.makePhoneCall({
        phoneNumber: this.serviceTel
      });
    },
    recommendClick(id) {
      this.recommendData = this.recommendData.map(value => {
        if (value.Id == id) {
          value.on = !value.on;
        } else {
          value.on = false;
        }
        return value;
      });
    },
    getData() {
      let vm = this;
      vm.isGet = false;
      vm.isLoading = true;
      vm.$api
        .$signGet("文章列表", {
          enCode: 'cjwt',
          page: vm.pageNum,
          userid: mpvue.getStorageSync("userId")
        })
        .then(res => {
          if (res.Data.list.length > 0) {
            vm.isGet = true;
            vm.isLoading = false;
            vm.recommendData = [...res.Data.list,...vm.recommendData];
          } else {
            vm.isGet = false;
            vm.isLoading = false;
            vm.isNotData = true;
          }
          vm.serviceTel = res.Data.tel;
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
  onLoad() {
    let vm = this;
    vm.pageNum = 1;
    vm.recommendData = [];
    this.getData();
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
/* pages/feedback/feedback.wxss */

.my-exam {
  background-color: #f7f7f7;
  min-height: 100vh;
  padding-top: 20rpx;
}
.help-tel {
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  font-size: 32rpx;
  span {
    font-weight: 600;
  }
  i {
    font-size: 40rpx;
    color: #e53330;
    margin-right: 10rpx;
    display: inline-block;
    vertical-align: middle;
  }
}
.feedback {
  background-color: white;
  margin-top: 20rpx;
}

.feedback .title {
  height: 104rpx;
  line-height: 104rpx;
  background: rgba(255, 255, 255, 1);
  padding: 0 32rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
}

.feedback .li {
  line-height: 104rpx;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  padding: 0 32rpx;
  border-top: 1px solid #e5e5e5;
}

.feedback .li .t {
  font-size: 28rpx;
  color: rgba(51, 51, 51, 1);
  height: 104rpx;
  line-height: 104rpx;
  float: left;
}

.feedback .li i {
  font-size: 26rpx;
  float: right;
  display: block;
  transform: rotate(0deg);
  transition: 0.3s transform;
}

.feedback .li i.on {
  transform: rotate(90deg);
}

.feedback .li .desc {
  width: 100%;
  float: left;
  padding: 10rpx 0 20rpx 0;
  display: none;
  font-size: 28rpx;
  line-height: 40rpx;
}

.feedback .li .desc.on {
  display: block;
}
</style>
