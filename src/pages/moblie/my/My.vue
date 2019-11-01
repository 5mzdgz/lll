<template>
  <div class="my-container">
    <router-link class="header" :to="'/mobile/my/set?grade=' + grade">
      <div class="header-box">
        <div class="header-img">
          <img :src="headImgUrl ? headImgUrl + '?t=' + (new Date().getTime()) : 'https://img.laoliangli.com/label/my/authorImg_icon.png'" alt="">
        </div>
        <div class="header-info">
          <p>
            <span>{{nickName}}</span>
            <img v-if="grade > 0" src="https://img.laoliangli.com/label/my/vip_icon.png" alt="">
          </p>
          <span class="autograph" v-if="autograph!='null' && autograph">{{autograph}}</span>
        </div>
        <div class="header-right">
          <span>设置</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </router-link>

    <div class="invitation-box" v-if="grade > 0">
      <router-link class="item-box" :to="{name: 'Wallet'}">
       
          <img class="wallet-img" src="https://img.laoliangli.com/label/my/wallet_icon.png" alt="">
          <span>钱包</span>
        
      </router-link>
      <div class="line"></div>
      <router-link class="item-box" :to="{name: 'Invitation'}">
       
          <img class="invita-img" src="https://img.laoliangli.com/label/my/invitation_icon.png" alt="">
          <span>邀请有礼</span>
       
      </router-link>
    </div>

    <router-link  v-if="grade > 0" class="invitation" :to="{name: 'Invitation'}">
      <img src="https://img.laoliangli.com/label/my/invitation.png" alt="">
    </router-link>

    <router-link v-else class="open-vip" :to="'/mobile/set/membership?flag=3'">
      <img src="https://img.laoliangli.com/label/my/add_vip.png" alt="">
    </router-link>

    <router-link :to="'/mobile/order?status=0'">
      <div class="order-box order">
        <div>
          <img src="https://img.laoliangli.com/label/my/order_icon.png" alt="">
          <span>我的订单</span>
        </div>
        <span class="arrow-icon"><i class="el-icon-arrow-right"></i></span>
      </div>
    </router-link>
    <dl class="status-box">
      <dd v-for="(item, index) in orderStatus" :key="index" @click="handleStatusClick(index)">
        <img :src="item.imgUrl" alt="">
        <p>{{item.statusKey}}</p>
      </dd>
    </dl>
    
    <div class="maintain-box">
      <router-link :to="{name: 'Maintain'}">
        <div class="order-box">
          <div>
            <span class="iconfont">&#xe60b;</span>
            <span>首饰保养</span>
          </div>
          <img class="maintain-nav-img" src="https://img.laoliangli.com/label/my/maintain_nav.png" alt="">
        </div>
      </router-link>
      <div class="maintain">
        <template v-for="item, index in maintainArr">
          <div class="maintain-item" @click="maintainClick(index)">
            <img :src="item.iconImg" alt="">
            <span>{{item.navTitle}}</span>
          </div>
          <div class="line" v-if="index!=2"></div>
        </template>
      </div>
    </div>

    <div class="utils">
      <div class="order-box">
        <div>
          <img src="https://img.laoliangli.com/label/my/set_icon.png" alt="">
          <span>常用工具</span>
        </div>
      </div>
      <div class="utils-box">
        <div class="utils-item">
          <router-link :to="{name: 'Address'}">
            <div class="item">
              <img src="https://img.laoliangli.com/label/my/address_icon.png" alt="">
              <span>收货地址</span>
            </div>
          </router-link>
          <router-link :to="{name: 'Opinion'}">
            <div class="item">
              <img src="https://img.laoliangli.com/label/my/opinion_icon.png" alt="">
              <span>意见反馈</span>
            </div>
          </router-link>
        </div>
        <div class="line"></div>
        <div class="utils-item">
          <router-link :to="{name: 'Coupon'}">
            <div class="item">
              <img src="https://img.laoliangli.com/label/my/coupon_icon.png" alt="">
              <span>优惠券</span>
            </div>
          </router-link>
          <div class="item" @click="serverClick">
            <img src="https://img.laoliangli.com/label/my/info_icon.png" alt="">
            <span>联系客服</span>
          </div>
        </div>
        <div class="line"></div>
        <div class="utils-item">
          <router-link :to="{name: 'Collection'}">
            <div class="item">
              <img src="https://img.laoliangli.com/label/my/collection_icon.png" alt="">
              <span>我的收藏</span>
            </div>
          </router-link>
          <router-link :to="{name: 'About'}">
            <div class="item">
              <img src="https://img.laoliangli.com/label/my/about_icon.png" alt="">
              <span>关于我们</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <server ref="server"></server>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/pages/moblie/common/Tabbar"
