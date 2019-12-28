<template>
  <div class="course-play-back">
    <ul>
      <li v-for="item in courseData" :key="item.Id">
        <a :href="'../../course/detail/main?id='+item.Id">
          <p>
            <img :src="item.Image" mode="aspectFill" />
          </p>
          <div>
            <h2 class="lines">{{item.Title}}</h2>
            <div>
              <span>{{item.ActiveTime}}</span>
              <p :class="!item.IsSignIn?'on':''">{{item.IsSignIn?'已打卡':'未打卡'}}</p>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <load-data :isLoading="isLoading" :isNotData="isNotData" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      isNotData: false,
      isGet: true,
      pageNum: 1,
      pageSize: 10,
      courseData: []
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
    getData() {
      let vm = this;
      vm.isGet = false;
      vm.isLoading = true;
      this.$api
        .$signGet("视频课程列表", {
          userid: mpvue.getStorageSync("userid"),
          page: vm.pageNum
        })
        .then(res => {
          if (res.Data.rows.length > 0) {
            vm.isGet = true;
            vm.isLoading = false;
            vm.courseData = res.Data.rows.map(value=>{
              value.ActiveTime = value.ActiveTime.split(' ')[0];
              return value;
            });
          } else {
            vm.isGet = false;
            vm.isLoading = false;
            vm.isNotData = true;
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
  },
  onLoad() {
    let vm = this;
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.course-play-back {
  ul {
    li {
      padding: 32rpx;
      overflow: hidden;
      border-bottom: 1px solid #e5e5e5;
      a {
        display: block;
        overflow: hidden;
        & > p {
          width: 239rpx;
          height: 159rpx;
          float: left;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        & > div {
          margin-left: 263rpx;
          h2 {
            font-size: 32rpx;
            line-height: 45rpx;
          }
          div {
            margin-top: 24rpx;
            span {
              font-size: 26rpx;
              color: #999;
              display: block;
              float:left;
            }
            p {
              float: right;
              font-size: 26rpx;
              color: #999;
              &.on {
                color: #0091ff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
