<template>
  <div class="pay-result">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="browser">
			<div class="img-box">
				<img src="@/assets/image/home/wxrq_code.png" alt="">
			</div>
			<p>请微信扫二维码</p>
			<p>进入微信小程序咨询客服</p>
			<router-link :to="'/mobile/pay/wallet/result?recordId=' + recordId">
				<button class="success">已完成支付</button>
			</router-link>
			<router-link :to="'/mobile/pay/wallet/result?recordId=' + recordId">
				<button class="fail">遇到支付问题</button>
			</router-link>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'BrowserResult',
	 components: {
    	HeaderNav
	},
	data () {
    return {
			navTitle: '支付状态',
			recordId: null
		}
	},
	mounted () {
		this.recordId = this.$route.query.recordId
		// console.log(this.orderId)
	}
}
</script>

<style lang="scss" scoped>
.pay-result {
	padding-top: .8rem;
	.browser {
		text-align: center;
		.img-box {
			margin: .4rem auto;
			width: 46.13%;
			overflow: hidden;
			height: 0;
			padding-bottom: 46.13%;
			img {
				width: 100%;
			}
		}
		p {
			font-size: .2rem;
			line-height: .4rem;
		}
		button {
			height: .74rem;
			line-height: .74rem;
			float: left;
			width: 40%;
			border-radius: .37rem; 
			margin: .8rem 5% 0 5%;
		}
		.success {
			color: #fff;
			background: #FF4848;
		}
		.fail {
			color: #7F7F7F;
			background: #fff;
			border: 1px solid	#8D8D8D;
		}
	}
}
</style>
