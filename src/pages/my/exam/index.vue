<template>
  <div class="my-exam">
    <ul>
      <li v-for="item in examListData" :key="item.id" :class="item.qualified?'on':''">
        <a :href="!item.qualified?'../../my/examDetail/main':''">
          <div class="l">
            <p>
              <img src="/static/images/exam-back.png" mode="widthFix" />
            </p>
            <h2>{{item.type}}</h2>
          </div>
          <div class="c">
            <h2 class="line">{{item.title}}</h2>
            <p>
              <span
                v-if="!item.qualified && item.examNum!=undefined && item.examNum!=null"
              >提示：还有{{item.examNum}}次考试机会</span>
            </p>
            <div>
              <p v-if="item.score!=undefined && item.score!=null">
                成绩
                <span>{{item.score}}</span>
              </p>
              <p v-if="item.score==undefined || item.score==null">未考试</p>
              <span>
                进入考试
                <i class="iconfont icon-you1"></i>
              </span>
            </div>
          </div>
          <div class="qualified" v-if="item.qualified">
            <img src="/static/images/qualified.png" mode="widthFix" />
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
      examListData: [
        {
          id: 0,
          qualified: true,
          type: "政治",
          title: "政治常识科目测试",
          score: "97"
        },
        {
          id: 1,
          qualified: false,
          type: "物理",
          title: "政治常识科目测试",
          score: "47",
          examNum: 3
        },
        {
          id: 2,
          qualified: null,
          type: "化学",
          title: "政治常识科目测试",
          score: null
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
.my-exam {
  ul {
    li {
      margin: 30rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0 20rpx 0px rgba(0, 0, 0, 0.1);
      border-radius: 10rpx;
      position: relative;
      &.on {
        a {
          div.c {
            & > div {
              span {
                color: #999;
              }
            }
          }
        }
      }
      a {
        display: block;
        overflow: hidden;
        padding: 25rpx 20rpx;
        div.l {
          width: 120rpx;
          height: 150rpx;
          position: relative;
          float: left;
          p {
            img {
              width: 100%;
            }
          }
          h2 {
            font-size: 40rpx;
            line-height: 150rpx;
            font-weight: 600;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #e53330;
          }
        }
        div.c {
          margin-left: 145rpx;
          padding-top: 0;
          & > h2 {
            font-size: 32rpx;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 45rpx;
          }
          & > p {
            margin-top: 13rpx;
            height: 37rpx;
            & > span {
              font-size: 26rpx;
              color: rgba(102, 102, 102, 1);
              line-height: 37rpx;
              color: #666;
            }
          }
          & > div {
            margin-top: 13rpx;
            p {
              font-size: 28rpx;
              color: #999;
              display: inline-block;
              line-height: 40rpx;
              span {
                font-size: 40rpx;
                color: #e53330;
                margin-left: 9rpx;
                font-weight: 600;
                vertical-align: bottom;
              }
            }
            span {
              display: block;
              float: right;
              font-size: 28rpx;
              color: rgba(229, 51, 48, 1);
              line-height: 40rpx;
              i {
                display: inline-block;
                margin-left: 10rpx;
                font-size: 26rpx;
              }
            }
          }
        }
        .qualified {
          width: 162rpx;
          height: 117rpx;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
  }
}
</style>
