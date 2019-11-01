<template>
  <div class="full-page-slide-wrapper">
    <swiper :options="swiperOption" v-if="carousels.length>0" ref="mySwiper">
      <swiper-slide v-for="(item, index) in carousels" :key="index">
        <img :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
var vm = null
export default {
  name: 'MySwiper',
  data () {
    return {
      swiperOption1: {
        direction: 'horizontal',
        autoplay: 5000,
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
      },
      swiperOption2: {
        autoplay: true,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        notNextTick: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
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
              vm.carousel(vm.carousels[realIndex])
            }
        } 
      },
      // swiperSlides: [1, 2, 3, 4],
      activeIndex: 0,
      carousels: [],
    }
  },
  computed: {
    swiperOption () {
      const len = this.carousels.length
      if (len === 1) {
        return this.swiperOption1
      } else {
        return this.swiperOption2
      }
    },
    showSwiper () {
      const len = this.carousels.length
      // console.log(this.list)
      return len
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    vm = this
    this.getHomeTop()
    // this.carousels = this.$store.state.topData
    // console.log(this.carousels)
  },
  methods: {
    carousel(item) {
      let links = item.links
      // console.log(links);
      let count = links.indexOf('/moblie/my/')
      let detail = links.indexOf('/moblie/detail')
      let invitation = links.indexOf('/moblie/my/invitation')
      let loginToken = localStorage.getItem('loginToken')
      let grade = this.$store.state.userData.grade
      if (item.type === 2) {
        //h5个人中心页
        if (count === 0) {
          if (!loginToken) {
            this.$router.push({name: 'Login'})
          } else {
            if (invitation === 0) {
              if (grade === 0) {
                this.$router.push({name: 'WalletResult', params: { flag: 3 }})
              } else {
               this.$router.push(item.links)
              }
            } else {
              this.$router.push(item.links)
            }
          }
        } else {
          // h5序内分类页
          if (detail === 0) {
            let id = links.replace(/[^0-9]/ig, "")
            // console.log(id)
            this.$router.push('/mobile/detail?id=' + id)
          } else {
            this.$router.push(item.links)
          }
        }
      } else if (item.type === 1) {
        //h5以外的页面
        this.$router.push(item.links)
      } else if (item.type === 3) {
        this.$router.push(item.links)
      }
    },
    getHomeTop () {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/advert/map?pages=MOBILE_HOME').then((res) => {
        const resData = res.data
        // console.log(resData)
        if (resData.code === '200') {
          const topData = resData.data.TOP
          // this.$store.dispatch('topData', topData)
          this.carousels = topData
        }
      })
    },
  }
}
</script>

<style lang="scss">
.full-page-slide-wrapper {
  width: 100%;
  height: 4.4rem;
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
      width: calc(100% - 40px);
      border-radius: .2rem;
    }
    .swiper-slide-prev {
      margin-top: 1.02rem;
      height: 75% !important;
    }
    .swiper-slide-next {
      margin-top: 1.02rem;
      height: 75% !important;
    }
  }
  img {
    position: absolute;
    bottom: 0;
    left: 0;
    object-fit: fill;
    height: 100%;
    width: 100%;
    border-radius: .2rem;
  }
  // .slide_dot {
  //   display: inline-block;
  //   margin: 5px;
  //   width: .38rem;
  //   height: 3px;
  //   background-color: #f2f2f2;
  //   border-radius: 50%;
  //   opacity: 0.5;
  // }
  // .swiper-pagination {
  //   bottom: .1rem;
  // }
  // .slide_dot_active {
  //   display: inline-block;
  //   width: .38rem;
  //   height: 3px;
  //   border-radius: 5px;
  //   background: white;
  //   opacity: 1;
  // }
}
.full-page-slide-wrapper {
//   overflow: hidden;
//   width: 100%;
//   height: 0;
//   padding-bottom: 80%;
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 5px;
    margin-bottom: .15rem;
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
