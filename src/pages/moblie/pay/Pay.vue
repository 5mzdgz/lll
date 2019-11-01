<template>
  <div class="pay-container">
    <header-nav :navTitle="navTitle"></header-nav>
    <pay-address></pay-address>
    <pay-product></pay-product>
    <pay-check></pay-check>
  </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import PayAddress from '@/pages/moblie/pay/PayAddress'
import PayProduct from '@/pages/moblie/pay/PayProduct'
import PayCheck from '@/pages/moblie/pay/PayCheck'
export default {
  name: 'Pay',
  inject: ['reload'],
  components: {
    HeaderNav,
    PayAddress,
    PayProduct,
    PayCheck
  },
  data () {
    return {
      navTitle: '下单支付',
      // payData: {},
      addressData: {},
      // orderCoupon: ''
    }
  },
  created () {
    // this.$store.dispatch('addPayData', JSON.parse(this.$route.query.obj))
  },
  mounted () {
    if(!this.$store.state.checkedAddress) {
      // console.log('111')
      this.getAddressData()
    }
    if (!sessionStorage.getItem('provinceArr')) {
      this.getProvincesArr()
      this.getCitiesArr()
      this.getAreasArr()
    }
  },
  methods: {
    /**
     * 获取默认地址
     */
    getAddressData () {
      this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/address/get/def').then((res) => {
        // console.log(res)
        if (res.data.code === '200') {
          const checkedAddress = res.data.data
          this.$store.dispatch('checkedAddress', checkedAddress)
        }
        if (res.data.code === '90001' || res.data.code === '90002') {
          this.reload()
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
.pay-container {
  padding-bottom: 1rem;
}
</style>

