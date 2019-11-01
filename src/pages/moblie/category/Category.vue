<template>
  <div class="category" ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
    <!-- <category-list></category-list> -->
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
      <div class="category-top">
        <dl>
          <dt :class="{active_top:index==topShow}"
            v-for="(category, index) in categoryType"
            @click="changeCategoryType(index)"
            :key="index">{{category.categoryName}}</dt>
        </dl>
      </div>
      <div class="category-bottom">
        <dl>
          <dd :class="sort == '' ? 'active_btm' : '' " data-sort="" @click="changeSort('')">综合</dd>
          <dd :class="sort == 'salesVolume' ? 'active_btm' : '' " data-sort="salesVolume" @click="changeSort('salesVolume')">销量</dd>
          <dd :class="sort == 'newTime' ? 'active_btm' : '' " data-sort="newTime" @click="changeSort('newTime')">新品</dd>
          <dd :class="selectedPrice ? 'active_btm' : '' " data-sort="priceAsc" @click="changePriceSort()">
            <span class="price">价格</span>
            <span class="price-icon">
              <i class="el-icon-caret-top" :class="{active_one:isActive}"></i>
              <i class="el-icon-caret-bottom" :class="{active_one:isSort}"></i>
            </span>
          </dd>
        </dl>
      </div>
      <div class="product-list">
        <products :productList="productList"></products>
        <p class="pmore" v-if="isMore==0">-- 暂无更多商品，敬请期待 --</p>
      </div>
    </mt-loadmore>
     <Tabbar></Tabbar>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import CategoryList from '@/pages/moblie/category/CategoryList'
import Products from '@/pages/moblie/common/Products'
import Tabbar from '@/pages/moblie/common/Tabbar'
export default {
  name: 'Category',
  components: {
    CategoryList,
    Products,
    Tabbar
  },
  data () {
    return {
      categoryType: [],
      topShow: 0,
      selectedPrice: false,
      productList: [],
      // 可以进行上拉
      allLoaded: false,
      // 是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
      isMore: 1,
      page: 1,
      size: 10,
      sort: '',
      isMore: 1,
      isActive: false,
      isSort: false
    }
  },
  watch:{
    $route(to,from){
      // 判断是否显示tabbar
      // if (to.path == '/mobile/detail') {
      //   to.path == '/mobile/category'
      // }
      // console.log(to.path)
    }
  },
  mounted() {
    // this.$store.commit('updateTabbarShow', true)
    // Tabbar.selected = 'category'
    if (this.$route.query.id) {
      this.topShow = this.$route.query.id
    }
    this.getCategoryType()
    this.getProductListPage(this.topShow, this.page, this.size, this.sort)
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
     // 下拉刷新加载
    loadFrist() {
      this.isMore = 1
      this.page = 1
      this.sort = ''
      this.allLoaded = false // 可以进行上拉
      // this.getCategoryType()
      this.getProductListPage(this.topShow, this.page, this.size, this.sort)
      this.$refs.loadmore.onTopLoaded()
    },
    // 加载更多
    loadMore() {
      this.page++
      this.moreProductListPage(this.topShow, this.page, this.size, this.sort)
      this.$refs.loadmore.onBottomLoaded()
    },
    // 获取分类
    getCategoryType () {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/category/all').then(this.getCategoryTypeScc)
    },
    // 切换分类
    changeCategoryType (index) {
      this.productList = []
      this.selectedPrice = false
      this.topShow = index
      this.page = 1
      this.sort = ''
      this.getProductListPage(index, this.page, this.size, this.sort)
    },
    // 排序
    changeSort (sort) {
      if (sort === 'priceDesc' || sort === 'priceAsc') {
        this.selectedPrice = true
      } else {
        this.selectedPrice = false
      }
      this.page = 1
      this.sort = sort
      this.getProductListPage(this.topShow, this.page, this.size, this.sort)
    },
    // 价格排序
    changePriceSort () {
      this.selectedPrice = true
      // console.log(this.selectedPrice)
      this.isActive = !this.isActive
      if (this.isActive) {
        //console.log('降序')
        this.isSort = false
        this.changeSort('priceDesc')
      } else {
        //升序
        //console.log('升序')
        this.isSort = true
        this.changeSort('priceAsc')
      }
    },
    // 获取分类商品
    getProductListPage (index, page, size, sort) {
      Indicator.open({
        text: '加载中...',
        //文字
        spinnerType: 'fading-circle',
        //样式
      })
      let purl = '/l/v1/product/search?page=' + page + '&size=' + size
      if (index !== '' && index > 0) {
        purl += '&categoryId=' + index
      }
      if (sort !== '') {
        purl += '&sort=' + sort
      }
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.getProductListScc)
    },
    // 获取更多商品
    moreProductListPage (categoryId, page, size, sort) {
      var purl = '/l/v1/product/search?page=' + page + '&size=' + size
      if (categoryId !== '' && categoryId > 0) {
        purl += '&categoryId=' + categoryId
      }
      if (sort !== '') {
        purl += '&sort=' + sort
      }
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.moreProductList)
    },
    // 更多回调
    moreProductList (res) {
      const resData = res.data
      //console.log(resData)
      if (resData.code === '200' && resData.data) {
        if (resData.data.length == 0){
          this.isMore = 0
        } else {
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
    // 商品回调
    getProductListScc (res) {
      const resData = res.data
      // console.log(resData)
      if (resData.code === '200' && resData.data) {
        Indicator.close()
        this.productList = resData.data
        this.isMore = 1
      } else{
        Indicator.close()
        this.productList = []
        this.isMore = 0
      }
    },
    // 分类回调
    getCategoryTypeScc (res) {
      const resData = res.data
      // console.log(resData)
      if (resData.code === '200' && resData.data) {
        const categoryData = resData.data
        const arrCategory = {
          id: 0, 
          categoryName: '全部', 
          categoryImgUrl: 'https://img.laoliangli.com/label/home/Whole.png', 
          categoryDescription: 'all',
          level: 1, 
          sort: 0
        }
        // 组装数据
        this.categoryType.push(arrCategory)
        categoryData.forEach((item) => {
          this.categoryType.push(item)
        })
        // console.log(this.categoryType)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  overflow: scroll;
  padding-bottom: 2rem;
  .category-top {
    background-color: #fff;
    dl {
      clear: both;
      overflow: hidden;
      dt {
        float: left;
        width: 20%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .3rem;
        color:#808080;
      }
      .active_top {
        color: #292929;
        font-size: .36rem;
      }
    }
  }
  .category-bottom {
    background: #fff;
    dl {
      background: #f6f6f6;
      border-top-right-radius: .4rem;
      border-top-left-radius: .4rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      dd {
        font-size: .26rem;
        color: #808080;
        flex: 1;
        height: .8rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .price-icon {
          height: .18rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          i {
            font-size: .1rem;
            margin-top: -3px;
          }
          .active_one {
            color: #888;
          }
        }
      }
      .active_btm {
        color: #C26247;
      }
    }
  }
  .product-list {
    background: #f6f6f6;
    text-align: center;
    padding-bottom: .4rem;
    .pmore {
      margin-top: .4rem;
      font-size: .26rem;
    }
  }
}
</style>
