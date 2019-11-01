import wx from 'weixin-js-sdk'			//微信sdk依赖
import axios from 'axios'		// 封装的axios
import { domain } from './utils'

function weixinPay(opthions,url,orderId,router,flag){
	// alert(opthions.package)
	// var url = window.location.href.split('#')[0]
	// alert(url)
	// var that = this
	axios.get(domain.Base_M2_URL + '/l/v1/get/weixin/sign?url=' + encodeURIComponent(url)).then(res => {
		// alert('配置config')
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.data.data.appid, // 必填，公众号的唯一标识
			timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
			signature: res.data.data.signature, // 必填，签名
			jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		// alert(opthions.signType)
		wx.ready(function () {
			wx.chooseWXPay({
				  debug: false,
					timestamp: opthions.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: opthions.nonceStr, // 支付签名随机串，不长于 32 位
					package: opthions.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
					signType: opthions.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: opthions.paySign, // 支付签名
					success: function (res) {
						if (flag === 1) {
							router.push({path: '/mobile/pay/wallet/result?recordId='+ orderId});
						} else if (flag === 2) {
							router.push({path: '/mobile/pay/mat/result?orderId='+ orderId});
						} else if (flag === 3) {
							router.push({path: '/mobile/pay/result?orderId='+ orderId});
						}
					},
					cancel: function(res) {
						if (flag === 1) {
							router.push({path: '/mobile/pay/wallet/result?recordId='+ orderId});
						} else if (flag === 2) {
							router.push({path: '/mobile/pay/mat/result?orderId='+ orderId});
						} else if (flag === 3) {
							router.push({path: '/mobile/pay/result?orderId='+ orderId});
						}
					},
					fail: function (res) {
						if (flag === 1) {
							router.push({path: '/mobile/pay/wallet/result?recordId='+ orderId});
						} else if (flag === 2) {
							router.push({path: '/mobile/pay/mat/result?orderId='+ orderId});
						} else if (flag === 3) {
							router.push({path: '/mobile/pay/result?orderId='+ orderId});
						}
					}
			})
		})
		wx.error(function (res) {
			if (flag === 1) {
				router.push({path: '/mobile/pay/wallet/result?recordId='+ orderId});
			} else if (flag === 2) {
				router.push({path: '/mobile/pay/mat/result?orderId='+ orderId});
			} else if (flag === 3) {
				router.push({path: '/mobile/pay/result?orderId='+ orderId});
			}
			//alert("支付失败error")
			//return "fali"
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				/*alert("config信息验证失败");*/
		});
  })
  // alert("weixinPay")
  // if (typeof window.WeixinJSBridge == "undefined") {
  //   alert(window.WeixinJSBridge)
  //   alert(document.addEventListener)
  //   alert(document.attachEvent)
  //   if (document.addEventListener) {
  //     document.addEventListener(
  //       "WeixinJSBridgeReady",
  //       onBridgeReady(opthions),
  //       false
  //     )
  //   } else if (document.attachEvent) {
  //     document.attachEvent("WeixinJSBridgeReady", onBridgeReady(opthions))
  //     document.attachEvent("onWeixinJSBridgeReady", onBridgeReady(opthions))
  //   }
  // } else {
  //   alert('no null')
  //   onBridgeReady(opthions)
  // }
}
function onBridgeReady(opthions) {
			// alert("onBridgeReady")
			// alert(opthions.appId)
      window.WeixinJSBridge.invoke("getBrandWCPayRequest",{
					debug: true,
          appId: opthions.appId, //公众号名称，由商户传入
          timeStamp: opthions.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: opthions.nonceStr, //随机串
          package: opthions.packages,
          signType: opthions.signType, //微信签名方式：
					paySign: opthions.paySign //微信签名
        },
        function(res) {
					alert(res)
					// var accessToken = sessionStorage.getItem("accessToken")
      		// var loginToken = localStorage.getItem("loginToken")
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            axios.get(domain.Base_M3_URL + "/pay/wechat/order/query?orderId=" + state).then((res) => {
							if (res.data.code === '200') {
								//that.$router.push('/mobile/paypay/result?flag=1'+ '&orderId=' + orderId)
							} else {
								//that.$router.push('/mobile/paypay/result?flag=2'+ '&orderId=' + orderId)
								alert("支付订单异常,如扣款成功状态未变更,请您联系客服");
							}
						})
            //location.href="../Personal/success.html"
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
						//that.$router.push('/mobile/paypay/result?flag=2'+ '&orderId=' + orderId)
            // alert("支付取消");
            console.log("支付取消");
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
						//that.$router.push('/mobile/paypay/result?flag=2'+ '&orderId=' + orderId)
            //alert(JSON.stringify(res));
            // alert("支付失败");
            console.log("支付失败");
            window.WeixinJSBridge.call("closeWindow");
          }
        }
      );
		}
export default {
		// 获取JSSDK
		weixinPay: weixinPay
}