<template>
	<div class="coupon-product" ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
		<header-nav :navTitle="navTitle"></header-nav>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
			<div class="category-bottom">
				<dl>
					<dd :class="sort == '' ? 'active_btm' : '' " data-sort="" @click="changeSort('')">综合</dd>
					<dd :class="sort == 'salesVolume' ? 'active_btm' : '' " data-sort="salesVolume" @click="changeSort('salesVolume')">销量</dd>
					<dd :class="sort == 'newTime' ? 'active_btm' : '' " data-sort="newTime" @click="changeSort('newTime')">新品</dd>
					<dd :class="selectedPrice ? 'active_btm' : '' " class="price" data-sort="priceAsc" @click="changePriceSort()">
						<span class="price">价格</span>
						<span class="price-icon">
							<i class="el-icon-caret-top" :class="{active_one:isActive}"></i>
							<i class="el-icon-caret-bottom" :class="{active_one:isSort}"></i>
						</span>
					</dd>
				</dl>
			</div>
			<div class="product-list">
				<products :productList="productList"></products>
				<p class="pmore" v-if="isMore==0">-- 暂无更多商品，敬请期待 --</p>
			</div>
		</mt-loadmore>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import Products from '@/pages/moblie/common/Products'
export default {
	name: 'CouponProducts',
	components: {
		HeaderNav,
		Products
	},
	data () {
		return {
			navTitle: '可使用该优惠券的商品',
			couponObj: {},
			selectedPrice: false,
      productList: [],
      // 可以进行上拉
      allLoaded: false,
      // 是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
      isMore: 1,
      page: 1,
      size: 10,
      sort: '',
      isMore: 1,
      isActive: false,
      isSort: false
		}
	},
	created () {
		this.couponObj = JSON.parse(this.$route.query.str)
		this.useType = this.couponObj.useType
		this.useIds = this.couponObj.useIds
		this.excludeProductIds = this.couponObj.excludeProductIds
	},
	mounted () {
		this.getProductListPage(this.page, this.size, this.sort, this.useType, this.useIds,this.excludeProductIds)
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
      this.sort = ''
      this.allLoaded = false // 可以进行上拉
      // this.getCategoryType()
      this.getProductListPage(this.page, this.size, this.sort, this.useType, this.useIds,this.excludeProductIds)
      this.$refs.loadmore.onTopLoaded()
    },
    // 加载更多
    loadMore() {
			this.page++
			this.sort = ''
      this.getProductListPage(this.page, this.size, this.sort, this.useType, this.useIds,this.excludeProductIds)
      this.$refs.loadmore.onBottomLoaded()
		},
		// 排序
    changeSort (sort) {
      if (sort === 'priceDesc' || sort === 'priceAsc') {
        this.selectedPrice = true
      } else {
        this.selectedPrice = false
      }
      this.page = 1
      this.sort = sort
      this.getProductListPage(this.page, this.size, this.sort, this.useType, this.useIds,this.excludeProductIds)
    },
    // 价格排序
    changePriceSort () {
      this.selectedPrice = true
      // console.log(this.selectedPrice)
      this.isActive = !this.isActive
      if (this.isActive) {
        //console.log('降序')
        this.isSort = false
        this.changeSort('priceDesc')
      } else {
        //升序
        //console.log('升序')
        this.isSort = true
        this.changeSort('priceAsc')
      }
    },
		/**
		 * 获取优惠卷商品
		 */
		getProductListPage (page, size, sort , useType, useIds ,excludeProductIds) {
			let oUrl = this.domain.Base_M1_URL + '/l/v1/coupon/product/search?page=' + page + '&size=' + size+ '&useType=' + useType+ '&useIds=' + useIds+ '&excludeProductIds=' + excludeProductIds
			if (sort != '') {
				oUrl += '&sort=' + sort
			}
			if (page > 1) {
				this.axios.get(oUrl).then((res) => {
					console.log(res)
					const resData = res.data.data
					if (res.data.code === '200' && resData) {
						if (resData.length === 0) {
							this.isMore = 0
						} else {
							resData.forEach((item) => {
								this.productList.push(item)
							})
							this.isMore = 1
						}
					}
				})
			} else {
				this.axios.get(oUrl).then((res) => {
					console.log(res)
					const resData = res.data
					if (resData.code === '200' && resData.data) {
						this.productList = resData.data
						this.isMore = 1
					} else{
						this.productList = []
						this.isMore = 0
					}
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.coupon-product {
  overflow: scroll;
  .category-bottom {
    background: #f6f6f6;
    border-top-right-radius: .4rem;
    border-top-left-radius: .4rem;
    dl {
      clear: both;
      overflow: hidden;
      dd {
        float: left;
        font-size: .26rem;
        color: #808080;
        width: 25%;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        .price {
          margin-left: 30%;
        }
        .price-icon {
          width: .26rem;
          line-height: .26rem;
          height: .26rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          // margin-top: 2px;
          i {
            font-size: 6px;
            margin-top: -3px;
          }
          .active_one {
            color: #888;
          }
        }
      }
      dd:nth-child(4) {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .active_btm {
        color: #C26247;
      }
    }
  }
  .product-list {
    background: #f6f6f6;
    text-align: center;
    padding-bottom: .4rem;
    .pmore {
      margin-top: .4rem;
      font-size: .26rem;
    }
  }
}
</style>