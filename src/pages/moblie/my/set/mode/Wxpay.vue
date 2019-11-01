<template>
    <div class="wxpay">
        <header-nav :navTitle="navTitle"></header-nav>
        <ul>
            <li>
                <div class="user-name">
                    <span>真实姓名</span>
                    <input type="text" placeholder="请输入姓名" v-model="userName"/>
                </div>
                <div class="pay-number">
                    <span>{{payName}}</span>
                    <input type="text" :placeholder="placeholder" maxlength="19" v-model="userAccount"/>
                </div>
            </li>
            <li v-if="payMode === 'bank'">
                <div class="user-name">
                    <span class="phone">储蓄卡卡号</span>
                    <input type="number" placeholder="请输入16-19位卡号" maxlength="23" v-model="bankAccount"/>
                </div>
                <div class="pay-number" @click="checkBankClick">
                    <span>选择银行</span>
                    <span class="right">
                        <span>{{bankValue}}</span>
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </div>
            </li>
            <li>
                <div class="user-name">
                    <span class="phone">+86 {{phone}}</span>
                    <span class="send" :disabled="disabled" @click="getCode">{{sendCode}}</span>
                </div>
                <div class="pay-number">
                    <span>短信验证码</span>
                    <input type="number" placeholder="请输入4位短信验证码" maxlength="4" v-model="code"/>
                </div>
            </li>
        </ul>
        <button class="confrim" :disabled="isDisabled" @click="confrimClick">完成</button>
        <mt-popup v-model="bankVisible" position="bottom" class="region-popup">
            <mt-picker :slots="bankData" @change="onValuesChange" :itemHeight="50"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import { bankCardValidate, IdCardValidate } from '@/common/verification.js'
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'Wxpay',
    components: {
        HeaderNav
    },
    data () {
        return {
            userName: '',
            userAccount: '',
            bankAccount: '',
            code: '',
            bankVisible: false,
            disabled: false,
            isDisabled: false,
            bankValue: '请选择',
            sendCode: '获取验证码',
            payMode: 'wxpay',
            cashData: {},
            bankData: [{
                flex: 1,
                values: ["中国邮政储蓄银行", "中国工商银行", "中国农业银行", "中国银行", "中国建设银行", "中国交通银行", "招商银行", "中国民生银行", "中国光大银行", "中信银行", "华夏银行", "深发/平安银行", "兴业银行", "上海银行", "浦东发展银行", "广发银行", "渤海银行", "广州银行", "金华银行", "温州银行", "徽商银行", "江苏银行", "南京银行", "宁波银行", "北京银行", "北京农村商业银行", "汇丰银行", "渣打银行", "花旗银行", "东亚银行", "广东华兴银行", "深圳农村商业银行", "广州农村商业银行股份有限公司", "东莞农村商业银行", "东莞市商业银行", "广东省农村信用社联合社", "大新银行", "永亨银行", "星展银行香港有限公司", "恒丰银行", "天津市商业银行", "浙商银行", "南洋商业银行", "厦门银行", "福建海峡银行", "吉林银行", "汉口银行", "盛京银行", "大连银行", "河北银行", "乌鲁木齐市商业银行", "绍兴银行", "成都商业银行", "抚顺银行", "郑州银行", "宁夏银行", "重庆银行", "哈尔滨银行", "兰州银行", "青岛银行", "秦皇岛市商业银行", "青海银行", "台州银行", "长沙银行", "泉州银行", "包商银行", "龙江银行", "上海农商银行", "浙江泰隆商业银行", "内蒙古银行", "广西北部湾银行", "桂林银行", "龙江银行", "成都农村商业银行", "福建省农村信用社联合社", "天津农村商业银行", "江苏省农村信用社联合社", "湖南农村信用社联合社", "江西省农村信用社联合社", "商丘市商业银行", "华融湘江银行", "衡水市商业银行", "重庆南川石银村镇银行", "湖南省农村信用社联合社", "邢台银行", "临汾市尧都区农村信用合作联社", "东营银行", "上饶银行", "德州银行", "承德银行", "云南省农村信用社", "柳州银行", "威海市商业银行", "湖州银行", "潍坊银行", "赣州银行", "日照银行", "南昌银行", "贵阳银行", "锦州银行", "齐商银行", "珠海华润银行", "葫芦岛市商业银行", "宜昌市商业银行", "杭州商业银行", "苏州市商业银行", "辽阳银行", "洛阳银行", "焦作市商业银行", "镇江市商业银行", "法国兴业银行", "大华银行", "企业银行", "华侨银行", "恒生银行", "临沂商业银行", "烟台商业银行", "齐鲁银行", "BC卡公司", "集友银行", "大丰银行", "AEON信贷财务亚洲有限公司", "澳门BDA"],
                className: 'slot1',
                textAlign: 'center'
            }],
            payModeArr: [{
                payMode: 'wxpay',
                payName: '微信账号', 
                placeholder: '请输入微信账号',
                navTitle: '设置微信',
            }, {
                payMode: 'alipay',
                payName: '支付宝账号', 
                placeholder: '请输入支付宝账号',
                navTitle: '设置支付宝',
            },{
                payMode: 'bank',
                payName: '身份证账号', 
                placeholder: '请输入持卡人证件号码',
                navTitle: '设置银行卡'
            }],
        }
    },
    created () {
        const phone = this.$store.state.userData.account
        const cashData = this.$store.state.cashData
        this.cashData = cashData
        // console.log(cashData)
        let str = phone.substr(0, 3) + "****" + phone.substr(7)
        this.phone = str
        const payMode = this.$route.query.payMode
        this.payMode = payMode
        if (payMode === 'bank') {
            this.userName = cashData.payeeName
            this.userAccount = cashData.cardNo
            this.bankAccount = cashData.account
        } else {
            this.userName = cashData.payeeName
            this.userAccount = cashData.payeePhone
        }
        this.payModeArr.forEach((item) => {
            if (item.payMode === payMode) {
                this.payName = item.payName
                this.placeholder = item.placeholder
                this.navTitle = item.navTitle
            }
        })
    },
    methods: {
        /**
         * 显示银行底部弹窗
         */
        checkBankClick () {
            this.bankVisible = true
        },
        /**
         * 选择银行
         */
        onValuesChange (picker, values) {
            this.bankData[0].values.forEach((item, index) => {
                if (this.cashData.bank === item) {
                    this.bankValue = item
                    // picker.setSlotValue(index, values[0])
                }
            })
        },
        /**
		 * 获取验证码
		 */
		getCode () {
			const ph = this.$store.state.userData.account
			let myreg = /^1(3|4|5|6|7|8|9)\d{9}$/
			if (ph == '') {
				this.$toast({
                    message: '手机号不能为空',
                    position: 'top'
				})
				return false
			} else if (!myreg.test(ph)) {
				this.$toast({
                    message: '请输入正确的手机号',
                    position: 'top'
				})

				return false
			} else {
				this.getPhoneCode()
			}
		},

		getPhoneCode () {
			const vcode = {
				type: 6,
				phone: this.$store.state.userData.account
			}
			// console.log(vcode)
			this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/vcode', vcode).then(this.getPhoneCodeScc)
		},
		getPhoneCodeScc (res) {
			console.log(res)
			let num = 61
			let timer = setInterval(() => {
				num--
				if (num <= 0) {
					clearInterval(timer)
					this.sendCode = '重新发送'
					this.disabled = false
				} else {
					this.sendCode = num + ' s'
				}
			}, 1000)
        },
        /**
         * 提交表单
         */
        confrimClick () {
            let obj = {}
            if (this.payMode === 'bank') {
            
                    obj.payeeName = this.userName,
                    obj.cardNo = this.userAccount,
                    obj.account = this.bankAccount,
                    obj.bank = this.bankValue,
                    obj.vcode = this.code,
                    obj.payeePhone = this.$store.state.userData.account
                
                this.commonValidate(obj)
                this.bankvalidate(obj)
            } else if (this.payMode === 'wxpay') {
                
                    obj.type = 1,
                    obj.payeeName = this.userName,
                    obj.account = this.userAccount,
                    obj.vcode = this.code,
                    obj.payeePhone = this.$store.state.userData.account
                
                this.commonValidate(obj)
            } else if (this.payMode === 'alipay') {
            
                    obj.type = 2,
                    obj.payeeName = this.userName,
                    obj.account = this.userAccount,
                    obj.vcode = this.code,
                    obj.payeePhone = this.$store.state.userData.account
                
                this.commonValidate(obj)
            }
            // console.log(obj)
            this.isDisabled = true
            this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/withdraw/info/setting', obj).then(this.bindAccountScc)
        },
        bindAccountScc (res) {
            // console.log(res)
            if (res.data.code === '200') {
                this.isDisabled = false
                this.$router.push('/mobile/my/set/result/result?flag=1')
            } else if (res.data.code === '203') {
                this.isDisabled = false
				this.$toast({
					message: '验证码无效',
					position: 'top'
				})
            }
        },
        bankvalidate (obj) {
            // 身份证验证
            let idCard = IdCardValidate(obj.cardNo)
            if (!idCard) {
                this.$toast({
                    message: '请使用有效的身份证件',
                    position: 'top'
				})
                return false
            }
            // 银行账号验证
            let bankCard = bankCardValidate(obj.account)
            if (!bankCard) {
                this.$toast({
                    message: '请使用有效的储蓄卡',
                    position: 'top'
				})
                return false
            }
            // 银行名称有无
            if (obj.bank === '请选择') {
                this.$toast({
                    message: '没有选中银行卡哦',
                    position: 'top'
				})
                return false
            }
        },
        // 公共验证
        commonValidate (obj) {
            // 判断持卡人
            if (obj.payeeName === '') {
                this.$toast({
                    message: '持卡人不能为空',
                    position: 'top'
				})
                return false
            }

            // 判断持卡人
            if (obj.account === '') {
                this.$toast({
                    message: '账号不能为空',
                    position: 'top'
				})
                return false;
            }
            
            let myreg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (obj.payeePhone == "") {
                this.$toast({
                    message: '手机号不能为空',
                    position: 'top'
				})
                return false
            } else if (!myreg.test(obj.payeePhone)) {
                this.$toast({
                    message: '请输入正确的手机号',
                    position: 'top'
				})
                return false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.wxpay {
    ul {
        li {
            background: #fff;
            padding: 0 .34rem;
            font-size: .26rem;
            margin-top: .2rem;
            .user-name, .pay-number {
                border-bottom: 1px solid #D6D6D6;
                padding: .3rem 0 .08rem 0;
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                input {
                    text-align: right;
                }
                .send {
                    font-size: .24rem;
                    color: #80B4F0;
                }
            }
            .pay-number {
                border-bottom: none;
                .right {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    i {
                        font-size: .4rem;
                    }
                }
            }
        }
    }
    button {
        width: 92%;
        margin-left: 4%;
        height: .7rem;
        color: #fff;
        border-radius: .12rem;
        margin-top: .7rem;
        background: #EC4E4E;
    }
    button[disabled] {
        color:#fff !important;
        background: rgb(218, 145, 145) !important;
    }
    .region-popup {
        width: 100%;
    }
}
</style>