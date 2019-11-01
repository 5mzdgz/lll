<template>
    <div class="detail-tabbar">
        <router-link :to="{name: 'Maintain'}">
            <button class="reapply" v-if="orderData.checkStatus === 2">重新申请</button>
        </router-link>
        <button class="reapply" v-if="orderData.checkStatus === 0 && !orderData.uploadImgs" @click="uploadImgsClick(orderData)">上传照片</button>
        <dl v-if="orderData.checkStatus === 1 && !orderData.paymentTime">
            <dd class="tabbar-left">
                <span class="title">总计费用：</span>
                <span class="price">￥{{orderData.total | floatTotal}}</span>
            </dd>
            <dd><button @click="goPayClick(orderData)" :disabled="disabled">去付款</button></dd>
        </dl>
    </div>
</template>

<script>
export default {
    name: 'DetailTabbar',
    props: {
        orderData: Object
    },
    data () {
        return {
            disabled: false
        }
    },
    methods: {
        uploadImgsClick (orderData) {
            this.$router.push({name: 'Photograph', params: {orderId: orderData.id, orderNumber: orderData.orderNumber}})
        },
        /**
         * 去支付
         */
        goPayClick (orderData) {
            this.disabled = true
            const goPayNumber = {
                orderId: orderData.id,
                orderNumber: orderData.orderNumber
            }
            this.$store.dispatch('addGoPayNumber', goPayNumber)
            const ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//wechatUrl = prodUrl + "/payment/wechatOauth.html?orderId=" + orderId;
				// console.log("微信浏览器")
				this.wechatPayOrder(orderData.id)
			} else {
				//不是微信浏览器
				// console.log("不是微信浏览器")
				this.otherPayOrder(orderData.id, localStorage.getItem("loginToken"))
			}
        },
        /**
		 * 微信浏览器去支付
		 */
		wechatPayOrder(orderId){
		const url = this.domain.Base_M3_URL + '/pay/wechat/mat/oauth2?orderId=' + orderId
			this.axios.get(url).then((res) => {
			const url = res.data.data
			//   console.log(url)
			window.location.href = url
			})
		},
		/**
		 * 其他浏览器去支付
		 */
		otherPayOrder(orderId,loginToken){
			const url = this.domain.Base_M3_URL + '/pay/wechatpay/mat?orderId=' + orderId + '&loginToken=' + loginToken
			//   console.log(url)
			window.location.href = url
    	}
    }
}
</script>

<style lang="scss" scoped>
.reapply {
    position: fixed;
    bottom: .2rem;
    left: 11%;
    width: 5rem;
    height: .7rem;
    background: #f9f9f9;
    border: 1px solid #8D8D8D;
    border-radius: .12rem;
    color: #8D8D8D;
    z-index: 10;
}
dl {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px -1px 12px rgba(0,0,0,0.04);
    z-index: 10;
    .tabbar-left {
        width: 68%;
        padding-left: .4rem;
        font-size: .28rem;
        color: #6B6B6B;
        .price {
            font-size: .34rem;
            color: #EC4E4E;
        }
    }
    dd {
        width: 32%;
        button[disabled] {
            background: #8D8D8D;
        }
        button {
            width: 100%;
            height: 1rem;
            color: #fff;
            font-size: .3rem;
            background: #EC4E4E;
        }
    }
}
</style>