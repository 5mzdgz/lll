<template>
  <div class="home" ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
      <my-swiper></my-swiper>
      <new-product></new-product>
      <div class="recommend">
        <h2>
          <div class="recommed-icon"></div>
          <span>热销推荐</span>
        </h2>
        <div class="products">
          <products :productList="productList"></products>
        </div>
        <p class="pmore" v-if="isMore==0">-- 暂无更多商品，敬请期待 --</p>
      </div>
    </mt-loadmore>

    <mt-popup
      v-model="invitetionVisible"
      popup-transition="popup-fade">
      <div class="home-invitetion">
        <router-link :to="{name: 'Login'}">
          <img src="https://img.laoliangli.com/label/invitation/invitation_tips.png" alt="" />
        </router-link>
      </div>
    </mt-popup>

    <Tabbar></Tabbar>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import MySwiper from '@/pages/moblie/common/MySwiper'
import NewProduct from '@/pages/moblie/home/NewProduct'
import Products from '@/pages/moblie/common/Products'
import Tabbar from '@/pages/moblie/common/Tabbar'
export default {
  name: 'Home',
  components: {
    MySwiper,
    NewProduct,
    Products,
    Tabbar
  },
  data () {
    return {
      // topList: [],
      // categroyArr:[],
      productList: [],
      // 可以进行上拉
      allLoaded: false,
      // 是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
      isMore: 1,
      page: 1,
      size: 10,
      lable: 'hot',
      invitetionVisible: false
    }
  },
  created() {
    // this.loadFrist()
    if (this.$route.query.scene) {
      const scene = JSON.parse(this.$route.query.scene)
      this.$store.dispatch('addInviteUser', scene)
      if (scene > 0) {
        this.invitetionVisible = true
      }
    }
  },
  mounted () {
    // 父控件要加上高度，否则会出现上拉不动的情况
    // this.getHomeCategory()
    this.loadFrist()
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    // console.log(this.wrapperHeight)
  },
  methods: {
    // 下拉刷新
    loadTop() {
      this.loadFrist()
    },
    // 上拉加载
    loadBottom() {
      this.loadMore()
    },
    // 下来刷新加载
    loadFrist() {
      this.isMore = 1
      this.page = 1
      this.allLoaded = false // 可以进行上拉
      // this.getHomeTop()
      this.getHomeRecommend(this.lable, this.page, this.size)
      // this.getNewproducts('new', this.page, 12)
      this.$refs.loadmore.onTopLoaded()
    },
    // 加载更多
    loadMore() {
      this.page++
      this.moreHomeRecommend(this.lable, this.page, this.size)
      this.$refs.loadmore.onBottomLoaded()
    },
    // banner轮播图
    getHomeTop () {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/advert/map?pages=MOBILE_HOME').then(this.getHomeTopScc)
    },
    // 分类tabbar
    getHomeCategory () {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/category/all').then(this.getHomeCategoryScc)
    },
    /**
     * 获取新品上线
     */
    getNewproducts(lable, page, size) {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/product/search?lable=' + lable + '&page=' + page + '&size=' + size).then((res) => {
        if (res.data.code === '200') {
          const newData = res.data.data
          console.log(newData)
          this.$store.dispatch('newData', newData)
        }
      })
    },
    // 热门推荐
    getHomeRecommend (lable, page, size) {
      Indicator.open({
        text: '加载中...',
        //文字
        spinnerType: 'fading-circle',
        //样式
      })
      var purl = '/l/v1/product/search?lable='+ lable + '&page=' + page + '&size=' + size
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.getHomeRecommendScc)
    },
    // 加载更多商品
    moreHomeRecommend (lable, page, size) {
      var purl = '/l/v1/product/search?lable='+ lable + '&page=' + page + '&size=' + size
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.moreHomeRecommendScc)
    },
    // 更多回调
    moreHomeRecommendScc (res) {
      const resData = res.data
      if (resData.code === '200' && resData.data) {
        if(resData.data.length == 0){
          this.isMore = 0
          this.allLoaded = true
        }else{
          this.isMore = 1
          resData.data.forEach((prod) => {
            this.productList.push(prod)
          })
        }
      } else {
        // console.log('显示没有更多了')
        this.isMore = 0
        // 显示没有更多了
      }
    },
    // banner轮回调
    getHomeTopScc (res) {
      const resData = res.data
      // console.log(resData)
      if (resData.code === '200' && resData.data) {
        const topData = resData.data.TOP
        this.$store.dispatch('topData', topData)
        this.topList = topData
      }
    },
    // 分类tabbar
    getHomeCategoryScc (res) {
       const resData = res.data
      // console.log(resData)
      if (resData.code === '200' && resData.data) {
        const categoryData = resData.data
        // console.log(categoryData)
        const arrCategory = {
          id: 0, 
          categoryName: '全部', 
          categoryImgUrl: 'https://img.laoliangli.com/label/home/Whole.png', 
          categoryDescription: 'all',
          level: 1, 
          sort: 0
        }
        // 组装数据
        this.categroyArr.push(arrCategory)
        categoryData.forEach((item) => {
          this.categroyArr.push(item)
        })
        // console.log(this.categroyArr)
      }
    },
    // 热门推荐
    getHomeRecommendScc (res) {
       const resData = res.data
      // console.log(resData)
      if (resData.code === '200') {
        Indicator.close()
        const categoryData = resData.data
        // console.log(categoryData)
        this.productList = categoryData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #fff;
  overflow: scroll;
  .recommend {
    text-align: center;
    padding: 0 .48rem 1.2rem .48rem;
    h2 {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: .3rem 0;
      .recommed-icon {
        width: .24rem;
        height: .12rem;
        background-color: #D7D0CD;
        margin-right: .1rem;
      }
      span {
        font-size: .26rem;
        letter-spacing: .03rem;
        text-align: center;
        color: rgb(30, 30, 30);
        background-color: #fff;
      }
    }
    .products {
      background: #fff;
    }
    .pmore {
      margin-top: .4rem;
      font-size: .26rem;
    }
  }
  .mint-popup {
    background: none;
    .home-invitetion {
      width: 5rem;
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
