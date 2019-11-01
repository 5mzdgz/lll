<template>
  <div class="coo-content">
    <div class="coo-top">
      <img src="@/assets/image/cooperation/banner_3.png" alt="">
    </div>
    <div class="coo-middle">
      <div class="coo-cooper">
        <img src="@/assets/image/cooperation/Brand_cooperation.gif" alt="">
      </div>
      <div class="coo-info">
        <h2>品牌合作</h2>
        <div class="coo-emtpy"></div>
        <div class="info-p">
          <p>老良利珠宝，坚持传承纯手工艺与国际时尚珠宝设计理念相结合</p>
          <p>致力为每一位用户带来时尚珠宝的新体验</p>
          <p>我们诚心邀请您参与优质合作计划，为品牌增添更多的光芒与活力</p>
        </div>
      </div>
    </div>
    <div class="coo-bottom">
      <p class="address"><img src="@/assets/image/cooperation/headimg_icon.png" alt="">联系人：胡先生</p>
      <p><img src="@/assets/image/cooperation/Telephone.gif" alt="">联系热线：0755-28914801</p>
      <p class="address"><img src="@/assets/image/cooperation/address.gif" alt=""> 地址：深圳市龙岗区横岗街道六和路宝润发工业村1栋3楼</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CooContent'
}
</script>

<style lang="scss" scoped>
$coo-color: #3d3d3d;
.coo-content {
  .coo-top {
    overflow: hidden;
    height: 0;
    width: 100%;
    padding-bottom: 20.83%;
    img {
      width: 100%;
    }
  }
  .coo-middle {
    position: relative;
    // height: 442px;
    min-width: 1200px;
    .coo-cooper {
      overflow: hidden;
      height: 0;
      width: 100%;
      padding-bottom: 23.21%;
      img {
        width: 100%;
      }
    }
    .coo-info {
      position: absolute;
      top: 0;
      left: 0;
      text-align: right;
      width: 30%;
      padding: 10% 0 0 22%;
      h2 {
        font-size: 24px;
        margin-bottom: 40px;
      }
      .coo-emtpy {
        float: right;
        height: 4px;
        width: 40px;
        background-color: $coo-color;
        margin-bottom: 40px;
      }
      .info-p {
        float: right;
        p {
          width: 560px;
          font-size: 16px;
          color: $coo-color;
          height: 28px;
          line-height: 28px;
        }
      }
    }
  }
  .coo-bottom {
    margin: 0 auto;
    width: 1200px;
    margin-top: 100px;
    padding: 100px 0;
    border-top: 1px solid #f6f6f6;
    p {
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      color: $coo-color;
      margin-bottom: 22px;
      img {
        padding-right: 10px;
        width: 20px;
        height: 18px;
      }
    }
    .address {
      // margin-bottom: 22px;
      img {
        width: 16px;
        height: 20px;
      }
    }
  }
}
@media (max-width: 1920px) {
  .coo-info {
    padding: 10% 0 0 22%;
  }
}
</style>
