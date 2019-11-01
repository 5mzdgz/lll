<template>
  <div class="pay-product">
    <div class="product-box" v-for="(item, index) in payProduct" :key="index">
      <img :src="item.defaultImgUrl" alt="">
      <div class="product-info">
        <p class="product-title">{{item.title}}</p>
        <p class="product-price">￥{{item.nowPrice}}</p>
        <p class="product-count">x{{item.qty}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayProduct',
  data () {
    return {
      payProduct: []
    }
  },
  created () {
    this.payProduct = this.$store.state.payData.cpList
  }
}
</script>

<style lang="scss" scoped>
.pay-product {
  overflow: hidden;
  width: 100%;
  background: #fff;
  margin: .2rem 0;
  .product-box {
    display: flex;
    flex-direction: row;
    padding: .39rem .26rem;
    img {
      width: 1.3rem;
      height: 1.3rem;
    }
    .product-info {
      overflow: hidden;
      width: 100%;
      position: relative;
      padding-left: .4rem;
      .product-title {
        width: 4rem;
        font-size: .3rem;
        color:#313131;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        word-break: break-all;
        -webkit-box-orient:vertical;
        overflow: hidden;
      }
      .product-price {
        overflow: hidden;
        position: absolute;
        left: .4rem;
        bottom: 0;
        font-size: .28rem;
        color: #E72C2C;
      }
      .product-count {
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>

