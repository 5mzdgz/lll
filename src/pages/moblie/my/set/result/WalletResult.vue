<template>
    <div class="result">
        <header-nav :navTitle="navTitle"></header-nav>
        <div class="result-box">
            <div class="img-box">
                <img src="https://img.laoliangli.com/label/wallet/set_success_icon.png" alt="">
            </div>
            <p class="success-title">{{successTitle}}</p>
            <p class="success-sub">{{successSub}}</p>
            <p class="cash-money" v-if="isMode">
                <span class="left">{{leftName}}</span>
                <span class="right">￥{{money | floatTotal}}</span>
            </p>
            <div class="invitation-img" v-if="isInvitation">
                <img src="https://img.laoliangli.com/label/my/invitation.png" alt="">
            </div>
            
            <button @click="confrimClick">{{confrim}}</button>
        </div>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'WalletResult',
    components: {
		HeaderNav
    },
    data () {
        return {
            navTitle: '',
            successTitle: '',
            successSub: '',
            isMode: false,
            isInvitation: false,
            leftName: '',
            money: '',
            confrim: '完成'
        }
    },
    mounted () {
        const flag = JSON.parse(this.$route.query.flag)
        // console.log(flag)
        const money = this.$route.query.money
        this.successData(flag, money)
    },
    methods: {
        /**
         * 结果统一处理
         */
        successData (flag, money) {
            // console.log(money)

            if (flag === 1) {
                this.navTitle = '设置成功'
                this.successTitle= '设置成功'
                this.successSub = '快去前往提现吧！~'
            } else if (flag === 2) {
            
                this.navTitle = '充值成功'
                this.successTitle = '充值成功'
                this.successSub = ''
                this.isMode = true
                this.leftName = '充值金额'
                this.money = money

            } else if (flag === 3) {
            
                this.navTitle = '开通成功'
                this.successTitle = '恭喜您成为老良利VIP'
                this.successSub = '开始您的分享赚钱之旅吧~'
                this.isMode = false
                this.isInvitation = true
                this.confrim = '前往钱包'

            // wx.setStorageSync('grade', 1);
            } else if (flag === 4) {
        
                this.navTitle = '设置支付密码成功'
                this.successTitle = '设置支付密码成功！'
                this.successSub = '邀请好友有礼或者去购物钱包支付吧~'
                this.isMode = false
                this.isInvitation = true
                this.confrim = '前往钱包'
            
            } else {
                this.navTitle = '零钱提现'
                this.successTitle = '发起申请提现成功'
                this.successSub = '预计7-15个工作日到账'
                this.isMode = true
                this.leftName = '提现金额'
                this.money = money
        
            }
        },
        /**
         * 去钱包
         */
        confrimClick () {
            this.$router.push({name: 'Wallet'})
        }
    }
}
</script>

<style lang="scss" scoped>
.result {
    .result-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: .7rem;
        .img-box {
            width: 40.53%;
            height: 0;
            overflow: hidden;
            padding-bottom: 25.06%;
            img {
                width: 100%;
                display: block;
            }
        }
        .success-title {
            font-size: .36rem;
            margin-top: .4rem;
        }
        .success-sub {
            font-size: .24rem;
            margin-top: .15rem;
            color: #777777;
        }
        .cash-money {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: .9rem;
            background: #fff;
            margin-top: .44rem;
            .left {
                margin-left: .3rem;
            }
            .right {
                margin-right: .3rem;
                font-weight: bold;
            }
        }
        .invitation-img {
            width: 100%;
            overflow: hidden;
            height: 0;
            padding-bottom: 24.53%;
            margin-top: .44rem;
            img {
                width: 100%;
                display: block;
            }
        }
        button {
            position: fixed;
            bottom: .4rem;
            left: 16%;
            width: 68%;
            height: .7rem;
            background: #EC4E4E;
            color: #fff;
            border-radius: .12rem;
        }
    }
}
</style>