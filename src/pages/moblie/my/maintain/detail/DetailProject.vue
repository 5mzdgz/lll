<template>
    <div class="detail-project">
        <div class="info-title">
            <div class="info-icon"></div>
            <span>保养项目</span>
        </div>
        <ul>
            <li v-for="(item, index) in orderData.mcList" :key="index">
                <span class="info-left">
                    <span class="title">{{item.serviceName}}</span>
                    <span class="sub">{{item.serviceSubName}}</span>
                    <span class="symbol">x{{item.qty}}</span>
                </span>
                
                <span class="info-right">
                    <span class="symbol">{{item.price || item.price === 0 ? '￥' : ''}}</span>
                    <span class="price">{{item.offerPrice||item.offerPrice === 0 ? item.offerPrice : item.price||item.price==0 ? item.price : '待评估'}}</span>
                </span>
            </li>
        </ul>
        <div class="project-count" v-if="orderData.checkStatus === 1&& orderData.orderStatus > 0">
            <p>
                <span class="count-left">商品总额</span>
                <span class="count-right">
                    <span class="symbol">￥</span>
                    <span class="prcie">{{orderData.total | floatTotal}}</span>
                </span>
            </p>
            <p>
                <span class="count-left">优惠</span>
                <span class="count-right">
                    <span class="symbol">-￥</span>
                    <span class="prcie">{{orderData.offer | floatTotal}}</span>
                </span>
            </p>
        </div>
        <p class="total" v-if="orderData.checkStatus === 1 && orderData.orderStatus > 0">
            <span class="total-left">总金额合计</span>
            <span class="total-right">
                <span class="symbol">￥</span>
                <span class="price">{{orderData.total | floatTotal}}</span>
            </span>
        </p>
        <p class="status-tips" v-if="orderData.checkStatus !== 1&& orderData.orderStatus <= 0">·以上为工艺师检测后所需保养费用，请您认真确认·</p>
    </div>
</template>

<script>
export default {
    name: 'DetailProject',
    props: {
        orderData: Object
    },
    data () {
        return {

        }
    },
    computed: {
        
    },
    mounted () {

    }
}
</script>

<style lang="scss" scoped>
.detail-project {
    margin: .2rem;
    padding: .2rem 0;
    background: #fff;
    border-radius: .12rem;
    box-shadow:0px 2px 6px rgba(0,0,0,0.06);
    margin-bottom: 1.5rem;
    .info-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid #DCDCDC;
        padding: 0 .2rem .18rem .2rem;
        margin-bottom: .3rem;
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
    li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 .2rem .3rem .2rem;
        padding-bottom: .1rem;
        border-bottom: 1px solid #DCDCDC;
        color: #6B6B6B;
        .info-left {
            .title {
                font-size: .2rem;
            }
            .sub {
                font-size: .18rem;
            }
        }
        .symbol {
            font-size: .14rem;
        }
        .info-right {
            color: #EC4E4E;
            .price {
                font-size: .26rem;
            }
        }
    }
    .project-count {
        color: #6B6B6B;
        border-bottom: 1px solid #DCDCDC;
        font-size: .18rem;
        p {
            margin-bottom: .15rem;
            .symbol {
                font-size: .14rem;
            }
        }
    }
    .project-count p, .total {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 .2rem;
    }
    .total {
        padding-top: .2rem;
        .total-left {
            font-size: .24rem;
        }
        .total-right {
            color: #EC4E4E;
            .symbol {
                font-size: .2rem;
            }
            .price {
                font-size: .3rem;
            }
        }
    }
    .status-tips {
        font-size: .2rem;
        color: #AEAEAE;
        text-align: center;
    }
}
</style>