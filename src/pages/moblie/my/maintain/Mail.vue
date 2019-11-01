<template>
    <div class="mail">
        <header-nav :navTitle="navTitle"></header-nav>
        <ul>
            <li class="header-tips">
                <ul>
                    <li>
                        <div class="left-icon"></div>
                        <span>发货提醒</span>
                    </li>
                    <li>1.请按照下方平台地址进行邮寄并填写上快递公司和快递单号。</li>
                    <li>2.请装到小透明带中，小纸条写上对应的维修编码，便于双方确认产品。</li>
                    <li>3.请确保邮寄实物与审核资料一致，否则我方将拒绝签收。</li>
                </ul>
            </li>
            <li class="company-address">
                <p class="address-nav">
                    <span class="title">平台收件地址</span>
                    <span class="sub">（按此地址邮寄）</span>
                </p>
                <div class="address">
                    <span class="iconfont address-left">&#xe614;</span>
                    <div class="address-right">
                        <p class="company">老良利电子商务有限公司 0755-28914801</p>
                        <p class="address-detail">深圳市龙岗区横岗街道六和路宝润发工业村1栋3楼</p>
                    </div>
                </div>
            </li>
            <li class="add-address" v-if="$store.state.checkedAddress" @click="getAddress">
                <span class="iconfont address-left">&#xe614;</span>
                <div class="middle">
                    <p class="middle-user">
                        <span class="user-name">{{$store.state.checkedAddress.userName}}</span>
                        <span class="user-phone">{{$store.state.checkedAddress.userPhone}}</span>
                    </p>
                    <p class="user-address">{{$store.state.checkedAddress.province}}{{$store.state.checkedAddress.city}}{{$store.state.checkedAddress.area}}{{$store.state.checkedAddress.address}}</p>
                </div>
                <i class="el-icon-arrow-right"></i>
            </li>

            <li class="add-address" @click="getAddress" v-else>
                <div class="add"><span class="iconfont">&#xe715;</span></div>
                <div class="add-nav">
                    <span class="nav-title">添加收货地址</span>
                    <span class="nav-sub">（首饰保养完成后，将寄回此地址）</span>
                </div>
                <i class="el-icon-arrow-right"></i>
            </li>

            <li class="mail-number">
                <span>快递单号</span>
                <input type="text" placeholder="请填写快递单号" maxlength="20" v-model="shippingCode"/>
            </li>
        </ul>
        <button :class="{confrim: !disabled}" :disabled="disabled" @click="bindCourierTap">确认提交</button>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'Mail',
    components: {
        HeaderNav
    },
    data () {
        return {
            navTitle: '提交邮寄信息',
            disabled: false,
            shippingCode: '',
            orderId: null,
            orderNumber: null
        }
    },
    mounted () {
        const orderId = this.$route.query.orderId
        const orderNumber = this.$route.query.orderNumber
        this.orderId = orderId
        this.orderNumber = orderNumber
    },
    methods: {
        /**
         *去地址页
         */
        getAddress () {
            this.$router.push('/mobile/address?flag=1')
        },
        /**
         * 获取
         */
        bindCourierTap () {
            const obj = {
                shippingCode: this.shippingCode,
                addressId: this.$store.state.checkedAddress.id,
                orderNumber: this.orderNumber
            }
            // console.log(obj)
            if (obj.shippingCode && obj.addressId) {
                this.axios.post(this.domain.Base_M3_URL + '/l/v1/mat/order/shipping/address').then((res) => {
                    console.log(res)
                    if (res.data.code === '200') {
                        this.disabled = true
                        this.$router.push('/mobile/my/maintain/result?flag=4'+ '&orderId=' + this.data.orderId)
                    } else {
                        this.$toast({
                            message: '提交失败',
                        })
                    }
                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.mail {
    ul {
        li {
            margin: .15rem 0;
            background: #fff;
            box-shadow: 0px 6px 6px rgba(0,0,0,0.03);
            ul {
                li {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    font-size: .19rem;
                    color: #505050;
                    box-shadow: none;
                    margin: .18rem;
                    width: 100%;
                   .left-icon {
                       width: 4px;
                       height: .4rem;
                       background: #FF4848;
                   }
                   span {
                       margin-left: .2rem;
                       font-size: .3rem;
                       color: #000;
                   } 
                }
                li:nth-child(1) {
                    margin-left: 0;
                }
            }
        }
        .header-tips {
            padding: .15rem 0;
        }
        .company-address {
            padding: .2rem;
            .address-nav {
                margin-bottom: .1rem;
                .title {
                    font-size: .26rem;
                    font-weight: bold;
                }
                .sub {
                    font-size: .18rem;
                }
            }
            .address {
                display: flex;
                flex-direction: row;
                align-items: center;
                .address-left {
                    font-size: .35rem;
                    color: #858585;
                }
                .address-right {
                    margin-left: .1rem;
                    font-size: .2rem;
                    line-height: .4rem;
                    .address-detail {
                        color: #858585;
                    }
                }
            }
        }
        .add-address {
            height: 1.2rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 .2rem;
            .add {
                width: .5rem;
                height: .5rem;
                background: #f9f9f9;
                text-align: center;
                line-height: .5rem;
                margin-right: .2rem;
            }
            .add-nav {
               .nav-title {
                   font-size: .28rem;
               } 
               .nav-sub {
                   font-size: .2rem;
               }
            }
            .address-left {
                font-size: .35rem;
            }
            .middle {
                margin-left: .1rem;
                line-height: .4rem;
                width: 5rem;
                .middle-user {
                    font-size: .3rem;
                    .user-phone {
                        font-size: .24rem;
                        color:#737373;
                    }
                }
                .user-address {
                    width: 100%;
                    font-size: .2rem;
                    color:#343434;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    word-break:break-word;
                    -webkit-box-orient:vertical;
                    overflow: hidden;
                }
            }
        }
        .mail-number {
            height: .7rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 .2rem;
            font-size: .26rem;
            input {
                text-align: right;
            }
        }
    }
    .confrim {
        position: fixed;
        bottom: .2rem;
        left: 11%;
        width: 5rem;
        height: .7rem;
        border-radius: .12rem;
        background: #FF4848;
        color: #fff;
    }
    button[disabled] {
        position: fixed;
        bottom: .2rem;
        left: 11%;
        width: 5rem;
        height: .7rem;
        border-radius: .12rem;
    }
}
</style>