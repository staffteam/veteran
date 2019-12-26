<template>
  <div>
    <div class="home" >
      <p>
        <img src="/static/images/home-back.jpg" mode="widthFix" />
      </p>
      <ul>
        <li v-for="(item,index) in homeNavData" :key="index">
          <a :href="item.url">
            <p>
              <img :src="item.icon" mode="widthFix" />
            </p>
            <h2>{{item.title}}</h2>
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
          url: "../../recruitment/list/main",
          icon: "/static/images/home-list1.png"
        },
        {
          title: "孵化项目",
          url: "../../talentSpace/detail/main",
          icon: "/static/images/home-list2.png"
        },
        {
          title: "金融项目",
          url: "../../talentSpace/detail/main",
          icon: "/static/images/home-list3.png"
        }
      ],
    };
  },
  methods: {
  },
  created() {
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
  }
};
</script>

<style lang="less" scoped>
.home {
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
    width: calc(~"100% - 80rpx");
    margin: 40rpx auto;
    li {
      text-align: center;
      width: calc(~"82% / 3");
      margin: 30rpx 3%;
      position: relative;
      overflow: hidden;
      border-radius: 24rpx;
      float: left;
      p {
        width: 150rpx;
        height: 150rpx;
        margin: 0 auto;
        border-radius: 20rpx;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      h2 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        font-size: 32rpx;
        color: white;
        line-height: 60rpx;
      }
    }
  }
}
</style>
