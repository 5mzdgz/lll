<template>
	<div class="cash">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="cash-box">
			<div class="cash-item">
				<div class="left-box" @click="cashModeClick">
					<span class="cash-mode">提现方式</span>
					<img :src="cashData.modeImg" alt="">
					<span>{{cashData.payeeName}}</span>
				</div>
				<div class="right-box" @click="bindAccountClick">
					<i class="el-icon-warning" v-if="!cashData.account"></i>
					<span :class="cashData.account?'bound':'unbound'">{{cashData.account?cashData.account:'未绑定'}}</span>
					<i class="el-icon-arrow-right" v-if="!cashData.account"></i>
				</div>
			</div>
			<div class="input-box">
				<div class="content-box">
					<p class="title-box">
						<span class="title">提现金额</span>
						<span class="sub">最低提现金额{{minAmount}}元起</span>
					</p>
					<p class="recharge-number">
						<span class="symbol">￥</span>
						<input type="number" id="money" v-focus step="0.01" maxlength="12" @input="handleOnInput()" />
					</p>
					<p class="tips" v-if="!tips">
						<span class="sub">可提现金额￥{{amount}}</span>
						<span class="whole-cash">全部提现</span>
					</p>
					<p class="tips_selected" v-else>{{tips}}</p>
					<button :disabled="disabled" class="nextBtn" @click="nextBtnClick">下一步</button>
				</div>
			</div>

			<mt-popup
                v-model="payVisible"
                popup-transition="popup-fade">
                <!-- <wallet-pay :cashData="cashData"></wallet-pay> -->
				<div class="wallet-pay">
					<p class="pay-header"><span @click="closePay">×</span>请输入支付密码</p>
					<p class="title">提现</p>
					<p class="account"><span>￥</span>{{cashData.amount}}</p>
					<input v-focus type="password" maxlength="16" v-model="password" placeholder="请输入交易密码">
					<p class="msg">{{msg}}</p>
					<button class="pay-btn" :disabled="isDisabled" @click="confrimPay">确定</button>
				</div>
            </mt-popup>

			<CustomPopup ref="CustomPopupRef" class="coustom-container">
				<div slot="PoperContent" class="PoperContentView">
					<div class="popup-header">
						<span>请选择提现方式</span>
						<!-- <span class="cancel">取消</span> -->
					</div>
					<div class="popup-content">
						<div class="content-item" v-for="(item, index) in cashMode" :key="index" @click="checkModeItem(item)">
							<div class="item-left">
								<img :src="item.modeImg" alt="" />
								<span class="cash-name">{{item.payeeName}}</span>
							</div>
							<div class="item-right">
								<i class="el-icon-warning" v-if="!item.account"></i>
								<span :class="item.account?'bound':'unbound'">{{item.account ? item.account : '未绑定'}}</span>
								<i class="el-icon-arrow-right" v-if="!item.account"></i>
							</div>
						</div>
					</div>
					<router-link :to="{name: 'Mode'}">
						<div class="popup-footer">
							<span>更改提现资料<i class="el-icon-arrow-right"></i></span>
						</div>
					</router-link>
				</div>
			</CustomPopup>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import CustomPopup from '@/pages/moblie/common/CustomPopup'
