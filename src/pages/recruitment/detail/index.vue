<template>
  <div class="recruitment-detail">
    <div class="top">
      <h2 class="line">{{detail.Detail.Name}}</h2>
      <div class="line">
        <p>
          <i class="iconfont icon-qizhi"></i>
          {{detail.Detail.NatureName}}
        </p>
        <p>
          <i class="iconfont icon-yewu"></i>
          {{detail.Detail.Business}}
        </p>
      </div>
    </div>
    <div class="recruitment-detail-main">
      <div class="tag">
        <ul>
          <li
            v-for="item in tagData"
            :key="item.id"
            :class="item.id == tagCheck?'on':''"
            @click="tagClick(item)"
          >{{item.label}}</li>
        </ul>
      </div>
      <div class="main-content wxparse-mains" v-if="tagCheck==0 && detail.Detail.Intro">
        <wxParse :content="detail.Detail.Intro" />
      </div>
      <div class="main-join" v-if="tagCheck==1">
        <ul>
          <li
            v-for="item in detail.RecruitList"
            :key="item.id"
            :class="item.check?'on':''"
            @click="joinTab(item)"
          >
            <div class="join-detail-t">
              <h2 class="line">{{item.Title}}</h2>
              <i class="iconfont icon-you1"></i>
              <p>
                <span>{{item.Areas}}</span>
                <span>{{item.EducationName}}</span>
              </p>
            </div>
            <div class="join-detail wxparse-mains" v-if="item.check">
                <wxParse :content="item.Content" />
            </div>
          </li>
        </ul>
        <load-data :isLoading="isLoading" :isNotData="isNotData" />
      </div>
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
      tagCheck: 0,
      tagData: [{ label: "公司介绍", id: "0" }, { label: "招聘岗位", id: "1" }],
      detail: {
        Detail:{},
        RecruitList:[]
      },
      pid: ""
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
      vm.$api
        .$signGet("职位列表", {
          page: vm.pageNum,
          companyId: vm.pid
        })
        .then(res => {
          if (vm.pageNum == 1) {
            vm.isGet = true;
            vm.isLoading = false;
            vm.detail = res.Data;
          } else {
            if (res.Data.RecruitList > 0) {
              vm.isGet = true;
              vm.isLoading = false;
              vm.detail.RecruitList = [
                ...vm.detail.RecruitList,
                ...res.Data.RecruitList
              ];
            } else {
              vm.isGet = false;
              vm.isLoading = false;
              vm.isNotData = true;
            }
          }
        });
    },
    joinTab(item) {
      this.detail.RecruitList = this.detail.RecruitList.map(value => {
        if (item.Id == value.Id) {
          value.check = !value.check;
        }
        return value;
      });
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
  onPullDownRefresh: function() {
    let vm = this;
    vm.getData();
  },
  onLoad(o) {
    let vm = this;
    vm.pid = o.id;
    vm.getData();
  }
};
</script>

<style lang="less" scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.recruitment-detail {
  min-height: 100vh;
  background-color: #f7f7f7;
  .top {
    padding: 35rpx 32rpx;
    background-color: white;
    h2 {
      font-size: 44rpx;
      line-height: 60rpx;
      font-weight: 600;
    }
    div {
      margin-top: 15rpx;
      p {
        display: inline-block;
        margin-right: 30rpx;
        color: #999;
        font-size: 26rpx;
        line-height: 37rpx;
        &:last-child {
          margin-right: 0;
        }
        i {
          display: inline-block;
          margin-right: 5rpx;
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }
  .recruitment-detail-main {
    margin-top: 20rpx;
    background-color: white;
    height: calc(~"100vh - 203rpx");
    .tag {
      height: 96rpx;
      overflow: hidden;
      border-bottom: 1rpx solid #e5e5e5;
      ul {
        li {
          width: 50%;
          float: left;
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
    .main-content {
      padding: 30rpx;
    }
    .main-join {
      ul {
        li {
          border-bottom: 1px solid #e5e5e5;
          &.on{
             .join-detail-t {
               &>i{
                 transform: rotate(90deg);
               }
             }
          }
          .join-detail-t {
            height: 104rpx;
            overflow: hidden;
            line-height: 103rpx;
            margin: 0 30rpx;
            h2 {
              font-size: 32rpx;
              font-weight: 600;
              display: inline-block;
              width: 50%;
            }
            p {
              float: right;
              span {
                font-size: 28rpx;
                margin-left: 15rpx;
                color: #999;
              }
            }
            & > i {
              display: block;
              float: right;
              font-size: 26rpx;
              color: #ccc;
              margin-left: 45rpx;
              transition: 0.3s transform;
            }
          }
          .join-detail {
            padding: 20rpx 30rpx;
            border-top: 1px solid #e5e5e5;
          }
        }
      }
    }
  }
}
</style>
