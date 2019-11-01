<template>
	<div class="detail-container">
		<header-nav :navTitle="navTitle"></header-nav>
    <detail-status></detail-status>
    <detail-address :orderData="orderData"></detail-address>
    <detail-info :orderData="orderData"></detail-info>
    <detail-product :orderData="orderData" :productList="productList"></detail-product>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import DetailStatus from '@/pages/moblie/order/orderDetail/DetailStatus'
import DetailAddress from '@/pages/moblie/order/orderDetail/DetailAddress'
import DetailInfo from '@/pages/moblie/order/orderDetail/DetailInfo'
import DetailProduct from '@/pages/moblie/order/orderDetail/DetailProduct'
export default {
  name: 'OrderDetail',
  inject: ['reload'],
  components: {
    HeaderNav,
    DetailStatus,
    DetailAddress,
    DetailInfo,
    DetailProduct
  },
  data () {
    return {
      navTitle: '订单详情',
      orderData: {},
      productList: []
    }
  },
  created () {
    this.orderId = this.$route.query.orderId
    // console.log(this.orderId)
    this.getOrderIdData(this.orderId)
  },
  methods: {
    /**
     * 获取订单信息
     */
    getOrderIdData (orderId) {
      this.axios.get(this.domain.Base_M3_URL + '/l/v1/user/order/dtl?orderId=' + orderId).then((res) => {
        // console.log(res)
        if (res.data.code === '90001' || res.data.code === '90002') {
          this.reload()
        }
        const resData = res.data.data
        if (resData.shippingMethods !== null){
          const shippingArr = JSON.parse(sessionStorage.getItem('shippingMethods'))

          // console.log(shippingArr)
          shippingArr.forEach((item) => {
            if (resData.shippingMethods === item.id){
              resData.shippingName = item.shippingName
              resData.shippingUrl = item.shippingUrl + resData.shippingCode
            }
          })
        }
        // console.log(resData)
        this.orderData = resData
        this.$store.dispatch('addOrderData', this.orderData)
        this.productList = resData.productList
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  padding-bottom: .1rem;
  background: #f6f6f6;
}
</style>
