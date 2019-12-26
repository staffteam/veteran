<template>
  <div class="diploma">
    <p>
      <img src="/static/images/ccie-back.jpg" mode="widthFix" />
    </p>
    <div class="diploma-main">
      <canvas class="diploma-canvas" canvas-id="qrCanvas"></canvas>
    </div>
    <div class="diploma-btn">
      <p @click="downImg()">
        <i class="iconfont icon-xiazai"></i> 保存到手机相册
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasW: "",
      canvasH: "",
      tempFilePath: ""
    };
  },
  methods: {
    downImg() {
      let vm = this;
      mpvue.showLoading({
        title: "请稍后"
      });
      mpvue.saveImageToPhotosAlbum({
        filePath: vm.tempFilePath,
        success() {
          mpvue.hideLoading();
          mpvue.showToast({
            title: "保存成功",
            icon: "success"
          });
        }
      });
    },
    drawPicture: function() {
      //生成图片
      var that = this;
      setTimeout(function() {
        wx.canvasToTempFilePath({
          //把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
          x: 0,
          y: 0,
          width: that.canvasW,
          height: that.canvasH,
          destWidth: that.canvasW * 2, //输出的图片的宽度（写成width的两倍，生成的图片则更清晰）
          destHeight: that.canvasH * 2,
          canvasId: "qrCanvas",
          success: function(res) {
            that.tempFilePath = res.tempFilePath;
            console.log("++++++++++++++", res);
          }
        });
      }, 300);
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
    var that = this;
    let query = mpvue.createSelectorQuery();
    query
      .select(".diploma-canvas")
      .boundingClientRect(function(rect) {
        let _w = rect.width;
        let _h = rect.height;
        that.canvasW = _w;
        that.canvasH = _h;
        const ctx = mpvue.createCanvasContext("qrCanvas");
        ctx.drawImage("/static/images/certificate.jpg", 0, 0, _w, _h);
        ctx.save();
        ctx.translate(_w * 0.6, _w * 0.23); //设置画布上的(0,0)位置，也就是旋转的中心点
        ctx.rotate(90 * Math.PI / 180);
        ctx.setFillStyle("#000");
        ctx.setFontSize(_w * 0.03);
        ctx.fillText("马化腾", 0, 0);
        ctx.restore();
        ctx.stroke(); //stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色
        ctx.draw(false, that.drawPicture()); //draw()的回调函数
      })
      .exec();
  },
  onLoad() {
    let vm = this;
  }
};
</script>

<style lang="less" scoped>
.diploma {
  background-color: #faedec;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .diploma-main {
    position: absolute;
    top: 53rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 641rpx;
    height: 911rpx;
    z-index: 9;
    .diploma-canvas {
      width: 100%;
      height: 100%;
    }
  }
  .diploma-btn {
    position: absolute;
    bottom: 48rpx;
    left: 0;
    width: 100%;
    p {
      width: 576rpx;
      height: 88rpx;
      background: rgba(229, 51, 48, 1);
      border-radius: 8rpx;
      font-size: 32rpx;
      text-align: center;
      line-height: 88rpx;
      margin: 0 auto;
      color: white;
      i{
        color: white;
        display: inline-block;
        margin-right: 10rpx;
      }
    }
  }
}
</style>