import Server from '@/pages/moblie/common/Server'
export default {
  name: 'My',
  inject: ['reload'],
  components: {
    Tabbar,
    Server
  },
  data () {
    return {
      serverCustom: false,
      headImgUrl: '',
      nickName: '',
      autograph: '',
      grade: null,
      orderStatus: [
        {
          imgUrl: 'https://img.laoliangli.com/label/my/pay_icon.png',
          statusKey: '待支付'
        },
        {
          imgUrl: 'https://img.laoliangli.com/label/my/shipped_icon.png',
          statusKey: '待发货'
        },
        {
          imgUrl: 'https://img.laoliangli.com/label/my/received_icon.png',
          statusKey: '待收货'
        },
        {
          imgUrl: 'https://img.laoliangli.com/label/my/finished_icon.png',
          statusKey: '已完成'
        },
        {
          imgUrl: 'https://img.laoliangli.com/label/my/aftermarket_icon.png',
          statusKey: '售 后'
        }
      ],
      maintainArr: [
        { id: 0, navTitle: '首饰保养', iconImg: 'https://img.laoliangli.com/label/my/maintain_icon.png' },
        { id: 1, navTitle: '订单审核', iconImg: 'https://img.laoliangli.com/label/my/maintain_status_icon.png' },
        { id: 2, navTitle: '保养订单', iconImg: 'https://img.laoliangli.com/label/my/maintain_order_icon.png' }
      ]
    }
  },
  mounted () {
    this.getUserInfoData()
  },
  methods: {
    /**
     * 获取用户信息
     *  */ 
    getUserInfoData () {
      this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/info').then(this.getUserInfoScc)
    },

    getUserInfoScc (res) {
      // this.reload()
      // console.log(res.data.data)
      const userData = res.data.data
      this.$store.dispatch('addUserData', userData)
      if (userData) {
        // this.userData = resData
        this.headImgUrl = userData.headImgUrl
        this.autograph =  decodeURIComponent(userData.autograph)
        this.grade = userData.grade
        localStorage.setItem('grade', userData.grade)
        localStorage.setItem('phone', userData.account)
        if (userData.nickname === 'null' && !userData.nickname) {
          this.nickName = '请设置昵称'
        } else {
          this.nickName = decodeURIComponent(userData.nickname)
        }
      }
      if (res.data.code === '90001' || res.data.code === '90002') {
        this.reload()
      }
    },

    handleStatusClick (index) {
      // console.log(index)
      let status = index + 1
      if (status === 5) {
        this.$router.push('/mobile/aftermarket')
      } else {
        this.$router.push('/mobile/order?status=' + status)
      }
    },
    serverClick ()  {
      this.$refs.server.handleShow()
    },
    maintainClick (index) {
      // console.log(index)
      if (index === 0) {
        this.$router.push({name: 'Maintain'})
      } else {
        this.$router.push('/mobile/my/maintain/order?flag=' + index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.my-container {
  background: #f6f6f6;
  position: relative;
  padding-bottom: 1.5rem;
  .header {
    height: 2.24rem;
    .header-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 1.34rem; 
      overflow: hidden;
      background-color: #fff;
      padding: 0 .4rem .95rem .4rem;
      .header-img {
        width: 1.08rem;
        height: 1.08rem;
        border-radius: 100%;
        margin-right: .16rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: .8rem;
        }
      }
      .header-info {
        margin-right: .16rem;
        p {
          width: 3.3rem;
          display: flex;
          flex-direction: row;
          align-items: center;
          span {
            font-size: .34rem;
            font-weight: 500;
            color:#1E1E1E;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            word-break: break-all;
            -webkit-box-orient:vertical;
            overflow: hidden;
            padding: 4px 0;
          }
          img {
            width: .37rem;
            height: .34rem;
            margin-left: .12rem;
          }
        }
        .autograph {
          width: 3.3rem;
          font-size: .16rem;
          line-height: .3rem;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          word-break: break-all;
          -webkit-box-orient:vertical;
          overflow: hidden;
        }
      }
      .header-right {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #1E1E1E;
        font-size: .22rem;
        i {
          font-size: .4rem;
        }
      }
    }
  }
  .invitation-box {
    position: absolute;
    top: 1.36rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 2%;
    width: 96%;
    height: 1.26rem;
    background: #fff;
    border-radius: .24rem;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.16);
    .item-box {
      text-align: center;
      flex: 1;
      span {
        font-size: .24rem;
        color: #1E1E1E;
      }
      img {
        width: .76rem;
        height: .5rem;
      }
      .invita-img {
        width: .54rem;
        height: .46rem;
      }
    }
  }
  .invitation {
    overflow: hidden;
    width: 98%;
    height: 0;
    padding-bottom: 12.29%;
    padding: 0 1%;
    img {
      margin-top: .55rem;
      margin-bottom: .2rem;
      width: 98%;
    }
  }
  .open-vip {
    overflow: hidden;
    width: 90.64%;
    height: 0;
    padding-bottom: 11.24%;
    z-index: 99;
    img {
      margin-top: -0.9rem;
      width: 100%;
    }
  }
  .order-box {
    position: relative;
    background: #fff;
    padding: 0 .28rem;
    height: .705rem;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    div {
      .iconfont {
        font-size: .35rem;
        padding-right: .15rem;
      }
      img {
        width: .32rem;
        height: .32rem;
        padding-right: .2rem;
      }
      span {
        font-size: .24rem;
        color:#1E1E1E;
      }
    }
    .arrow-icon {
      float: right;
    }
    .maintain-nav-img {
      position: absolute;
      top: 0;
      right: 0;
      width: 69.16%;
      height: .71rem;
    }
  }
  dl {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .38rem 0 .14rem 0;
    margin-bottom: .14rem;
    background: #fff;
    box-shadow: 0px .04rem .1rem rgba(0,0,0,0.05);
    dd {
      flex: 1;
      text-align: center;
      img {
        width: .4rem;
        height: .4rem;
        margin-bottom: .1rem;
      }
      p {
        font-size: .24rem;
      }
    }
    dd:nth-child(3) img {
      width: .53rem;
      height: .36rem;
    }
  }
  .maintain-box {
    background: #fff;
    margin-bottom: .16rem;
    .maintain {
      font-size: .26rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      .maintain-item {
        margin: .32rem 0 .14rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        img {
          width: .4rem;
          height: .4rem;
          margin: .1rem;
        }
      }
      .maintain-item:nth-child(1) {
        img {
          width: .56rem;
          height: .56rem;
          margin: 0;
        }
      }
    }
  }
  .utils {
    background: #fff;
    box-shadow:0px 4px 10px rgba(0,0,0,0.03);
    .utils-box {
      font-size: .2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      .utils-item {
        flex: 1;
        a {
          color: #000;
        }
        .item {
          margin: .26rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          img {
            width: .52rem;
            height: .52rem;
            margin-bottom: 4px;
          }
        }
      }
    }
  }
}
.line {
  width: 3px;
  height: .52rem;
  background: #eee;
}
</style>
