<template>
    <div class="order-info">
        <div class="info-box">
            <div class="info-title">
                <div class="info-icon"></div>
                <span>订单信息</span>
            </div>
            <ul>
                <li v-for="(item, index) in infoArr" :key="index">
                    <div v-if="item.infoMiddle">
                        <span class="info-left">{{item.infoLeft}}</span>
                        <span class="info-middle" :ref="item.infoRigth ? 'copy':''">{{item.infoMiddle}}</span>
                        <span class="info-right" v-if="item.infoRigth" @click="copy(item.infoLeft)">{{item.infoRigth}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <router-link :to="'/mobile/my/maintain/mail?orderId='+ orderData.id + '&orderNumber=' + orderData.orderNumber">
            <button class="info-btn" v-if="orderData.orderStatus === 1 && !orderData.userShippingCode">前往填写物流单号</button>
        </router-link>
        <button class="info-btn" v-if="orderData.orderStatus === 3" @click="confrimTap(orderData.id)">确认收货</button>
        <button class="info-btn" v-if="orderData.orderStatus === 4 && orderData.isComment !== 1" @click="opinionVisible = true">意见反馈</button>
       
        <mt-popup
            v-model="opinionVisible"
            popup-transition="popup-fade">
            <img src="https://img.laoliangli.com/label/maintain/order_opinion.png" alt="" />
            <router-link :to="'/mobile/my/maintain/opinion?orderNumber=' + orderData.orderNumber">
                <button class="opinion-btn">立即领取</button>
            </router-link>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'OrderInfo',
    props: {
        orderData: Object
    },
    data () {
        return {
            opinionVisible: false,
            infoArr: [
                {
                    infoLeft: '订单编号：',
                    infoMiddle: null,
                    infoRigth: null
                },{
                    infoLeft: '寄回单号：',
                    infoMiddle: null,
                    infoRigth: '复制'
                },{
                    infoLeft: '寄出单号：',
                    infoMiddle: null,
                    infoRigth: '复制'
                },{
                    infoLeft: '支付方式：',
                    infoMiddle: '微信支付',
                    infoRigth: null
                },{
                    infoLeft: '创建时间：',
                    infoMiddle: null,
                    infoRigth: null
                },{
                    infoLeft: '付款时间：',
                    infoMiddle: null,
                    infoRigth: null
                },{
                    infoLeft: '寄回发货时间：',
                    infoMiddle: null,
                    infoRigth: null
                },{
                    infoLeft: '寄回收货时间：',
                    infoMiddle: null,
                    infoRigth: null
                },{
                    infoLeft: '我的备注：',
                    infoMiddle: null,
                    infoRigth: null
                },{
                    infoLeft: '未通过原因：',
                    infoMiddle: null,
                    infoRigth: null
                }
            ]
        }
    },
    computed: {

    },
    watch: {
        orderData (newVal, oldVal) {
            // console.log(newVal)
            let infoArr = this.infoArr
            infoArr[0].infoMiddle = newVal.orderNumber
            infoArr[1].infoMiddle = newVal.companyShippingCode
            infoArr[2].infoMiddle = newVal.userShippingCode
            infoArr[3].infoMiddle = newVal.paymentTime
            infoArr[4].infoMiddle = newVal.createTime
            infoArr[5].infoMiddle = newVal.paymentTime
            infoArr[6].infoMiddle = newVal.companyShippingTime
            infoArr[7].infoMiddle = newVal.companyShippingComfirmTime
            infoArr[8].infoMiddle = newVal.userMsg
            infoArr[9].infoMiddle = newVal.checkReason
        }
    },
    methods: {
        /**
         * 确认收货
         */
        confrimTap (orderId) {
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
                            this.$router.replace('/mobile/order?status=4')
                        }
                    })
                }else{
                    // console.log('取消')
                }
            })
        },
        /**
         * 复制单号
         */
        copy (code) {
            let copy = this.$refs.copy
            let range = document.createRange()
            let copyCode
            if (copy.length === 1) {
                copyCode = copy[0]
            } else {
                if (code === '寄回单号：') {
                    copyCode = copy[0]
                } else {
                    copyCode = copy[1]
                }
            }
            range.selectNode(copyCode)
            window.getSelection().addRange(range)
            let successful = document.execCommand('copy')
            
            try {
                let msg = successful ? '复制成功': '复制失败'
                this.$toast({
                    message: msg,
                })
            } catch (err) {
                
            }
            window.getSelection().removeAllRanges()
        }
    }
}
</script>

<style lang="scss" scoped>
.order-info {
    margin: .2rem;
    background: #fff;
    border-radius: .12rem;
    box-shadow:0px 2px 6px rgba(0,0,0,0.06);
    .info-box {
        padding: .2rem;
        .info-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            .info-icon {
                width: 3px;
                height: .2rem;
                background: #EC4E4E;
                margin-right: .05rem;
            }
            span {
                color: #000;
                font-size: .24rem;
            }
        }
        ul {
            margin-top: .15rem;
            li {
                div{
                    overflow: hidden;
                    clear: both;
                    font-size: .18rem;
                    color: #6B6B6B;
                    padding: .1rem 0;
                    display: flex;
                    flex-direction: row;
                    .info-left {
                        width: 1.5rem;
                        text-align: justify;
                    }
                    .info-middle {
                        width: 3.7rem;
                        word-wrap: break-word;
                    }
                    .info-right {
                        float: right;
                        color: #EC4E4E;
                    }
                }
            }
        }
    }
    button {
        width: 100%;
        padding: .2rem;
        border-top: 1px solid #DCDCDC;
        background: #fff;
        border-bottom-left-radius: .12rem;
        border-bottom-right-radius: .12rem;
        color: #484848;
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
</style>