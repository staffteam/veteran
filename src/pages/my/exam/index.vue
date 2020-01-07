<template>
  <div>
    <div class="my-exam">
      <ul v-if="examListData.length>0">
        <li v-for="item in examListData" :key="item.id" :class="item.IsPass || !item.StudentCount?'on':''">
          <a :href="item.StudentCount && !item.IsPass?('../../my/examDetail/main?id='+item.Id):''">
            <div class="l">
              <p>
                <img :src="item.Image || '/static/images/exam-back.png'" mode="aspectFill" />
              </p>
              <!-- <h2>{{item.Name}}</h2> -->
            </div>
            <div class="c">
              <h2 class="line">{{item.Name}}</h2>
              <p>
                <span v-if="item.StudentCount!=null">提示：还有{{item.StudentCount}}次考试机会</span>
              </p>
              <div>
                <p v-if="item.UserScore!=null">
                  成绩
                  <span>{{item.UserScore}}</span>
                </p>
                <p v-if="item.UserScore==null">未考试</p>
                <span>
                  进入考试
                  <i class="iconfont icon-you1"></i>
                </span>
              </div>
            </div>
            <div class="qualified" v-if="item.IsPass">
              <img src="/static/images/qualified.png" mode="widthFix" />
            </div>
          </a>
        </li>
      </ul>
      <div class="not-exam" v-if="examListData.length==0">
        <img src="/static/images/not-exam.jpg" mode="widthFix">
      </div>
    </div>
    <load-data v-if="examListData.length>0" :isLoading="isLoading" :isNotData="isNotData" />
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
      examListData: []
    };
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {
  //   let vm = this;
  //   if (vm.isGet) {
  //     vm.pageNum++;
  //     vm.getData();
  //   }
  // },
  methods: {
    getData() {
      let vm = this;
      vm.isGet = false;
      vm.isLoading = false;
      vm.isNotData = true;
      vm.$api
        .$signGet("科目列表", {
          userid: mpvue.getStorageSync("userid")
        })
        .then(res => {
          vm.examListData = res.Data;
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
.my-exam {
  min-height: calc(~"100vh - 180rpx");
  .not-exam{
    width: 100%;
    height: 100vh;
    img{
      max-width:30%;
      position: relative;
      display: block;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  ul {
    li {
      margin: 30rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0 20rpx 0px rgba(0, 0, 0, 0.1);
      border-radius: 10rpx;
      position: relative;
      height: 200rpx;
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
            width: 100%;
            height: 100%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
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
