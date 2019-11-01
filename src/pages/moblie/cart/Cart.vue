<template>
  <div class="wrap-shop-cart">
    <div v-if="$store.state.goods.length > 0">
      <ul class="cart-list">
        <li class="list-item" v-for="(item, index) in $store.state.goods" data-type="0" :key="index">
          <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
            <span class="ischeck" :class="{'active':!item.checked}" @click="changeCheck(item)"></span>
            <i class="el-icon-success" v-if="item.checked" @click="changeCheck(item)"></i>
            <div class="details">
              <div class="img">
                <img :src="item.defaultImgUrl" />
              </div>
              <div class="info">
                <p class="name">{{item.title}}</p>
								<p class="integral">￥{{item.nowPrice}}</p>
                <p class="txt" v-for="(attrs, key) in item.attributesMap" :key="key">{{key}}: {{attrs}}</p>
								<span class="num">x{{item.qty}}</span>
                <ul class="count">
                  <li><a href="javascript:void(0)" class="num-jia" @click="changeNum(item, -1)">-</a></li>
                  <li><span class="input-num">{{item.qty}}</span></li>
                  <!-- <li><input type="text" class="input-num" id="input-num" v-model="item.num"/></li> -->
                  <li><a href="javascript:void(0)" class="num-jia" @click="changeNum(item, 1)">+</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="collection" @click="collectionItem(index, item.pid)" :data-index="index">收藏</div>
          <div class="delete" @click="deleteItem(index, item.id)" :data-index="index">删除</div>
        </li>
      </ul>
      <div class="cart-bottom">
        <span class="ischeck" :class="{'active':!checkAllFlag}" @click="checkAll()"></span>
        <i class="el-icon-success" v-if="checkAllFlag" @click="checkAll()"></i>
        <a class="btns" @click="goSettlement">去结算</a>
        <div class="info">
          <p class="total">总计：<span>￥{{totalPrice | floatTotal}}</span></p>
          <!-- <p class="freight">不含运费</p> -->
        </div>
      </div>
    </div>
    <div class="empty-cart" v-else>
      <div class="empty-img-box">
        <img src="https://img.laoliangli.com/label/common/empty_cart.png" alt="">
      </div>
      <p class="empty-text">您的购物车还没有商品，快去选购吧！</p>
      <!-- <router-link to="/mobile/category"> -->
        <button @click="goShopping" class="go-shopping">去购物</button>
      <!-- </router-link> -->
    </div>
     <Tabbar></Tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import Tabbar from '@/pages/moblie/common/Tabbar'
