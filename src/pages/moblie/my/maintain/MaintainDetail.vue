<template>
    <div class="maintain-detail">
        <header-nav :navTitle="navTitle"></header-nav>
        <div class="detail-box">
            <detail-header :orderData="orderData"></detail-header>
            <order-info :orderData="orderData"></order-info>
            <detail-project :orderData="orderData"></detail-project>
            <detail-tabbar :orderData="orderData"></detail-tabbar>
        </div>
    </div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import DetailHeader from './detail/DetailHeader'
import OrderInfo from './detail/OrderInfo'
import DetailProject from './detail/DetailProject'
import DetailTabbar from './detail/DetailTabbar'
export default {
    name: 'MaintainDetail',
    components: {
        HeaderNav,
        DetailHeader,
        OrderInfo,
        DetailProject,
        DetailTabbar
    },
    data () {
        return {
            navTitle: '订单详情',
            orderData: {}
        }
    },
    mounted () {
        const orderId = JSON.parse(this.$route.query.orderId)
        // console.log(orderId)
        this.getStatusData(orderId)
    },
    methods: {
        /**
         * 获取订单详情
         */
        getStatusData (orderId) {
            let oUrl = '/l/v1/user/mat/order/dtl?orderId=' + orderId 
            this.axios.get(this.domain.Base_M3_URL + oUrl).then((res) => {
                let resData = res.data.data
                // console.log(resData);
                // icon
                switch (resData.orderStatus) {
                    case 1:
                    resData.statusIcon = 'https://img.laoliangli.com/label/common/shipped.png'
                    break;
                    case 2:
                    resData.statusIcon = 'https://img.laoliangli.com/label/common/maintenance.png'
                    resData.statusTitle = '保养中'
                    resData.statusSub = ''
                    resData.statusSubtitle = '工艺师正在对首饰进行保养，请耐心等待'
                    break;
                    case 3:
                    resData.statusIcon = 'https://img.laoliangli.com/label/common/received.png'
                    resData.statusTitle = '寄回中'
                    resData.statusSub = ''
                    resData.statusSubtitle = '首饰已保养完成，正在寄回中，请耐心等待'
                    break;
                    case 4:
                    resData.statusIcon = 'https://img.laoliangli.com/label/common/finished.png'
                    resData.statusTitle = '已完成'
                    resData.statusSub = ''
                    resData.statusSubtitle = '交易已完成'
                    break;
                    case 5:
                    resData.statusIcon = 'https://img.laoliangli.com/label/common/refuse.png'
                    resData.statusTitle = '已拒收'
                    resData.statusSub = ''
                    resData.statusSubtitle = '已拒收，请查看拒收原因，平台已经安排退款'
                    break;
                    default:
                    resData.statusIcon = 'https://img.laoliangli.com/label/common/finished.png'
                }
                // 状态内容
                if (resData.checkStatus === 0 && resData.uploadImgs) {
                    resData.statusTitle = '审核中'
                    resData.statusSub = ''
                    resData.statusSubtitle = '工艺师正在审核资料，请您耐心等待~'
                } else if (resData.checkStatus === 0 && !resData.uploadImgs) {
                    resData.statusTitle = '审核中'
                    resData.statusSub = '（待上传实物照片）'
                    resData.statusSubtitle = '工艺师正在审核资料，请您耐心等待~'
                } else if (resData.checkStatus == 1 && resData.orderStatus == 0) {
                    resData.statusTitle = '审核通过'
                    resData.statusSub = '';
                    resData.statusSubtitle = '维修单号：' + resData.orderNumber
                } else if (resData.orderStatus == 1 && !resData.userShippingCode) {
                    resData.statusTitle = '待寄出'
                    resData.statusSub = '（请您寄出快递后，填写快递信息）'
                    resData.statusSubtitle = '维修单号：' + resData.orderNumber
                } else if (resData.orderStatus == 1 && resData.userShippingCode) {
                    resData.statusTitle = '已寄出'
                    resData.statusSub = '';
                    resData.statusSubtitle = '维修单号：' + resData.orderNumber
                } else if (resData.checkStatus === 2) {
                    resData.statusIcon = 'https://img.laoliangli.com/label/common/refuse.png'
                    resData.statusTitle = '审核未通过'
                    resData.statusSub = ''
                    resData.statusSubtitle = '请重新填写资料，提交申请吧~'
                }
                // console.log(resData)
            
                this.orderData = resData
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.detail-box {

}
</style>