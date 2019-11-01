import wx from 'weixin-js-sdk'			//微信sdk依赖
import axios from 'axios'		// 封装的axios
import { domain } from './utils'
// import router from 'vue-router'
//要用到微信API
										
function address(url) {
    var enurl = encodeURIComponent(url.split('#')[0]);
    axios.get(domain.Base_M2_URL + '/l/v1/get/weixin/sign?url=' + enurl).then(res => {
      console.log(res)
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.data.appid, // 必填，公众号的唯一标识
      timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.data.signature, // 必填，签名
      jsApiList: ['getLocation', 'openLocation'] // 必填，需要使用的JS接口列表
    })
    // console.log(res)
    wx.ready(function () {
			// wx.ready((res) => {
			// 	wx.getLocation({
			// 			success: function (res) {
			// 					var pointY = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			// 					var pointX = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			// 					var wxaccuracy=res.accuracy;
			// 					var map = new BMap.Map("allmap");
			// 					var point = new BMap.Point(pointX,pointY);
			// 					var gc = new BMap.Geocoder();
			// 					gc.getLocation(point, function(rs){
			// 					   var addComp = rs.addressComponents;
			// 							if(wxaccuracy==30){
			// 					        alert(addComp.city);
			// 							}
			// 					});
			// 			},
			// 			cancel: function (res) {
			// 					alert('用户拒绝授权获取地理位置');
			// 			}
			// 	});
        wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
								console.log(res)
								var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
								var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
								var speed = res.speed; // 速度，以米/每秒计
								var accuracy = res.accuracy; // 位置精度
                wx.openLocation({
									latitude : latitude, // 纬度，浮点数，范围为90 ~ -90
									longitude : longitude, // 经度，浮点数，范围为180 ~ -180。
									name : '我的位置', // 位置名
									address : '329创业者社区', // 地址详情说明
									scale : 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
									infoUrl : 'http://www.gongjuji.net' // 在查看位置界面底部显示的超链接,可点击跳转（测试好像不可用）
								});
            },
						cancel: function (res) {
								alert('用户拒绝授权获取地理位置');
						}
        });
        // wx.chooseLocation({
        //     success: function (res) {
        //       console.log(res);
            //   if (res.address) {
            //     var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
            //     var REGION_PROVINCE = [];
            //     var addressBean = {
            //       REGION_PROVINCE: null,
            //       REGION_COUNTRY: null,
            //       REGION_CITY: null,
            //       ADDRESS: null
            //     };
            //     function regexAddressBean(address, addressBean) {
            //       regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
            //       var addxress = regex.exec(address);
            //       addressBean.REGION_CITY = addxress[1];
            //       addressBean.REGION_COUNTRY = addxress[2];
            //       // addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
            //       addressBean.ADDRESS = addxress[3] + res.name;
            //     }
            //     if (!(REGION_PROVINCE = regex.exec(res.address))) {
            //       regex = /^(.*?(省|自治区))(.*?)$/;
            //       REGION_PROVINCE = regex.exec(res.address);
            //       // console.log(REGION_PROVINCE);
            //       if (REGION_PROVINCE!=null) {
            //         addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
            //         regexAddressBean(REGION_PROVINCE[3], addressBean);
            //       } else {
            //         wx.showToast({
            //           title: '请选择完整地址信息选项',
            //           icon: 'none'
            //         })
            //       }
            //     } else {
            //       addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
            //       regexAddressBean(res.address, addressBean);
            //     }
            //     if (REGION_PROVINCE != null) {
            //       that.setData({
            //         // ADDRESS_1_STR:
            //         //   addressBean.REGION_PROVINCE + " "
            //         //   + addressBean.REGION_CITY + ""
            //         //   + addressBean.REGION_COUNTRY
            //         region: [addressBean.REGION_PROVINCE, addressBean.REGION_CITY, addressBean.REGION_COUNTRY],
            //         address: addressBean.ADDRESS,
            //       });
            //       // that.setData(addressBean); 
            //     }
            //   } else {
                
            //   }
            // },
            // fail: function (e) {
              // wx.showToast({
              //   title: e.errMsg,
              //   icon: 'none'
              // })
            //   that.getLocation()
            // }
        // }); 
    })
  })
}
function routerCategory(router) {
  router.replace('/mobile/category')
}
export default {
  // 获取JSSDK
  address: address,
  routerCategory: routerCategory
}