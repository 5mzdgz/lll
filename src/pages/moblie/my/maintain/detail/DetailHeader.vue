<template>
    <div class="detail-header" :class="orderData.checkStatus === 2 || orderData.orderStatus === 5 ? 'refuse' : ''">
        <div class="header-box">
            <div class="header-left">
                <p>{{orderData.statusTitle}} <span>{{orderData.statusSub}}</span></p>
                <span>{{orderData.statusSubtitle}}</span>
            </div>
            <img :src="orderData.statusIcon" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailHeader',
    props: {
        orderData: Object
    },
    data () {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.detail-header {
    overflow: hidden;
    width: 100%;
    height: 0;
    background: url('https://img.laoliangli.com/label/common/banner_status.png');
    padding-bottom: 27.2%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .header-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .2rem;
        .header-left {
            color: #fff;
            p {
                font-size: .36rem;
                padding-bottom: .1rem;
            }
            span {
                font-size: .22rem;
            }
        }
        img {
            width: 1.3rem;
            height: 1.3rem;
        }
    }
}
.refuse {
    overflow: hidden;
    width: 100%;
    height: 0;
    background: url('https://img.laoliangli.com/label/common/banner_status_refuse.png');
    padding-bottom: 27.2%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>