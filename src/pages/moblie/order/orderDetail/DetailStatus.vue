<template>
  <div class="detail-status">
    <div class="status-box" v-if="$store.state.orderData.status==0">
      <div class="status-left">
        <p class="status-title">待支付</p>
        <p class="status-sub">订单超过60分钟自动取消，请在{{min}}分{{sec}}秒内完成支付</p>
      </div>
      <img src="https://img.laoliangli.com/label/common/payout.png" alt="">
    </div>
    <div class="status-box" v-if="$store.state.orderData.status==1">
      <div class="status-left">
        <p class="status-title">待发货</p>
        <p class="status-sub">商家正在打包，请耐心等待</p>
      </div>
      <img src="https://img.laoliangli.com/label/common/shipped.png" alt="">
    </div>
    <div class="status-box" v-if="$store.state.orderData.status==2">
      <div class="status-left">
        <p class="status-title">待收货</p>
        <p class="status-sub">商家已发货，请耐心等待</p>
      </div>
      <img src="https://img.laoliangli.com/label/common/received.png" alt="">
    </div>
    <div class="status-box" v-if="$store.state.orderData.status==3">
      <div class="status-left">
        <p class="status-title">已完成</p>
        <p class="status-sub">交易已完成</p>
      </div>
      <img src="https://img.laoliangli.com/label/common/finished.png" alt="">
    </div>
    <div class="status-box" v-if="$store.state.orderData.status==4">
      <div class="status-left">
        <p class="status-title">待处理</p>
        <p class="status-sub">老良利，为您服务</p>
      </div>
      <img src="https://img.laoliangli.com/label/common/received.png" alt="">
    </div>
    <div class="status-box" v-if="$store.state.orderData.status==5">
      <div class="status-left">
        <p class="status-title">已处理</p>
        <p class="status-sub">老良利，为您服务</p>
      </div>
      <img src="https://img.laoliangli.com/label/common/received.png" alt="">
    </div>
    <div class="status-box" v-if="$store.state.orderData.status==10">
      <div class="status-left">
        <p class="status-title">已取消</p>
        <p class="status-sub">老良利，为您服务</p>
      </div>
      <img src="https://img.laoliangli.com/label/common/received.png" alt="">
    </div>
    <div class="status-box" v-if="$store.state.orderData.status==11">
      <div class="status-left">
        <p class="status-title">已取消</p>
        <p class="status-sub">老良利，为您服务</p>
      </div>
      <img src="https://img.laoliangli.com/label/common/received.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailStatus',
  data () {
    return {
      min: '',
      sec: '',
      // orderData: {}
    }
  },
  mounted () {
    this.orderData = this.$store.state.orderData
    this.countDown()
  },
  methods: {
    /**
     * 倒计时
     */
    countDown: function () {
      // 获取当前时间，同时得到活动结束时间数组
      var newTime = new Date().getTime()
      var orderData = this.$store.state.orderData
      // console.log(orderData);
      // 结束时间
      var endTime = Date.parse(new Date(orderData.createTime)) + 1 * 60 * 60 * 1000
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          var time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
          var min = parseInt(time % (60 * 60 * 24) % 3600 / 60)
          var sec = parseInt(time % (60 * 60 * 24) % 3600 % 60)
        
          var minTime = this.getzf(min),
            secTime = this.getzf(sec)
          // 渲染，然后每隔一秒执行一次倒计时函数
          this.min = minTime
          this.sec = secTime
        } else {
          // 渲染，然后每隔一秒执行一次倒计时函数
          this.min = '00'
          this.sec = '00'
        }
      setTimeout(this.countDown, 1000)
    },

    //补0操作  
    getzf: function (num) {
      if (parseInt(num) < 10) {
        num = '0' + num
      }
      return num
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-status {
  .status-box {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 30.67%;
    background: url('https://img.laoliangli.com/label/common/banner_order.png') no-repeat;
    background-size: 100% 100%;
    clear: both;
    .status-left {
      float: left;
      padding: .4rem 0 0 .28rem;
      .status-title {
        height: .5rem;
        font-size: .36rem;
        line-height: .5rem;
        color:#Fff;
        padding-bottom: .14rem;
      }
      .status-sub {
        width: 4rem;
        height: .32rem;
        font-size: .16rem;
        line-height: .32rem;
        color:#fff;
      }
    }
    img {
      float: right;
      width: 1.62rem;
      height: 1.62rem;
      padding: .16rem .34rem .16rem 0;
    }
  }
}
</style>

