<template>
    <div class="bill" ref="wrapper" :style="{height:(wrapperHeight - 50)+'px'}">
        <header-nav :navTitle="navTitle"></header-nav>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
            <div class="bill-box">
                <div class="bill-item" v-for="(item, index) in billArr" :key="index">
                    <img :src="item.payImg" alt="">
                    <div class="item-right">
                        <div class="item-info">
                            <p>{{item.description}}</p>
                            <span>{{item.paymentTime}}</span>
                        </div>
                        <span class="item-money">{{item.consumAmount | floatTotal}}</span>
                    </div>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'Bill',
    components: {
		HeaderNav
	},
	data () {
		return {
            navTitle: '账单',
            // 可以进行上拉
            allLoaded: false,
            // 是否自动触发上拉函数
            isAutoFill: false,
            wrapperHeight: 0,
            page: 1,
            size: 10,
            billArr: []
		}
    },
    mounted () {
        this.getBillArr(this.page, this.size)
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
    },
    methods: {
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
            this.getBillArr(this.page, this.size)
            this.$refs.loadmore.onTopLoaded()
        },
        // 加载更多
        loadMore() {
            this.page++
            this.getBillArr(this.page, this.size)
            this.$refs.loadmore.onBottomLoaded()
        },
        /**
         * 获取列表
         */
        getBillArr (page, size) {
            let url = '/l/v1/user/consum/record?page=' + page + '&size=' + size
            this.axios.get(this.domain.Base_M2_URL + url).then((res) => {
                const resData = res.data.data
                if (page > 1) {
                    // console.log(res)
                    if (resData && resData.length > 0) {
                        resData.forEach((item) => {
                            item.payImg = 'https://img.laoliangli.com/label/wallet/money_icon.png'
                            const consumAmount = item.consumAmount
                            item.consumAmount = consumAmount
                            this.billArr.push(item)
                        })
                    }
                } else {
                    // console.log(res)
                    resData.forEach((item) => {
                        item.payImg = 'https://img.laoliangli.com/label/wallet/money_icon.png'
                        const consumAmount = item.consumAmount
                        item.consumAmount = consumAmount
                    })
                    this.billArr = resData
                    // console.log(this.billArr)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.bill {
    overflow: scroll;
    padding-bottom: 1rem;
    .bill-box {
        overflow: hidden;
        .bill-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0 .3rem;
            background: #fff;
            img {
                width: .6rem;
                height: .6rem;
            }
            .item-right {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
                justify-content: space-between;
                font-size: .26rem;
                border-bottom: 1px solid #ECECEC;
                padding: .1rem 0 .3rem 0;
                margin: .2rem 0 .2rem .28rem;
                .item-info {
                    p {
                        margin-bottom: .05rem;
                    }
                    span {
                        font-size: .2rem;
                        color: #7E7E7E;
                    }
                }
                .item-money {
                    font-size: .28rem;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>