<template>
  <div class="swiper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="(item, index) in list" :key="index">
        <img :src="item.imgUrl" >
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption1: {
        autoplay: true,
        loop: false
      },
      swiperOption2: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  computed: {
    swiperOption () {
      const len = this.list.length
      if (len === 1) {
        return this.swiperOption1
      } else {
        return this.swiperOption2
      }
    },
    showSwiper () {
      const len = this.list.length
      return len
    }
  }
}
</script>

<style lang="scss">
.swiper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 80%;
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 3px;
  }
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 3px;
    background: #fff;
    opacity: .5;
  }
  .swiper-pagination-bullet-active{
    background:#fff;
    width: .38rem !important;
    opacity: 1;
  }
  img {
    width: 100%;
  }
}
</style>
