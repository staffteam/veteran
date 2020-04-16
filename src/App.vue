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
.notdata {
  padding: 100rpx 0;
  text-align: center;
  font-size: 28rpx;
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
.calendar ._rich-text {
  .li {
    list-style: none;
  }
}
.main-content {
  ._rich-text {
    .p {
      margin: 5rpx 0;
    }
  }
}
.detail-content {
  ._rich-text {
    .p {
      margin: 5rpx 0;
    }
    .h2 {
      margin: 5rpx 0;
    }
  }
}
.quality-list {
  ._rich-text {
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
.test-result ._rich-text .p,
.content ._rich-text .p {
  margin: 5rpx 0;
}

._rich-texts {
  ._rich-text {
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

._rich-text-mains {
  ._rich-text {
    .h1 {
      margin: 0 0;
    }
    .h2 {
      margin: 0 0;
    }
    .h3 {
      margin: 0 0;
    }
    .h4 {
      margin: 0 0;
    }
    .h5 {
      margin: 0 0;
    }
    .h6 {
      margin: 0 0;
    }
    .p {
      margin: 5px 0;
    }
    .pre {
      margin: 0 0px;
    }
    .ul,
    .ol {
      margin: 0 0;
      padding-left: 0;
    }
  }
}
._rich-text {
  width: 100%;
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

._rich-text view {
  word-break: hyphenate;
}

._rich-text .inline {
  display: inline;
  margin: 0;
  padding: 0;
}

._rich-text .div {
  margin: 0;
  padding: 0;
}

._rich-text .h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
._rich-text .h2 {
  font-size: 1.5em;
  margin: 0.83em 0;
}
._rich-text .h3 {
  font-size: 1.17em;
  margin: 1em 0;
}
._rich-text .h4 {
  margin: 1.33em 0;
}
._rich-text .h5 {
  font-size: 0.83em;
  margin: 1.67em 0;
}
._rich-text .h6 {
  font-size: 0.67em;
  margin: 2.33em 0;
}

._rich-text .h1,
._rich-text .h2,
._rich-text .h3,
._rich-text .h4,
._rich-text .h5,
._rich-text .h6,
._rich-text .b,
._rich-text .strong {
  font-weight: bolder;
}

._rich-text .p {
  margin: 1em 0;
}

._rich-text .i,
._rich-text .cite,
._rich-text .em,
._rich-text .var,
._rich-text .address {
  font-style: italic;
}

._rich-text .pre,
._rich-text .tt,
._rich-text .code,
._rich-text .kbd,
._rich-text .samp {
  font-family: monospace;
}
._rich-text .pre {
  overflow: auto;
  background: #f5f5f5;
  padding: 8px;
  white-space: pre;
  margin: 1em 0px;
}
._rich-text .code {
  display: inline;
  background: #f5f5f5;
}

._rich-text .big {
  font-size: 1.17em;
}

._rich-text .small,
._rich-text .sub,
._rich-text .sup {
  font-size: 0.83em;
}

._rich-text .sub {
  vertical-align: sub;
}
._rich-text .sup {
  vertical-align: super;
}

._rich-text .s,
._rich-text .strike,
._rich-text .del {
  text-decoration: line-through;
}

._rich-text .strong,
._rich-text .s {
  display: inline;
}

._rich-text .a {
  color: deepskyblue;
}

._rich-text .video {
  text-align: center;
  margin: 10px 0;
}

._rich-text .video-video {
  width: 100%;
}

._rich-text .img {
  display: inline-block;
  width: 0;
  height: 0;
  max-width: 100%;
  overflow: hidden;
}

._rich-text .blockquote {
  margin: 5px 0;
  padding: 10px 0 10px 10px;
  font-family: Courier, Calibri, "宋体";
  background: #f5f5f5;
  border-left: 3px solid #dbdbdb;
}
._rich-text .blockquote .p {
  margin: 0;
}

._rich-text .ul, ._rich-text .ol {
  display: block;
  margin: 1em 0;
  padding-left: 16px;
}
._rich-text .ol {
  list-style-type: disc;
}
._rich-text .ol {
  list-style-type: decimal;
}
._rich-text .li {
  display: list-item;
  align-items: baseline;
  text-align: match-parent;
}
._rich-text .ul .ul, ._rich-text .ol .ul {
  list-style-type: circle;
}
._rich-text .ol .ol .ul, ._rich-text .ol .ul .ul, ._rich-text .ul .ol .ul, ._rich-text .ul .ul .ul {
    list-style-type: square;
}

._rich-text .u {
  text-decoration: underline;
}
._rich-text .hide {
  display: none;
}
._rich-text .del {
  display: inline;
}
._rich-text .figure {
  overflow: hidden;
}

._rich-text .table {
  width: 100%;
}
._rich-text .thead, ._rich-text .tfoot, ._rich-text .tr {
  display: flex;
  flex-direction: row;
}
._rich-text .tr {
  width:100%;
  display: flex;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
._rich-text .th,
._rich-text .td {
  display: flex;
  width: 580px;
  overflow: auto;
  flex: 1;
  padding: 5px;
  border-left: 1px solid #e0e0e0;
}
._rich-text .td:last {
  border-top: 1px solid #e0e0e0;
}
._rich-text .th {
  background: #f0f0f0;
  border-top: 1px solid #e0e0e0;
}

.exam-go .exam-go-main .exam-go-analysis .exam-analysis-content view,.exam-go .exam-go-main .exam-go-analysis .exam-analysis-content text{
  font-size:30rpx !important;
}
</style>
