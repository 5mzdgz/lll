<template>
  <div class="pay-result">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="result-box">
			<div class="result-fail">
				<img src="https://img.laoliangli.com/label/common/pay_fail.png" alt="">
			</div>
			<p class="title">支付失败</p>
			<p class="sub">返回查看订单详情</p>
			<div class="bottom-box">
				<router-link :to="'/mobile/my/maintain/detail?orderId='+orderId">
					<button class="left">订单详情</button>
				</router-link>
				<button class="right" @click="repaymentTap" :disabled="disabled">重新支付</button>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'MatFail',
	 components: {
    HeaderNav
	},
	data () {
    return {
			navTitle: '支付结果',
			orderId: null,
			disabled: false
    }
	},
	mounted () {
		this.orderId = this.$route.query.orderId
	},
	methods: {
		/**
		 * 重新支付
		 */
		repaymentTap () {
			this.disabled = true
			const ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//wechatUrl = prodUrl + "/payment/wechatOauth.html?orderId=" + orderId;
				// console.log("微信浏览器")
				this.wechatPayOrder(this.orderId)
			} else {
				//不是微信浏览器
				// console.log("不是微信浏览器")
				this.otherPayOrder(this.orderId, localStorage.getItem("loginToken"))
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
.pay-result {
	height: 100vh;
	background: #fff;
	.result-box {
		text-align: center;
		.result-fail {
			overflow: hidden;
			width: 55%;
			height: 0;
			padding-bottom: 37%;
			margin-left: 22.5%;
			margin-top: 14.4%;
			img {
				width: 100%;
			}
		}
		.title {
			font-size: .3rem;
		}
		.sub {
			height: .6rem;
			line-height: .6rem;
			font-size: .24rem;
			color: #6b6b6b;
		}
		.bottom-box {
			margin-top: .8rem;
			button {
				border: 1px solid #6b6b6b;
				width: 2.2rem;
				height: .6rem;
				border-radius: .4rem;
				font-size: .3rem;
				margin: 0 .2rem;
			}
			.left {
				color: #6b6b6b;
				background: #fff;
			}
			.right {
				border: none;
				background: #FF4848;
				color: #fff;
			}
		}
	}
}
</style>
