<template>
	<div class="address-container">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="address-box">
			<div v-if="$store.state.address.length>0">
				<div class="address-item" v-for="(item, index) in $store.state.address" :key="index" @click="checkAddress(item)">
					<p class="address-top">
						<span class="address-name">{{item.userName}}</span>
						<span class="address-phone">{{item.userPhone}}</span>
						<i class="el-icon-close" @click="handleClose(index,item.id)" :data-index="index"></i>
					</p>
					<p class="address-middle">{{item.province}} {{item.city}} {{item.area}} {{item.address}}</p>
					<div class="address-bottom">
						<div class="bottom-left" @click="handledefaultAddress(item)">
							<div class="circle" v-if="item.isDefault==0"></div>
							<i class="el-icon-success" v-if="item.isDefault==1"></i>
							<span class="circle-confrim" :class="{active:item.isDefault==1}">设为默认地址</span>
						</div>
						<span class="address-set" @click="setAddressInfo(item.id)">编辑</span>
					</div>
				</div>
			</div>
			<div class="empty-address" v-else>
				<div class="empty-img">
					<img src="https://img.laoliangli.com/label/common/empty_address.png" alt="">
				</div>
				<p>您还未添加收货地址喔~</p>
				<p>快去添加吧~</p>
			</div>
			<button @click="newAddress">添加新地址</button>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'Address',
	inject: ['reload'],
	components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '收货地址',
			flag: null
		}
	},
	mounted () {
		this.flag = this.$route.query.flag
		this.getAddressData()
		if (!sessionStorage.getItem('provinceArr')) {
      this.getProvincesArr()
      this.getCitiesArr()
      this.getAreasArr()
    }
	},
	methods: {
		/**
		 * 下单页过来，选择地址
		 */
		checkAddress(item) {
			if(this.flag === '1') {
				this.$store.state.checkedAddress = item
				this.$router.back(-1)
			}
		},
		/**
		 * 编辑地址
		 */
		setAddressInfo (id) {
			this.$router.push('/mobile/address/newaddress?id='+ id)
			// if (this.$store.state.provinceArr.length === 0) {
			// 	this.getProvincesArr()
			// 	this.getCitiesArr()
			// 	this.getAreasArr()
			// }
			// this.getProvincesArr()
			// this.getCitiesArr()
			// this.getAreasArr()
		},
		/**
		 * 跳转添加地址
		 */
		newAddress () {
			this.$router.push('/mobile/address/newaddress')
			// console.log(this.$store.state.provinceArr.length)
			// if (this.$store.state.provinceArr.length === 0) {
			// 	this.getProvincesArr()
			// 	this.getCitiesArr()
			// 	this.getAreasArr()
			// }
			// this.getProvincesArr()
			// this.getCitiesArr()
			// this.getAreasArr()
		},
		/**
		 * 获取地址列表
		 */
		getAddressData () {
			this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/address/list').then((res) => {
				// console.log(res)
				if (res.data.code === '200') {
					const address = res.data.data
					this.$store.dispatch('addAddress', address)
					// console.log(this.$store.state.address)
				}
				if (res.data.code === '90001' || res.data.code === '90002') {
					this.reload()
				}
			})
		},


		/**
		 * 设置默认地址
		 */
		handledefaultAddress (item) {
			this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/address/setting/def?id=' + item.id).then((res) => {
				// console.log(res)
				const resData = res.data.data
				if (res.data.code === '200') {
					item.isDefault = 1
					const addressArr = this.$store.state.address
					for(let i in addressArr) {
						if (addressArr[i].id !== item.id) {
							addressArr[i].isDefault = 0
						} 
					}
				}
			})
		},
		/**
		 * 删除地址
		 */
		handleClose (index,id) {
			this.$messagebox({
				title: '温馨提示',
				message: '确定删除该地址？',
				showCancelButton: true,
 				confirmButtonText:"确认",
				cancelButtonText:"取消"
			}).then(action => {
				if(action == 'confirm'){
					//  console.log('确认')
					this.deleteAddress(index,id)
				}else{
					// console.log('取消')
				}
			})
		},
		/**
		 * 
		 * 删除地址
		 */
		deleteAddress (index,id) {
			this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/address/delete?ids=' + id).then((res) => {
				// console.log(res)
				const resData = res.data.data
				if (res.data.code === '200') {
					this.$toast({
						message: '删除成功',
						position: 'top'
					})
					this.$store.state.address.splice(index,1)
				} else {
					this.$toast({
						message: '删除失败',
						position: 'top'
					})
				}
			})
		},
		/***
     * 获取省分
     */
    getProvincesArr () {

      this.axios.get(this.domain.Base_M2_URL+'/l/v1/address/province/list').then((res) => {
        // console.log(res)
        if (res.data.code === '200') {
					const provinceArr =JSON.stringify(res.data.data)
					sessionStorage.setItem('provinceArr', provinceArr)
          // this.$store.dispatch('addProvinceArr', provinceArr)
        }
      })
    },

    /**
     *获取城市
     */
    getCitiesArr () {
      this.axios.get(this.domain.Base_M2_URL+'/l/v1/address/city/list').then((res) => {
        // console.log(res)
        if (res.data.code === '200') {
          const cityArr = JSON.stringify(res.data.data)
          sessionStorage.setItem('cityArr', cityArr)
					// this.$store.dispatch('addCityArr', cityArr)
					// console.log(this.myAddressSlots[2].values)
        }
      })
    },
     /**
     *获取地区
     */
    getAreasArr () {
      this.axios.get(this.domain.Base_M2_URL+'/l/v1/address/area/list').then((res) => {
        // console.log(res)
        if (res.data.code === '200') {
          const areaArr = JSON.stringify(res.data.data)
          sessionStorage.setItem('areaArr', areaArr)
          // this.$store.dispatch('addAreaArr', areaArr)
          // console.log(this.myAddressSlots[4].values)
        }
      })
    }
	}
}
</script>

