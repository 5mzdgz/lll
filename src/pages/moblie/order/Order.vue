<template>
	<div class="order-container"  ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
		<header-nav :navTitle="navTitle"></header-nav>
			<div class="order-box">
				<dl>
					<dd v-for="(item, index) in statusTabbar" :key="index" @click="handleStatusClick(index)">
						<span :class="{active:index==isShowStatus}">{{item}}</span>
					</dd>
				</dl>
				<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
				<div v-if="orderArr.length > 0" class="order-item-box">
					<div class="order-item" v-for="(orderItem, index) in orderArr" :key="index">
						<router-link :to="'/mobile/order/detail?orderId='+orderItem.id">
							<div class="order-code">
								<span class="code">订单编号：{{orderItem.orderNumber}}</span>
								<span class="status" v-if="orderItem.status == 0">待付款</span>
								<span class="status" v-if="orderItem.status == 1">待发货</span>
								<span class="status" v-if="orderItem.status == 2">待收货</span>
								<span class="status" :class="{active_status:orderItem.status == 3}" v-if="orderItem.status == 3">已完成</span>
								<span class="status" v-if="orderItem.status == 10">已取消</span>
								<span class="status" v-if="orderItem.status == 11">已取消</span>
							</div>
							<div class="product-box" v-for="(productItem, index) in orderItem.productList" :key="index">
								<img :src="productItem.imgUrl" alt="">
								<div class="product-info">
									<div class="info-left">
										<p>{{productItem.title}}</p>
										<span v-for="(attrs, key) in productItem.attributesMap" :key="key">{{key}}: {{attrs}}</span>
									</div>
									<div class="info-price">
										<p>
											<span class="symbol">￥</span>
											<span class="price">{{productItem.price}}</span>
										</p>
										<span class="symbol">x{{productItem.commodityNum}}</span>
									</div>
								</div>
							</div>
							<p class="info-total">
								<span class="count">共{{orderItem.number}}件商品 合计:</span>
								<span class="symbol">￥</span>
								<span class="price">{{orderItem.total}}</span>
								<span class="freight">(免运费)</span>
							</p>
							<div v-if="orderItem.status == 0">
								<button :disabled="disabled" @click.prevent="payOrder(orderItem)">去付款</button>
								<button @click.prevent="cancelOrder(orderItem.id)">取消订单</button>
							</div>
							<button v-if="orderItem.status == 2" @click="confrimTap(orderItem.id)">确认收货</button>
							<router-link to="/mobile/aftermarket">
								<button v-if="orderItem.status == 3" @click="aftermarket">申请售后</button>
							</router-link>
						</router-link>
					</div>
				</div>
				<div class="empty-order" v-else>
					<div class="empty-img">
						<img src="https://img.laoliangli.com/label/common/empty_order.png" alt="">
					</div>
					<p>还没有信息，快去购物吧~</p>
				</div>
				</mt-loadmore>
				<router-view></router-view>
			</div>
		<mt-popup
		v-model="payVisible"
		popup-transition="popup-fade">
			<WalletPay :walletPayData="walletPayData"></WalletPay>
		</mt-popup>
		<server ref="server"></server>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import Server from '@/pages/moblie/common/Server'
