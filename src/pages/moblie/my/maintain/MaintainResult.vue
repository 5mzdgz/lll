<template>
    <div class="result">
        <header-nav :navTitle="navTitle"></header-nav>
        <div class="result-box">
            <img class="order-img" v-if="flag === 3" src="https://img.laoliangli.com/label/common/confrim_save.png"/>
            <img class="success-img" v-if="flag === 1||flag === 4" src="https://img.laoliangli.com/label/common/pay_success.png"/>
            <img class="fail-img" v-if="flag === 2" src="https://img.laoliangli.com/label/common/pay_fail.png"/>
            <p class="result-title">{{resultTitle}}</p>
            <p class="result-subTitle">{{subTitle}}</p>
            <p class="result-subTitle">{{cTitle}}</p>
            <div class="result-btn" v-if="flag === 3||flag === 4">
                <button class="home-btns" @click="goHome">返回首页</button>
                <router-link :to="'/mobile/my/maintain/detail?orderId=' + orderId">
                    <button class="check-btns">订单详情</button>
                </router-link>
            </div>
            <view class="result-btn" v-if="flag === 2">
            <button class="home-btns">订单详情</button>
            <button class="check-btns" :disabled="disabled" @click="repaymentMatTap">重新支付</button>
            </view>
            <button class="express-number" v-if="flag === 1" catchtap="goExpressNumber">前往填写快递单号</button>
        </div>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'MaintainResult',
    components: {
        HeaderNav
    },
    data () {
        return {
            navTitle: '提交成功',
            flag: null,
            resultTitle: null,
            subTitle: null,
            cTitle: null,
            orderId: null

        }
    },
    created () {
        const flag = JSON.parse(this.$route.query.flag)
        const orderId = this.$route.query.orderId
        this.flag = flag
        this.orderId = orderId
        // console.log(flag)
    },
    mounted () {
        this.setResult(this.flag)
    },
    methods: {
        goHome () {
            this.$router.push({name: 'Home'})
            sessionStorage.setItem('selected','home')
        },
        /**
         * 结果初始化
         */
        setResult () {
            let flag = this.flag
            switch (flag) {
            case 1:
                this.navTitle = '支付结果'
                this.resultTitle = '支付成功'
                this.subTitle = '请前往填写快递物流单号吧~'
                this.cTitle = ''
                break
            case 2:
                this.navTitle = '支付结果'
                this.resultTitle = '支付失败'
                this.subTitle = '返回查看订单详情~'
                this.cTitle = ''
                break
            case 3:
                this.resultTitle = '订单提交成功'
                this.subTitle = '工艺师正在审核资料，请耐心等待~'
                this.cTitle = ''
                break
            case 4:
                this.resultTitle = '提交成功'
                this.subTitle = '请耐心等待快递邮寄~'
                this.cTitle = '平台收到货后会第一时间通知您~'
                break
            }
        },
        /**
         * 去填写快递单号
         */
        goExpressNumber () {
            url: '../mail/mail?orderId=' + this.data.orderId + '&orderNumber=' + this.data.orderNumber
        },
        repaymentMatTap () {

        }
    }
}
</script>

<style lang="scss" scoped>
.result {
    height: 100vh;
    background: #fff;
    .result-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
            padding-top: .5rem;
        }
        .order-img {
            width: 2.64rem;
            height: 2.64rem;
        }
        .success-img {
            width: 3.46rem;
            height: 3.30rem;
        }
        .fail-img {
            width: 4.18rem;
            height: 2.76rem;
        }
        .result-title {
            margin-top: .50rem;
            font-size: .36rem;
        }
        .result-subTitle {
            margin-top: .20rem;
            color: #777777;
        }
        .result-btn {
            display: flex;
            flex-direction: row;
            align-content: center;
            font-size: .36rem;
            margin-top: 1.00rem;
            padding: 0 .2rem;
        }
        .home-btns {
            line-height: .74rem;
            border: 1px solid #8d8d8d;
            color: #8d8d8d;
            background: #fff;
            border-radius: .37rem;
            width: 2.44rem;
        }
        .check-btns {
            margin-left: 1.42rem;
            width: 2.44rem;
            line-height: .74rem;
            /* border: 1px solid #8d8d8d; */
            color: #fff;
            background: #FF4848;
            border-radius: .37rem;
        }
        .express-number {
            margin-top: 1.00rem;
            font-size: .38rem;
            color: #fff;
            background: #FF4848;
            width: 4.74rem;
            height: .74rem;
            line-height: .74rem;
            border-radius: .37rem;
        }
    }
}
</style>