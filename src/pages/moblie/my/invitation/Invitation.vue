<template>
    <div class="invitation" ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
        <header-nav :navTitle="navTitle"></header-nav>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
            <div class="invitation-box">
                <div class="invitation-img">
                    <img src="/static/image/invitation_banner.png" alt="">
                    <button class="activity-rule" @click="activityClick">活动规则</button>
                    <!-- <button class="share" @click="shareClick">立即分享</button> -->
                    <div class="btn">
                        <button class="generate" @click="shareClick">
                            <img src="https://img.laoliangli.com/label/invitation/generate_icon.png" alt="">
                            立即分享</button>
                        <button class="face" @click="codeClick">
                            <img src="https://img.laoliangli.com/label/invitation/face_icon.png" alt="">
                            当面邀请</button>
                    </div>
                </div>
            
                <Poster ref="poster"></Poster>

                <div class="commission">
                    <dl>
                        <dt>总佣金：<span class="red">{{totalAmount | floatTotal}}</span></dt>
                        <dt>已返：{{returnAmount | floatTotal}}</dt>
                        <dt>待返：{{notReturnAmount | floatTotal}}</dt>
                    </dl>
                    <dl>
                        <dt>已邀请（{{totalRecord}}）</dt>
                        <dt>订单数</dt>
                        <dt>订单金额</dt>
                        <dt>佣金</dt>
                    </dl>
                    <dl class="invitation-user" v-for="(item, index) in userArr" :key="index">
                        <dd>
                            <img :src="item.userHeadImgage ? item.userHeadImgage : 'https://img.laoliangli.com/label/my/authorImg_icon.png'" alt="">
                            <div class="user-info">
                                <p>{{item.nickName=='null'?item.account:item.nickName}}</p>
                                <span>{{item.createTime}}</span>
                            </div>
                        </dd>
                        <dd>{{item.orderCount}}</dd>
                        <dd>{{item.orderAmount}}</dd>
                        <dd>{{item.commission}}</dd>
                    </dl>
                </div>
            </div>
        </mt-loadmore>
        <mt-popup
            v-model="ruleVisible"
            popup-transition="popup-fade">
            <rule />
        </mt-popup>
        <mt-popup
            v-model="codeVisible"
            popup-transition="popup-fade">
            <Code />
        </mt-popup>
        <!-- <div class="qrcode" ref="qrCodeUrl"></div>
        <canvas id="myCanvas" width="" height=""></canvas>
        <div id="captureId" class="capture"></div>
        <img :src="dataURL" alt=""> -->
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import MySwiper from '@/pages/moblie/common/MySwiper'
import Rule from './Rule'
import Code from './Code'
import Poster from './Poster'
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'
import share from '@/common/share'
export default {
    name: 'Invitation',
    components: {
        HeaderNav,
        Rule,
        Code,
        Poster,
        MySwiper
    },
    data () {
        return {
            dataURL: '',
            navTitle: '邀请有礼',
            ruleVisible: false,
            codeVisible: false,
            posterVisible: false,
            // 可以进行上拉
            allLoaded: false,
            // 是否自动触发上拉函数
            isAutoFill: false,
            wrapperHeight: 0,
            page: 1,
            size: 10,
            userArr: [],
            notReturnAmount: 0,
            returnAmount: 0,
            totalAmount: 0,
            totalRecord: 0,
            topList: [
                { imgUrl: 'https://img.laoliangli.com/label/invitation/poster_1.png'},
                { imgUrl: 'https://img.laoliangli.com/label/invitation/poster_1.png'},
                { imgUrl: 'https://img.laoliangli.com/label/invitation/poster_1.png'}
            ]
        }
    },
    created () {
        const loginToken = localStorage.getItem('loginToken')
        let grade
        if (this.$store.state.userData.grade) {
            grade = this.$store.state.userData.grade
        } else {
            grade = JSON.parse(localStorage.getItem('grade'))
        }
        if (!loginToken) {
            this.$router.push({name: 'Login'})
            return false
        }
        if (loginToken && !grade || grade === 0) {
            this.$router.push('/mobile/set/membership?flag=3')
            return false
        }
    },
    mounted () {
        // this.poster()
        this.getInvitationArr(this.page, this.size)
        this.getInvitationTotal()
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    },
    methods: {
        /**
        * h5二维码
        */
        creatQrCode() {
            // let that = this
            let qrcode = new QRCode(this.$refs.qrCodeUrl, {
                text: 'https://www.laoliangli.com/home?scene=' + this.$store.state.userData.id,
                width: 224,
                height: 224,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            })
            let img = new Image()
            img.src = qrcode._oDrawing._elCanvas.toDataURL()
            return img
            // console.log(img.src)
            // qrcode.clear()
            // qrcode.makeCode("https://m.qtshe.com")
        },
    
        poster() {
            let t = this;
            let c = document.getElementById('myCanvas')
            //尺寸
            c.width = 462
            c.height = 822
            let ctx = c.getContext('2d')
            let qr = t.creatQrCode()
            let img = new Image()
            // img.src = '../static/image/poster_1.png'
            img.setAttribute("crossOrigin", "anonymous")

            img.onload = function () {
                ctx.drawImage(img, 0, 0)
                ctx.drawImage(qr, 0, 0)
                let a = document.createElement("a")
                a.href = c.toDataURL("image/png")
                a.download = "drcQrcode"
                a.click()
            }
            img.src = 'https://img.laoliangli.com/label/invitation/poster_1.png'
        },
        // 分享
        shareClick () {
            // console.log(this.$store.state.userData.id)
            // let url = window.location.href.split('#')[0]
            let url = 'https://www.laoliangli.com/home?scene=' + this.$store.state.userData.id
            const obj = {
                title: '邀请新好友躺着赚钱',//分享标题
                desc: '老良利，中国全民时尚珠宝品牌',//分享内容
                linkurl: url,//分享链接
                img: 'https://img.laoliangli.com/label/invitation/share.png',//分享内容显示的图片
            }
            console.log(obj)
            share.getJSSDK(url, obj) 	
        },
        // 下拉刷新
        loadTop() {
            this.loadFrist()
        },
        // 上拉加载
        loadBottom() {
            this.loadMore()
        },
        // 下来刷新加载
        loadFrist() {
            this.page = 1
            this.allLoaded = false // 可以进行上拉
            this.getInvitationArr(this.page, this.size)
            this.$refs.loadmore.onTopLoaded()
        },
        // 加载更多
        loadMore() {
            this.page++
            this.getInvitationArr(this.page, this.size)
            this.$refs.loadmore.onBottomLoaded()
        },
        /**
         * 获取邀请好友列表
         */
        getInvitationArr (page, size) {
            let url = '/invite/cash/back/user/list?page=' + page + '&size=' + size
            this.axios.get(this.domain.Base_M3_URL + url).then((res) => {
                // console.log(res)
                const resData = res.data.data
                if (page > 1) {
                    if (resData.length > 0) {
                        resData.forEach((item) => {
                            this.userData(item)
                            this.userArr.push(item)
                        })
                    }
                } else {
                    if (resData.length > 0) {
                        resData.forEach((item) => {
                            this.userData(item)
                        })
                    }
                    this.userArr = resData
                }
                this.totalRecord = res.data.page.totalRecord
            })
        },

        /**
         * 数据处理
         */
        userData: function(item) {
            const nickName = decodeURIComponent(item.nickName)
            const dataItem = item.orderAmount
            let commission = item.cashBack + item.notCashBack
            item.nickName = nickName
            item.orderAmount = dataItem
            item.commission = commission
            // 格式化时间
            let str = item.createTime
            // console.log(str)
            let oDate = new Date(str),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate()
            let oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay)
            item.createTime = oTime
        },
        //补0操作  
        getzf: function (num) {
            if (parseInt(num) < 10) {
                num = '0' + num
            }
            return num
        },
        /**
         * 获取邀请提成统计
         */
        getInvitationTotal () {
           this.axios.get(this.domain.Base_M3_URL + '/invite/cash/back/count').then((res) => {
                // console.log(data)
                const resData = res.data.data
                this.notReturnAmount = resData.notReturnAmount
                this.returnAmount = resData.returnAmount
                this.totalAmount = resData.totalAmount
           })
        },
        activityClick () {
            this.ruleVisible = true
        },
        codeClick () {
            this.codeVisible = true
        },
        posterClick () {
            this.$refs.poster.handleShow()
        },
    }
}
</script>

