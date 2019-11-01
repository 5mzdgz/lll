<template>
      <div class="wallet-pay">
        <p class="pay-header">请输入支付密码</p>
        <!-- <span @click="closePay">×</span> -->
        <p class="title">提现</p>
        <p class="account"><span>￥</span>{{total}}</p>
        <p class="phone">+86 {{sPhone}}</p>
        <dl>
          <dd><input type="number" maxlength="4" v-model="code" placeholder="请输入验证码" /></dd>
          <dd class="code"><button :disabled="shortDisabled" @click="getVerificationCode">{{sendCode}}</button></dd>
        </dl>
        <input v-focus type="password" maxlength="16" v-model="payPassword" placeholder="请输入交易密码">
        <button class="pay-btn" @click="confrimPay">确定</button>
      </div>
</template>

<script>
export default {
    name: 'WalletPay',
    props: {
        walletPayData: Object
    },
    data () {
        return {
            code: '',
            sendCode: '获取验证码',
            sPhone: '',
            payPassword: '',
            shortDisabled: false,
            total: '',
            orderId: null
        }
    },
    watch: {
        walletPayData: {
            deep: true,  // 深度监听
            handler(newVal,oldVal) {
                // console.log(newVal,oldVal)
                this.total = newVal.total
                this.orderId = newVal.orderId
            }
        }
    },
    mounted () {
            this.setPhone()
    },
    methods: {
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
         * 获取验证码
         */
        getVerificationCode () {
        let that = this
        let obj = {
            type: 4,
            phone: this.$store.state.userData.account
        }
        this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/vcode', obj).then((res) => {
            // console.log(res)
            this.shortDisabled = true
            let num = 61
            let timer = setInterval(function () {
            num--
            if (num <= 0) {
                clearInterval(timer)
                that.sendCode = '重新发送'
                that.shortDisabled = false
            } else {
                that.sendCode = num + "s"
            }
            }, 1000)
        })
        },
        /**
         * 支付确认
         */
        confrimPay() {
        let obj = {
            orderId: this.orderId,
            payPassword: this.payPassword,
            mobileCode: this.code,
            source: 'applets'
        }
        // console.log(obj)
        this.axios.post(this.domain.Base_M3_URL + '/pay/wallet/walletpay', obj).then((res) => {
            // console.log(res)
            if (res.data.code === '803') {
            let payMethodId = 3
            this.$router.push('/mobile/pay/success?orderId=' + this.orderId)
            } else if (res.data.code === '806') {
            this.$messagebox({
                    title: '温馨提示',
                    message: '支付密码错误，请重试',
                    showCancelButton: true,
                    confirmButtonText:"忘记密码",
                    cancelButtonText:"重试"
                }).then(action => {
                    if (action == 'confirm'){
                    //  console.log('确认')
                    this.$router.push({name: 'Membership'})
                    }else{
                    // console.log('取消')
                    }
                })
            } else if (res.data.code == '203') {
            this.$toast({
                message: '验证码无效'
            })
            this.disabled = false
            } else {
            // 用于重新支付
            let payMethodId = 3
            this.$router.push('/mobile/pay/fail?orderId=' + this.orderId + '&payMethodId=3' + '&total=' + this.total)
            }
        })
        },
        /**
         * 格式化手机号
         */
        setPhone () {
            let phone
            if (this.$store.state.userData.account) {
                phone = this.$store.state.userData.account
            } else {
                phone = localStorage.getItem('phone')
            }
            let str = phone.substr(0, 3) + "****" + phone.substr(7)
            this.sPhone = str
        },
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
    .phone {
    text-align: left;
    margin-left: .2rem;
    padding: .2rem 0;
    }
    dl {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 .2rem;
    dd {
        flex: 1;
        button[disabled] {
        background: #A7A7A7 !important;
        }
        button {
        width: 100%;
        font-size: .24rem;
        background: #EC4E4E;
        height: .6rem;
        margin-left: .1rem;
        line-height: .6rem;
        color: #fff;
        border-radius: .12rem;
        }
        input {
        width: 2rem;
        }
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