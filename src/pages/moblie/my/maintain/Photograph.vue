<template>
    <div class="photograph">
        <header-nav :navTitle="navTitle"></header-nav>
        <ul class="tips">
            <li class="title">
                <div class="icon-left"></div>
                <span>请拍摄上传首饰的实物相片</span>
            </li>
            <li>1.请完整展示首饰需要保养或修复的地方</li>
            <li>2.至少上传两张图片(一张整体首饰图，一张修复处细节图)</li>
            <li>3.请确保照片内容完整并清晰可见</li>
        </ul>
        <ul class="photo">
            <li v-for="(item, index) in photoArr" :key="index">
                <div class="photo-box" v-if="!item.headImgUrl">
                    <p>
                        <span class="item-index" v-if="index !== 0">{{index}}</span>
                        <span class="item-tip">{{index === 0 ? tipsTitle[0] : tipsTitle[1]}}</span>
                    </p>
                    <div class="photo-img">
                        <img :src="index === 0 ? tipsImg[0] : tipsImg[1]" alt="">
                    </div>
                    <button>拍照上传</button>
                </div>
                <img v-else class="physical-map" :src="item.headImgUrl" alt="" />
                <input id="upload_file" type="file" accept="image/png,image/jpeg,image/jpg" @change="inputChange($event, index)"/>
            </li>
            <p class="more" @click="morePhotoTap">{{more}}</p>
            <button :class="{confrim: !disabled}" :disabled="disabled" @click="confrimSaveImg">完成</button>
        </ul>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'Photograph',
    components: {
        HeaderNav
    },
    data () {
        return {
            navTitle: '拍照上传',
            tipsTitle: ['此处请上传首饰整体展示图', '此处请上传需修复处细节图'],
            tipsImg: ['https://img.laoliangli.com/label/maintain/photograph.png',  'https://img.laoliangli.com/label/maintain/photo_one.png' ],
            disabled: false,
            photoArr: [
                { headImgUrl: null  }, { headImgUrl: null }
            ],
            orderNumber: null,
            more: '上传更多',
            orderId: null,
            saveImg: []
        }
    },
    mounted () {
        const orderId = this.$route.query.orderId
        const orderNumber = this.$route.query.orderNumber
        // console.log(orderId, orderNumber)
        this.orderNumber = orderNumber
        this.orderId = orderId
    },
    methods: {
        /**
         * 更多照片列表
         */
        morePhotoTap () {
            let photoArr = this.photoArr
            let item = { headImgUrl: null }
            if (photoArr.length < 7) {
                photoArr.push(item)
                this.photoArr = photoArr
            } else {
                this.more = '最多可上传7张'
            }
        },
        /**
         * input文件
         */
        inputChange (e, index) {
            let that = this
            let files = e.target.files
            let file = files[0]
            // console.log(file)
            this.saveImg.push(file)

            if(window.FileReader) {
                let fr = new FileReader()
                fr.onloadend = function(e) {  
                    that.photoArr[index].headImgUrl = e.target.result
                }
                if (file) {
                    fr.readAsDataURL(file)  //也是利用将图片作为url读出
                }
			}
        },
        confrimSaveImg () {
            //  console.log(this.saveImg)
            let photoArr = this.photoArr
            if (!photoArr[0].headImgUrl) {
                this.$toast({
                    message: '请上传主图',
                })
                return
            }
            
            let path = []
            photoArr.forEach((item) => {
                if (item.headImgUrl) {
                    path.push(item.headImgUrl)
                }
            })
            if (path.length < 2) {
                this.$toast({
                    message: '请上传至少两张图片',
                })
                return
            }
            let form = new FormData()
            for (let index = 0; index < this.saveImg.length; index++) {
                form.append('files', this.saveImg[index],this.saveImg[index].name) 
            }
			let config = {
				headers: {
					'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
				}
            }
            let url = '/l/v1/mat/order/upload?orderNumber=' + this.orderNumber
            this.axios.post(this.domain.Base_M2_URL + url, form, config).then((res) => {
                // console.log(res)
                if (res.data.code === '200') {
                    this.$router.push('/mobile/my/maintain/result?orderId=' + this.orderId + '&flag=3')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.photograph {
    .tips {
        margin-top: .48rem;
        .title {
            font-size: .3rem;
            margin-left: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            line-height: .5rem;
            color: #000;
            .icon-left {
                width: .05rem;
                height: .4rem;
                background: #FF4848;
                margin-right: .23rem;
            }
        }
        li {
            font-size: .22rem;
            color: #505050;
            line-height: .4rem;
            margin-left: .28rem;
        }
    }
    .photo {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
        li {
            position: relative;
            background: #EEE;
            width: 5rem;
            margin-top: .7rem;
            text-align: center;
            overflow: hidden;
            background-size: 100% 100%;
            .physical-map {
                width: 100%;
            }
            .photo-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                p {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-left: .4rem;
                    margin-top: .2rem;
                    .item-index {
                        font-size: .6rem;
                        color: #828282;
                        margin-bottom: -0.2rem;
                    }
                    .item-tip {
                        vertical-align: top;
                        font-size: .24rem;
                        margin-left: .1rem;
                    }
                }
                .photo-img {
                    width: 2.37rem;
                    height: 1.6rem;
                    overflow: hidden;
                    margin: .5rem 0;
                    img {
                        width: 100%;
                        display: block;
                    }
                }
                button {
                    width: 100%;
                    height: .7rem;
                    background: #8E7C77;
                    color: #fff;
                    position: relative;
                }
            }
            input {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                opacity: 0;
            }
        }
        .more {
            text-align: center;
            padding: .5rem 0;
            color: #445bc0;
            font-size: .25rem;
        }
        .confrim {
            height: .7rem;
            width: 86.67%;
            position: fixed;
            bottom: .4rem;
            left: 6.66%;
            z-index: 10;
            background: #FF4848;
            color: #fff;
            border-radius: .12rem;
        }
        button[disabled] {
            height: .7rem;
            width: 86.67%;
            position: fixed;
            bottom: .4rem;
            left: 6.66%;
            z-index: 10;
            border-radius: .12rem;
        }
    }
}
</style>