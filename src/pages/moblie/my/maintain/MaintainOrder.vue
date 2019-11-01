<template>
    <div class="order" ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
        <header-nav :navTitle="navTitle"></header-nav>
        <dl>
            <dd :class="{dd_active: currentTab == index}" v-for="(item, index) in navbar" :key="index" @click="navbarClick(index)">{{item}}</dd>
        </dl>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
            <div class="order-box">
                <div class="order-item" v-for="(item, index) in checkedArr" :key="index" @click="goDetailClick(item.id)">
                    <div class="header">
                        <span>维修单号：{{item.orderNumber}}</span>
                        <span class="status" :class="item.status=='待支付'||item.status=='已完成'?'status_green':''">{{item.status}}</span>
                    </div>
                    <div class="content">
                        <p class="title">{{item.mat}}</p>
                        <p class="item" v-for="(matItem, key) in item.mcList" :key="key">
                            <span>{{matItem.serviceName}} <span class="service-subName">{{matItem.serviceSubName}}</span></span>
                            <span>x{{matItem.qty}}</span>
                        </p>
                        <ul class="total">
                            <li class="count">共{{item.mcList.length}}项服务</li>
                            <li class="count-name">合计：</li>
                            <li v-if="!item.noTotal">
                                <span class="symbol">￥</span>
                                <span class="price">{{item.total}}</span>
                            </li>
                            <li class="no-total" v-else>{{item.noTotal}}</li>
                        </ul>
                        <p class="btn">
                            <button v-if="item.checkStatus === 1 && item.orderStatus === 0" @click.stop="goPayClick(item)">去支付</button>
                            <button v-if="!item.uploadImgs" @click.stop="goSaveImg(item)">上传照片</button>
                            <button v-if="item.orderStatus === 3" @click.stop="confrimShipped(item.id, index)">确认收货</button>
                            <button v-if="item.orderStatus === 4 && item.isComment !== 1" @click.stop="goOpinionClick(item.orderNumber)">意见反馈</button>
                        </p>
                    </div>
                </div>

                <mt-popup
                    v-model="opinionVisible"
                    popup-transition="popup-fade">
                    <img src="https://img.laoliangli.com/label/maintain/order_opinion.png" alt="" />
                    <router-link :to="'/mobile/my/maintain/opinion?orderNumber=' + orderNumber">
                        <button class="opinion-btn">立即领取</button>
                    </router-link>
                </mt-popup>

                <div class="order-empty" v-if="checkedArr.length === 0">
                    <img src="https://img.laoliangli.com/label/common/empty_order.png" alt="">
                    <p>还没有信息，快去保养服务吧~</p>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'MaintainOrder',
    components: {
        HeaderNav
    },
    data () {
        return {
            navTitle: '保养订单',
            currentTab: 0,
            navbar: ['全部','寄出中', '保养中', '寄回中', '已完成', '已拒收'],
            flag: null,
            checkedArr: [],
            page: 1,
            size: 10,
            // 可以进行上拉
            allLoaded: false,
            // 是否自动触发上拉函数
            isAutoFill: false,
            wrapperHeight: 0,
            opinionVisible: false,
            orderNumber: null
        }
    },
    created () {
        const flag = JSON.parse(this.$route.query.flag)
        this.flag = flag
        if (flag === 1) {
            this.navbar = ['全部', '审核中', '审核通过', '未通过']
        }
    },
    mounted () {
        // this.getVerifyOrder(this.currentTab, this.page, this.size, this.flag)
        this.loadFrist()
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    },
    methods: {
        // 下拉刷新
        loadTop() {
            this.loadFrist()
        },
        // 上拉加载
        loadBottom() {
            this.loadMore()
        },
        // 下拉刷新加载
        loadFrist() {
            this.page = 1
            this.allLoaded = false // 可以进行上拉
            this.getVerifyOrder(this.currentTab, this.page, this.size, this.flag)
            this.$refs.loadmore.onTopLoaded()
        },
        // 加载更多
        loadMore() {
            this.page++
            this.getVerifyOrder(this.currentTab, this.page, this.size, this.flag)
            this.$refs.loadmore.onBottomLoaded()
        },
        /**
         * 却换状态
         */
        navbarClick (index) {
            this.checkedArr = []
            this.currentTab = index
            const page = 1
            Indicator.open({
                text: '加载中...',
                //文字
                spinnerType: 'fading-circle',
                //样式
            })
            this.getVerifyOrder(this.currentTab, page, this.size, this.flag)
        },
        /**
         * 详情页
         */
        goDetailClick (orderId) {
            this.$router.push('/mobile/my/maintain/detail?orderId=' + orderId )
        },
        /**
         * 获取审核订单数据
         */
        getVerifyOrder (currentTab, page, size, flag) {
            let oUrl = this.orderUrl(currentTab, page, size, flag)
            this.axios.get(this.domain.Base_M3_URL + oUrl).then((res) => {
                // console.log(res)
                Indicator.close()
                let resData = res.data.data
                // console.log(resData)
                if (page > 1) {
                    let checkedArr = this.checkedArr
                    if (resData.length > 0 && flag === 1) {
                        resData.forEach((item) => {
                            this.checkedStatus(item)
                            checkedArr.push(item)
                        })
                    }
                    if (resData.length > 0 && flag === 2) {
                        resData.forEach((item,index) => {
                            if (resData[index].orderStatus !== 0) {
                                this.matOrderStatus(resData[index])
                                checkedArr.push(resData[index])
                            }
                        })
                    }
                } else {
                    let checkedArr = this.checkedArr
                    if (resData.length > 0 && flag === 1) {
                        resData.forEach((item) => {
                            this.checkedStatus(item)
                            checkedArr.push(item)
                        })
                    }
                    if (resData.length > 0 && flag === 2) {
                        resData.forEach((item,index) => {
                            if (resData[index].orderStatus !== 0) {
                                this.matOrderStatus(resData[index])
                                checkedArr.push(resData[index])
                            }
                        })
                    }
                }
            })
        },
        /**
         * url处理
         */
        orderUrl (currentTab, page, size, flag) {
            let oUrl = '/l/v1/user/mat/order/list?'
            if (flag === 1) {
                if (currentTab === 0) {
                    oUrl += 'orderStatus=' + currentTab + '&page=' + page + '&size=' + size
                } else if (currentTab > 0) {
                    let checkStatus = currentTab - 1
                    oUrl += 'checkStatus=' + checkStatus + '&orderStatus=0' + '&page=' + page + '&size=' + size
                }
            } else {
                if (currentTab === 0) {
                    oUrl += 'checkStatus=1&page=' + page + '&size=' + size
                } else if (currentTab > 0) {
                    oUrl += 'orderStatus=' + currentTab + '&checkStatus=1' + '&page=' + page + '&size=' + size
                }
            }
            return oUrl
        },
        /**
         * 审核状态
         */
        checkedStatus (item) {
            if (item.checkStatus === 0) {
                if (!item.uploadImgs) {
                    item.status = '审核中.待上传实物照片'
                } else {
                    item.status = '审核中'
                }
            } else if (item.checkStatus === 1) {
                item.status = '待支付'
            } else if (item.checkStatus === 2) {
                item.status = '未通过'
            }
            let mcList = item.mcList
            mcList.forEach((i) => {
                if (!i.price) {
                    item.noTotal = '待评估'
                }
            }) 
        },
        /**
         * 全部状态
         */
        matOrderStatus (item) {
            if (item.orderStatus === 1) {
                item.status = '寄出中'
            } else if (item.orderStatus === 2) {
                item.status = '保养中'
            } else if (item.orderStatus === 3) {
                item.status = '寄回中'
            } else if (item.orderStatus === 4) {
                item.status = '已完成'
            } else if (item.orderStatus === 5) {
                item.status = '已拒收'
            } else if (item.orderStatus === 0 && item.checkStatus === 1) {
                item.status = '待支付'
            } else if (item.checkStatus === 2) {
                item.status = '未通过'
            } else if (item.checkStatus === 0) {
                if (!item.uploadImgs) {
                    item.status = '审核中.待上传实物照片'
                } else {
                    item.status = '审核中'
                }
            } 
        },
        /**
         * 获取orderNumber
         */
        goOpinionClick (orderNumber) {
            this.opinionVisible = true
            this.orderNumber = orderNumber
        },
        /**
         * 去上传照片
         */
        goSaveImg (item) {
            this.$router.push('/mobile/my/maintain/photograph?orderId='+item.id +'&orderNumber=' + item.orderNumber)
        },
        /**
         * 确认收货
         */
        confrimShipped (orderId, index) {
            this.$messagebox({
                title: '温馨提示',
                message: '确定已收到货物？',
                showCancelButton: true,
                confirmButtonText:"确认",
                cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    //  console.log('确认')
                    this.axios.post(this.domain.Base_M3_URL + '/l/v1/user/mat/order/confirm?orderId=' + orderId).then((res) => {
                        if(res.data.code === '200') {
                            this.checkedArr.splice(index, 1)
                        }
                    })
                }else{
                    // console.log('取消')
                }
            })
        },
        /**
         * 去支付
         */
        goPayClick (item) {
            const goPayNumber = {
                orderId: item.id,
                orderNumber: item.orderNumber
            }
            this.$store.dispatch('addGoPayNumber', goPayNumber)
            const ua = window.navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				//wechatUrl = prodUrl + "/payment/wechatOauth.html?orderId=" + orderId;
				// console.log("微信浏览器")
				this.wechatPayOrder(item.id)
			} else {
				//不是微信浏览器
				// console.log("不是微信浏览器")
				this.otherPayOrder(item.id, localStorage.getItem("loginToken"))
			}
        },
        /**
		 * 微信浏览器去支付
		 */
		wechatPayOrder(orderId){
		const url = this.domain.Base_M3_URL + '/pay/wechat/mat/oauth2?orderId=' + orderId
			this.axios.get(url).then((res) => {
			const url = res.data.data
			//   console.log(url)
			window.location.href = url
			})
		},
		/**
		 * 其他浏览器去支付
		 */
		otherPayOrder(orderId,loginToken){
			const url = this.domain.Base_M3_URL + '/pay/wechatpay/mat?orderId=' + orderId + '&loginToken=' + loginToken
			//   console.log(url)
			window.location.href = url
    	}
    }
}
</script>

