<template>
  <div class="recruitment-list">
    <ul>
      <li v-for="item in recruitmentListData" :key="item.Id">
        <a :href="'../../recruitment/detail/main?id='+item.Id">
          <p>
            <img :src="item.Logo || '/static/images/recruitment-default.jpg'" @error="errImage(item.Id)" mode="aspectFill" />
          </p>
          <div>
            <h2 class="line">{{item.Name}}</h2>
            <p class="line">
              <span>{{item.NatureName}}</span>
              <span>{{item.Business}}</span>
            </p>
            <div>
              <span v-for="(items,i) in item.RecruitLabels" :key="i">{{items}}</span>
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
      recruitmentListData: []
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
      this.recruitmentListData = this.recruitmentListData.map(value=>{
        if(id == value.Id){
          value.Logo = '/static/images/recruitment-default.jpg';
        }
        return value;
      })
    },
    getData() {
      let vm = this;
      vm.isGet = false;
      vm.isLoading = true;
      vm.$api.$signGet('公司列表',{
        page:vm.pageNum
      }).then(res=>{
        if(res.Data.length>0){
          vm.isGet = true;
          vm.isLoading = false;
          vm.recruitmentListData = res.Data;
        }else{
          vm.isGet = false;
          vm.isLoading = false;
          vm.isNotData = true;
        }
      })
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
.recruitment-list {
  background-color: #f7f7f7;
  min-height: 100vh;
  ul {
    min-height: 100vh;
    li {
      margin-top: 20rpx;
      background-color: white;
      &:first-child {
        margin-top: 0;
      }
      a {
        display: block;
        padding: 40rpx;
        & > p {
          width: 130rpx;
          height: 130rpx;
          float: left;
          background: rgba(255, 255, 255, 1);
          border-radius: 30rpx;
          border: 1rpx solid rgba(229, 229, 229, 1);
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        & > div {
          margin-left: 170rpx;
          h2 {
            font-size: 32rpx;
            line-height: 35rpx;
            font-weight: 600;
          }
          p {
            margin-top: 15rpx;
            span {
              font-size: 24rpx;
              color: #666;
              margin-right: 30rpx;
              &:last-child {
                margin-right: 0;
              }
            }
          }
          div {
            margin-top: 20rpx;
            span {
              font-size: 26rpx;
              color: rgba(255, 137, 21, 1);
              line-height: 48rpx;
              padding: 0 15rpx;
              display: inline-block;
              background-color: #FEF5E4;
              margin-right: 12rpx;
            }
          }
        }
      }
    }
  }
}
</style>
