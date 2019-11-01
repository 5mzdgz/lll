<template>
  <div class="pay-result">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="result-box">
			<div class="result-fail">
				<img src="https://img.laoliangli.com/label/common/pay_fail.png" alt="">
			</div>
			<p class="title">支付失败</p>
			<div class="bottom-box">
				
				<button class="left" @click="repaymentTap" :disabled="disabled">重新支付</button>

			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'WalletFail',
	 components: {
    HeaderNav
	},
	data () {
    return {
			navTitle: '支付结果',
			disabled: false
    }
	},
	mounted () {
		// console.log(this.recordId)
	},
	methods: {
		/**
		 * 重新支付
		 */
		repaymentTap () {
			this.disabled = true
			let consumAmount = this.$store.state.consumAmount
			const ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//wechatUrl = prodUrl + "/payment/wechatOauth.html?recordId=" + recordId;
				// console.log("微信浏览器")
				this.wechatPayOrder(consumAmount)
			} else {
				//不是微信浏览器
				// console.log("不是微信浏览器")
				this.otherPayOrder(consumAmount, localStorage.getItem("loginToken"))
			}
		},
		/**
		 * 微信浏览器去支付
		 */
		wechatPayOrder (consumAmount, loginToken){
			const url = this.domain.Base_M3_URL + '/pay/wechat/wallet/oauth2?loginToken=' + loginToken +'&consumAmount='+ consumAmount + '&source=mobile'
			this.axios.get(url).then((res) => {
				const url = res.data.data
				// console.log(url)
				window.location.href = url
			})
		},
		/**
		 * 其他浏览器去支付
		 */
		otherPayOrder(consumAmount, loginToken){
			const url = this.domain.Base_M3_URL + '/pay/wechatpay/wallet?consumAmount=' + consumAmount + '&loginToken=' + loginToken + '&source=mobile'
			// console.log(url)
			window.location.href = url
		}
	}
}
</script>

<style lang="scss" scoped>
.pay-result {
	padding-top: .8rem;
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
				height: .6rem;
				border-radius: .4rem;
				font-size: .3rem;
				margin: 0 .2rem;
			}
			.left {
				width: 4rem;
				color: #fff;
				background: #EC4E4E;
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
