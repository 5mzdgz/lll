<template>
  <div class="login-container">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="container-box">
			<div class="logo-box">
				<img src="https://img.laoliangli.com/label/common/logo.png" alt="">
			</div>
			<button class="phone-login" @click="handlePhone">手机验证码登录</button>
			<div class="login-sub">
				<p>更多功能与资讯请微信扫二维码</p>
				<p>关注微信公众号或进入微信小程序</p>
			</div>
			<div class="rq-code">
				<img src="@/assets/image/home/rq_code.png" alt="">
			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'Login',
	components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '微信登录'
		}
	},
	methods: {
		/**
		 * 微信登录
		 */
		wxLogin () {
			//获取跳转微信登录地址
			//window.location.href = 
			//this.axios.get(this.domain.Base_M2_URL + '/l/v1/third/user/wechat/oauth2').then(this.wxLoginOauth2)

		},
		handlePhone () {
			this.$router.push('/mobile/phone')
		}
	}
}
</script>

<style lang="scss" scoped>
.login-container {
	background: #fff;
	height: 100vh;
	.container-box {
		text-align: center;
		overflow: hidden;
		clear: both;
		margin-top: 10%;
		.logo-box {
			margin-left: 27.87%;
			width: 44.26%;
			height: 0;
			padding-bottom: 44.26%;
			img {
				width: 100%;
			}
		}
		.phone-login {
			margin: .5rem;
			width: 70%;
			height: .6rem;
			line-height: .6rem;
			font-size: .24rem;
			border-radius: .37rem;
			color: #fff;
			background: #8E7C77;
		}
		.login-sub {
			width: 100%;
			p {
				width: 100%;
				font-size: .2rem;
				margin-bottom: .16rem;
			}
		}
		.rq-code {
			overflow: hidden;
			width: 100%;
			height: 0;
			padding-bottom: 52%;
			img {
				width: 100%;
			}
		}
	}
}
</style>

