<template>
  <div class="home">
    <ul>
      <li v-for="(item,index) in homeNavData" :key="index">
        <a :href="item.url">
          <h2>{{item.title}}</h2>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeNavData: [
        { title: "工作方案", url: "../workProgram/main" },
        { title: "课程安排", url: "../agenda/main" },
        { title: "课程回放", url: "../course/playback/main" },
        { title: "在线试题", url: "../testQuestions/main" },
        { title: "上课签到", url: "../signIn/main" },
        { title: "文体娱乐", url: "../entertainment/main" },
        { title: "结业典礼", url: "../closingCeremony/main" },
        { title: "技能培训", url: "../skillTraining/main" },
        { title: "调查问卷", url: "../questionnaire/main" },
        { title: "组织架构", url: "../structure/main" },
        { title: "开班仪式", url: "../ceremony/main" },
        { title: "企业招聘", url: "../join/main" },
        { title: "人才空间", url: "../talentSpace/main" },
        { title: "敬请期待", url: "../comingSoon/main" }
      ]
    };
  },
  methods: {
    bindGetUserInfo(e) {
      if (!e.mp.detail.userInfo) return;
      var vm = this;
      var userInfo_ = e.mp.detail.userInfo;
      this.getInfo(
        {
          detail: {
            userInfo: userInfo_
          }
        },
        function(data) {
          vm.hasUserInfo = true;
          vm.userInfo = data;
          mpvue.setStorageSync("userInfo", data);
          mpvue.request({
            url: `${this.$api}/member/isSuper`,
            data: {
              userid: mpvue.getStorageSync("userId")
            },
            success: function(res) {
              var datas = res.data.data;
              vm.isQRcode = datas;
            }
          });
        }
      );
    },
    recordsClick(title) {
      mpvue.navigateTo({
        url: "../table/main?title=" + title
      });
    },
    getdata: function(e) {
      var vm = this;
      let uiserid = mpvue.getStorageSync("userId");
      let sessionId = mpvue.getStorageSync("sessionId");
      //消息数据获取
      wx.request({
        url: this.config.service.searchMyRecord,
        data: {
          args: {
            userId: uiserid,
            sessionId: sessionId,
            count: 3,
            pageNum: 1
          }
        },
        success: function(res) {
          if (res.data.Code == 200) {
            vm.searchRecords = res.data.Data;
          }
        }
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
    let userInfo = mpvue.getStorageSync("userInfo");
    if (userInfo) {
      this.hasUserInfo = true;
    }
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
</style>
