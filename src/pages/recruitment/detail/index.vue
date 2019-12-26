<template>
  <div class="recruitment-detail">
    <div class="top">
      <h2 class="line">{{detail.title}}</h2>
      <div class="line">
        <p>
          <i class="iconfont icon-qizhi"></i>
          {{detail.type}}
        </p>
        <p>
          <i class="iconfont icon-yewu"></i>
          {{detail.service}}
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
      <div class="main-content" v-if="tagCheck==0">
        <wxParse :content="detail.content" />
      </div>
      <div class="main-join" v-if="tagCheck==1">
        <ul>
          <li
            v-for="item in detail.join"
            :key="item.id"
            :class="item.check?'on':''"
            @click="joinTab(item)"
          >
            <div class="join-detail-t">
              <h2 class="line">{{item.title}}</h2>
              <i class="iconfont icon-you1"></i>
              <p>
                <span>{{item.city}}</span>
                <span>{{item.education}}</span>
              </p>
            </div>
            <div class="join-detail" v-if="item.check">
              <h2>这是内容</h2>
            </div>
          </li>
        </ul>
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
      tagCheck: 0,
      tagData: [{ label: "公司介绍", id: "0" }, { label: "招聘岗位", id: "1" }],
      detail: {
        title: "朗诚教育服务有限公司",
        type: "事业单位",
        service: "专业服务（资讯、人力资源）",
        content:
          "<p style='font-size:16px;'>宿迁市中胚食品有限公司于2012年11月06日在宿迁市宿城区市场监督管理局登记成立。法定代表人卜玉梅，公司经营范围包括其他粮食加工品(谷物碾磨加工品)分装，预包装食品批发与零售等。</p>",
        join: [
          { title: "市场营销", city: "深圳", education: "大专", id: 1 },
          { title: "研发测试", city: "深圳", education: "大专", id: 2 },
          { title: "技术支持", city: "深圳", education: "大专", id: 3 },
          { title: "行政助理", city: "深圳", education: "大专", id: 4 }
        ]
      }
    };
  },
  methods: {
    joinTab(item) {
      this.detail.join = this.detail.join.map(value => {
        if (item.id == value.id) {
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
  onLoad() {
    let vm = this;
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
          .join-detail-t{
            height: 104rpx;
            overflow: hidden;
            line-height: 103rpx;
            margin: 0 30rpx;
            h2{
              font-size: 32rpx;
              font-weight: 600;
              display: inline-block;
              width: 50%;
            }
            p{
              float: right;
              span{
                font-size: 28rpx;
                margin-left: 15rpx;
                color: #999;
              }
            }
            &>i{
              display: block;
              float: right;
              font-size: 26rpx;
              color: #ccc;
              margin-left: 45rpx;
            }
          }
          .join-detail{
            padding:20rpx 30rpx;
            border-top: 1px solid #e5e5e5;
          }
        }
      }
    }
  }
}
</style>
