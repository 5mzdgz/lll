<template>
  <div class="detail">
    <nav-pc></nav-pc>
    <detail-top></detail-top>
    <detail-btm></detail-btm>
    <footer-pc></footer-pc>
  </div>
</template>
<script>
import NavPc from '@/pages/web/home/Nav_pc'
import DetailTop from '@/pages/web/detail/Detail_Top'
import DetailBtm from '@/pages/web/detail/Detail_Btm'
import FooterPc from '@/pages/web/home/Footer_pc'
export default {
  name: 'DetailPc',
  components: {
    NavPc,
    DetailTop,
    DetailBtm,
    FooterPc
  },
  data () {
    return {
      plist: []
    }
  },
  methods: {
    productData (id) {
      var purl = '/l/v1/product/base/many?id=' + id
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.getProductList)
    },
    getProductList (res) {
      const resData = res.data
      // console.log(resData)
      if (resData.code === '200' && resData.data) {
        this.plist = resData.data
      }
    }
  },
  created () {
    this.id = this.$route.query.id
    this.productData(this.id)
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background: #fff;
}
</style>
