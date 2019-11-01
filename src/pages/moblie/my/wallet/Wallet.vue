<template>
  <div class="wallet">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="wallet-box">
			<div class="wallet-img">
				<img src="https://img.laoliangli.com/label/wallet/wallet.png" alt="">
			</div>
			<span>我的余额</span>
			<p>
				<span class="symbol">￥</span>
				<span class="money">{{amount | floatTotal}}</span>
			</p>
			<div class="btn">
				<router-link :to="{name: 'Recharge'}">
					<button class="recharge">充值</button>
				</router-link>
				<router-link :to="{name: 'Cash'}">
					<button class="cash">提现</button>
				</router-link>
				<router-link :to="{name: 'Bill'}">
					<button class="bill">
						<span>查看账单流水</span>
						<i class="el-icon-arrow-right"></i>
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'Wallet',
	components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '钱包',
			amount: 0
		}
	},
	mounted () {
		this.getWalletAcount()
	},
	methods: {
		/**
		 * 获取钱包数据
		 */
		getWalletAcount () {
			this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/wallet').then((res) => {
				// console.log(res)
				if (res.data.code === '200') {
					const walletData = res.data.data
					this.amount = walletData.amount
					this.$store.dispatch('addWalletData', walletData)
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wallet {
	background: #fff;
	height: 100vh;
}
.wallet-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: .22rem;
	.wallet-img {
		margin-top: 2rem;
		margin-bottom: .18rem;
		width: 1.63rem;
		height: 1.83rem;
		img {
			width: 100%;
		}
	}
	p {
		height: .9rem;
		margin-top: .36rem;
		.symbol {
			vertical-align: top;
			font-size: .36rem;
			font-weight: bold;
		}
		.money {
			font-size: .64rem;
		}
	}
	.btn {
		width: 100%;
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		button {
			width: 3.18rem;
			height: .6rem;
			border-radius: .08rem;
		}
		.recharge {
			color: #fff;
			background-color: #EC4E4E;
		}
		.cash {
			color: #EC4E4E;
			background-color: #D4D5D6;
			margin-top: .32rem;
		}
		.bill {
			color: #707070;
			background-color: #fff;
			margin-top: 1.28rem;
		}
	}
}
</style>
