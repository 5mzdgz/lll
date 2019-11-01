<template>
  <div class="pay-result">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="result-box">
			<div class="result-success">
				<img src="https://img.laoliangli.com/label/common/pay_success.png" alt="">
			</div>
			<p class="title">支付成功</p>
			<p class="sub">商家正在打包，请耐心等待</p>
			<div class="bottom-box">
				<router-link :to="'/mobile/order/detail?orderId='+orderId">
					<button class="left">订单详情</button>
				</router-link>
				<router-link to="/home">
					<button class="right">返回首页</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'Success',
	 components: {
    HeaderNav
	},
	data () {
    return {
			navTitle: '支付结果',
			orderId: null,
			payMethodId: 1
        }
	},
	mounted () {
		this.orderId = this.$route.query.orderId
	},
	methods: {
		
	}
}
</script>

<style lang="scss" scoped>
.pay-result {
	padding-top: .8rem;
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
