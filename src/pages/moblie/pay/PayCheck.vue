<template>
  <div class="pay-check">
    <div class="check-box">
      <p>
        <span>商品总价</span>
        <span class="check-right product-price">￥{{total | floatTotal}}</span>
      </p>
    </div>
    <div class="check-box">
      <p>
        <span>运费</span>
        <span class="check-right fierght-price">￥0.00</span>
      </p>
    </div>
    <div class="check-box">
      <p>
        <span>优惠金额</span>
        <span class="check-right fierght-price">￥{{offerPrice | floatTotal}}</span>
      </p>
    </div>
    <div class="check-box">
      <p>
        <span>优惠卷</span>
        <span class="check-right fierght-price" v-if="couponId==='none'" @click="handleCoupon">不使用优惠券</span>
        <span class="check-right fierght-price" v-if="couponId !== '' && couponId !== 'none'" @click="handleCoupon">有可使用优惠券</span>
        <span class="check-right fierght-price" v-if="couponId===''">无可使用优惠券</span>
      </p>
    </div>
    <div class="check-box" @click="handlePayMode">
      <p>
        <span>支付方式</span>
        <span class="check-right">{{payMethods}}
          <i class="el-icon-arrow-right"></i>
        </span>
      </p>
    </div>
    <div class="check-box" @click="handleMsg">
      <p>
        <span>留言</span>
        <span class="check-right fierght-price">{{!message ? '填写备注' : message}}</span>
      </p>
    </div>

    <mt-popup
      v-model="msgVisible"
      popup-transition="popup-fade">
       <div class="msg-box">
         <p>订单备注</p>
        <textarea v-model="message" placeholder="填写备注"></textarea>
        <button class="msg" @click="msgVisible = false">确定</button>
      </div>
    </mt-popup>

    <CustomPopup ref="CustomPopupRef" class="coustom-container">
			<div slot="PoperContent" class="PoperContentView">
          <div class="coupon-nav">
            <span>{{title}}</span>
          </div>
          <div v-if="isCoupon">
            <div class="coupon-middle">
              <ul>
                <li v-for="(item, index) in couponArr" :key="index" @click="checkCoupon(index)">
                  <span>{{item.couponTitle}}：{{item.coupon.couponName}} ￥{{item.offerPrice}}</span>
                  <div class="check" v-if="item.coupon.couponId !== couponId"></div>
                  <i class="el-icon-success" v-if="item.coupon.couponId === couponId"></i>
                </li>
              </ul>
              <ul class="no-coupon">
                <li @click="noCheckCoupon">
                  <span>不使用优惠券</span>
                  <div class="check" v-if="!iconChecked"></div>
                  <i class="el-icon-success" v-if="iconChecked"></i>
                </li>
              </ul>
            </div>
          </div>
        <div class="pay-methods" v-else>
          <div class="pay-methods-box" v-for="(payItem, index) in payMethodsArr" :key="index"  @click="payMethodsChecked(payItem)">
            <span class="pay-methods-title">{{payItem.payMethods}}</span>
            <span class="pay-methods-sub" v-if="payItem.payMethodId === 3">{{payItem.subTitle}}</span>
            <div class="pay-checkbox" v-if="payItem.payMethodId ===3 && !payItem.vip">{{payItem.targetTitle}}</div>
            <div class="pay-checkbox" v-if="payItem.vip">
              <div class="check" v-if="payMethodId !== payItem.payMethodId"></div>
              <i class="el-icon-success" v-if="payMethodId === payItem.payMethodId"></i>
            </div>
          </div>
        </div>
        <button @click="handleCouponConfrim">确定</button>
      </div>
	  </CustomPopup>

    <mt-popup
      v-model="payVisible"
      popup-transition="popup-fade">
      <WalletPay :walletPayData="walletPayData"></WalletPay>
    </mt-popup>

    <div class="pay-tabbar">
      <div class="tabbar-left">
        <span class="total">合计: </span>
        <span class="tabbar-price">￥{{total | floatTotal}}</span>
      </div>
      <button class="tabbar-right" @click="payOrder" :disabled="isDisabled">支付</button>
    </div>
  </div>
</template>