export default {
  name: 'Cart',
  inject: ['reload'],
  components: {
    Tabbar
  },
  data () {
    return {
      startX : 0 ,
      endX : 0 ,
      totalPrice: 0,
      checkAllFlag: false
    }
  },
  created () {
    // this.getCartData()
    // console.log(this.goods)
    // console.log(this.goods_obj)
    // console.log(this.goods_length)
    // console.log(this.$store.state.shop)  // 模块化 Vuex允许我们将 store 分割成模块（module）每个模块拥有自己的 state、mutation、action、getter、
  },
  // computed: {
  //   ...mapState([
  //     'goods', 'totalPrice', 'totalNum'
  //   ]),
  //   ...mapGetters([
  //     'goods_obj', 'goods_length'
  //   ])
  // },
  mounted () {
    // console.log('ssss')
    this.getCartData()
  },
  watch: {
		'$route'(to, from){
      // console.log(to.path)
		}
	},
  methods: {
  //   ...mapMutations([
  //     'ADD_CART'
  //     // 'REDUCE_CART'
  //   ]),
  //   reduce_num (id) {
  //     // this.REDUCE_CART(id)
  //     this.$store.commit('REDUCE_CART', id)
  //   },
  //   add_num (id) {
  //     this.ADD_CART(id)
  //   },
  /**
   * 去购物
   */
  goShopping () {
    this.$router.replace('/mobile/category')
    sessionStorage.setItem('selected','category')
  },
    /***
     * 获取购物车数据
     */
    getCartData () {
      this.axios.get(this.domain.Base_M3_URL + '/l/v1/cart/list').then(this.getCartDataScc)
    },
    /** 
     * 购物车成功回调
    */
    getCartDataScc (res) {
      const resData = res.data
      // console.log(res)
      if (resData.code === '200' && resData.data !== null) {
        const goods = resData.data
        this.$store.dispatch('addGoods', goods)
      }
      if (resData.code === '90001' || resData.code === '90002') {
        this.reload()
      }
    },
    /**
     * 改变商品数量
     */
    changeNum (item, number) {
      if (number > 0) {
        item.qty++
      } else {
        item.qty--
        if (item.qty < 1) {
          item.qty = 1
        }
      }
      this.calcTotalPrice()
    },
    // 单选
    changeCheck (item) {
      //选中商品
      if(typeof item.checked == 'undefined') {//检测属性是否存在
          //Vue.set(item, "checked", true)
          this.$set(item, 'checked', true)//局部注册
      }else{
          item.checked = !item.checked//状态取反
      }
      //如果取消一个商品的选中，全选也取消
      let itemisChecked = []
      this.$store.state.goods.forEach(function (item, index){
          if (item.checked === true ) {
            itemisChecked.push(item)
          }
      })
      if (itemisChecked.length === this.$store.state.goods.length ) {
          this.checkAllFlag = true
      }else{
          this.checkAllFlag = false
      }
      //这个位置调用计算总金额的函数
      this.calcTotalPrice()
    },
    // 计算
    calcTotalPrice: function () {
      this.totalPrice = 0//每次遍历商品之前对总金额进行清零
      this.$store.state.goods.forEach((item, index) => {//遍历商品，如果选中就进行加个计算，然后累加
        if (item.checked){
          this.totalPrice += item.nowPrice*item.qty//累加的
        }
      })
    },
    // 全选
    checkAll () {
      this.checkAllFlag = !this.checkAllFlag
      if (this.checkAllFlag) {
        this.$store.state.goods.forEach((item, index) => {
          if(typeof item.checked == 'undefined') {//检测属性是否存在
            this.$set(item, 'checked', this.checkAllFlag)//局部注册
          }else{
            item.checked = this.checkAllFlag//状态取反
          }
        })
      } else {
        this.$store.state.goods.forEach((item, index) => {
          if(typeof item.checked == 'undefined') {//检测属性是否存在
            this.$set(item, 'checked', this.checkAllFlag)//局部注册
          }else{
            item.checked = this.checkAllFlag//状态取反
          }
        })
      }
      this.calcTotalPrice()//全选时调用计算总金额函数  
    },

    skip(){
      if( this.checkSlide() ){
        this.restSlide()
      }
    },
    //滑动开始
    touchStart(e){
      // 记录初始位置
      this.startX = e.touches[0].clientX
    },
    //滑动结束
    touchEnd(e){
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX
      // 左滑
      if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
        this.restSlide();
        parentElement.dataset.type = 1
      }
      // 右滑
      if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
        this.restSlide()
        parentElement.dataset.type = 0
      }
      this.startX = 0
      this.endX = 0
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide(){
      let listItems = document.querySelectorAll('.list-item')
      for( let i = 0 ; i < listItems.length ; i++){
        if( listItems[i].dataset.type == 1 ) {
          return true
        }
      }
      return false
    },
    //复位滑动状态
    restSlide(){
      let listItems = document.querySelectorAll('.list-item')
      // 复位
      for( let i = 0 ; i < listItems.length ; i++){
        listItems[i].dataset.type = 0
      }
    },
    /**
     * 加入收藏夹
     * 
     */
    collectionItem (index, id) {
      // 当前索引
      // let index = e.currentTarget.dataset.index
      // let data = [{id: id}]
      this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/collect/cart/remove?pid='+ id).then((res) => {
        // console.log(res.data)
        if (res.data.code === '200') {
          // 复位
          this.restSlide()
          // 删除
          this.$store.state.goods.splice(index,1)
        }
      })
    },
    //删除
    deleteItem(index, id){
      // console.log(index)
      // 当前索引
      // let index = e.currentTarget.dataset.index
      let data = [{id: id}]
      this.axios.post(this.domain.Base_M3_URL + '/l/v1/cart/delete', data).then((res) => {
        // console.log(res)
        if (res.data.code === '200') {
          // 复位
          this.restSlide()
          // 删除
          this.$store.state.goods.splice(index,1)
        }
      })
      // console.log(this.$store.state.goods)
		},
		/**
		 * 获取选中的商品去结算
		 */
		goSettlement () {
			let arr = []
			this.$store.state.goods.forEach((item) => {
				if (item.checked) {
					arr.push({
						id: item.id,
						pid: item.pid,
          	qty: item.qty
          })
				}
      })
      if (arr.length > 0) {
        this.getPayData(arr)
      } else {
        this.$toast({
          message: '还没选中商品哦！',
          // position: 'top'
        })
      }
			// console.log(arr)
		},
		/**
		 * 结算请求
		 */
		getPayData (arr) {
			this.axios.post(this.domain.Base_M3_URL + '/l/v2/order/confirm/product/list', arr).then((res) => {
				// console.log(res.data.data)
				const payData = res.data.data
				// const obj = JSON.stringify(res.data.data)
				if (res.data.code === '200') {
					// 传对象方法一
					this.$store.dispatch('addPayData', payData)
					// 传对象方法二
          // this.$router.push('/mobile/pay?obj='+obj)
          this.$router.push('/mobile/pay')
				}
			})
		}
  }
}
</script>

