<template>
  <div class="after-container">
    <header-nav :navTitle="navTitle"></header-nav>
    <dl>
      <dd v-for="(item, index) in statusTabbar" :key="index" @click="handleStatusClick(index)">
        <span :class="{active:index==isShowStatus}">{{item}}</span>
      </dd>
		</dl>
		<div v-if="aftermarket.length > 0">
			<div class="order-item" v-for="(orderItem, index) in aftermarket" :key="index">
				<router-link :to="'/mobile/order/detail?orderId='+orderItem.id">
					<div class="order-code">
						<span class="code">订单编号：{{orderItem.orderNumber}}</span>
						<span class="status" v-if="orderItem.status == 5">已处理</span>
						<span class="status" v-if="orderItem.status == 4">待处理</span>
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
						<span class="count">实付:</span>
						<span class="symbol">￥</span>
						<span class="price">{{orderItem.total}}</span>
						<span class="count">退款金额:</span>
						<span class="symbol-red">￥</span>
						<span class="price-red">{{orderItem.total}}</span>
					</p>
				</router-link>
			</div>
		</div>
    <div class="empty-order" v-else>
      <div class="empty-img">
        <img src="https://img.laoliangli.com/label/common/empty_order.png" alt="">
      </div>
      <p>还没有信息，快去购物吧~</p>
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
  name: 'Aftermarket',
  components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '售后',
      statusTabbar: ['全  部', '待处理'],
			isShowStatus: 0,
			page: 1,
			size: 10,
			aftermarket: []
		}
	},
	mounted () {
		this.getAftermarket(this.isShowStatus, this.page, this.size)
	},
  methods: {
		/**
		 * 切换
		 */
		handleStatusClick (index) {
			this.isShowStatus = index
			this.getAftermarket(this.isShowStatus, this.page, this.size)
		},
		/**
		 * 获取售后数据
		 */
		getAftermarket (isShowStatus, page, size) {
			let status = 6
			if (isShowStatus === 0) {
				status
			} else {
				status--
			}
			let orderUrl = '/l/v1/user/order/list?status=' + status + '&page=' + page + '&size=' + size
			this.axios.get(this.domain.Base_M3_URL + orderUrl).then((res) => {
				// console.log(res)
				const resData = res.data.data
				if (res.data.code === '200') {
					this.aftermarket = resData
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.after-container {
	overflow: scroll;
  dl {
		overflow: hidden;
		clear: both;
		background: #fff;
		box-shadow:2px 4px 8px rgba(221,221,221,0.22);
		dd {
			float: left;
			position: absolute;
			width: 50%;
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
			// position: absolute;
			// bottom: 0;
			// right: 0;
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
			.symbol-red {
				height: .18rem;
				font-size: .14rem;
				line-height: .18rem;
				color:#EC4E4E;
			}
			.price {
				color:#6B6B6B;
				height: .32rem;
				font-size: .22rem;
				line-height: .32rem;
				padding-right: .1rem;
			}
			.price-red {
				color:#EC4E4E;
				height: .32rem;
				font-size: .22rem;
				line-height: .32rem;
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
}
</style>