<style lang="scss" scoped>
.address-container {
	background: #f6f6f6;
	.address-box {
		margin-top: 2px;
		background: #f6f6f6;
		padding-bottom: 1px;
		margin-bottom: 1rem;
		.address-item {
			padding: .32rem .36rem .2rem .36rem;
			overflow: hidden;
			clear: both;
			background: #fff;
			margin-bottom: .12rem;
			.address-top {
				padding-bottom: .14rem;
				line-height: .28rem;
				color:#000;
				.address-name {
					font-size: .28rem;
				}
				.address-phone {
					font-size: .2rem;
					color: #959595;
				}
				i {
					float: right;
					color: #959595;
					font-size: .18rem;
				}
			}
			.address-middle {
				width: 100%;
				font-size: .24rem;
				line-height: .36rem;
				color:#000;
				padding-bottom: .26rem;
				border-bottom: 1px solid #E2E2E2;
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				word-break: break-all;
				-webkit-box-orient:vertical;
				overflow: hidden;
			}
			.address-bottom {
				overflow: hidden;
				clear: both;
				padding-top: .14rem;
				.bottom-left {
					overflow: hidden;
					clear: both;
					float: left;
					line-height: .24rem;
					.circle {
						float: left;
						width: .24rem;
						height: .24rem;
						border: 1px solid #E2E2E2;
						border-radius: .2rem;
						background: #fff;
						margin-right: .1rem;
					}
					i {
						margin-top: 2px;
						color: #EC4E4E;
						font-size: .3rem;
					}
					.circle-confrim {
						font-size: .24rem;
						color:#919191;
					}
					.active {
						color: #EC4E4E;
					}
				}
				.address-set {
					float: right;
					line-height: .3rem;
					font-size: .24rem;
					color:#919191;
				}
			}
		}
		.empty-address {
			height: 100vh;
			text-align: center;
			background: #fff;
			padding-top: 1.12rem;
			.empty-img {
				width: 42.4%;
				overflow: hidden;
				height: 0;
				padding-bottom: 34.66%;
				margin-left: 28.8%;
				img {
					width: 100%;
				}
			}
			p {
				padding-top: .5rem;
			}
		}
		button {
			// overflow: hidden;
			position: fixed;
			width: 68%;
			height: .75rem;
			bottom: .2rem;
			left: 16%;
			border-radius: .12rem;
			background: #8E7C77;
			color: #fff;
			// padding-bottom: 10%;
		}
	}
}
</style>

