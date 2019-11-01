<template>
  <div>
    <div class="product-category">
      <h1>产品分类</h1>
      <ul>
        <li :class="{active:index==isShow}" v-for="(item, index) in themeList" :key="index" @click="changeCategory(index,item.id)">
          <img class="default-img" :src="item.categoryImgUrl" />
          <!-- <img :class="{activeimg:index==isShow}" class="btn-img" :src="item.selectedImgUrl" /> -->
          <span :class="{activetheme:index==isShow}">{{item.categoryName}}</span>
        </li>
      </ul>
    </div>
    <div class="product-search">
      <div class="product-nav">
        <ul>
          <li class="choice">筛选:</li>
          <li data-sort="newTime" @click="changeSort('newTime')">新品</li>
          <li data-sort="salesVolume" @click="changeSort('salesVolume')">人气</li>
          <li class="price" data-sort="priceAsc" @click="changePriceSort()">价格
            <i class="el-icon-caret-top" :class="{active_one:isActive}"></i>
            <i class="el-icon-caret-bottom" :class="{active_one:isSort}"></i>
          </li>
          <!-- <li class="search">
            <input type="text" placeholder="输入饰品名称">
            <i class="el-icon-search"></i>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="product-conter">
      <div class="product-list">
          <div class="list-cantainer" v-for="(items, index) in plist" :key="index">
            <a :href="['/web/detail?id=' + items.id]">
            <img :src="items.defaultImgUrl" />
            <h4>{{items.title}}</h4>
            <p>
              <span class="symbol">￥</span>
              <span>{{items.nowPrice}}</span>
            </p>
            </a>
          </div>
      </div>
      <p class="pmore" v-if="plist.length==0  || isMore==0">-- 暂无更多商品，敬请期待 --</p>
      <button :class="{active_btn:isBoder}" @click="handleMore" v-if="plist.length>0 && isMore==1">更多</button>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data () {
    return {
      isBoder: false,
      categoryId: 0,
      page: 1,
      size: 12,
      sort: '',
      plist: [],
      isShow: 0,
      isActive: false,
      isSort: false,
      isMore: 1,
      themeList: []
    }
  },
  methods: {
    // 获取分类
    getCategoryType () {
      this.axios.get(this.domain.Base_M1_URL + '/l/v1/category/all').then(this.getCategoryTypeScc)
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
        this.themeList.push(arrCategory)
        categoryData.forEach((item) => {
          this.themeList.push(item)
        })
        // console.log(this.categoryType)
      }
    },
    // 却换分类
    changeCategory (index, categoryId) {
      // console.log(index)
      // console.log(categoryId)
      this.categoryId = categoryId
      this.isShow = index
      this.page = 1
      this.sort = ''
      this.isActive = false
      this.isSort = false
      this.getProductListPage(categoryId, this.page, this.size, this.sort)
    },
    changeSort (sort) {
       this.page = 1
       this.sort = sort
       this.getProductListPage(this.categoryId, this.page, this.size, this.sort)
    },
    // 价格排序
    changePriceSort () {
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
    // 跳转详情
    productDetail () {
      this.$router.go('/detail_pc')
    },
    // 点击更多
    handleMore (categoryId) {
      this.isBoder = true
      // console.log(this.page)
      this.page = this.page + 1
      // console.log(this.page)
      this.moreProductListPage(this.categoryId, this.page, this.size, this.sort)
    },
    getProductListPage (categoryId, page, size, sort) {
      var purl = '/l/v1/product/search?page=' + page + '&size=' + size
      if (categoryId !== '' && categoryId > 0) {
        purl += '&categoryId=' + categoryId
      }
      if(sort !== ''){
        purl += '&sort=' + sort
      }
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.getProductList)
    },
    getProductList (res) {
      const resData = res.data
      if (resData.code === '200' && resData.data) {
        this.plist = resData.data
        this.isMore = 1
      } else{
        this.plist = []
        this.isMore=0
      }
      //console.log(this.plist)
    },
    moreProductListPage (categoryId, page, size, sort) {
      var purl = '/l/v1/product/search?page=' + page + '&size=' + size
      if (categoryId !== '' && categoryId > 0) {
        purl += '&categoryId=' + categoryId
      }
      if(sort !== ''){
        purl += '&sort=' + sort
      }
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.moreProductList)
    },
    moreProductList (res) {
      const resData = res.data
      //console.log(resData)
      if (resData.code === '200' && resData.data) {
        if(resData.data.length == 0){
          this.isMore = 0
        }else{
          this.isMore = 1
          resData.data.forEach((prod) => {
            this.plist.push(prod)
          })
        }
      } else {
        console.log('显示没有更多了')
        this.isMore = 0
        // 显示没有更多了
      }
    }
  },
  mounted () {
    this.getProductListPage(this.categoryId, this.page, this.size, this.sort)
    this.getCategoryType()
  }
}
</script>

