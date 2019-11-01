<template>
  <div class="detail-btm">
    <!-- <div class="my-like">
      <h4>你可能喜欢</h4>
      <ul>
        <li><img src="@/assets/image/product_38.gif" /></li>
        <li><img src="@/assets/image/product_38.gif" /></li>
        <li><img src="@/assets/image/product_38.gif" /></li>
        <li><img src="@/assets/image/product_38.gif" /></li>
        <li><img src="@/assets/image/product_38.gif" /></li>
        <li><img src="@/assets/image/product_38.gif" /></li>
      </ul>
    </div>-->
    <!-- <div class="series">
      <img src="@/assets/image/product_btm.png" />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'DetailBtm'
}
</script>

<style lang="scss" scoped>
.detail-btm {
  max-width: 1200px;
  margin: 0 auto;
  .my-like {
    margin: 100px 0;
    width: 1164px;
    height: 234px;
    background-color: #f7f7f7;
    padding: 18px 18px 0 18px;
    :last-child {
      margin-right: 0px;
    }
    h4 {
      font-size: 18px;
      color: #2C2C2C;
      padding-bottom: 18px;
    }
    li {
      float: left;
      margin-right: 16px;
      img {
        width: 180px;
        height: 180px;
        &:hover {
          border: 1px solid #f8f6f6;
          cursor: pointer;
        }
      }
    }
  }
  .series {
    margin-bottom: 100px;
  }
}
</style>
