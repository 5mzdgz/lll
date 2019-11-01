<template>
  <div class="pay-address">
    <router-link :to="'/mobile/address?flag=1'" v-if="$store.state.checkedAddress">
      <div class="address-item">
        <p class="address-left">
          <i class="el-icon-location-outline"></i>
          <span class="user-name">{{$store.state.checkedAddress.userName}}</span>
          <span class="phone">{{$store.state.checkedAddress.userPhone}}</span>
          <span class="detail-address">{{$store.state.checkedAddress.province}}{{$store.state.checkedAddress.city}}{{$store.state.checkedAddress.area}}{{$store.state.checkedAddress.address}}</span>
        </p>
        <i class="el-icon-arrow-right"></i>
      </div>
    </router-link>
    <router-link to="/mobile/address/newaddress" v-else>
      <div class="address-box">
        <span class="add">+</span>
        <span class="add-address">添加收货地址</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'PayAddress',
  mounted () {
    // console.log()
  }
}
</script>

<style lang="scss" scoped>
.pay-address {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 18.67%;
  background: #fff;
  .address-box {
    padding: .4rem .2rem;
    overflow: hidden;
    clear: both;
    .add {
      font-size: .24rem;
      padding: .19rem .21rem;
      background: #f6f6f6;
      margin-right: .3rem;
    }
    .add-address {
      font-size: .3rem;
      color: #1e1e1e;
    }
    i {
      float: right;
    }
  }
  .address-item {
    padding: .3rem .2rem;
    overflow: hidden;
    clear: both;
    .address-left {
      overflow: hidden;
      clear: both;
      width: 95%;
      float: left;
      font-size: .3rem;
      color: #1e1e1e;
      i {
        float: left;
      }
      .user-name {
        padding: 0 .25rem;
        padding-top: 2px;
      }
      .phone {
        font-size: .24rem;
        color: #6b6b6b;
      }
      .detail-address {
        float: left;
        padding-left: .56rem;
        width: 5rem;
        padding-top: 1px; 
        height: .24rem;
        line-height: .26rem;
        font-size: .24rem;
        color:#6b6b6b;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        word-break: break-all;
        -webkit-box-orient:vertical;
        overflow: hidden;
      }
    }
    i {
      float: right;
      margin-top: .15rem;
    }
  }
}
</style>

