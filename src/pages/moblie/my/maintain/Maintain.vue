<template>
    <div class="maintain">
        <header-nav :navTitle="navTitle"></header-nav>
        <maintain-top></maintain-top>
        <maintain-middle></maintain-middle>
        <maintain-tabbar v-show="showTabbar"></maintain-tabbar>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import MaintainTop from './MaintainTop'
import MaintainMiddle from './MaintainMiddle'
import MaintainTabbar from './MaintainTabbar'
export default {
    name: 'Maintain',
    inject: ['reload'],
    components: {
        HeaderNav,
        MaintainTop,
        MaintainMiddle,
        MaintainTabbar
    },
    data () {
        return {
            navTitle: '首饰保养',
            showTabbar: true,
            documentHeight: document.documentElement.clientHeight,  //默认屏幕高度
        }
    },
    created () {
        // this.getMaintainArr()
        const loginToken = localStorage.getItem('loginToken')
        if (!loginToken) {
            this.$router.push({name: 'Login'})
            return false
        }
    },
    mounted () {
        // window.onresize监听页面高度的变化
        window.onresize = () => {
            return (() => {
                if(this.documentHeight > document.documentElement.clientHeight){
                    this.showTabbar = false
                }else{
                    this.showTabbar = true
                }
            })()
        }
    },
    methods: {
        /**
         * 获取保养服务数据并初始数据
         */
        getMaintainArr () {
            // this.reload()
            this.axios.get(this.domain.Base_M1_URL + '/l/v1/mat/search').then((res) => {
                if (res.data.code === '200') {
                    const maintainArr = res.data.data
                    maintainArr.sort(function (a, b) {
                        return a.id - b.id
                    })
                    // console.log(maintainArr)
                    maintainArr.forEach((item) => {
                        item.checked = false
                        item.msmList.forEach((indexItem) =>{
                            indexItem.checked = false
                            indexItem.qty = 1
                            // console.log(item)
                            this.setProItem(indexItem)
                        })
                    })
                    // console.log(maintainArr)
                    this.maintainArr = maintainArr
                    // this.reload()
                    // this.$store.dispatch('addMaintainArr', maintainArr)
                }
            })
        },
        /**
         * 服务项数据处理
         */
        setProItem (proItem) {
            let nowPrice = 0
            // 置空当前选择中的服务项
            proItem.checked = false
            let msomListItem = proItem.msomList
            if (msomListItem.length > 0) {
                for (let j in msomListItem) {
                    let timestamp = new Date().getTime()
                    let stime = Date.parse(new Date(msomListItem[j].startTime))
                    let etime = Date.parse(new Date(msomListItem[j].endTime))
                    // console.log(msomListItem[j])
                    // let stime = new Date(msomListItem[j].startTime.replace(/\-/g, '/')).getTime()
                    // let etime = new Date(msomListItem[j].endTime.replace(/\-/g, '/')).getTime()
                    // console.log(etime);
                    // 时间范围
                    if (timestamp > stime && timestamp < etime) {
                        nowPrice = msomListItem[j].offerPrice
                    } else {
                        nowPrice = proItem.servicePrice
                    }
                    proItem.nowPrice = nowPrice
                }
            } else {
                nowPrice = proItem.servicePrice
                proItem.nowPrice = nowPrice
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.maintain {
    
}
</style>