<template>
  <div class="workProgram-detail">
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
    <p class="detail-back"><img src="/static/images/detail-back.jpg" mode="widthFix"></p>
    <template v-for="item in tagData">
      <div class="detail-content wxparse-mains" :key="item.id" v-if="item.id == tagCheck">
        <wxParse :content="item.content" />
      </div>
    </template>
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
      tagCheck: "1",
      tagData: [
        { id: "1", title: "学习攻略", content: "<h2>学习攻略</h2><p style='font-size:16px;'>宿迁市中胚食品有限公司于2012年11月06日在宿迁市宿城区市场监督管理局登记成立。法定代表人卜玉梅，公司经营范围包括其他粮食加工品(谷物碾磨加工品)分装，预包装食品批发与零售等。</p>" },
        { id: "2", title: "课程计划" , content: "<h2>课程计划</h2><p style='font-size:16px;'>宿迁市中胚食品有限公司于2012年11月06日在宿迁市宿城区市场监督管理局登记成立。法定代表人卜玉梅，公司经营范围包括其他粮食加工品(谷物碾磨加工品)分装，预包装食品批发与零售等。</p>"}
      ]
    };
  },
  methods: {
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
@import url("~mpvue-wxparse/src/wxParse.css");
.workProgram-detail {
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
        width: 49.9vw;
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
  .detail-content{
    padding:40rpx 58rpx;
    position: relative;
    z-index: 9;
  }
  .detail-back{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    img{
      width: 100%;
    }
  }
}
</style>
