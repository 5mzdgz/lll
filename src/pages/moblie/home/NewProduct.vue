<template>
  <div class="new">
    <div class="new-box">
      <ul class="new-title-box">
        <li class="line"></li>
        <li class="new-title">新品上线</li>
        <li class="line"></li>
      </ul>
      <p class="new-bottom">New products</p>
    </div>
    <div class="new-product">
      <swiper :options="swiperOption" v-if="newCarousels.length>0" ref="newSwiper">
        <swiper-slide v-for="(item, index) in newCarousels" :key="index">
          <div class="img-box">
            <img :src="item.defaultImgUrl" />
          </div>
          <div class="product-info">
            <p class="title">{{item.title}}</p>
            <p class="price">￥{{item.nowPrice}}</p>
          </div>
        </swiper-slide>
        <!-- <div class="swiper-pagination"  slot="pagination"></div> -->
      </swiper>
    </div>
  </div>
</template>

<script>
var vm = null
export default {
  name: 'NewProduct',
  data () {
    return {
      swiperOption1: {
        autoplay: false,
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 40,
      },
      swiperOption2: {
        autoplay: false,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 40,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // },
        notNextTick: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        // autoplay: {
        //   delay: 5000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false,
        // },
        // 设置轮播
        effect: '',
        //滑动速度
        speed: 800,
        //滑动方向
        direction: 'horizontal',
        //小手掌抓取滑动
        // grabCursor : true,
        //滑动之后回调函数
        on: {
            slideChangeTransitionEnd: function() {
                // console.log(this.activeIndex)
                //切换结束时，告诉我现在是第几个slide
                //                             const realIndex = this.activeIndex;
                //                             vm.carousel(realIndex);
            },
            click: function() {
              // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法 
              // console.log(this); // -> Swiper
              // 当前活动块的索引，与activeIndex不同的是，在loop模式下不会将 复制的块 的数量计算在内。
              // console.log('ss'+this.realIndex)
              const realIndex = this.realIndex
              vm.newCarousel(vm.newCarousels[realIndex])
            }
        } 
      },
      activeIndex: 0,
      newCarousels:[]
    }
  },
  mounted () {
    vm = this
    this.getNewproducts('new', 1, 12)
  },
  computed: {
    swiperOption () {
      const len = this.newCarousels.length
      if (len === 1) {
        return this.swiperOption1
      } else {
        return this.swiperOption2
      }
    },
    showSwiper () {
      const len = this.newCarousels.length
      return len
    },
    swiper() {
      return this.$refs.newSwiper.swiper
    }
  },
  methods: {
    newCarousel(item) {
      this.$router.push('/mobile/detail?id=' + item.id)
    },
    getNewproducts(lable, page, size) {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/product/search?lable=' + lable + '&page=' + page + '&size=' + size).then((res) => {
        if (res.data.code === '200') {
          const newData = res.data.data
          // console.log(newData)
          this.newCarousels = newData
          // this.$store.dispatch('newData', newData)
        }
      })
    },
  }
}
</script>

<style lang="scss">
.new {
  .new-box {
    background: #fff;
    .new-title-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-top: .1rem;
      .line {
        width: 1.07rem;
        height: .02rem;
        background: #707070;
      }
      .new-title {
        font-size: .26rem;
        padding: 0 .16rem;
      }
    }
    p {
      margin-top: .05rem;
      text-align: center;
      font-size: .16rem;
    }
  }
  .new-product {
    width: 100%;
    height: 5rem;
    background: white;
    box-sizing: content-box;
    position: relative;
    overflow: hidden;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        display: flex;
        align-items: center;
      }
      .swiper-slide {
        width: calc(100% - 160px);
        border-radius: .2rem;
      }
      .swiper-slide-prev {
        margin-top: .5rem;
        height: 90% !important;
        img {
          height: 90%;
        }
      }
      .swiper-slide-next {
        margin-top: .5rem;
        height: 90% !important;
        img {
          height: 90%;
        }
      }
    }
    .img-box {  
      position: absolute;
      bottom: 1rem;
      left: 0;
      border-radius: .2rem;
      box-shadow: 0px .06rem .12rem rgba(0,0,0,0.15);
      height: 78%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        object-fit: fill;
        width: 100%;
        border-radius: .2rem;
      }
    }
    .product-info {
      position: absolute;
      bottom: .2rem;
      left: 0;
      width: 100%;
      text-align: center;
      .title {
        font-size: .22rem;
        padding: .1rem 0;
        width: 100%;
        color: #2F2F2F;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        word-break: break-all;
        -webkit-box-orient:vertical;
        overflow: hidden;
      }
      .price {
        font-size: .18rem;
        color: #968783;
      }
    }
  }
}
</style>
