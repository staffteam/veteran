<script>
export default {
  created() {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
  },
  log() {
    console.log(`log at:${Date.now()}`);
  }
};
</script>
<style src="@/components/font/iconfont.css"></style>
<style lang="less">
.notdata{
  padding: 100rpx 0;
  text-align: center;
  font-size:28rpx;
  color: #999;
}
view,
text {
  box-sizing: border-box;
  -webkit-tab-highlight-color: rgba(0, 0, 0, 0);
}
image {
  width: 100%;
}
.calendar .wxParse {
  .li {
    list-style: none;
  }
}
.main-content{
  .wxParse {
    .p{
      margin: 5rpx 0;
    }
  }
}
.detail-content{
  .wxParse {
    .p{
      margin: 5rpx 0;
    }
    .h2{
      margin: 5rpx 0;
    }
  }
}
.quality-list {
  .wxParse {
    .p {
      margin: 0 0;
      margin-top: 10rpx;
      font-size: 28rpx;
      color: rgba(51, 51, 51, 1);
      line-height: 40rpx;
      letter-spacing: 1rpx;
      .strong {
        margin: 0 0;
        font-size: 36rpx;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 50rpx;
        letter-spacing: 2rpx;
      }
    }
  }
}

.notsel {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 30px;
}
.not-data {
  padding: 100rpx 0;
  text-align: center;
  font-size: 26rpx;
  color: #999999;
}
.button-hover,
.navigator-hover {
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
}
.loading {
  text-align: center;
  padding: 20rpx 0;
  color: #999;
  font-size: 25rpx;
  line-height: 30rpx;
  height: 70rpx;
  view {
    display: inline-block;
    image {
      width: 30rpx;
      float: left;
      margin-right: 10rpx;
    }
  }
}
button.userLogin {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999;
  display: block;
  opacity: 0;
}
.img-back {
  img {
    width: 100%;
  }
}
.test-result .wxParse .p,
.content .wxParse .p {
  margin: 5rpx 0;
}

.wxParses {
  .wxParse {
    .title_view {
      width: 100%;
      height: 80rpx;
      overflow: hidden;
      padding: 0;
    }

    .mark_view_to {
      width: 8rpx;
      height: 24px;
      margin-top: 8px;
      margin-bottom: 8px;
      margin-left: 30rpx;
      background: red;
      color: rgb(178, 178, 178);
      float: left;
    }

    .mark_view {
      width: 8rpx;
      height: 24px;
      margin-top: 8px;
      margin-bottom: 8px;
      margin-left: 30rpx;
      background: -webkit-gradient(
        linear,
        10% 10%,
        10% 100%,
        from(rgba(36, 165, 73, 1)),
        to(rgba(53, 189, 77, 1))
      );
      float: left;
    }

    .title_text_to {
      line-height: 40px;
      margin-left: 40rpx;
      font-size: 20px;
      color: red;
      float: left;
    }

    .title_text {
      line-height: 40px;
      margin: 0;
      margin-left: 40rpx;
      font-size: 20px;
      color: rgb(44, 44, 44);
      float: left;
    }
    .mark_main {
      padding: 0 30rpx;
      .p {
        margin: 5rpx 0;
      }
    }
  }
}

.user-login {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  opacity: 0;
}
</style>