<style lang="scss" scoped>
.wrap-shop-cart{
	padding-top: 1px;
  .cart-list{
    margin-bottom: 2rem;
    padding-bottom: .01rem;
    background: #f6f6f6;
    .list-item{
      width: 100%;
      position: relative;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      margin: .1rem 0;
      .delete{
        width: 1rem;
        height: 2.2rem;
        line-height: 2.2rem;
        background: #e01212;
        font-size: .28rem;
        color: #fff;
        text-align: center;
        position: absolute;
        top:0;
        right: -2rem;
      }
      .collection{
        width: 1rem;
        height: 2.2rem;
        line-height: 2.2rem;
        background: #606060;
        font-size: .28rem;
        color: #fff;
        text-align: center;
        position: absolute;
        top: 0;
        right: -1rem;
      }
    }
    .list-item[data-type="0"]{
      transform: translate3d(0,0,0);
    }
    .list-item[data-type="1"]{
      transform: translate3d(-2rem,0,0);
    }
    .list-box{
      // width: 100%;
      position: relative;
      padding: 0.3rem;
      background: #fff;
      display: flex;
      .details{
        flex: 1;
        display: inline-flex;
        vertical-align: top;
        .img{
          width: 1.6rem;
          height: 1.6rem;
          display: inline-block;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info{
          flex: 1;
          display: inline-block;
          padding-left: .2rem;
          vertical-align: top;
          .name{
            font-size: .24rem;
            line-height: .3rem;
            color: #333333;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            word-break: break-all;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .txt{
            font-size: .2rem;
            color: #999999;
            padding-top: .1rem;
          }
					.num{
              // float: right;
              position: absolute;
              right: .2rem;
              bottom: 1rem;
              color: #606060;
            }
          .integral{
            font-size: .24rem;
            color: #e01212;
            padding-top: .1rem;
            display: inline-block;
          }
          .count{
            position: absolute;
            overflow: hidden;
            right: .2rem;
            bottom: .2rem;
            font-size: 0;
            line-height: 0;
            vertical-align:middle;
            display: inline-block;
            background: #f6f6f6;
            li{
              display: inline-block;
              vertical-align: top;
              a,span{
                display: inline-block;
                width: .5rem;
                height: .5rem;
                line-height: .5rem;
                text-align: center;
                font-size: .24rem;
                color: #999999;
                cursor: pointer;
                border: 1px solid #f8f8f8;
              }
              span{
                width: .8rem;
                border-right: 0;
                border-left: 0;
              }
            }
          }
        }
      }
    }
  }
  .cart-bottom{
    height: .8rem;
    position: fixed;
    bottom: 1rem;
    width: 100%;
    background: #fff;
    padding-left: .3rem;
    box-sizing: border-box;
    box-shadow:0px -1px 12px rgba(0,0,0,0.04);
    i {
      position: absolute;
      left: .25rem;
      top: .25rem;
      font-size: .42rem;
      color: #EC4E4E;
    }
    .ischeck{
      margin-top: .28rem !important;
      position: relative;
      &:after{
        content: '全选';
        position: absolute;
        width: 2em;
        right: -3em;
        top: 2px;
      }
    }
    .btns{
      display: inline-block;
      width: 2rem;
      height: .8rem;
      line-height: .8rem;
      color: #fff;
      text-align: center;
      float: right;
      background: #e01212;
      font-size: .24rem;
    }
    .info{
      padding: .3rem .3rem .3rem 0;
      float: right;
      color: #999999;
      text-align: right;
      .total{
        font-size: .24rem;
        span {
          color: #e01212;
        }
      }
      .freight{
        font-size: .2rem;
      }
    }
  }
  .ischeck{
    width: .3rem;
    height: .3rem;
    border: 1px solid #ccc;
    display: inline-block;
    border-radius: 100%;
    margin-right: .3rem;
    margin-top: .6rem;
    // &.active{
    //     background: url('https://img.laoliangli.com/label/common/checked_icon.png') no-repeat center center;
    //     background-size: 100% 100%;
    //     // border: 1px solid #E72C2C;
    // }
  }
  i {
    position: absolute;
    left: .25rem;
    top: .85rem;
    font-size: .42rem;
    color: #EC4E4E;
  }
  .empty-cart {
    height: 100vh;
    text-align: center;
    .empty-img-box {
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-bottom: 45.33%;
      img {
        margin-top: 1.48rem;
        width: 100%;
      }
    }
    .empty-text {
      font-size: .28rem;
      color:rgba(130,130,130,1);
      margin-top: 1.03rem;
    }
    .go-shopping {
      font-size: .28rem;
      color:rgba(142,124,119,1);
      margin-top: .8rem;
      line-height: .48rem;
      padding: .1rem .89rem;
      background:rgba(248,245,244,1);
      border: 1px solid rgba(142,124,119,1);
      border-radius: .08rem;
    }
  }
}
</style>