import WalletPay from '@/pages/moblie/pay/WalletPay'
import { Indicator } from 'mint-ui'
export default {
	name: 'Order',
	inject: ['reload'],
	components: {
		HeaderNav,
		Server,
		WalletPay
	},
	data () {
		return {
			payVisible: false,
			walletPayData: {},
			disabled: false,
			navTitle: '我的订单',
			statusTabbar: ['全  部', '待付款', '待发货', '待收货', '已完成'],
			// 可以进行上拉
      		allLoaded: false,
			// 是否自动触发上拉函数
			isAutoFill: false,
			wrapperHeight: 0,
			isShowStatus: 0,
			page: 1,
			size: 10,
			orderArr: []
		}
	},
	watch: {
		'payVisible': function (newVal) {
		// console.log(newVal)
			if(!newVal) {
				this.disabled = newVal
			}
		}
	},
	mounted () {

		this.status = this.$route.query.status
		this.isShowStatus = this.status
		this.loadFrist()
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
	},
	methods: {
		/**
		 * 切换订单状态
		 */
		handleStatusClick (index) {
			this.orderArr = []
			this.isShowStatus = index
			const page = 1
            Indicator.open({
                text: '加载中...',
                //文字
                spinnerType: 'fading-circle',
                //样式
            })
			this.getOrderArr(index, page, this.size)
		},
		/**
		 * 下拉刷新
		 **/ 
		loadTop() {
		this.loadFrist()
		},
		/**
			 * 上拉加载
			 **/
		loadBottom() {
		this.loadMore()
		},
		/**
			 * 下拉刷新加载
			 **/
		loadFrist() {
		this.page = 1
		this.allLoaded = false // 可以进行上拉
		this.getOrderArr(this.isShowStatus, this.page, this.size)
		this.$refs.loadmore.onTopLoaded()
			},
			/**
			 * 加载更多
			 */
		loadMore() {
		this.page++
		this.getOrderArr(this.isShowStatus, this.page, this.size)
		this.$refs.loadmore.onBottomLoaded()
		},
		/**
		 * 获取订单列表
		 */
		getOrderArr (isShowStatus, page, size) {
			// console.log(page)
			let listUrl = '/l/v1/user/order/list?page=' + page + '&size=' + size
			if (isShowStatus === 0) {
				listUrl
			} 
			if (isShowStatus > 0) {
				let status = isShowStatus - 1
				listUrl += '&status=' + status
			}
			// this.axios.get(this.domain.Base_M3_URL + listUrl).then(this.getOrderArrScc)
			this.axios.get(this.domain.Base_M3_URL + listUrl).then((res) => {
				Indicator.close()
				let resData = res.data.data
				if (res.data.code === '90001' || res.data.code === '90002') {
					this.reload()
				}
				if (res.data.code === '200') {
					for(let i = 0; i < resData.length; i++) {
						let number = 0;
						for (let j = 0; j < resData[i].productList.length; j++) {
							// 商品数量
							number += resData[i].productList[j].commodityNum
						}
						resData[i].number = number
					}
					if (page > 1) {
						resData.forEach((item) => {
							this.orderArr.push(item)
						})
					} else {
						// console.log(resData)
						this.orderArr = resData
					}
				}
			})
		},
		/**
		 * 确认收货
		 */
		confrimTap (orderId) {
		this.$messagebox({
					title: '温馨提示',
					message: '确定已收到货物？',
					showCancelButton: true,
					confirmButtonText:"确认",
					cancelButtonText:"取消"
				}).then(action => {
					if(action == 'confirm'){
						//  console.log('确认')
						this.axios.post(this.domain.Base_M3_URL + '/l/v1/user/order/confirm?orderId=' + orderId).then((res) => {
							if(res.data.code === '200') {
								this.$router.replace('/mobile/order?status=4')
							}
						})
					}else{
						// console.log('取消')
					}
				})
		},
		/**
		 * 取消订单
		 */
		cancelOrder (orderId) {
			this.$messagebox({
				title: '温馨提示',
				message: '确定取消该订单？',
				showCancelButton: true,
 				confirmButtonText:"确认",
				cancelButtonText:"取消"
			}).then(action => {
				if(action == 'confirm'){
					//  console.log('确认')
					this.axios.post(this.domain.Base_M3_URL + '/l/v1/user/order/cancel?orderId=' + orderId).then((res) => {
						if(res.data.code === '200') {
							this.getOrderArr(this.isShowStatus, this.page, this.size)
						}
					})
				}else{
					// console.log('取消')
				}
			})
		},
		/**
		 * 申请售后
		 */
		aftermarket () {
			this.$refs.server.handleShow()
		},
		/**
		 * 去支付
		 */
		payOrder (orderItem) {
			// console.log(orderItem)
			this.disabled = true
			if (orderItem.paymentMethod === 1) {
				const ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//wechatUrl = prodUrl + "/payment/wechatOauth.html?orderId=" + orderId;
				//   console.log("微信浏览器")
				this.wechatPayOrder(orderItem.id)
				} else {
				//不是微信浏览器
				//  console.log("不是微信浏览器")
				this.otherPayOrder(orderItem.id, localStorage.getItem("loginToken"))
				}
			} else if (orderItem.paymentMethod === 2) {

			} else {
				const walletPayData = {
					orderId: orderItem.id,
					total: orderItem.total
				}
				// console.log(walletPayData)
				this.walletPayData = walletPayData
				this.payVisible = true
			}
		},
		/**
		 * 微信浏览器去支付
		 */
		wechatPayOrder(orderId){
		var url = this.domain.Base_M3_URL + '/pay/wechat/oauth2?orderId=' + orderId
			this.axios.get(url).then((res) => {
			var url = res.data.data;
			//   console.log(url)
			window.location.href=url;
			})
		},
		/**
		 * 其他浏览器去支付
		 */
    	otherPayOrder(orderId,loginToken){
			var url = this.domain.Base_M3_URL + '/pay/wechatpay?orderId=' + orderId + '&loginToken=' + loginToken
			//   console.log(url)
			window.location.href=url
    	}
	}
}
</script>

