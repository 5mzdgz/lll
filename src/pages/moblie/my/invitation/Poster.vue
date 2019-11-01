<template>
    <div class="poster">
        <div v-if="isShow">
			<div :class="{opation_box: isShow}" @click="handleShow"></div>
            <div :class="{server_box: isShow}">
				<div class="swiper">
                    <swiper :options="swiperOption" v-if="showSwiper">
                    <swiper-slide v-for="(item, index) in posters" :key="index">
                        <img :src="item.imgUrl" >
                    </swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                    </swiper>
                </div>
                <button @click="savePoster">保存</button>
                <p><i class="el-icon-circle-close" @click="isShow = false"></i></p>
            </div>
		</div>
    </div>
</template>

<script>
let vm = this
export default {
  name: 'Poster',
  data () {
    return {
        isShow: false,
        index: 0,
        posters: [],
        swiperOption1: {
            autoplay: false,
            loop: false,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 30,
        },
        swiperOption2: {
            autoplay: false,
            loop: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            on: {
                slideChangeTransitionEnd: function(swiper) {
                    vm.index = this.realIndex
                    // console.log(vm.index)
                }
            },
        }
    }
  },
  computed: {
    swiperOption () {
      const len = this.posters.length
      if (len === 1) {
        return this.swiperOption1
      } else {
        return this.swiperOption2
      }
    },
    showSwiper () {
      const len = this.posters.length
      return len
    }
  },
  mounted () {
      this.getPosters()
  },
  methods: {
        handleShow () {
            this.isShow = true
        },
        /**
         * 获取海报背景图
         */
        getPosters () {
            this.axios.get(this.domain.Base_M1_URL + '/l/v1/advert/map?pages=INVITE_USER').then((res) => {
                if (res.data.code === '200') {
                    // console.log(res.data.data.INVITE_CENTER)
                    this.posters = res.data.data.INVITE_CENTER
                }
            })
        },
        /**
         * 保存海报
         */
        savePoster () {
            let savePosterBg = this.posters[vm.index].imgUrl
            // console.log(savePosterBg)
        }
	}
}
</script>

<style lang="scss">
.opation_box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #000;
    opacity: .4;
    z-index: 10;
}
.server_box {
    position: fixed;
    bottom: 8%;
    left: 0;
    width: 100%;
    z-index: 999;
    text-align: center;
    button {
        width: 3.6rem;
        height: .62rem;
        color: #fff;
        background: #EC4E4E;
    }
    p {
        i {
            font-size: .6rem;
            color: #fff;
            margin-top: .5rem;
        }
    }
    .swiper {
        width: 100%;
        height: 7.5rem;
        background: none;
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

            height: 72% !important;
        }
        .swiper-slide-next {
            height: 72% !important;
        }
        }
        img {
        position: absolute;
        bottom: .6rem;
        left: 0;
        object-fit: fill;
        height: 90%;
        width: 100%;
        border-radius: .2rem;
        }
        .product-info {
        position: absolute;
        bottom: .1rem;
        left: 0;
        width: 100%;
        text-align: center;
        .title {
            font-size: .22rem;
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
            margin-top: .1rem;
            font-size: .18rem;
            color: #968783;
        }
        }
    }
    .swiper {
    overflow: hidden;
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
}
</style>