<style lang="scss" scoped>
$pro-color: #2c2c2c;
.product-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  h1 {
    font-size: 32px;
    color: $pro-color;
    height: 32px;
    line-height: 32px;
    padding: 100px 0;
    letter-spacing: 20px;
  }
  ul {
    width: 790px;
    text-align: center;
    overflow: hidden;
    li {
      position: relative;
      width: 76px;
      height: 110px;
      margin: 0 40px;
      float: left;
      cursor: pointer;
      span {
        font-size: 16px;
        color: $pro-color;
        height: 16px;
        line-height: 16px;
      }
      // span:hover {
      //   color: #8e7c77;
      // }
      .activetheme {
        color: #8e7c77;
        font-size: 16px;
        height: 16px;
        line-height: 16px;
      }
      .default-img {
        width: 58px;
        height: 58px;
        padding: 8px 8px 12px 8px;
      }
      .btn-img {
        position: absolute;
        left: 0;
        top: 0;
        display: none;
        width: 58px;
        height: 58px;
        padding: 8px 8px 12px 8px;
      }
      .activeimg {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 58px;
        height: 58px;
        padding: 8px 8px 12px 8px;
      }
    }
    // li:hover {
    //   background: #f8f5f4;
    //   border: 1px solid #8e7c77;
    //   border-radius: 5px;
    //   color: #8e7c77;
    // }
  }
  .active {
    background: #f8f5f4;
    border: 1px solid #8e7c77;
    border-radius: 5px;
  }
}

.product-search {
  overflow: hidden;
  height: 32px;
  max-width: 1200px;
  padding-top: 100px;
  margin: 0 auto;
  .product-nav {
    ul {
      user-select: none;
      min-width: 780px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      :hover {
        background: #f8f5f4;
        border: 1px solid #8e7c77;
        color: #8e7c77;
      }
      .choice {
        background: none;
        width: 40px;
        background: none;
        border: none;
      }
      .choice:hover {
        background: none;
      }
      .search {
        width: 240px;
        float: right;
        border: none;
        margin-right: 2px;
      }
      .price {
        width: 70px;
        padding-right: 10px;
      }
      li {
        position: relative;
        float: left;
        width: 82px;
        border-radius: 15px;
        background: #f5f5f5;
        margin-right: 14px;
        cursor: pointer;
        input {
          width: 210px;
          background: #f5f5f5;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          padding: 0 15px;
          font-size: 14px;
          color:#8f8f8f;
        }
        i {
          z-index: 999;
          margin-left: 8px;
        }
        i:hover {
          color: #333;
          border: none;
        }
        .el-icon-caret-top {
          position: absolute;
          top: 5px;
          right: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          width: 14px;
          height: 14px;
          bottom: 5px;
          right: 10px;
        }
        .el-icon-caret-top,.el-icon-caret-bottom:hover {
          border: none;
          background: none;
        }
        .el-icon-search {
          position: absolute;
          top: 7px;
          right: 15px;
          font-size: 16px;
          width: 16px;
        }
        .active_one {
          color: #ababab;
        }
      }
    }
  }
}

.product-list {
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
  min-width: 912px;
  padding: 60px 20px 0 20px;
  .list-cantainer {
    user-select: none;
    width: 286px;
    height: 342px;
    text-align: center;
    margin-bottom: 53px;
    float: left;
    margin-right: 18px;
    img {
      width: 284px;
      height: 284px;
      border: 1px solid #e5e5e5;
      margin-bottom: 7px;
    }
    h4, p {
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      color: #2c2c2c;
      .symbol {
        font-size: 12px;
        color: #949494;
      }
    }
  }
}
button {
  margin-left: 47%;
  width: 94px;
  height: 28px;
  border: 1px solid #e5e5e5;
  margin-bottom: 60px;
  cursor: pointer;
}
.pmore {
  margin-left: 47%;
  margin-bottom: 60px;
}
.active_btn {
  background: #f8f5f4;
  border: 1px solid #8e7c77;
}
@media (min-width: 1200px) {
  .list-cantainer:nth-child(4n+4){
    margin-right: 0;
  }
}
</style>