<script>
import CustomPopup from '@/pages/moblie/common/CustomPopup'
import WalletPay from './WalletPay'
export default {
  name: 'PayCheck',
  components: {
    CustomPopup,
    WalletPay
	},
  data () {
    return {
      payVisible: false,
      walletPayData: {},
      msgVisible: false,
      isCoupon: true,
      payVisible: false,
      password: '',
      isDisabled: false,
      message: '',
      payData: {},
      total: 0,
      offerPrice: 0,
      orderCoupon: '',
      couponId: '',
      payProduct: [],
      couponArr:[],
      title: '',
      iconChecked: false,
      payMethodId: 1,
      payMethods: '微信支付',
      orderId: null,
      payMethodsArr: [{ payMethodId: 1, payMethods: '微信支付', vip: true }, { payMethodId: 3, payMethods: '钱包支付', subTitle: '(未开通钱包功能，更多功能请前往开通VIP)', targetTitle: '开通VIP', vip: false }]
    }
  },
  created () {
    
  },
  watch: {
    'payVisible': function (newVal) {
      // console.log(newVal)
      if(!newVal) {
        this.isDisabled = newVal
        if (this.walletPayData.orderId) {
          sessionStorage.setItem('walletPayFlag', true)
          this.$router.replace('/mobile/pay/fail?orderId=' + this.walletPayData.orderId + '&payMethodId=3' + '&total=' + this.walletPayData.total )
        }
      }
    }
  },
  mounted () {
    this.payData = this.$store.state.payData
    this.payProduct = this.$store.state.payData.cpList
    // console.log(this.payData)
    // console.log(this.$store.state.payData)
    let offerPrice = 0
    if (this.payData.orderCoupon && this.payData.orderCoupon !== null) {
      offerPrice = this.payData.orderCoupon.offerPrice
      this.couponId = this.payData.orderCoupon.coupon.couponId
      this.orderCoupon = this.payData.orderCoupon.coupon.couponCode
    }
    this.total = this.payData.total
    this.offerPrice = offerPrice
    // console.log(this.orderCoupon)
    // console.log(this.$store.state.payData)
    this.getProductCouponData()
    this.getWalletData()
  },
  methods: {
    /**
     * 获取商品可使用的优惠卷
     */
    getProductCouponData () {
      const item = []
      for(let i in this.payProduct) {
        item.push({
          pid: this.payProduct[i].pid,
          qty: this.payProduct[i].qty
        })
      }
      this.getCouponData(item)
    },
    /**
     * 优惠卷标题重组
     */
    getCouponData (item) {
      this.axios.post(this.domain.Base_M3_URL + '/coupon/v1/order/coupon/offer',item).then((res) => {
        // console.log(res)
        let resData = res.data.data
        if (res.data.code === '200') {
          // console.log(resData)
          resData.forEach((item, index) => {
            if (resData[index].coupon.offer !== 0) {
              let offer = resData[index].coupon.offer + '元优惠卷'
              resData[index].couponTitle = offer
            }
            if (resData[index].coupon.discount !== 0) {
              let discount = resData[index].coupon.discount * 10 + '折折扣卷'
              resData[index].couponTitle = discount
            }
          })
          // console.log(resData)
          this.couponArr = resData
        }
      })
    },
    /**
     * 显示优惠卷弹窗
     */
    handleCoupon () {
      this.$refs.CustomPopupRef.showCustom()
      this.isCoupon = true
      this.title = '请选择优惠券'
      const couponArr = this.couponArr
      if (couponArr && couponArr !== '') {
        // 获取当前的优惠卷
        let coupon = this.couponId
        let flag
        if (coupon === 'none'){
            flag = true
        } else {
          couponArr.forEach((item) => {
            if (item.coupon.couponId === coupon) {
              item.iconChecked = true
              flag = false
            }
          })
        }
        this.iconChecked = flag
      }
    },
    handleCouponConfrim () {
      this.$refs.CustomPopupRef.maskClick()
    },
    /**
     * 选择优惠卷
     */
    checkCoupon (index) {
      let couponArr = this.couponArr
      couponArr[index].iconChecked = true
      let couponId = couponArr[index].coupon.couponId
      let orderCoupon = couponArr[index].coupon.couponCode
      // 获取选中的优惠卷优惠价
      let offerPrice = couponArr[index].offerPrice
      let total = this.total
      let cuoffer = this.offerPrice
      total += cuoffer
      total = total - offerPrice
      this.total = total
      this.offerPrice = offerPrice
      this.couponId = couponId
      this.orderCoupon = orderCoupon
      this.iconChecked = false
    },
    /**
     * 不使用优惠卷
     */
    noCheckCoupon () {
      let couponArr = this.couponArr
      let total = this.total
      let cuoffer = this.offerPrice
      total += cuoffer
      this.total = total
      this.offerPrice = 0
      this.couponId = 'none'
      this.iconChecked = true
    },
    /**
     * 获取钱包信息
     */
    getWalletData () {
      this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/wallet').then((res)=>{
        // console.log(res)
        const resData = res.data.data
        let payMethodsArr = this.payMethodsArr
        if (res.data.code === '200') {
          // console.log(this.total)
          payMethodsArr.forEach((item) => {
            if (item.payMethodId === 3 && resData.amount > this.total) {
              item.vip = true
              item.subTitle = '钱包余额 ￥' + resData.amount
            }
            if (item.payMethodId === 3 && resData.amount < this.total) {
              item.vip = false
              item.subTitle = '钱包余额 ￥' + resData.amount + ' (余额不足予支付)'
              item.targetTitle = '请充值'
            }
          })
        }
      })
    },
    /**
     * 支付方式弹窗
     */
    handlePayMode () {
      this.$refs.CustomPopupRef.showCustom()
      this.isCoupon = false
      this.title = '请选择支付方式'
    },
    /**
     * 选择支付方式
     */
    payMethodsChecked (item) {
      if (item.vip) {
        this.payMethods = item.payMethods
        this.payMethodId = item.payMethodId
      } else if (!item.vip && item.targetTitle ==='开通VIP') {
        this.$router.push('/mobile/set/membership?flag=3')
      } else if (!item.vip && item.targetTitle === '请充值') {
        this.$router.push({name: 'Recharge'})
      }
    },
    /**
     * 隐藏
     */
    closePay () {
      this.payVisible = false
      this.isDisabled = false
    },
    /**
     * 钱包支付
     */
    confrimPay () {
      
    },
    /**
     * 显示留言文本框
     */
    handleMsg () {
      this.msgVisible = true
    },
    /**
     * 微信支付下单
     */
    payOrder () {
      let cartList = []
      //获取下单的商品列表集合
      const payProduct = this.payProduct
      // console.log(payProduct)
      //遍历获取cartList
      payProduct.forEach((item) => {
        cartList.push({
          id: item.id,
          pid: item.pid,
          qty: item.qty
        })
      })
      // 判断地址是否存在
      if (!this.$store.state.checkedAddress.id) {
        this.$toast({
          message: '还没收货地址哦',
          position: 'top'
        })
        return false;
      }

      //组装生成订单对象
      const param = {
        addressId: this.$store.state.checkedAddress.id,
        cartList: cartList,
        msg: this.message,
        payMethodId: this.payMethodId,
        couponCode: this.orderCoupon
      }
      // console.log(param)
      this.isDisabled = true
      this.placeOrder(param)
    },
    /**
     * 下单
     */
    placeOrder (param) {
      this.axios.post(this.domain.Base_M3_URL + '/l/v1/order/confirm', param).then((res) => {
        //判断生成订单成功获取订单ID
         let orderId = res.data.data
         this.orderId = orderId
         if (this.payMethodId === 1) {
            const ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                  //wechatUrl = prodUrl + "/payment/wechatOauth.html?orderId=" + orderId;
                  // console.log("微信浏览器")
                  this.wechatPayOrder(orderId)
            } else {
              //不是微信浏览器
              //  console.log("不是微信浏览器")
                this.otherPayOrder(orderId, localStorage.getItem("loginToken"))
            }
          } else {
            const walletPayData = {
              orderId: orderId,
              total: this.payData.total
            }
            this.walletPayData = walletPayData
            this.payVisible = true
          }
      })
    },
    /**
     * 微信浏览器去支付
      */
    wechatPayOrder(orderId){
      const url = this.domain.Base_M3_URL + '/pay/wechat/oauth2?orderId=' + orderId
        this.axios.get(url).then((res) => {
          const url = res.data.data
          // console.log(url)
          window.location.href = url
        })
    },
    /**
     * 其他浏览器去支付
     */
    otherPayOrder(orderId,loginToken){
      const url = this.domain.Base_M3_URL + '/pay/wechatpay?orderId=' + orderId + '&loginToken=' + loginToken
      window.location.href = url
    }

   
  }
}
</script>

