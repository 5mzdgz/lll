<template>
  <div class="detail-address">
    <div class="address-box">
      <p class="user-info">
        <i class="el-icon-location-outline"></i>
        <span class="user-name">{{orderData.userName}}</span>
        <span class="phone">{{orderData.userPhone}}</span>
      </p>
      <p class="user-address">{{orderData.province}} {{orderData.city}} {{orderData.area}} {{orderData.address}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailAddress',
  props: {
    orderData: Object
  }
}
</script>

<style lang="scss" scoped>
.detail-address {
  overflow: hidden;
  width: 95.2%;
  height: 0;
  padding-bottom: 17.07%;
  background: #fff;
  margin: .2rem .16rem;
  box-shadow:0px 2px 6px rgba(0,0,0,0.04);
  border-radius: .08rem;
  .address-box {
    padding: .26rem .1rem;
    .user-info {
      font-size: .24rem;
      padding-bottom: .16rem;
      overflow: hidden;
      clear: both;
      .user-name {
        padding-left: .1rem;
      }
      .phone {
        float: right;
      }
    }
    .user-address {
      font-size: .16rem;
      padding-top: 2px;
      color: #707070;
      padding-left: .4rem;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      word-break: break-all;
      -webkit-box-orient:vertical;
      overflow: hidden;
    }
  }
}
</style>
