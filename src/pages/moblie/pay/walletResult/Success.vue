<template>
  <div class="pay-result">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="result-box">
			<div class="result-success">
				<img src="https://img.laoliangli.com/label/common/pay_success.png" alt="">
			</div>
			<p class="title">充值成功</p>
			<div class="cash-money">
				<span class="left">充值金额</span>
				<span class="right">￥{{consumAmount | floatTotal}}</span>
			</div>
			
			<router-link :to="{name: 'Wallet'}">
				<button class="right">前往钱包</button>
			</router-link>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'WalletSuccess',
	 components: {
    HeaderNav
	},
	data () {
    return {
			navTitle: '支付结果',
			consumAmount: 0
        }
	},
	mounted () {
		this.consumAmount = this.$store.state.consumAmount
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.pay-result {
	.result-box {
		text-align: center;
		.result-success {
			overflow: hidden;
			width: 46%;
			height: 0;
			padding-bottom: 44%;
			margin-left: 27%;
			margin-top: 14.4%;
			img {
				width: 100%;
			}
		}
		.title {
			font-size: .3rem;
		}
		.cash-money {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			margin: .4rem 0;
			padding: 0 .2rem;
			background: #fff;
			height: .8rem;
		}
		button {
			position: fixed;
			bottom: .4rem;
			height: .6rem;
			width: 5rem;
			left: 11%;
			color: #fff;
			background: #EC4E4E;
			border-radius: .12rem;
		}
	}
}
</style>
