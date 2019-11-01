<template>
  <div class="membership">
		<header-nav :navTitle="navTitle"></header-nav>
		<ul>
			<li>
				<span>+86 {{phone}}</span>
				<span class="get-code" :disabled="disabled" @click="getCode">{{sendCode}}</span>
			</li>
			<li>
				<input type="text" placeholder="输入短信验证码" maxlength="4" v-model="code" />
			</li>
			<li>
				<input type="password" placeholder="输入支付密码" maxlength="16" v-model="password" />
			</li>
			<li>
				<input type="password" placeholder="再次输入支付密码" maxlength="16" v-model="confrimPassword" />
			</li>
		</ul>
		<p>安全性高的密码可以使账号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度在6-16位的密码。</p>
		<button class="confrim" :disabled="isDisabled" @click="confrimOpenClick">确认</button>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'Membership',
	components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '开通vip',
			code: '',
			password: '',
			confrimPassword: '',
			phone: '',
			disabled: true,
			isDisabled: false,
			sendCode: '获取验证码',
			type: 3,
			flag: null
		}
	},
	mounted () {
		const phone = this.$store.state.userData.account
		let str = phone.substr(0, 3) + "****" + phone.substr(7)
		// console.log(phone)
		this.phone = str
		let flag
		if (this.$route.query.flag) {
			flag = JSON.parse(this.$route.query.flag)
		}
		// console.log(flag)
		if (!flag) {
			this.navTitle = '设置支付密码'
		}
	},
	methods: {
		/**
		 * 获取验证码
		 */
		getCode () {
			const ph = this.$store.state.userData.account
			let myreg = /^1(3|4|5|6|7|8|9)\d{9}$/;
			if (ph == '') {
				this.$toast({
					message: '手机号不能为空',
					position: 'top'
				})
				return false
			} else if (!myreg.test(ph)) {
				this.$toast({
					message: '请输入正确的手机号',
					position: 'top'
				})
				// this.$message.error('请输入正确的手机号')
				return false
			} else {
				this.getPhoneCode()
			}
		},

		getPhoneCode () {
			const vcode = {
				type: this.type,
				phone: this.$store.state.userData.account
			}
			// console.log(vcode)
			this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/vcode', vcode).then(this.getPhoneCodeScc)
		},
		getPhoneCodeScc (res) {
			// console.log(res)
			let num = 61
			let timer = setInterval(() => {
				num--;
				if (num <= 0) {
					clearInterval(timer)          
					this.sendCode = '重新发送'
					this.disabled = false
				} else {
					this.sendCode = num + ' s'
				}
			}, 1000)
		},
		confrimOpenClick () {
			
			let checkPassword = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{6,16}$/
			const obj = {
				type: this.type,
				phone: this.$store.state.userData.account,
				vcode: this.code,
				password: this.password,
			}
			// console.log(obj)
			if (obj.code == "") {
				this.$toast({
					message: '验证码不能为空',
					position: 'top'
				})
				return false;
			}
			if (obj.password !== this.confrimPassword) {
				this.$toast({
					message: '密码不一至',
					position: 'top'
				})
				return false
			}
			if (obj.password.length < 6) {
				this.$toast({
					message: '密码不能小于6位',
					position: 'top'
				})
				return false
			}
			if (!obj.password.match(checkPassword)) {
				this.$toast({
					message: '密码格式不正确',
					position: 'top'
				})
				return false
			}

			this.isDisabled = true
			this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/vcode/update/pay/password', obj).then(this.openVipScc)
		},
		openVipScc (res) {
			// console.log(res)
			if (res.data.code === '200') {
				this.isDisabled = false
				this.code = ''
				this.password = ''
				this.confrimPassword = ''
				if (this.flag === 3) {
					this.$router.push('/mobile/my/set/result/result?flag=3')
				} else {
					this.$router.push('/mobile/my/set/result/result?flag=4')
				}
			} else if (res.data.code === '203') {
				this.isDisabled = false
				this.$toast({
					message: '验证码无效',
					position: 'top'
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.membership {
	text-align: center;
	ul {
		background: #fff;
		border-bottom: 1px solid #D6D6D6;
		border-top: 1px solid #D6D6D6;
		margin-top: .32rem;
		padding: 0 .38rem;
		font-size: .3rem;
		text-align: left;
		li {
			padding: .24rem 0 .14rem 0;
			border-bottom: 1px solid #D6D6D6;
			overflow: hidden;
			clear: both;
			.get-code {
				float: right;
				color: #80B4F0;
				font-size: .24rem;
			}
		}
		li:nth-child(4) {
			border-bottom: none;
		}
	}
	p {
		text-align: left;
		margin-top: .16rem;
		padding: 0 .38rem;
		line-height: .35rem;
		font-size: .24rem;
		text-align: justify;
	}
	.confrim {
		position: fixed;
		bottom: .4rem;
		left: 10.5%;
		width: 5.1rem;
		height: .74rem;
		background: #EC4E4E;
		border-radius: .12rem;
		color: #fff;
	}
}
</style>