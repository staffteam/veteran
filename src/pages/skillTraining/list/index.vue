<template>
  <div class="workProgram">
    <div class="workProgram-main">
      <ul>
        <li v-for="item in workProgramData" :key="item.Id">
          <a :href="'../../workProgram/detail/main?id='+item.Id">
            <div>
              <h2 class="lines">{{item.Title}}</h2>
              <p>
                <span>{{item.UpdateTime || '刚刚'}}</span>
                <span>{{item.Stat}} 阅读</span>
              </p>
            </div>
            <p>
              <img :src="item.Image" @error="errImage(item.Id)" mode="aspectFill" />
            </p>
          </a>
        </li>
      </ul>
    </div>
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
      maxw: 0,
      tagCheck: "jnpx",
      workProgramData: []
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
    errImage(id){
      this.workProgramData = this.workProgramData.map(value=>{
        if(id == value.Id){
          value.Image = '/static/images/course.jpg';
        }
        return value;
      })
    },
    getData() {
      let vm = this;
      vm.isGet = false;
      vm.isLoading = true;
      vm.$api
        .$signGet("文章列表", {
          enCode: vm.tagCheck,
          page: vm.pageNum,
          userid: mpvue.getStorageSync("userid")
        })
        .then(res => {
          if (res.Data.length > 0) {
            vm.isGet = true;
            vm.isLoading = false;
            vm.workProgramData = [...vm.workProgramData,...res.Data];
          } else {
            vm.isGet = false;
            vm.isLoading = false;
            vm.isNotData = true;
          }
        });
    },
    tagClick(item) {
      this.tagCheck = item.id;
      this.workProgramData = [];
      this.pageNum = 1;
      this.isNotData = false;
      this.getData();
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
    this.workProgramData = [];
    this.pageNum = 1;
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.workProgram {
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 96rpx;
    background-color: white;
    z-index: 999;
    box-shadow: 0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
    ul {
      height: 96rpx;
      overflow: hidden;
      li {
        display: inline-block;
        width: 33.33vw;
        text-align: center;
        font-size: 32rpx;
        line-height: 96rpx;
        color: #999;
        position: relative;
        &.on {
          color: #e53330;
          &:before {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60rpx;
            height: 6rpx;
            background-color: #e53330;
            content: "";
            position: absolute;
          }
        }
      }
    }
  }
  .top-h {
    height: 96rpx;
  }
  .workProgram-main {
    min-height: 96rpx;
    ul {
      li {
        padding: 35rpx 0;
        margin: 0 32rpx;
        border-bottom: 1rpx solid #eeeeee;
        a {
          display: block;
          overflow: hidden;
          & > p {
            width: 218rpx;
            height: 156rpx;
            float: right;
            img {
              width: 100%;
              height: 100%;
            }
          }
          & > div {
            float: left;
            width: calc(~"100% - 258rpx");
            h2 {
              font-size: 30rpx;
              font-weight: 600;
              line-height: 42rpx;
              height: 84rpx;
            }
            p {
              margin-top: 30rpx;
              span {
                color: #999;
                display: block;
                float: left;
                font-size: 24rpx;
                &:last-child {
                  float: right;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
