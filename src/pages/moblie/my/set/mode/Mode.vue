<template>
    <div class="mode">
        <header-nav :navTitle="navTitle"></header-nav>
        <ul>
            <li v-for="(item, index) in cashMode" :key="index" @click="checkMode(item)">
                <div class="item-left">
                    <img :src="item.modeImg" alt="" />
                    <span class="cash-name">{{item.payeeName}}</span>
                </div>
                <div class="item-right">
                    <i class="el-icon-warning" v-if="!item.account"></i>
                    <span :class="item.account?'bound':'unbound'">{{item.account ? item.account : '未绑定'}}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'Mode',
    components: {
        HeaderNav
    },
    data () {
        return {
            navTitle: '提现方式',
            cashMode: [
                { id: 1, modeImg: 'https://img.laoliangli.com/label/wallet/wx_green_icon.png', modeName: '微信', payeeName: '微信', account: '' },
                { id: 2, modeImg: 'https://img.laoliangli.com/label/wallet/alipay_icon.png', modeName: '支付宝', payeeName: '支付宝', account: '' },
                { id: 3, modeImg: 'https://img.laoliangli.com/label/wallet/bank_icon.png', modeName: '银行卡', payeeName: '银行卡', account: '' }
            ],
            cashDataArr: []
        }
    },
    mounted () {
        this.getCashData()
    },
    methods: {
        /**
		 * 获取提现信息
		 */
		getCashData () {
			// var that = this;
			this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/withdraw/list').then((res) => {
				let resData = res.data.data
				// console.log(resData)
				if (!resData) {
					this.cashData = this.cashMode[0]
				} else {
                    let cashData = this.cashMode
                    this.cashDataArr = resData
					resData.forEach((item)=>{
						if(item.type === 1) {
							// 微信
							let strName = item.payeeName.substr(0, 1) + ' * ' + item.payeeName.substr(item.payeeName.length - 1, 1);
							cashData[0].payeeName = strName;
							let str = item.account.substr(0, 3) + "****" + item.account.substring(item.account.length - 2);
							cashData[0].account = str;
							cashData[0].type = item.type;
						} else if (item.type === 2) {
							// 支付宝
							let strName = item.payeeName.substr(0, 1) + ' * ' + item.payeeName.substr(item.payeeName.length - 1, 1);
							cashData[1].payeeName = strName;
							let str = item.account.substr(0, 3) + "****" + item.account.substr(7);
							// var str = '尾号' + item.account.substring(item.account.length - 4);
							cashData[1].account = str;
							cashData[1].type = item.type;
						} else if (item.type === 0) {
							// 银行卡
							cashData[2].payeeName = item.bank;
							let strAccount = '尾号' + item.account.substring(item.account.length - 4);
							cashData[2].account = strAccount;
							cashData[2].type = item.type;
						}
					})
					// 主页显示提现方式
					let arr = [];
					cashData.forEach((i)=>{
						if (i.account) {
							arr.push(i)
							this.cashData = arr[0]
						}
					})
				}
			})
        },
        /**
         * 去绑定
         */
        checkMode (cashData) {
            if (cashData.id === 3) {
                if (cashData.type === 0) {
                    this.cashDataArr.forEach((item)=>{
                        if(item.type === cashData.type) {
                            this.$store.dispatch('addCashData', item)
                            this.$router.push('/mobile/my/set/mode/wxpay?payMode=bank')
                        }
                    })
                } else {
                    this.$store.dispatch('addCashData', {})
                    this.$router.push('/mobile/my/set/mode/wxpay?payMode=bank')
                }
            } else if (cashData.id === 2) {
                if (cashData.type) {
                    this.cashDataArr.forEach((item) => {
                        if (item.type === cashData.type) {
                            this.$store.dispatch('addCashData', item)
                            this.$router.push('/mobile/my/set/mode/wxpay?payMode=alipay')
                        }
                    })
                } else {
                    this.$store.dispatch('addCashData', {})
                    this.$router.push('/mobile/my/set/mode/wxpay?payMode=alipay')
                }
            } else if (cashData.id === 1) {
                if (cashData.type) {
                    this.cashDataArr.forEach((item) => {
                        if (item.type === cashData.type) {
                            this.$store.dispatch('addCashData', item)
                            this.$router.push('/mobile/my/set/mode/wxpay?payMode=wxpay')
                        }
                    })
                } else {
                    this.$store.dispatch('addCashData', {})
                    this.$router.push('/mobile/my/set/mode/wxpay?payMode=wxpay')
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.mode {
    ul {
        li {
            display: flex;
            height: 1.02rem;
            line-height: 1.02rem;
            padding: 0 .34rem;
            justify-content: space-between;
            background: #fff;
            margin-top: .24rem;
            box-shadow:2px 4px 8px rgba(0,0,0,0.05);
            .item-left,.item-right {
                display: flex;
                flex-direction: row;
                align-items: center;
                img {
                    width: .44rem;
                    height: .44rem;
                    margin-right: .5rem;
                }
                .cash-name {
                    font-size: .26rem;
                }
            }
            .item-right {
                i:nth-child(1) {
                    font-size: .32rem;
                    color: #EC4E4E;
                }
                .unbound {
                    padding: 0 .1rem 0 .1rem;
                    font-size: .24rem;
                }
				.bound {
					color: #c2c2c2;
				}
                i:nth-child(3) {
                    font-size: .4rem;
                }
            }
        }
    }
}
</style>