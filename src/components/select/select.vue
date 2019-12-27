<template>
  <div :class="'select '+(isOpen?'on':'')">
    <div class="back" @click="cancel"></div>
    <div :class="'select-main '+(isShow?'on':'')">
      <div class="t">
        <p @click="cancel">取消</p>
        <p @click="affirms()">确认</p>
      </div>
      <div class="b">
        <picker-view
          class="b-list"
          indicator-style="height: 35px;"
          :value="defaultVal"
          @change="change"
        >
          <picker-view-column>
            <div
              v-for="(item,index) in options"
              :data-index="index"
              :key="item"
              style="line-height: 35px"
            >{{item}}</div>
          </picker-view-column>
        </picker-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHide: true,
      timeObj: {},
      isOpen: false,
      isShow: false
    };
  },
  watch: {
    value(newVal) {
      newVal ? this.opens() : this.close();
    }
  },
  props: {
    defaultVal: {
      default: [0]
    },
    options: {
      default() {
        return [];
      }
    },
    value: {
      default: false
    }
  },
  methods: {
    opens() {
      this.isOpen = true;
      setTimeout(_ => {
        this.isShow = true;
      }, 50);
    },
    close() {
      this.isShow = false;
      setTimeout(_ => {
        this.isOpen = false;
      }, 300);
    },
    cancel() {
      this.$emit("input", false);
    },
    affirms() {
      this.$emit("input", false);
    },
    change(e) {
      if (this.isOpen) {
        this.$emit("change", e.mp.detail.value);
      }
    }
  }
};
</script>
<style lang="less">
.select {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  width: 100%;
  height: 100vh;
  display: none;
  &.on {
    display: block;
  }
  .back {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .select-main {
    height: 500rpx;
    background-color: white;
    bottom: -500rpx;
    left: 0;
    width: 100%;
    position: absolute;
    z-index: 9;
    transition: 0.3s bottom;
    &.on {
      bottom: 0;
    }
    .t {
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: 1px solid #e5e5e5;
      padding: 0 25rpx;
      p {
        float: left;
        font-size: 30rpx;
        &:last-child {
          float: right;
          color: #e53330;
        }
      }
    }
    .b {
      height: 430rpx;
      .b-list {
        height: 100%;
        width: 100%;
        text-align: center;
        font-size: 28rpx;
      }
    }
  }
}
</style>