<style lang="scss" scoped>
.order-container {
	overflow: scroll;
	padding-bottom: 1rem;
	dl {
		position: fixed;
		top: .8rem;
		left: 0;
		width: 100%;
		overflow: hidden;
		clear: both;
		background: #fff;
		box-shadow:2px 4px 8px rgba(221,221,221,0.22);
		z-index: 888;
		dd {
			float: left;
			position: absolute;
			width: 20%;
			text-align: center;
			color: #1E1E1E;
			font-size: .26rem;
			margin: .14rem 0;
			position: relative;
			span {
				padding: .05rem 0;
			}
			.active {
				border-bottom: 1px solid #8E7C77;
				// transition: all .3s linear;
			}
		}
	}
	.order-item-box {
		margin-top: .7rem;
		.order-item {
			background: #fff;
			width: 85.5%;
			margin: .1rem .18rem .2rem .18rem;
			box-shadow:0px 2px 6px rgba(0,0,0,0.04);
			border-radius: .14rem;
			padding: .2rem .28rem;
			overflow: hidden;
			clear: both;
			.order-code {
				font-size: .18rem;
				color:#6B6B6B;
				padding-bottom: .2rem;
				overflow: hidden;
				clear: both;
				padding-top: 1px;
				.status {
					float: right;
					color: #EC4E4E;
				}
				.active_status {
					color: #55AA66;
				}
			}
			.product-box {
				display: flex;
				overflow: hidden;
				img {
					float: left;
					width: 27.45%;
					height: 27.45%;
					margin-right: .26rem;
				}
				.product-info {
					position: relative;
					// display: flex;
					width: 100%;
					.info-left {
						p {
							width: 2.98rem;
							height: .56rem;
							font-size: .2rem;
							line-height: .28rem;
							color:#1E1E1E;
						}
						span {
							height: .26rem;
							font-size: .18rem;
							line-height: .26rem;
							color:#6B6B6B;
						}
					}
					.info-price {
						position: absolute;
						right: 0;
						top: 0;
						text-align: right;
						p {
							color:#6B6B6B;
							.price {
								height: .32rem;
								font-size: .22rem;
								line-height: .32rem;
							}
						}
						.symbol {
							height: .18rem;
							font-size: .14rem;
							line-height: .18rem;
							color:#6B6B6B;
						}
					}
				}
			}
			.info-total {
				margin-top: -0.3rem;
				text-align: right;
				.count {
					height: .26rem;
					font-size: .18rem;
					line-height: .26rem;
					color:#1E1E1E;
				}
				.symbol {
					height: .18rem;
					font-size: .14rem;
					line-height: .18rem;
					color:#6B6B6B;
				}
				.price {
					color:#6B6B6B;
					height: .32rem;
					font-size: .22rem;
					line-height: .32rem;
				}
				.freight {
					height: .26rem;
					font-size: .18rem;
					line-height: .26rem;
					color:#1E1E1E;
				}
			}
			button {
				float: right;
				width: 1.2rem;
				height: .36rem;
				background:#fff;
				border: 1px solid #6B6B6B;
				border-radius: .16rem;
				font-size: .18rem;
				color: #6B6B6B;
				margin: .1rem 0 0 .15rem;
			}
		}
	}
	.empty-order {
		text-align: center;
		.empty-img {
			width: 64.8%;
			overflow: hidden;
			height: 0;
			padding-bottom: 40.8%;
			margin-left: 17.6%;
			margin-top: 1.66rem;
			img {
				width: 100%;
			}
		}
		p {
			margin-top: .7rem;
		}
	}
	.mint-popup {
    	border-radius: .2rem;
	}
}

</style>