import WalletPay from './WalletPay'
export default {
	name: 'Cash',
	components: {
		HeaderNav,
		CustomPopup,
		WalletPay
	},
	data () {
		return {
			navTitle: '提现',
			payVisible: false,
			cashData: {},
			type: null,
			minAmount: 10,
			disabled: true,
			amount: this.$store.state.walletData.amount,
			tips: '',
			money: '',
			password: '',
            isDisabled: false,
            msg: '',
			cashMode: [
				{ modeImg: 'https://img.laoliangli.com/label/wallet/wx_green_icon.png', payeeName: '微信', account: '', amount: null },
				{ modeImg: 'https://img.laoliangli.com/label/wallet/alipay_icon.png', payeeName: '支付宝', account: '', amount: null},
				{ modeImg: 'https://img.laoliangli.com/label/wallet/bank_icon.png', payeeName: '银行卡', account: '', amount: null}
			]
		}
	},
	mounted () {
		this.getCashData()
		if (this.amount < this.minAmount) {
			this.tips = '钱包金额不足' + this.minAmount +'元，无法提取'
   	 	}
	},
	methods: {
		/**
		 * input
		 */
		handleOnInput () {
			let money = parseFloat(document.getElementById('money').value)
			// console.log(money)
			this.money = money
			if (money >= this.minAmount) {
				this.disabled = false
				this.tips = ''
				if (money > this.amount) {
					this.disabled = true
					this.tips = '输入金额超过本次可提现金额'
				}
			} else {
				this.disabled = true
				this.tips = '输入金额不足' + this.minAmount +'元，无法提现'
			}
		},
		/**
		 * 下一步
		 */
		nextBtnClick () {
			/**
			 * 判断是否绑定了
			 */
			if (!this.cashData.account) {
				this.$toast({
					message: '还没绑定该项账号哦',
					position: 'top'
				})
				return false
			}
			/**
			 * 验证小数点后长度不能超过2
			 */
			let spot = this.money.toString().split(".")[1]
			if (spot) {
				let len = spot.length
				if (len > 2) {
					this.$toast({
						message: '请输入正确的金额',
						position: 'top'
					})
					return false
				}
			}
			let consumAmount = parseFloat(this.money)
			// console.log(consumAmount)
			if (consumAmount === 0) {
				this.$toast({
					message: '请输入正确的金额',
					position: 'top'
				})
				return false
			}
			if (!this.money) {
				this.$toast({
					message: '请输入提现金额，至少' + this.minAmount +'元',
					position: 'top'
				})
				return false
			}
			let money = Number(this.money).toFixed(2)
			if (money < this.minAmount) {
				this.$toast({
					message: '提现金额，至少' + this.minAmount +'元起',
					position: 'top'
				})
				return false
			}
			// console.log(money)
			this.cashData.amount = money
			this.payVisible = true
		},
		/**
         * 确认支付
         */
        confrimPay () {
            this.isDisabled = true
            const obj = {
                amount: parseFloat(this.cashData.amount),
                type: this.cashData.type,
                source: 'moblie',
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
            this.isDisabled = false
            if (res.data.code === '200') {
				this.amount = this.$store.state.walletData.amount - parseFloat(this.cashData.amount)
				this.payVisible = false
				this.$router.push('/mobile/my/set/result/result?money=' + this.money)
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
		},
		/**
		 * x
		 */
		closePay () {
			this.payVisible = false
		},
		cashModeClick() {
			this.$refs.CustomPopupRef.showCustom()
		},
		/**
		 * 默认微信未绑定，去绑定微信
		 */
		bindAccountClick () {
			const account = this.cashData.account
			if (!account) {
				this.$router.push({ name: 'Wxpay', params: {payMode: 'wxpay'} })
			}
		},
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
							cashData[2].payeeName = item.bank
							let strAccount = '尾号' + item.account.substring(item.account.length - 4)
							cashData[2].account = strAccount
							cashData[2].type = item.type
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
					
					// this.cashMode = cashData
					// console.log(cashData)
				}
			})
		},
		/**
		 * 选中提现方式项
		 */
		checkModeItem (cashData) {
			// console.log(cashData)
			if (cashData.account) {
				this.cashData = cashData
				this.$refs.CustomPopupRef.maskClick()
			}
			if (!cashData.account && cashData.payeeName === '微信') {
				this.$store.dispatch('addCashData', {})
				this.$router.push('/mobile/my/set/mode/wxpay?payMode=wxpay')
			} else if (!cashData.account && cashData.payeeName === '支付宝') {
				this.$store.dispatch('addCashData', {})
				this.$router.push('/mobile/my/set/mode/wxpay?payMode=alipay')
			} else if (!cashData.account && cashData.payeeName === '银行卡') {
				this.$store.dispatch('addCashData', {})
				this.$router.push('/mobile/my/set/mode/wxpay?payMode=bank')
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.cash {
	.cash-box {
		.cash-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: 0 .5rem;
			height: 1.2rem;
			margin-top: .3rem;
			font-size: .28rem;
			.left-box {
				display: flex;
				flex-direction: row;
				align-items: center;
				img {
					width: .44rem;
					height: .44rem;
					margin: 0 .3rem;
				}
			}
			.right-box {
				display: flex;
				flex-direction: row;
				align-items: center;
				.unbound {
					padding: 0 .1rem 0 .1rem;
				}
				.bound {
					color: #c2c2c2;
				}
				i:nth-child(1) {
					font-size: .32rem;
					color: #EC4E4E;
				}
				i:nth-child(3) {
					font-size: .4rem;
				}
			}
		}
		.input-box {
			position: fixed;
			top: 2.3rem;
			bottom: 0;
			background: #fff;
			width: 100%;
			height: 84%;
			.content-box {
				padding: .5rem;
				.title-box {
					.title {
						margin-right: .1rem;
					}
				}
				.sub {
					font-size: .18rem;
					color: #919191;
				}
				.recharge-number {
					padding: .6rem 0 .1rem 0;
					border-bottom: 1px solid #D6D6D6;
					display: flex;
					flex-direction: row;
					align-items: center;
					.symbol {
						font-size: .78rem;
					}
					input {
						font-size: .4rem;
						width: 4rem;
						height: .7rem;
						font-weight: bold;
					}
				}
				.tips_selected {
					font-size: .18rem;
					color: #919191;
					margin: .24rem 0 .36rem 0;
				}
				.tips {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: .24rem 0 .36rem 0;
					.whole-cash {
						font-size: .18rem;
						color: #606376;
						margin-left: .08rem;
					}
				}
				button[disabled] {
					background-color: rgb(207, 204, 204);
				}
				.nextBtn {
					width: 100%;
					height: .76rem;
					border-radius: .12rem;
					color: #fff;
					background: #EC4E4E;
				}
			}
		}
		.mint-popup {
			border-radius: .2rem;
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
		}
		.coustom-container {
			.PoperContentView {
				background: #fff;
				.popup-content .content-item, .popup-footer {
					display: flex;
					flex-direction: row;
					justify-content: center;
				}
				.popup-header {
					position: relative;
					height: .9rem;
					line-height: .9rem;
					text-align: center;
					border-bottom: 1px solid #D6D6D6;
					.cancel {
						position: absolute;
						right: .36rem;
					}
				}
				.popup-content {
					.content-item {
						height: 1.02rem;
						line-height: 1.02rem;
						padding: 0 .36rem;
						justify-content: space-between;
						border-bottom: 1px solid #D6D6D6;
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
				.popup-footer  {
					height: 1.24rem;
					line-height: 1.24rem;
					font-size: .24rem;
					color: #919191;
				}
			}
		}
	}
}
</style>