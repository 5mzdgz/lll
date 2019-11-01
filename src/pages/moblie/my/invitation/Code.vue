<template>
    <div class="code-box">
        <img :src="wxCode" alt="">
        <p>让朋友扫一扫小程序二维码</p>
		<p>邀请他加入老良利</p>
        <img :src="mobileCode" alt="">
        <p>让朋友扫一扫移动端二维码</p>
		<p>邀请他加入老良利</p>
        <div class="qrcode" ref="qrCodeUrl" v-if="flagImg"></div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    name: 'Code',
    data () {
        return {
            wxCode: '',
            mobileCode: '',
            flagImg: true
        }
    },
    mounted () {
        const wxCode = localStorage.getItem('wxCode')
        if (!wxCode) {
            this.getWxCode()
        }
        this.wxCode = wxCode
        this.creatQrCode()
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
           let mobileCode = qrcode._oDrawing._elCanvas.toDataURL()
           this.mobileCode = mobileCode
           if (mobileCode) {
               this.flagImg = false
           }
        },
        /**
         * 获取微信二维码
         */
        getWxCode () {
            const obj = {
                path: "pages/home/home",
                scene: this.$store.state.userData.id,
                auto_color: false,
                width: 300
            }
            this.axios.post(this.domain.Base_M2_URL + '/l/v1/get/wx/applets/qr/code', obj).then((res) => {
                if(res.data.code === '200') {
                    // console.log(res)
                    localStorage.setItem('wxCode', res.data.data)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.code-box {
    width: 4.5rem;
    text-align: center;
    padding: .4rem 0;
    img {
        width: 3rem;
        height: 3rem;
        margin: .2rem 0;
    }
    p {
        font-size: .3rem;
        color: #8B8B8B;
        padding: .1rem 0;
    }
}
</style>