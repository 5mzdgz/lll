<template>
	<div class="coupon-container" ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
		<header-nav :navTitle="navTitle"></header-nav>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
			<div class="container-box" v-if="couponData.length > 0">
				<div v-for="(item, index) in couponData" :key="index">
					<div class="coupon-box" v-if="item.couponType===1">
						<div class="coupon-left">
							<span class="symbol">￥</span>
							<span class="coupon-price">{{item.offer}}</span>
						</div>
						<div class="coupon-right">
							<p class="coupon-title">满{{item.fullAmount}}元可用</p>
							<p class="validity-time">有效期至{{item.endTime}}（剩{{item.expirationTime}}天到期）</p>
							<p class="coupon-sub">
								<span class="sub-left">指定商品满{{item.fullAmount}}元减{{item.offer}}少元</span>
								<span class="sub-right" @click="goUseCoupon(item)">立即使用
									<i class="el-icon-arrow-right"></i>
								</span>
							</p>
						</div>
					</div>
					<div class="discount-box" v-if="item.couponType===2">
						<div class="discount-left">
							<span class="discount">{{item.discount}}</span>
							<span class="symbol">折</span>
						</div>
						<div class="discount-right">
							<p class="discount-title">{{item.couponName}}</p>
							<p class="validity-time">有效期至{{item.endTime}}（剩{{item.expirationTime}}天到期）</p>
							<p class="discount-sub">
								<span class="sub-left">{{item.couponDescription}}</span>
								<span class="sub-right" @click="goUseCoupon(item)">立即使用
									<i class="el-icon-arrow-right"></i>
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="empty-coupon" v-else>
				<div class="empty-img">
					<img src="https://img.laoliangli.com/label/common/empty_cart.png" alt="">
				</div>
				<span>暂时还没有优惠券哦！</span>
			</div>
		</mt-loadmore>
	</div>
</template>

<script>
import { Indicator } from 'mint-ui'
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'Coupon',
	inject: ['reload'],
	components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '优惠券',
			couponData: [],
			status: 0,
			page: 1,
			size: 10,
			// 可以进行上拉
      allLoaded: false,
      // 是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0
		}
	},
	mounted () {
		this.getCouponListData(this.status, this.page, this.size)
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    // console.log(this.wrapperHeight)
	},
	methods: {
		// 下拉刷新
    loadTop() {
      this.loadFrist()
    },
    // 上拉加载
    loadBottom() {
      this.loadMore()
    },
    // 下拉刷新加载
    loadFrist() {
      this.isMore = 1
      this.page = 1
      this.allLoaded = false // 可以进行上拉
      this.getCouponListData(this.status, this.page, this.size)
      this.$refs.loadmore.onTopLoaded()
    },
    // 加载更多
    loadMore() {
      this.page++
			this.getCouponListData(this.status, this.page, this.size)
      this.$refs.loadmore.onBottomLoaded()
		},
		/**
		 * 获取优惠卷列表
		 */
		getCouponListData (status, page, size) {
			Indicator.open({
				text: '加载中...',
				//文字
				spinnerType: 'fading-circle',
				//样式
			})
			this.axios.get(this.domain.Base_M3_URL + '/coupon/v1/list?status=' + status + '&page=' + page + '&size=' + size).then((res) => {
				// console.log(res)
				if (res.data.code === '90001' || res.data.code === '90002') {
					this.reload()
				}
				const resData = res.data.data
				if (res.data.code === '200') {
					Indicator.close()
					for (let i in resData) {
						if (resData[i].couponType === 2){
							let discount = resData[i].discount * 10
							resData[i].discount = discount
						}
						let timestamp = new Date().getTime()
						let etime = Date.parse(new Date(resData[i].endTime))
						//两个时间戳相差的毫秒数
						let usedTime = etime - timestamp
						let expirationTime = Math.floor(usedTime / (24 * 3600 * 1000))

						resData[i].expirationTime = expirationTime
					}
					if (page > 1) {
						resData.forEach((item) => {
							this.couponData.push(item)
						})
					} else {
						this.couponData = resData	
					}
				}
			})
		},
		/**
		 * 去使用优惠卷
		 */
		goUseCoupon (item) {
			console.log(item)
			let obj = {
				useType: item.useType,
				useIds: item.useIds,
				excludeProductIds: item.excludeProductIds
			}
    	let str = JSON.stringify(obj)
			this.$router.push('/mobile/coupon/products?str=' + str)
		}
	}
}
</script>

<style lang="scss" scoped>
.coupon-container {
	overflow: scroll;
	padding-bottom: 1rem;
	.container-box {
		background: #fff;
		.coupon-box {
			overflow: hidden;
			width: 95%;
			height: 0;
			padding-bottom: 33.05%;
			background: url('https://img.laoliangli.com/label/common/b_coupon.png') no-repeat;
			background-size: 100% 100%;
			margin-left: 2.5%;
			.coupon-left {
				position: relative;
				// background: #777;
				width: 67%;
				float: left;
				color: #fff;
				width: 31%;
				margin-top: 8%;
				.symbol {
					font-size: .36rem;
					margin-left: 9%;
				}
				.coupon-price {
					font-size: .9rem;
				}
			}
			.coupon-right {
				float: right;
				width: 67%;
				.coupon-title {
					padding-top: .2rem;
					font-size: .32rem;
					line-height: .4rem;
					color:#FFCB91;
				}
				.validity-time {
					width: 95%;
					font-size: .17rem;
					color:#1E1E1E;
					padding: .25rem 0;
					border-bottom: 2px dashed #777;
				}
				.coupon-sub {
					font-size: .12rem;
					padding-top: .1rem;
					.sub-left {
						color:#777;
					}
					.sub-right {
						float: right;
						color:#FFCB91;
						margin-right: .2rem;
					}
				}
			}
		}
		.discount-box {
			overflow: hidden;
			width: 95%;
			height: 0;
			padding-bottom: 33.05%;
			background: url('https://img.laoliangli.com/label/common/b-discount.png') no-repeat;
			background-size: 100% 100%;
			margin-left: 2.5%;
			clear: both;
			.discount-left {
				// background: #777;
				float: left;
				color: #fff;
				width: 31%;
				margin-top: 9%;
				text-align: center;
				.symbol {
					font-size: .32rem;
				}
				.discount {
					font-size: .7rem;
					margin-left: 12%;
				}
			}
			.discount-right {
				// background: #777;
				float: right;
				width: 67%;
				.discount-title {
					padding-top: .2rem;
					font-size: .32rem;
					line-height: .4rem;
					color:#8DB0FF;
				}
				.validity-time {
					width: 95%;
					font-size: .17rem;
					color:#1E1E1E;
					padding: .25rem 0;
					border-bottom: 2px dashed #777;
				}
				.discount-sub {
					font-size: .12rem;
					padding-top: .1rem;
					.sub-left {
						color:#777;
					}
					.sub-right {
						float: right;
						color:#8DB0FF;
						margin-right: .2rem;
					}
				}
			}
		}
	}
	.empty-coupon {
		margin-top: 1.48rem;
		text-align: center;
		height: 100vh;
		.empty-img {
			width: 100%;
			height: 0;
			overflow: hidden;
			padding-bottom: 45.66%;
			img {
				width: 100%;
			}
		}
		span {
			margin-top: 1.03rem;
			font-size: .28rem;
			color:#828282;
		}
	}
}
</style>

