<template>
  <div class="product">
    <nav-pc></nav-pc>
    <product-top :top="topList"></product-top>
    <!-- <product-search></product-search> -->
    <product-list></product-list>
    <footer-pc></footer-pc>
  </div>
</template>

<script>
import NavPc from '@/pages/web/home/Nav_pc'
import ProductTop from '@/pages/web/product/Product_Top'
import ProductSearch from '@/pages/web/product/Product_Search'
import ProductList from '@/pages/web/product/Product_List'
import FooterPc from '@/pages/web/home/Footer_pc'
export default {
  name: 'ProductPc',
  components: {
    NavPc,
    ProductTop,
    ProductSearch,
    ProductList,
    FooterPc
  },
  data () {
    return {
      topList: {}
    }
  },
  methods: {
    getProductTop () {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/advert/map?pages=PCPRODUCT').then(this.getProductTopScc)
    },
    getProductTopScc (res) {
      const resData = res.data
      if (resData.code === '200' && resData.data) {
        const proTop = resData.data.TOP[0]
        this.topList = proTop
      }
    }
  },
  mounted () {
    this.getProductTop()
  }
}
</script>

<style lang="scss" scoped>
.product {
  background: #fff;
}
</style>
