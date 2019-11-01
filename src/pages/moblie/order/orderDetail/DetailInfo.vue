<template>
  <div class="detail-info">
    <div class="item-box">
      <div class="info-item">
        <div class="item-icon"></div>
        <span class="info-title">订单信息</span>
      </div>
      <div class="info-item">
        <span class="info-label">订单编号:</span>
        <span class="info-content">{{orderData.orderNumber}}</span>
      </div>
      <div class="info-item" v-if="orderData.shippingCode!=null">
        <span class="info-label">快递单号:</span>
        <span class="info-content" ref="copy">{{orderData.shippingCode}}</span>
        <a class="content-sub" :href="orderData.shippingUrl">查看物流</a>
        <span class="content-sub" @click="copy()">复制</span>
      </div>
      <div class="info-item" v-if="orderData.shippingCode!=null">
        <a class="info-label" href="">物流方式:</a>
        <span class="info-content">{{orderData.shippingName}}</span>
      </div>
      <div class="info-item" v-if="orderData.paymentMethod==1">
        <span class="info-label">支付方式:</span>
        <span class="info-content">微信支付</span>
      </div>
      <div class="info-item" v-if="orderData.paymentMethod==2">
        <span class="info-label">支付方式:</span>
        <span class="info-content">支付宝</span>
      </div>
      <div class="info-item">
        <span class="info-label">创建时间:</span>
        <span class="info-content">{{orderData.createTime}}</span>
      </div>
      <div class="info-item" v-if="orderData.paymentTime != null">
        <span class="info-label">支付时间:</span>
        <span class="info-content">{{orderData.paymentTime}}</span>
      </div>
      <div class="info-item" v-if="orderData.shippingTime != null">
        <span class="info-label">发货时间:</span>
        <span class="info-content">{{orderData.shippingTime}}</span>
      </div>
      <div class="info-item" v-if="orderData.finishTime != null">
        <span class="info-label">收货时间:</span>
        <span class="info-content">{{orderData.finishTime}}</span>
      </div>
      <div class="info-item" v-if="orderData.userMsg">
        <span class="info-label">我的备注:</span>
        <div class="content-msg">{{orderData.userMsg}}</div>
      </div>
    </div>
    <div class="info-button" v-if="orderData.status==0">
      <button @click="cancelOrder(orderData.id)">取消订单</button>
      <button @click="repaymentTap(orderData)" :disabled="disabled">继续支付</button>
    </div>
    <div class="info-button" v-if="orderData.status==1">
      <button @click="handleServer">联系客服</button>
      <button @click="handleServer">申请退款</button>
    </div>
    <div class="info-button" v-if="orderData.status==2">
      <button @click="handleServer">联系客服</button>
      <button @click="confrimTap(orderData.id)">确认收货</button>
    </div>
    <div class="info-button" v-if="orderData.status==3">
      <button @click="handleServer">联系客服</button>
      <button @click="handleServer">申请售后</button>
    </div>
    <div class="info-button" v-if="orderData.status==4">
      <button class="server" @click="handleServer">联系客服</button>
    </div>
    <div class="info-button" v-if="orderData.status==5">
      <button class="server" @click="handleServer">联系客服</button>
    </div>
    <server ref="server"></server>
    <mt-popup
		v-model="payVisible"
		popup-transition="popup-fade">
			<WalletPay :walletPayData="walletPayData"></WalletPay>
		</mt-popup>
  </div>
</template>

