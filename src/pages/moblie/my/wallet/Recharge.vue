<template>
	<div class="recharge">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="recharge-box">
			<div class="cash-item">
				<div class="left-box">
					<span class="cash-mode">充值方式</span>
					<span class="iconfont">&#xe647;</span>
					<span>微信充值</span>
				</div>
			</div>
			<div class="input-box">
				<div class="content-box">
					<p class="title-box">充值金额</p>
					<p class="recharge-number">
						<span class="symbol">￥</span>
						<input v-focus type="number" step="0.01" maxlength="12" v-model="consumAmount">
					</p>
					<button class="re-btn" :disabled="disabled" @click="nextBtnClick">下一步</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
  name: 'Recharge',
  components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '充值',
			disabled: false,
			consumAmount: ''
		}
	},
	methods: {
		/**
		 * 下一步
		 */
		nextBtnClick () {
			if (!this.consumAmount) {
				this.$toast({
					message: '请输入正确的金额',
					position: 'top'
				})
				return false
			}
			// console.log(consumAmount)
			let spot = this.consumAmount.toString().split(".")[1]
			if (spot) {
				let len = spot.length
				if (len > 2) {
					this.$toast({
						message: '请输入正确的金额',
						position: 'top'
					})
					return false
				}
			}
			let consumAmount = parseFloat(this.consumAmount)
			// console.log(consumAmount)
			if (consumAmount === 0) {
				this.$toast({
					message: '请输入正确的金额',
					position: 'top'
				})
				return false
			}
			this.$store.dispatch('addConsumAmount', consumAmount)
			this.disabled = true
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//wechatUrl = prodUrl + "/payment/wechatOauth.html?consumAmount=" + consumAmount;
				// console.log("微信浏览器")
				this.wechatPayOrder(consumAmount, localStorage.getItem("loginToken"))
			} else {
				//不是微信浏览器
				//  console.log("不是微信浏览器")
				this.otherPayOrder(consumAmount, localStorage.getItem("loginToken"))
			}
		},
		/**
		 * 微信浏览器去支付
		 */
		wechatPayOrder (consumAmount, loginToken){
			let url = this.domain.Base_M3_URL + '/pay/wechat/wallet/oauth2?loginToken=' + loginToken +'&consumAmount='+ consumAmount + '&source=mobile'
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
			var url = this.domain.Base_M3_URL + '/pay/wechatpay/wallet?consumAmount=' + consumAmount + '&loginToken=' + loginToken + '&source=mobile'
			// console.log(url)
			window.location.href = url
		}
	}
}
</script>

<style lang="scss" scoped>
.recharge-box {
	.cash-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 .5rem;
		height: 1.2rem;
		margin-top: .3rem;
		font-size: .28rem;
		.left-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			.iconfont {
				font-size: .35rem;
				padding: 0 .16rem 0 .2rem;
				color: rgb(107, 187, 120);
			}
		}
	}
	.input-box {
		position: fixed;
		top: 2.3rem;
		bottom: 0;
		background: #fff;
		width: 100%;
		height: 84%;
		.content-box {
			padding: .5rem;
			.title-box {
				
			}
			.recharge-number {
				padding: .6rem 0 .1rem 0;
				border-bottom: 1px solid #D6D6D6;
				display: flex;
				flex-direction: row;
				align-items: center;
				.symbol {
					font-size: .78rem;
				}
				input {
					font-size: .4rem;
					width: 4rem;
					height: .7rem;
					font-weight: bold;
				}
			}
			button[disabled] {
				background: rgb(170, 170, 170);
			}
			.re-btn {
				width: 100%;
				height: .76rem;
				border-radius: .12rem;
				color: #fff;
				margin-top: .7rem;
				background: #EC4E4E;
			}
		}
	}
}
</style>