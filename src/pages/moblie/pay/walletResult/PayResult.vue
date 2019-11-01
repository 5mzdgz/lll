<template>
  <div class="pay-result">
		<header-nav :navTitle="navTitle"></header-nav>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'PayResult',
	 components: {
    HeaderNav
	},
	data () {
    return {
			navTitle: '支付结果'
		}
	},
	mounted () {
		const recordId = this.getParams('recordId')
		// console.log(this.orderId)
		this.getPayStatus(recordId)
	},
	methods: {
		getParams(key){
			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2])
			}
			return null;
		},
		/**
		 * 刷新支付状态
		 */
		getPayStatus (recordId) {
			this.axios.get(this.domain.Base_M3_URL + '/pay/wechat/wallet/query?recordId=' + recordId).then((res) => {
				if (res.data.code === '200') {
					this.$router.replace('/mobile/pay/wallet/success')
				} else {
					this.$router.replace('/mobile/pay/wallet/fail')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.pay-result {
	padding-top: .8rem;
	text-align: center;
	.result-box {
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
