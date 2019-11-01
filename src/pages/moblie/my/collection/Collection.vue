<template>
	<div class="collection-container" ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
		<header-nav :navTitle="navTitle"></header-nav>
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
			<div class="collection-box">
				<div v-if="collectionArr.length>0">
					<div class="collection-item" v-for="(item,index) in collectionArr" :key="index">
						<p class="creacted-time">{{item.oTime}}</p>
						<div class="item-centont">
							<div class="check-box" @click="checkedItem(item)">
								<div class="check" v-if="!item.checked"></div>
            		<i class="el-icon-success" v-if="item.checked"></i>
							</div>
							<div class="product-img">
								<img :src="item.defaultImgUrl" alt="">
							</div>
							<div class="product-info">
								<div class="info-top">
									<p class="product-title">{{item.title}}</p>
									<p class="product-price">
										<span>￥</span>
										{{item.nowPrice}}
									</p>
								</div>
								<div class="info-bottom">
									<button @click="cancelCollection(item, index)" :data-index="index">取消收藏</button>
									<router-link :to="'/mobile/detail?id='+item.id">
										<button>详情</button>
									</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="empty-coupon" v-else>
					<div class="empty-img">
						<img src="https://img.laoliangli.com/label/common/empty_cart.png" alt="">
					</div>
					<span>你暂时还没收藏的商品哦！</span>
				</div>
			</div>
			</mt-loadmore>
			<div class="collection-tabbar">
				<span class="checked">已选{{count}}件</span>
				<div class="total">
					<span>合计：</span>
					<span>￥</span>
					<span>{{totalPrice | floatTotal}}</span>
				</div>
				<div class="total-pay" @click="goPay">合并支付</div>
			</div>
	</div>
</template>

<script>
import { Indicator } from 'mint-ui'
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'Collection',
	inject: ['reload'],
	components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '我的收藏',
			page: 1,
			size: 10,
			count: 0,
			totalPrice: 0,
			// 可以进行上拉
      allLoaded: false,
      // 是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
			collectionArr: []
		}
	},
	mounted () {
		this.getCollectiondata(this.page, this.size)
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    // console.log(this.wrapperHeight)
	},
	methods: {
		/**
		 * 选中商品
		 */
		checkedItem (item) {
			// 检测属性是否存在
      if (typeof item.checked == 'undefined') {
				// 局部注册
				this.$set(item, 'checked', true)
      } else {
				// 状态取反
        item.checked = !item.checked
			}
			this.calcTotalPrice()
		},
		// 计算
    calcTotalPrice: function () {
			this.count = 0
			this.totalPrice = 0//每次遍历商品之前对总金额进行清零
			let totalPrice
      this.collectionArr.forEach((item, index) => {//遍历商品，如果选中就进行加个计算，然后累加
        if (item.checked){
					this.totalPrice += item.nowPrice//累加的
					this.count ++
        }
      })
		},
		/**
		 * 去支付
		 */
		goPay () {
			const arr = []
			this.collectionArr.forEach((check) => {
				if (check.checked) {
					 arr.push({
						pid: check.id,
						qty: 1
					})
				}
			})
			if (arr.length > 0) {
				this.axios.post(this.domain.Base_M3_URL + '/l/v2/order/confirm/product/list', arr).then((res) => {
					// console.log(res.data.data)
					const payData = res.data.data
					const obj = JSON.stringify(res.data.data)
					if (res.data.code === '200') {
						this.$router.push('/mobile/pay?obj='+obj)
						this.calcTotalPrice()
					}
				})
			} else {
				this.$toast({
					message: '还没选中商品哦！'
				})
			}
		},
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
      this.getCollectiondata(this.page, this.size)
      this.$refs.loadmore.onTopLoaded()
    },
    // 加载更多
    loadMore() {
      this.page++
			this.getCollectiondata(this.page, this.size)
      this.$refs.loadmore.onBottomLoaded()
		},
		/**
		 * 取消收藏
		 */
		cancelCollection (item, index) {
			// console.log(id)
			this.$messagebox({
				title: '温馨提示',
				message: '确定取消收藏该商品？',
				showCancelButton: true,
 				confirmButtonText: '确认',
				cancelButtonText: '取消'
			}).then(action => {
				if(action == 'confirm'){
					//  console.log('确认')
					this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/collect/delete?ids=' + item.id).then((res) => {
						// console.log(res)
						const resData = res.data.data
						if (res.data.code === '200') {
							this.collectionArr.splice(index,1)
							if (this.count !== 0 && this.totalPrice !== 0) {
								this.count--
								this.totalPrice-= item.nowPrice
							}
						}
					})
				}else{
					// console.log('取消')
				}
			})
		},
		/**
		 * 获取收藏列表
		 */
		getCollectiondata (page, size) {
			Indicator.open({
				text: '加载中...',
				//文字
				spinnerType: 'fading-circle',
				//样式
			})
			this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/collect/list?page=' + page + '&size=' + size).then((res) => {
				// console.log(res)
				const resData = res.data.data
				if (res.data.code === '90001' || res.data.code === '90002') {
					this.reload()
				}
				if (res.data.code === '207') {
					Indicator.close()
				}
				if (res.data.code === '200') {
					Indicator.close()
					for(let i in resData) {
						let str = resData[i].collectDate
						//日期转换
						let oDate = new Date(str),
							oMonth = oDate.getMonth() + 1,
							oDay = oDate.getDate()
						let oTime = this.getzf(oMonth) + '月' + this.getzf(oDay) + '日';
						resData[i].oTime = oTime
					}
					if (page > 1) {
						resData.forEach((prod) => {
							this.collectionArr.push(prod)
						})
					} else {
						this.collectionArr = resData
					}
				}
			})
		},
		/***
		 * 补0操作
		 **/
		getzf:function(num) {
			if (parseInt(num) < 10) {
				num = '0' + num;
			}
			return num;
		}
	}
}
</script>

