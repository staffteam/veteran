<template>
  <div class="course-play-back">
    <ul>
      <li v-for="item in courseData" :key="item.id">
        <a :href="'../../course/detail/main?id='+item.id">
          <p>
            <img :src="item.img_url" mode="widthFix" />
          </p>
          <div>
            <h2 class="lines">{{item.title}}</h2>
            <div>
              <span>{{item.time}}</span>
              <p :class="!item.clockIn?'on':''">{{item.clockIn?'已打卡':'未打卡'}}</p>
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
      courseData: [
        {
          img_url: "/static/images/course.jpg",
          title: "退役军人培训课程退役军人培训课程退役军人",
          time: "2019-06-01",
          clockIn: false,
          id: 0
        },
        {
          img_url: "/static/images/course.jpg",
          title: "退役军人培训课程退役军人培训课程退役军人",
          time: "2019-06-01",
          clockIn: false,
          id: 1
        },
        {
          img_url: "/static/images/course.jpg",
          title: "退役军人培训课程退役军人培训课程退役军人",
          time: "2019-06-01",
          clockIn: true,
          id: 2
        },
        {
          img_url: "/static/images/course.jpg",
          title: "退役军人培训课程退役军人培训课程退役军人",
          time: "2019-06-01",
          clockIn: true,
          id: 3
        }
      ]
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
      setTimeout(_ => {
        vm.isGet = false;
        vm.isLoading = false;
        vm.isNotData = true;
      }, 1000);
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
