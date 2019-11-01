<template>
    <div class="mat-opinion">
        <header-nav :navTitle="navTitle"></header-nav>
        <div class="opinion">
            <dl>
                <dd>服务评分</dd>
                <dd class="middle">
                    <span class="iconfont" v-for="(iconItem, key) in scoreArr" :key="key" @click="scoreTap(key)"
                        :class="currentIndex >= key ? 'cur_active' : 'key_active'"
                    >
                        {{currentIndex >= key ? '&#xe877;' : '&#xe640;'}}
                    </span>
                </dd>
                <dd class="right">{{scoreStatus}}</dd>
            </dl>
            <div class="comment">
                <textarea name="" id="" rows="5" :placeholder="textarea" v-model="content"></textarea>
                <div class="add-photo">
                    <div class="add-photo-item" v-for="(item, index) in imageList" :key="index">
                        <div class="img-box">
                            <img class="add-img" :src="item" />
                            <i class="el-icon-error" @click="deletImgTap(index)"></i>
                        </div>
                    </div>
                    
                    <div class="tap-box">
                        <img class="tap-img" src="https://img.laoliangli.com/label/common/addimg_icon.png" />
                        <span class="add-text">添加照片</span>
                        <input id="upload_file" type="file" accept="image/png,image/jpeg,image/jpg" @change="inputChange($event)"/>
                    </div>
                </div>
                <button class="confrim-opinion" :disabled="submitted" @click="bindFormSubmit">提交</button>
            </div>
            <mt-popup
                v-model="opinionVisible"
                popup-transition="popup-fade">
                <router-link :to="{name: 'Coupon'}">
                    <img src="https://img.laoliangli.com/label/maintain/opinion_success.png" alt="" />
                </router-link>
            </mt-popup>
        </div>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'MatOpinion',
    components: {
        HeaderNav
    },
    data () {
        return {
            navTitle: '服务评价',
            textarea: '本次的保养服务满足您的期望吗？请在评论区留下您宝贵的评论和建议，我们将竭力做到更好！',
            scoreArr: ['非常差', '差', '一般', '好', '非常好'],
            content: '',
            currentIndex: 4,
            // 展示用
            imageList: [],
            // 保存用
            saveImg: [],
            orderNumber: null,
            score: 10,
            opinionVisible: false,
            submitted: false,
            scoreStatus: ''
        }
    },
    mounted () {
        const orderNumber = this.$route.query.orderNumber
        this.orderNumber = orderNumber
        let scoreStatus = this.scoreArr[this.currentIndex]
        // console.log(orderNumber)
        this.scoreStatus = scoreStatus
    },
    methods: {
        /**
         * 评分
         */
        scoreTap (key) {
            let scoreArr = this.scoreArr
            this.currentIndex = key
            this.scoreStatus = scoreArr[key]
            this.score = (key + 1) * 2
        },
        /**
         * 添加图片
         */
        inputChange (e) {
            let len = this.imageList.length
            if (len === 9) {
                this.$toast({
                    message: '最多可上传9张',
                })
                return
            }
            let that = this
            let files = e.target.files
            let file = files[0]
            // console.log(file)
            this.saveImg.push(file)

            if(window.FileReader) {
                let fr = new FileReader()
                fr.onloadend = function(e) {  
                    that.imageList.push(e.target.result)
                }
                if (file) {
                    fr.readAsDataURL(file)  //也是利用将图片作为url读出
                }
            }
        },
        /**
         * 删除一张图片
         */
        deletImgTap (index) {
            let imageList = this.imageList
            let saveImg = this.saveImg
            imageList.splice(index, 1)
            saveImg.splice(index, 1)
        },
        /**
         * 提交
         */
        bindFormSubmit () {
            let content = this.content.replace(/\s*/g, '')
            if (content.length <= 0) {
                this.$toast({
                    message: '内容不能为空',
                })
                return false
            }
            if (this.submitted) {
                this.$toast({
                    message: '该订单意见反馈过',
                })
                return false
            }

            let form = new FormData()
            for (let index = 0; index < this.saveImg.length; index++) {
                form.append('files', this.saveImg[index], this.saveImg[index].name) 
            }
			let config = {
				headers: {
					'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
				}
            }
            let url = '/l/v2/mat/order/feedback?orderNumber=' + this.orderNumber + '&content=' + content +'&score=' + this.score
            this.axios.post(this.domain.Base_M2_URL + url, form, config).then((res) => {
                // console.log(res)
                if (res.data.code === '200') {
                    this.opinionVisible = true
                    this.content = ''
                    this.score = 10
                    this.imageList = []
                    this.saveImg = []
                    this.currentIndex = 4
                    this.submitted = true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mat-opinion {
    height: 100vh;
    background: #fff;
    padding-bottom: 2rem;
   .opinion {
       dl {
           display: flex;
           flex-direction: row;
           align-items: center;
           justify-content: space-between;
           padding: .28rem .2rem;
           margin-top: .1rem;
           font-size: .3rem;
           border-bottom: 1px solid #D5D5D5;
           dd {
               width: 22%;
                &.middle {
                    width: 56%;
                    .cur_active {
                        color: #EC4E4E;
                    }
                    .key_active {
                        color: #D5D5D5;
                    }
                }
                &.right {
                    text-align: right;
                    color: #A9A8AD;
                }
               span {
                   padding: 0 .1rem;
               }
           }
       }
       .comment {
           padding: .2rem;
           overflow: hidden;
           clear: both;
           textarea {
               width: 100%;
               text-align: justify;
               resize: none;
           }
           .add-photo {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding-bottom: .3rem;
                border-bottom: 1px solid #D5D5D5;
                .add-photo-item {
                    width: 33.33%;
                    padding: .2rem 0;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    .img-box {
                        width: 1.6rem;
                        height: 1.6rem;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        img {
                            width: 100%;
                        }
                    }
                    i {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        color: #bbb;
                        font-size: .4rem;
                        background: #fff;
                        border-radius: 100%;
                    }
                }
                .tap-box {
                    position: relative;
                    width: 1.58rem;
                    height: 1.58rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    border: 1px dashed #D5D5D5;
                    margin-left: .2rem;
                    overflow: hidden;
                    img {
                        width: .64rem;
                        height: .55rem;
                    }
                    span {
                        font-size: .28rem;
                        color: #A9A8AD;
                        margin-top: .16rem;
                    }
                    input {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: #eee;
                        width: 1.58rem;
                        height: 1.58rem;
                        opacity: 0;
                    }
                }
           }
           button[disabled] {
               background: #A9A8AD !important;
           }
           button {
               float: right;
               width: 1.5rem;
               height: .5rem;
               font-size: .28rem;
               border-radius: .16rem;
               color: #fff;
               background: #EC4E4E;
               margin-top: .2rem;
           }
       }
       .mint-popup {
           width: 5.5rem;
           background: none;
           img {
               width: 100%;
           }
       }
   } 
}
</style>