<style lang="scss" scoped>
.collection-container {
	overflow: scroll;
	padding-bottom: 1rem;
	.collection-box {
		.collection-item {
			background: #fff;
			width: 95.2%;
			height: 0;
			overflow: hidden;
			padding-bottom: 36.53%;
			margin: .1rem .16rem .2rem .16rem;
			box-shadow:0px 2px 6px rgba(0,0,0,0.04);
			border-radius: .14rem;
			.creacted-time {
				height: .26rem;
				font-size: .18rem;
				color:#6B6B6B;
				padding: .1rem 0 .1rem .2rem;
			}
			.item-centont {
				position: relative;
				overflow: hidden;
				display: flex;
				flex-direction: row;
				margin-top: .05rem;
				.check-box {
					width: .25rem;
					height: .25rem;
					margin: .5rem .2rem 0 .2rem;
					.check {
						width: .25rem;
						height: .25rem;
						border: 1px solid #eee;
						border-radius: 100%;
					}
					i {
						font-size: .35rem;
						color: #EC4E4E;
					}
				}
				.product-img {
					height: 26.13%;
					width: 26.13%;
					img {
						width: 100%;
					}
				}
				.product-info {
					width: 60%;
					position: relative;
					margin-left: .2rem;
					.info-top {
						.product-title {
							width: 90%;
							line-height: .28rem;
							font-size: .2rem;
							color: #1e1e1e;
							display: -webkit-box;
							text-overflow: ellipsis;
							-webkit-line-clamp: 2;
							word-break: break-all;
							-webkit-box-orient:vertical;
							overflow: hidden;
						}
						.product-price {
							font-size: .24rem;
							color: #ec4e4e;
							line-height: .28rem;
							span {
								font-size: .14rem;
							}
						}
					}
					.info-bottom {
						position: absolute;
						right: .2rem;
						bottom: 0;
						button {
							width: 1.2rem;
							height: .3rem;
							border: 1px solid #6B6B6B;
							line-height: .3rem;
							border-radius: .12rem;
							font-size: .14rem;
							color: #6B6B6B;
							background: #fff;
							margin-bottom: 1px;
						}
					}
				}
			}
		}
		.empty-coupon {
			margin-top: 1.48rem;
			text-align: center;
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
	.collection-tabbar {
		position: fixed;
		bottom: 0;
		background: #fff;
		height: .8rem;
		line-height: .8rem;
		width: 100%;
		overflow: hidden;
		display: flex;
		text-align: center;
		box-shadow:0px -1px 12px rgba(0,0,0,0.04);
		.checked {
			width: 20%;
			font-size: .24rem;
			color: #6B6B6B;
		}
		.total {
			width: 48%;
			text-align: right;
			span:nth-child(1) {
				font-size: .24rem;
				color: #6B6B6B;
			}
			span:nth-child(2) {
				font-size: .18rem;
				color: #EC4E4E;
			}
			span:nth-child(3) {
				font-size: .32rem;
				color: #EC4E4E;
				padding-right: .28rem;
			}
		}
		.total-pay {
			float:right;
			font-size: .26rem;
			color: #fff;
			background: #EC4E4E;
			line-height: .8rem;
			width: 32%;
		}
	}
}
</style>
