<template>
  <div class="detail-product">
    <div class="product-box" v-for="(item, index) in productList" :key="index">
      <img :src="item.imgUrl" alt="">
      <div class="product-info">
        <div class="product-left">
          <p>{{item.title}}</p>
          <span v-for="(attrs, key) in item.attributesMap" :key="key">{{key}}: {{attrs}}</span>
        </div>
        <div class="product-right">
          <p><span>￥</span>{{item.price}}</p>
          <span>x{{item.commodityNum}}</span>
        </div>
      </div>
    </div>
    <div class="total-box">
      <div class="total-item">
        <span class="label">商品总额</span>
        <p>
          <span class="symbol">￥</span>
          <span class="price">{{orderData.total}}</span>
        </p>
      </div>
      <div class="total-item">
        <span class="label">运费</span>
        <p>
          <span class="symbol">￥</span>
          <span class="price">0.00</span>
        </p>
      </div>
      <div class="total-item">
        <span class="label">优惠</span>
        <p>
          <span class="symbol">￥</span>
          <span class="price">{{orderData.offer | floatTotal}}</span>
        </p>
      </div>
      <div class="total">
        <span class="label">金额合计</span>
        <p>
          <span class="symbol">￥</span>
          <span class="price">{{orderData.total | floatTotal}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailProduct',
  props: {
    orderData: Object,
    productList: Array
  }
}
</script>

<style lang="scss" scoped>
.detail-product {
  overflow: hidden;
  width: 95.2%;
  background: #fff;
  margin: .2rem .16rem;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.04);
  border-radius: .08rem;
  .product-box {
    overflow: hidden;
    margin: 0 .2rem .22rem .2rem;
    padding: .22rem 0;
    clear: both;
    border-bottom: 1px solid #eee;
    img {
      width: 1.3rem;
      height: 1.3rem;
      float: left;
    }
    .product-info {
      overflow: hidden;
      .product-left {
        float: left;
        padding-left: .18rem;
        p {
          width: 3.2rem;
          height: .56rem;
          font-size: .2rem;
          line-height: .28rem;
          color:#1E1E1E;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          word-break: break-all;
          -webkit-box-orient:vertical;
          overflow: hidden;
        }
        span {
          color:#6b6b6b;
          font-size: .18rem;
        }
      }
      .product-right {
        color:#6b6b6b;
        float: right;
        text-align: right;
        p {
          height: .32rem;
          font-size: .22rem;
          line-height: .32rem;
          span {
            font-size: .14rem;
          }
        }
        span {
          font-size: .14rem;
        }
      }
    }
  }
  .total-box {
    margin: .1rem .2rem;
    .total-item, .total{
      height: .4rem;
      font-size: .18rem;
      line-height: .4rem;
      color:#6B6B6B;
      overflow: hidden;
      clear: both;
      p {
        float: right;
        text-align: right;
        .symbol {
          font-size: .14rem;
        }
        .price {
          font-size: .18rem;
        }
      }
    }
    .total {
      padding-top: .2rem;
      border-top: 1px solid #eee;
      span {
        font-size: .2rem;
      }
      p {
        color: #EC4E4E;
        .price {
          font-size: .24rem;
        }
      }
    }
  }
}
</style>

