<template>
  <div class="popularity">
    <el-row>
      <el-col :span="24">
        <h1>人气推荐</h1>
      </el-col>
      <el-col :span="24">
        <ul class="popularity-nav">
          <li class="product-btn" :key="index" :class="{active:index==listShow}" v-for="(item, index) in categoryList"  @click="changeProduct(index,item.id)">{{item.categoryName}}</li>
        </ul>
      </el-col>
      <el-col :span="24" class="popularity-slider">
        <div class="swiper-father">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(items, index) in productList" :key="index">
             <a :href="['web/detail?id=' + items.id]"><img :src="items.defaultImgUrl" /></a>
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev"><i class="el-icon-arrow-left"></i></div>
          <div class="swiper-button-next" slot="button-next"><i class="el-icon-arrow-right"></i></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'PopularityPc',
  data () {
    return {
      listShow: 0,
      categoryList: [],
      productList: [],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 4,
        // loop: true,
        loopFillGroupWithBlank: true,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }
      }
    }
  },
  methods: {
    // 获取分类
    getCategoryType () {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/category/all').then(this.getCategoryTypeScc)
    },
    changeProduct (index, categoryId) {
      // console.log(index);
      // console.log(categoryId)
      this.listShow = index
      this.getHomeProduct(categoryId)
    },
    getHomeProduct (categoryId) {
      var purl = '/l/v1/product/search?categoryId=' + categoryId + '&lable=hot&page=1&size=12'
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.getHomeProductList)
    },
    getHomeProductList (res) {
      const resData = res.data
      // console.log(resData)
      if (resData.code === '200' && resData.data) {
        //console.log(resData.data.length)
        if(resData.data.length == 0){
          this.productList = []
        }else{
          this.productList = resData.data
        }
      }else{
        this.productList = []
      }
    },
      // 分类回调
    getCategoryTypeScc (res) {
      const resData = res.data
      // console.log(resData)
      if (resData.code === '200' && resData.data) {
        const categoryData = resData.data
        this.categoryList= categoryData
      }
    }
  },
  mounted () {
    this.getCategoryType()
    this.getHomeProduct(1)
  }
}
</script>

<style lang="scss" scoped>
.popularity {
  user-select: none;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 100px;
  h1 {
    padding: 100px 0 100px 0;
    font-size: 32px;
    font-size: #2c2c2c;
    height: 60px;
    line-height: 60px;
    letter-spacing: 32px;
    text-align: center;
  }
  .product-btn {
    color: #5d5d5d;
    float: left;
    font-size: 16px;
    padding-right: 60px;
    height: 16px;
    line-height: 16px;
    padding-bottom: 60px;
    cursor: pointer;
  }
  .active {
    font-size: 24px;
    color: #252525;
  }
  .popularity-slider {
    overflow: hidden;
    width: 100%;
    height: 0;
    // height: 15vw;
    padding-bottom: 23.84%;
    .swiper-father{
      .swiper-button-next {
        background-color: rgb(143, 141, 141);
        right: -100px;
      }
      .swiper-button-prev {
        left: -100px;
        font-size: 50px;
        color: #fff;
        background-color: rgb(231, 228, 228);
        width: 60px;
        height: 60px;
        border-radius: 30px;
        opacity: .5;
        margin-top: -32px;
        &:hover {
          background-color:rgb(143, 141, 141);
          opacity: .5;
        }
        i {
          margin: 5px 0 0 5px;
        }
      }
      .swiper-button-next{
        font-size: 50px;
        color: #fff;
        background-color: rgb(143, 141, 141);
        width: 60px;
        height: 60px;
        border-radius: 30px;
        opacity: .5;
        margin-top: -32px;
        i {
          margin: 5px 0 0 5px;
        }
      }
      .swiper-button-next,
      .swiper-button-prev{
        outline:0 none !important;
        // blr:expression(this.onFocus=this.blur());
        background-image: none;
        top: 75%;
      }
    }
    img {
      width: 100%;
      &:hover {
        cursor: pointer;
        border-radius: 1px solid #e5e5e5;
      }
    }
  }
}
</style>
