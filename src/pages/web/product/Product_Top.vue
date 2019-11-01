<template>
  <div class="product-container">
    <div class="top-img">
      <img :src="top.imgUrl" />
    </div>
    <!-- <div class="product-category">
      <h1>产品分类</h1>
      <ul>
        <li :class="{active:index==isShow}" v-for="(item, index) in themeList" :key="index" @click="changeCategory(index,item.categoryId)">
          <img class="default-img" :src="item.imgUrl" />
          <img :class="{activeimg:index==isShow}" class="btn-img" :src="item.selectedImgUrl" />
          <span :class="{activetheme:index==isShow}">{{item.categoryName}}</span>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ProductTop',
  props: {
    top: Object
  },
  data () {
    return {
      isShow: 0,
      themeList: [{
        categoryId: 0,
        categoryName: '全部',
        imgUrl: require('@/assets/image/quanbu-.png'),
        selectedImgUrl: require('@/assets/image/quanbu.png')
      }, {
        categoryId: 1,
        categoryName: '项链',
        imgUrl: require('@/assets/image/xianglian-.png'),
        selectedImgUrl: require('@/assets/image/xianglian.png')
      }, {
        categoryId: 2,
        categoryName: '手链',
        imgUrl: require('@/assets/image/shoulian-.png'),
        selectedImgUrl: require('@/assets/image/shoulian.png')
      }, {
        categoryId: 3,
        categoryName: '耳饰',
        imgUrl: require('@/assets/image/erhuan-.png'),
        selectedImgUrl: require('@/assets/image/erhuan.png')
      }, {
        categoryId: 4,
        categoryName: '戒指',
        imgUrl: require('@/assets/image/jiezhi-.png'),
        selectedImgUrl: require('@/assets/image/jiezhi.png')
      }]
    }
  },
  methods: {
    changeCategory (index, categoryId) {
      this.isShow = index
      console.log(categoryId)
      // this.getProductListPage(categoryId,page,size)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  .top-img {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 20.83%;
    img {
      width: 100%;
    }
  }
}
</style>