<style lang="scss" scoped>
.order {
    overflow: scroll;
    padding-bottom: 1rem;
    margin-top: .6rem;
    dl {
        position: fixed;
		top: .8rem;
		left: 0;
		width: 94%;
        z-index: 888;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .1rem 3%;
        // margin: 0 .14rem;
        background: #fff;
        font-size: .24rem;
        box-shadow: 0 4px 8px rgba(0,0,0,0.08);
        dd {
            padding: .06rem 0;
            &.dd_active {
                border-bottom: 1px solid rgba(142,124,119,1);
            }
        }
    }
    .order-box {
        padding-bottom: .2rem;
        .order-item {
            background: #fff;
            margin: 0 .2rem;
            margin-top: .2rem;
            border-radius: .14rem;
            padding: .2rem 0;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            .header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                border-bottom: 1px solid #DCDCDC;
                padding: .1rem .26rem;
                font-size: .2rem;
                color: #6B6B6B;
                .status {
                    color: #EC4E4E;
                }
                .status_green {
                    color: #55AA66;
                }
            }
            .content {
                padding: 0 .26rem;
                .title {
                    font-size: .24rem;
                    padding: .2rem 0 .1rem 0;
                }
                .item {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    font-size: .22rem;
                    color: #6B6B6B;
                    line-height: .4rem;
                    .service-subName {
                        font-size: .18rem;
                    }
                }
                .total {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    font-size: .22rem;
                    margin: .2rem 0;
                    .count-name {
                        padding-left: .1rem;
                    }
                    li {
                        .symbol {
                            font-size: .16rem;
                            color: #EC4E4E;
                        }
                        .price {
                            font-size: .26rem;
                            color: #EC4E4E;
                        }
                    }
                    .no-total {
                        color: #EC4E4E;
                    }
                }
                .btn {
                    text-align: right;
                    button {
                        font-size: .22rem;
                        color: #EC4E4E;
                        padding: 0 .26rem;
                        height: .46rem;
                        line-height: .46rem;
                        border-radius: .23rem;
                        background: #fff;
                        border: 1px solid #EC4E4E;
                        margin-left: .2rem;
                    }
                }
            }
        }
        .order-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 4.86rem;
                height: 3.06rem;
                margin: 1.6rem 0 .5rem 0;
            }
            p {
                font-size: .36rem;
                font-weight: 500;
                line-height: .5rem;
                color:rgba(141,141,141,1);
            }
        }
        .mint-popup {
            text-align: center;
            background: none;
            img {
                width: 5rem;
            }
            button {
                width: 3rem;
                margin-top: .5rem;
                color: #fff;
                height: .8rem;
                border-radius: .4rem;
                background: linear-gradient(90deg,rgba(251,212,172,1) 0%,rgba(246,221,195,1) 100%);
            }
        }
    }
}
</style>