<script>
import Server from '@/pages/moblie/common/Server'
import WalletPay from '@/pages/moblie/pay/WalletPay'
export default {
  name: 'DetailInfo',
  components: {
    Server,
    WalletPay
  },
  props: {
    orderData: Object
  },
  data () {
    return {
      payVisible: false,
      walletPayData: {},
      disabled: false
    }
  },
  watch: {
		'payVisible': function (newVal) {
		// console.log(newVal)
			if(!newVal) {
				this.disabled = newVal
			}
		}
	},
  methods: {
    handleServer () {
      this.$refs.server.handleShow()
    },
    /**
		 * 重新支付
		 */
		repaymentTap (orderItem) {
			this.disabled = true
			if (orderItem.paymentMethod === 1) {
				const ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//wechatUrl = prodUrl + "/payment/wechatOauth.html?orderId=" + orderId;
				//   console.log("微信浏览器")
				this.wechatPayOrder(orderItem.id)
				} else {
				//不是微信浏览器
				//  console.log("不是微信浏览器")
				this.otherPayOrder(orderItem.id, localStorage.getItem("loginToken"))
				}
			} else if (orderItem.paymentMethod === 2) {

			} else {
				const walletPayData = {
					orderId: orderItem.id,
					total: orderItem.total
				}
				// console.log(walletPayData)
				this.walletPayData = walletPayData
				this.payVisible = true
			}
		},
		/**
     * 微信浏览器去支付
      */
    wechatPayOrder(orderId){
      const url = this.domain.Base_M3_URL + '/pay/wechat/oauth2?orderId=' + orderId
        this.axios.get(url).then((res) => {
          const url = res.data.data
          // console.log(url)
          window.location.href = url
        })
    },
    /**
     * 其他浏览器去支付
     */
    otherPayOrder(orderId,loginToken){
      const url = this.domain.Base_M3_URL + '/pay/wechatpay?orderId=' + orderId + '&loginToken=' + loginToken
      // console.log(url)
      window.location.href = url
    },
    /**
     * 确认收货
     */
    confrimTap (orderId) {
      this.$messagebox({
				title: '温馨提示',
				message: '确定已收到货物？',
				showCancelButton: true,
 				confirmButtonText:"确认",
				cancelButtonText:"取消"
			}).then(action => {
				if(action == 'confirm'){
					//  console.log('确认')
					this.axios.post(this.domain.Base_M3_URL + '/l/v1/user/order/confirm?orderId=' + orderId).then((res) => {
						if(res.data.code === '200') {
							this.$router.replace('/mobile/my/maintain/detail?orderId=' + orderId)
						}
					})
				}else{
					// console.log('取消')
				}
			})
    },
    /**
     * 取消订单
     */
    cancelOrder (orderId) {
      console.log(orderId)
      this.$messagebox({
				title: '温馨提示',
				message: '确定取消该订单？',
				showCancelButton: true,
 				confirmButtonText:"确认",
				cancelButtonText:"取消"
			}).then(action => {
				if(action == 'confirm'){
					//  console.log('确认')
					this.axios.post(this.domain.Base_M3_URL + '/l/v1/user/order/cancel?orderId=' + orderId).then((res) => {
						if(res.data.code === '200') {
							this.$router.replace('/mobile/order?status=0')
						}
					})
				}else{
					// console.log('取消')
				}
			})
    },
    /**
     * 复制单号
     */
    copy () {
      // console.log(shippingCode)
      let copy = this.$refs.copy
      // console.log(copy)
      let range = document.createRange()
      range.selectNode(copy)
      window.getSelection().addRange(range)
      let successful = document.execCommand('copy')
      // console.log('copy', successful)
      try {
        var msg = successful ? 'successful': 'unsuccessful'
        // console.log('Copy was' + msg)
      } catch (err) {
        // console.log('uncopy')
      }
      window.getSelection().removeAllRanges()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-info {
  overflow: hidden;
  width: 95.2%;
  background: #fff;
  margin: .2rem .16rem;
  box-shadow:0px 2px 6px rgba(0,0,0,0.04);
  border-radius: .08rem;
  .item-box {
    padding: .2rem 0 .28rem .2rem;
    .info-item {
      overflow: hidden;
      clear: both;
      padding-top: .2rem;
      line-height: .3rem;
      .item-icon {
        float: left;
        width: 2px;
        height: .24rem;
        background: #444;
        margin-top: 2px;
        margin-right: .08rem;
      }
      .info-title {
        font-size: .24rem;
        color: #000;
      }
      .info-label {
        font-size: .2rem;
        color:#6B6B6B;
        padding-left: .12rem;
        float: left;
      }
      .info-content {
        float: left;
        padding-left: .4rem;
        font-size: .18rem;
        color:#6B6B6B;
      }
      .content-sub {
        font-size: .18rem;
        color:#EC4E4E;
        padding-left: .4rem;
      }
      .content-msg {
        width: 4rem;
        font-size: .18rem;
        color:#6B6B6B;
        margin-left: 1.4rem;
        line-height: .3rem;
      }
    }
    .info-item:nth-child(1) {
      padding-top: 0;
    }
  }
  .info-button {
    height: 1rem;
    border-top: 1px solid #eee;
    font-size: .28rem;
    button {
      width: 50%;
      float: left;
      height: 1rem;
      line-height: 1rem;
      background: #fff;
    }
    button:nth-child(1) {
      border-right: 1px solid #eee;
    }
    .server {
      width: 101%;
      border: none;
    }
  }
  .mint-popup {
    	border-radius: .2rem;
	}
}
</style>
