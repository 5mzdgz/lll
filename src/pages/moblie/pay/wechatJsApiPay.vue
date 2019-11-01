<template>
  <div class="wechat-pay"></div>
</template>

<script>
import wxpays from '@/common/wxpays'


export default {
	name: "WechatJsApiPay",
	data () {
		return {
			appId: '',
			timeStamp: '',
			nonceStr: '',
			packages: '',
			signType: '',
			paySign: '',
			state: '',
			code: ''
		}
	},
	mounted () {
		this.getWxtoken()
	},
  methods: {
	getParams(key){
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	},
	getWxtoken () {
			var that = this
			this.state = this.getParams('state')
			this.code = this.getParams('code')
			// alert(this.state)
			// alert(this.code)
			this.axios.get(this.domain.Base_M3_URL + '/pay/wechat/access/token?code='+this.code).then((res) => {
				if (res.data.code === '200') {
					var openid = res.data.data
					var loginToken = localStorage.getItem("loginToken")
					var url = this.domain.Base_M3_URL + '/pay/wechatpay/jsapi?openId=' + openid + '&state=' + this.state + '&loginToken=' +loginToken
					// alert(url);
					that.getPayParams(url)
        		}
			})
		},
		getPayParams (url) {
			var that = this
			this.axios.get(url).then((res) => {
				this.appId = res.data.data.appId
				this.timeStamp = res.data.data.timeStamp
				this.nonceStr = res.data.data.nonceStr
				this.packages = res.data.data.package
				this.signType = res.data.data.signType
				this.paySign = res.data.data.paySign
				var opthions = {
					appId: this.appId,
					timeStamp: this.timeStamp,
					nonceStr: this.nonceStr,
					package: this.packages,
					signType: this.signType,
					paySign: this.paySign
				}
				// alert('getPayParams')
				var url = window.location.href.split('#')[0]
				const flag = 3
				wxpays.weixinPay(opthions, url, this.state, that.$router, flag)
				alert(r)
			})
		}
  }
}
</script>

<style lang="scss" scoped>
</style>