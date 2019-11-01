<template>
  <div class="carousel">
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
  name: 'AboutPc',
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
.carousel {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 38.5%;
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 9px;
  }
  .swiper-pagination-bullet {
    width: 20px;
    height: 4px;
    display: inline-block;
    border-radius: 2px;
    background: #e9dedb;
  }
  .swiper-pagination-bullet-active{
    background:#8e7c77;
    width: 20px !important;
  }
  img {
    width: 100%;
  }
}
</style>
