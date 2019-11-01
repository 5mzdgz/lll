<template>
  <div class="product-box">
    <div class="product-item" v-for="(item) in productList" :key="item.id">
      <router-link :to="'/mobile/detail?id=' + item.id">
        <div class="product-imgs">
          <img v-lazy="item.defaultImgUrl">
        </div>
        <div class="product-item-bottom">
          <p class="product-title">{{item.title}}</p>
          <p class="product-price">￥{{item.nowPrice}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: {
    productList: Array
  }
}
</script>

<style lang="scss" scoped>
.product-box {
  overflow: hidden;
  .product-item {
    position: relative;
    overflow: hidden;
    float: left;
    width: 48%;
    height: 0;
    padding-bottom: 63.2%;
    background-color: #fff;
    margin: 1.3%;
    .product-imgs {
      position: absolute;
      top: 2%;
      left: 0;
      right: 0;
      bottom: 0;
      box-sizing: border-box;
      width: 100%;
      height: 72%;
      img {
        display: block;
        margin: 0 auto;
        height: 100%;
      }
      image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
    }
    .product-item-bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 4%;
      line-height: .4rem;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .product-title {
        margin: 0 .2rem;
        color: rgb(47,47,47);
        font-size: .26rem;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        word-break: break-all;
        -webkit-box-orient:vertical;
        overflow: hidden;
      }
      .product-price {
        color: rgb(150,135,131);
        font-size: .24rem;
      }
    }
  }
  .product-item:nth-child(2n+2) {
    margin-left: 0;
  }
  .product-item:nth-child(n) {
    margin-bottom: 0;
  }
}
</style>