<style lang="scss" scoped>
.pay-check {
  .check-box {
    height: .8rem;
    background: #fff;
    line-height: .8rem;
    padding: 0 .2rem;
    border-bottom: 1px solid #eee;
    p {
      overflow: hidden;
      clear: both;
      font-size: .28rem;
      .product-price  {
        color: #E72C2C;
      }
      .fierght-price {
        color: #6b6b6b;
        width: 3rem;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        word-break: break-all;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: right;
      }
      .check-right {
        float: right;
      }
    }
  }
  .coustom-container {
    .PoperContentView {
      background: #FFFFFF;
      border-top-left-radius: .32rem;
      border-top-right-radius: .32rem;
      height: 6rem;
      .coupon-nav {
        width: 100%;
        text-align: center;
        font-size: .36rem;
        height: 1.2rem;
        line-height: 1.2rem;
        border-bottom: 1px solid #eee;
      }
      .coupon-middle {
        height: 3.5rem;
        overflow: scroll;
        ul, .no-coupon {
          padding: 0 .2rem;
          li {
            font-size: .26rem;
            overflow: hidden;
            clear: both;
            height: .6rem;
            line-height: .6rem;
            .ca-right {
              float: right;
              color: #6b6b6b;
              i {
                color: #6b6b6b;
                height: .8rem;
                line-height: .8rem;
              }
            }
            i {
              float: right;
              color: #E72C2C;
              font-size: .35rem;
              height: .6rem;
              line-height: .6rem;
            }
          }
        }
      }
      .no-coupon {
        margin-bottom: 1rem;
      }
      button {
        position: fixed;
        bottom: 0;        height: .8rem;
        width: 100%;
        font-size: .3rem;
        color: #fff;
        background: #E72C2C;
      }
      .check {
        line-height: .6rem;
        float: right;
        width: .26rem;
        height: .26rem;
        border-radius: 100%;
        border: 1px solid #eee;
        margin-top: .15rem;
      }
      .pay-methods {
        padding: 0 .2rem 1rem .2rem;
        .pay-methods-box {
          border-bottom: 1px solid #eee;
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 1rem;
          justify-content: space-between;
          .pay-methods-title {
            font-size: .28rem;
          }
          .pay-methods-sub {
            font-size: .2rem;
            color: #767676;
          }
          .pay-checkbox {
            float: right;
            font-size: .22rem;
            color: #E72C2C;
            i {
              font-size: .3rem;
            }
          }
        }
      }
    }
  }
  .mint-popup {
    border-radius: .2rem;
    .msg-box {
      text-align: center;
      border-radius: .2rem;
      width: 4.6rem;
      padding: .2rem;
      p {
          font-size: .3rem;
          color: #545454;
      }
      textarea {
          width: 4.2rem;
          font-size: .24rem;
          border: 1px solid #D6D6D6;
          margin: .26rem 0;
          padding: .2rem;
          resize: none
      }
      .msg {
          width: 100%;
          height: .6rem;
          background: #EC4E4E;
          color: #fff;
          border-radius: .12rem;
      }
    }
  }
  .pay-tabbar {
    position: fixed;
    bottom: 0;
    overflow: hidden;
    clear: both;
    height: .8rem;
    line-height: .8rem;
    font-size: .3rem;
    width: 100%;
    background: #fff;
    box-shadow: 0px -1px 12px rgba(0,0,0,0.04);
    .tabbar-left {
      width: 70%;
      float: left;
      .total {
        margin-left: .2rem;
      }
      .tabbar-price {
        color: #E72C2C;
      }
    }
    .tabbar-right {
      background: #E72C2C;
      height: .8rem;
      line-height: .8rem;
      width: 30%;
      color: #fff;
    }
    button[disabled] {
      background: #A7A7A7 !important;
    }
  }
}
</style>
