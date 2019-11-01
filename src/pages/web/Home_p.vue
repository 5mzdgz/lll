<template>
  <div class="home">
    <nav-pc></nav-pc>
    <carousel-pc :list="topList"></carousel-pc>
    <popularity-pc></popularity-pc>
    <new-brand-pc :list="newList" :btmList="btmList"></new-brand-pc>
    <footer-pc></footer-pc>
  </div>
</template>

<script>
// import axios from 'axios'
import NavPc from '@/pages/web/home/Nav_pc'
import CarouselPc from '@/pages/web/home/Carousel_pc'
import PopularityPc from '@/pages/web/home/Popularity_Pc'
import NewBrandPc from '@/pages/web/home/NewBrand_pc'
import FooterPc from '@/pages/web/home/Footer_pc'
export default {
  name: 'Home_p',
  components: {
    NavPc,
    CarouselPc,
    PopularityPc,
    FooterPc,
    NewBrandPc
  },
  data () {
    return {
      topList: [],
      newList: {},
      btmList: {}
    }
  },
  methods: {
    // getHomeTop (url, params) {
    getHomeTop () {
      // const self = this
      // self.reqM1Service.get(url, params).then(this.getHomeTopScc)
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/advert/map?pages=PCHOME').then(this.getHomeTopScc)
    },
    getHomeTopScc (res) {
      const resData = res.data
      //console.log(resData)
      if (resData.code === '200' && resData.data) {
        const topData = resData.data.TOP
        const newData = resData.data.NEW
        const btmData = resData.data.BOTTOM
        this.newList = newData[0]
        this.btmList = btmData[0]
        const arrTop = []
        topData.forEach((itemTop) => {
          arrTop.push({imgUrl: itemTop.imgUrl})
        })
        this.topList = arrTop
      }
    }
  },
  mounted () {
    // let url = '/l/v1/advert/map'
    // let params = {
    //   pages: 'PCHOME'
    // }
    // this.getHomeTop(url, params)
    this.getHomeTop()
  }
}
</script>

<style lang="scss" scoped>
.home {
  background: #fff;
}
</style>
