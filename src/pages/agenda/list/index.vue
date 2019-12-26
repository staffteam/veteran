<template>
  <div class="workProgram">
    <div class="top">
      <scroll-view :scroll-x="true">
        <ul :style="maxw!=0?'width:'+maxw+'px;':''">
          <li
            class="tag-li"
            v-for="item in tagData"
            :key="item.id"
            :class="item.id == tagCheck?'on':''"
            @click="tagClick(item)"
          >{{item.title}}</li>
        </ul>
      </scroll-view>
    </div>
    <div class="top-h"></div>
    <div class="workProgram-main">
      <ul>
        <li v-for="item in workProgramData" :key="item.id">
          <a :href="'../../workProgram/detail/main?id='">
            <div>
              <h2 class="lines">{{item.title}}</h2>
              <p>
                <span>{{item.time}}</span>
                <span>{{item.flow}} 阅读</span>
              </p>
            </div>
            <p>
              <img :src="item.img_url" mode="aspectFill" />
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
      tagCheck: "1",
      tagData: [
        { id: "1", title: "通知文件" },
        { id: "2", title: "作息时间入口" },
        { id: "3", title: "人员规划" }
      ],
      workProgramData: [
        {
          title: "这是一个文章标题这是一个文章标题",
          time: "2019-10-19",
          flow: "13344",
          img_url: "/static/images/course.jpg"
        },
        {
          title: "这是一个文章标题这是一个文章标题",
          time: "2019-10-19",
          flow: "13344",
          img_url: "/static/images/course.jpg"
        },
        {
          title: "这是一个文章标题这是一个文章标题",
          time: "2019-10-19",
          flow: "13344",
          img_url: "/static/images/course.jpg"
        },
        {
          title: "这是一个文章标题这是一个文章标题",
          time: "2019-10-19",
          flow: "13344",
          img_url: "/static/images/course.jpg"
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
    },
    tagClick(item) {
      this.tagCheck = item.id;
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
    let _query = wx.createSelectorQuery();
    setTimeout(_ => {
      _query.selectAll(".tag-li").boundingClientRect();
      _query.exec(res => {
        res[0].forEach(value => {
          vm.maxw += value.width;
          console.log(vm.maxw);
        });
      });
    }, 50);
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
  .workProgram-main{
    min-height: calc(~"100vh - 96rpx");
    ul{
      li{
        padding: 35rpx 0;
        margin: 0 32rpx;
        border-bottom: 1rpx solid #EEEEEE;
        a{
          display: block;
          overflow: hidden;
          &>p{
            width: 218rpx;
            height: 156rpx;
            float: right;
            img{
              width:100%;
              height: 100%;
            }
          }
          &>div{
            float:left;
            width: calc(~"100% - 258rpx");
            h2{
              font-size: 30rpx;
              font-weight: 600;
              line-height: 42rpx;
              height: 84rpx;
            }
            p{
              margin-top: 30rpx;
              span{
                color: #999;
                display: block;
                float:left;
                font-size: 24rpx;
                &:last-child{
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