<style lang="scss" scoped>
.invitation {
    overflow: scroll;
    padding-bottom: 1rem;
    .invitation-box {
        .invitation-img {
            position: relative;
            width: 100%;
            height: 168.21%;
            img {
                width: 100%;
                display: block;
            }
            .activity-rule {
                position: absolute;
                right: 0;
                top: .13rem;
                font-size: .18rem;
                height: .42rem;
                line-height: .42rem;
                padding-left: .2rem;
                padding-right: .2rem;
                border-top-left-radius: .2rem;
                border-bottom-left-radius: .2rem;
                background: #ea4e1c;
                color: #fff;
            }
            .share { 
                position: absolute;
                bottom: 20%;
                left: 15%;
                z-index: 10;
                width: 70%;
                height: .74rem;
                border-radius: .22rem;
                background: linear-gradient(#FF8C49,#FF522C);
                color: #fff;
            }
            .btn {
                position: absolute;
                bottom: 9%;
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: center;
                .generate, .face {
                    width: 34%;
                    height: .6rem;
                    border-radius: .3rem;
                    margin: 0 .25rem;
                    font-size: .2rem;
                    color: #fff;
                    // background: linear-gradient(#FC8060,#D92E1D);
                    background: linear-gradient(#FF8C49,#FF522C);
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: .32rem;
                        height: .32rem;
                        margin-right: .1rem;
                    }
                }
                .face {
                background: linear-gradient(#FF8C49,#FF522C);
                }
            }
        }
        .commission {
            padding: 0 .3rem;
            dl {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                font-size: .28rem;
                color: #8E7C77;
            }
            dl:nth-child(1) {
                padding: .12rem 0;
                border-bottom: 1px solid #D6D6D6;
                margin-bottom: .16rem;
            }
            dl:nth-child(2) {
                font-size: .26rem;
            }
            .invitation-user {
                font-size: .24rem;
                color: #1e1e1e;
                dd {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-top: .2rem;
                    img {
                        width: .32rem;
                        height: .32rem;
                        border-radius: 100%;
                    }
                    .user-info {
                        p {
                            font-size: .2rem;
                            width: 1.5rem;
                            display: -webkit-box;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 1;
                            word-break: break-all;
                            -webkit-box-orient:vertical;
                            overflow: hidden;
                        }
                        span {
                            font-size: .14rem;
                            color: #848484;
                            margin-top: .08rem;
                        }
                    }
                }
                dd:nth-child(1) {
                    width: 25%;
                    // background: #848484;
                }
            }
        }
    }
    .mint-popup {
        border-radius: .2rem;
    }
}
</style>
