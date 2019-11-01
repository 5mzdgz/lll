<template>
  <div class="pay-result">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="result-box">
			<div class="result-success">
				<img src="https://img.laoliangli.com/label/common/pay_success.png" alt="">
			</div>
			<p class="title">支付成功</p>
			<p class="sub">请前往填写快递物流单号吧</p>
			<div class="bottom-box">
				<router-link :to="'/mobile/my/maintain/mail?orderId=' + orderId + '&orderNumber=' + orderNumber">
					<button class="left">前往填写物流信息吧</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'MatSuccess',
	 components: {
    HeaderNav
	},
	data () {
    return {
			navTitle: '支付结果',
			// flag: null,
			orderId: null,
			orderNumber: null
        }
	},
	mounted () {
		this.orderId = this.$route.query.orderId
		this.orderNumber = this.$store.state.goPayNumber.orderNumber
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.pay-result {
	height: 100vh;
	background: #fff;
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
		.sub {
			height: .6rem;
			line-height: .6rem;
			font-size: .24rem;
			color: #6b6b6b;
		}
		.bottom-box {
			margin-top: .4rem;
			button {
				width: 4rem;
				height: .6rem;
				border-radius: .4rem;
				font-size: .25rem;
				margin: 0 .2rem;
			}
			.left {
				color: #fff;
				background: #FF4848;
			}
		}
	}
}
</style>
