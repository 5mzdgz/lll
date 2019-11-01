<template>
  <div class="detail-container">
		<header-nav :navTitle="navTitle"></header-nav>
		<detail-swiper class="detail-swiper" :list="swiperArr"></detail-swiper>
		<product-info :idDetailData="idDetailData"></product-info>
		<detail-tabbar></detail-tabbar>
		<product-detail :detailImgArr="detailImgArr"></product-detail>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import DetailSwiper from './DetailSwiper'
import ProductInfo from '@/pages/moblie/detail/ProductInfo'
import DetailTabbar from '@/pages/moblie/detail/DetailTabbar'
import ProductDetail from '@/pages/moblie/detail/ProductDetail'
import share from '@/common/share'

export default {
	name: 'Detail',
	components: {
		HeaderNav,
		DetailSwiper,
		ProductInfo,
		DetailTabbar,
		ProductDetail
	},
	data () {
		return {
			swiperArr: [],
			idDetailData: {},
			detailImgArr: [],
			navTitle: '商品详情',
			shareImg: '',
			mainTile: ''
		}
	},
	created () {
		this.id = this.$route.query.id
		// console.log(this.id)
		this.getDetailArr(this.id)
		// this.tabbar()
	},
	watch: {
		'$route'(to, from){
			this.id = this.$route.query.id
			if (this.id) {
				this.getDetailArr(this.id)
			}
		}
	},
	methods: {
		getDetailArr (id) {
			this.axios.get(this.domain.Base_M1_URL + '/l/v1/product/base/many?id=' + id).then(this.getDetailArrScc, id)
		},
		getDetailArrScc (res, id) {
			const resData = res.data
      //console.log(resData)
      if (resData.code === '200' && resData.data) {
				const detailData = resData.data
				this.$store.dispatch('addComment', detailData)
				// 主商品
				let idDetailData = detailData.filter((item) => {
					return item.id == this.id
				})
				//console.log(idDetailData)
				this.idDetailData = idDetailData[0]
				this.mainTile = this.idDetailData.title
        // 主商品轮播部分
        let swiperArr = idDetailData[0].imgs.filter((itemSwiper) => {
					return itemSwiper.isThumb == true
				})
			
				this.swiperArr = swiperArr
				// 主商详情图部分
        let detailImgArr = idDetailData[0].imgs.filter((itemDetailImg) => {
					return itemDetailImg.isDetail == true
				})
				// console.log(detailImgArr)
				this.detailImgArr = detailImgArr
				var imgs = idDetailData[0].imgs;
				imgs.forEach(i => {
					if(i.isSmall){
						this.shareImg = i.imgUrl;
					}
				});
				// console.log(this.mainTile)
				// console.log(this.shareImg)
				var url = window.location.href.split('#')[0]
				var obj = {
					title: this.mainTile,		//分享标题
					desc: '老良利，中国全民时尚珠宝品牌',						//分享内容
					linkurl: url,//分享链接
					img: this.shareImg,				//分享内容显示的图片
				}
				// console.log(obj)
				share.getJSSDK(url, obj) 	
      }
		}
	}
}
</script>

<style lang="scss" scoped>
.detail-container {
	background: #fff;
}
.detail-swiper {
	overflow: hidden;
	width: 100%;
	height: 0;
	padding-bottom: 100%;
}
</style>
