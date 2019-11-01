<template>
    <div class="wallet-pay">
        <p class="pay-header"><span>×</span>请输入支付密码</p>
        <p class="title">提现</p>
        <p class="account"><span>￥</span>{{cashData.amount}}</p>
        <input v-focus type="password" maxlength="16" v-model="password" placeholder="请输入交易密码">
        <p class="msg">{{msg}}</p>
        <button class="pay-btn" :disabled="disabled" @click="confrimPay">确定</button>
    </div>
</template>

<script>
export default {
    name: 'WalletPay',
    props: {
        cashData: Object
    },
    data () {
        return {
            password: '',
            disabled: false,
            msg: ''
        }
    },
    methods: {
        /**
         * 确认支付
         */
        confrimPay () {
            this.disabled = true
            const obj = {
                amount: parseFloat(this.cashData.amount),
                type: this.cashData.type,
                source: 'applets',
                payPassword: this.password
            }
            // console.log(obj)
            this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/withdraw/request', obj).then(this.confrimPayScc)
        },
        /**
         * 请求回调
         */
        confrimPayScc (res) {
            // console.log(res)
            this.disabled = false
            if (res.data.code === '200') {
                // var amount = this.data.amount - obj.amount;
                this.$store.state.walletData.amount = this.$store.state.walletData.amount - this.cashData.amount
            }
            if (res.data.code === '309') {
                this.msg = '提现金额不满足条件'
            }
            if (res.data.code === '806') {
                this.msg = '交易密码错误，请重新输入'
                this.$messagebox({
                    title: '温馨提示',
                    message: '支付密码错误，请重试',
                    showCancelButton: true,
                    confirmButtonText:"重试",
                    cancelButtonText:"忘记密码"
                }).then(action => {
                    if(action == 'confirm'){
                        //  console.log('确认')
                        // this.msg = ''
                    }else{
                        // console.log('取消')
                        this.$router.push({ name: 'Membership' })
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wallet-pay {
    width: 5rem;
    border-radius: .2rem;
    text-align: center;
    .pay-header {
        position: relative;
        text-align: center;
        font-size: .34rem;
        padding: .2rem 0;
        border-bottom: 1px solid #E0E0E0;
        span {
            position: absolute;
            right: .2rem;
            color: #E0E0E0;
        }
    }
    .title {
        font-size: .32rem;
        padding: .2rem 0;
    }
    .account {
        font-size: .6rem;
        font-weight: bold;
        span {
            font-size: .4rem;
        }
    }
    input {
        margin: 0 .2rem;
        background-color: #F8F8F8;
        width: 4.2rem;
        height: .6rem;
        border-radius: .1rem;
        padding: 0 .2rem;
        margin: .2rem 0;
    }
    .msg {
        font-size: .2rem;
        color: #EC4E4E;
        text-align: left;
        margin-left: .2rem;
    }
    .pay-btn {
        width: 100%;
        height: .8rem;
        margin-top: .3rem;
        color: #fff;
        background: #EC4E4E;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
    }
}
</style>
