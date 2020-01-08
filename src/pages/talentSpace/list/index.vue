<template>
  <div>
    <div class="talent-space">
      <p>
        <img src="/static/images/home-back.jpg" mode="widthFix" />
      </p>
      <p>
        <img src="/static/images/member-top-back.jpg" mode="widthFix" />
      </p>
      <ul>
        <li v-for="(item,index) in homeNavData" :key="index">
          <a :href="item.url">
            <p>
              <img :src="item.icon" mode="widthFix" />
            </p>
            <h2>{{item.title}}</h2>
            <i class="iconfont icon-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeNavData: [
        {
          title: "人才交流",
          url: "../../talentSpace/exchangeList/main",
          icon: "/static/images/talentSpace1.png"
        },
        {
          title: "孵化项目",
          url: "../../talentSpace/detail/main",
          icon: "/static/images/talentSpace2.png"
        },
        {
          title: "金融服务",
          url: "../../talentSpace/detail/main",
          icon: "/static/images/talentSpace3.png"
        }
      ]
    };
  },
  methods: {},
  created() {},
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
  }
};
</script>

<style lang="less" scoped>
.talent-space {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
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
  ul {
    position: relative;
    z-index: 9;
    width: calc(~"100% - 110rpx");
    margin: 0 auto;
    padding: 54rpx 0;
    li {
      width: 100%;
      margin: 40rpx 0;
      padding: 38rpx 45rpx;
      position: relative;
      overflow: hidden;
      border-radius: 10rpx;
      height: 200rpx;
      background-color: white;
      box-shadow: 0px 0px 40rpx 0px rgba(0, 0, 0, 0.2);
      &:last-child{
        p{
          width: 25%;
        }
      }
      p {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 30%;
        height: 80%;
        img{
          height: 100%;
          max-width: 100%;
          max-height: 100%;
        }
      }
      h2 {
        font-size: 36rpx;
        font-weight: bold;
        color: rgba(242, 71, 36, 1);
        line-height: 54rpx;
      }
      i{
        font-size: 32rpx;
        color: #F24724;
        margin-top: 40rpx;
      }
    }
  }
}
</style>
